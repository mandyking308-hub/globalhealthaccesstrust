// deno-lint-ignore-file no-explicit-any
import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

// GoCardless-first payment adapter.
// Creates a Direct Debit mandate (billing_request_flow) from a confirmed donation draft.
// Trusts only the draft_id from the browser; reloads amount, frequency, ownership server-side.
// If GoCardless credentials/config are absent, returns a graceful "unavailable" payload.

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const auth = req.headers.get("Authorization") ?? "";
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: auth } } },
    );

    const { data: userData, error: userErr } = await supabase.auth.getUser();
    if (userErr || !userData.user) return json({ error: "unauthorised" }, 401);
    const donorId = userData.user.id;

    const body = await req.json().catch(() => ({}));
    const draftId = String(body?.draft_id ?? "");
    if (!draftId) return json({ error: "draft_id required" }, 400);

    // Confirm draft ownership + confirmation via RPC (SECURITY DEFINER)
    const { data: draft, error: dErr } = await supabase
      .from("donation_drafts")
      .select("id, donor_id, amount_minor, currency, frequency, confirmed_at, status")
      .eq("id", draftId).maybeSingle();
    if (dErr || !draft) return json({ error: "draft not found" }, 404);
    if (draft.donor_id !== donorId) return json({ error: "not authorised" }, 403);
    if (!draft.confirmed_at) return json({ error: "draft not confirmed" }, 400);

    // Check config
    const token = Deno.env.get("GOCARDLESS_ACCESS_TOKEN");
    const env = Deno.env.get("GOCARDLESS_ENVIRONMENT") ?? "sandbox";
    if (!token) {
      return json({
        available: false,
        message: "Direct Debit setup is not yet available. You may use secure bank transfer or return later.",
      });
    }

    // Prepare arrangement / attempt record (idempotent-ish for this draft)
    const { error: prepErr } = await supabase.rpc("gocardless_prepare_arrangement", { _draft_id: draftId });
    if (prepErr) return json({ error: prepErr.message }, 400);

    const gcHost = env === "live" ? "https://api.gocardless.com" : "https://api-sandbox.gocardless.com";
    const origin = req.headers.get("origin") ?? new URL(req.url).origin;

    // Create a Billing Request (payment or mandate depending on frequency)
    const isRecurring = draft.frequency !== "one_time";
    const brBody: any = {
      billing_requests: {
        mandate_request: { scheme: "bacs", currency: draft.currency },
      },
    };
    if (!isRecurring) {
      brBody.billing_requests.payment_request = {
        description: `GHAT donation (draft ${draftId.slice(0, 8)})`,
        amount: draft.amount_minor,
        currency: draft.currency,
      };
    }

    const brRes = await fetch(`${gcHost}/billing_requests`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "GoCardless-Version": "2015-07-06",
        "Content-Type": "application/json",
        "Idempotency-Key": `draft-${draftId}`,
      },
      body: JSON.stringify(brBody),
    });
    if (!brRes.ok) {
      const t = await brRes.text();
      return json({ available: true, error: "gocardless_error", detail: t }, 502);
    }
    const br = await brRes.json();
    const brId = br.billing_requests.id;

    // Create hosted flow
    const flowRes = await fetch(`${gcHost}/billing_request_flows`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "GoCardless-Version": "2015-07-06",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        billing_request_flows: {
          redirect_uri: `${origin}/donation-success?draft=${draftId}`,
          exit_uri: `${origin}/donation-cancelled?draft=${draftId}`,
          links: { billing_request: brId },
        },
      }),
    });
    if (!flowRes.ok) {
      const t = await flowRes.text();
      return json({ available: true, error: "gocardless_flow_error", detail: t }, 502);
    }
    const flow = await flowRes.json();

    return json({ available: true, url: flow.billing_request_flows.authorisation_url });
  } catch (err: any) {
    return json({ error: err?.message ?? "internal_error" }, 500);
  }
});

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
