// deno-lint-ignore-file no-explicit-any no-import-prefix
import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

// GoCardless remains unavailable unless an explicit server-side activation flag
// is set after banking and settlement details have been verified by the Trustees.
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

    if (Deno.env.get("GOCARDLESS_ENABLED") !== "true") {
      return json({
        available: false,
        message: "Direct Debit setup is not currently active.",
      });
    }

    const token = Deno.env.get("GOCARDLESS_ACCESS_TOKEN");
    const environment = Deno.env.get("GOCARDLESS_ENVIRONMENT") ?? "sandbox";
    if (!token) {
      return json({ available: false, message: "Direct Debit setup is not currently active." });
    }

    const body = await req.json().catch(() => ({}));
    const draftId = String(body?.draft_id ?? "");
    if (!draftId) return json({ error: "draft_id required" }, 400);

    const donorId = userData.user.id;
    const { data: draft, error: draftError } = await supabase
      .from("donation_drafts")
      .select("id, donor_id, amount_minor, currency, frequency, confirmed_at, status")
      .eq("id", draftId)
      .maybeSingle();

    if (draftError || !draft) return json({ error: "draft not found" }, 404);
    if (draft.donor_id !== donorId) return json({ error: "not authorised" }, 403);
    if (!draft.confirmed_at) return json({ error: "draft not confirmed" }, 400);

    const { error: prepareError } = await supabase.rpc("gocardless_prepare_arrangement", { _draft_id: draftId });
    if (prepareError) return json({ error: prepareError.message }, 400);

    const host = environment === "live" ? "https://api.gocardless.com" : "https://api-sandbox.gocardless.com";
    const requestOrigin = req.headers.get("origin");
    const allowedOrigin = requestOrigin === "https://globalhealthaccesstrust.com" || requestOrigin === "https://www.globalhealthaccesstrust.com"
      ? requestOrigin
      : "https://globalhealthaccesstrust.com";

    const recurring = draft.frequency !== "one_time";
    const billingRequestBody: any = {
      billing_requests: {
        mandate_request: { scheme: "bacs", currency: draft.currency },
      },
    };

    if (!recurring) {
      billingRequestBody.billing_requests.payment_request = {
        description: `GHAT donation (draft ${draftId.slice(0, 8)})`,
        amount: draft.amount_minor,
        currency: draft.currency,
      };
    }

    const billingRequestResponse = await fetch(`${host}/billing_requests`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "GoCardless-Version": "2015-07-06",
        "Content-Type": "application/json",
        "Idempotency-Key": `draft-${draftId}`,
      },
      body: JSON.stringify(billingRequestBody),
    });

    if (!billingRequestResponse.ok) {
      const detail = await billingRequestResponse.text();
      return json({ available: true, error: "gocardless_error", detail }, 502);
    }

    const billingRequest = await billingRequestResponse.json();
    const billingRequestId = billingRequest.billing_requests.id;

    const flowResponse = await fetch(`${host}/billing_request_flows`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "GoCardless-Version": "2015-07-06",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        billing_request_flows: {
          redirect_uri: `${allowedOrigin}/donation-success?draft=${draftId}`,
          exit_uri: `${allowedOrigin}/donation-cancelled?draft=${draftId}`,
          links: { billing_request: billingRequestId },
        },
      }),
    });

    if (!flowResponse.ok) {
      const detail = await flowResponse.text();
      return json({ available: true, error: "gocardless_flow_error", detail }, 502);
    }

    const flow = await flowResponse.json();
    return json({ available: true, url: flow.billing_request_flows.authorisation_url });
  } catch (error: any) {
    return json({ error: error?.message ?? "internal_error" }, 500);
  }
});

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
