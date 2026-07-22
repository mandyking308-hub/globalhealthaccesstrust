import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import Stripe from "npm:stripe@14";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  try {
    const authHeader = req.headers.get("Authorization") ?? "";
    if (!authHeader.startsWith("Bearer ")) return json({ error: "Not authenticated" }, 401);

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");

    // Validate user
    const userClient = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: userData, error: userErr } = await userClient.auth.getUser();
    if (userErr || !userData.user) return json({ error: "Not authenticated" }, 401);
    const userId = userData.user.id;

    const body = await req.json().catch(() => ({}));
    const draftId = body?.draft_id;
    if (!draftId || typeof draftId !== "string") return json({ error: "draft_id required" }, 400);

    const svc = createClient(supabaseUrl, serviceKey);
    const { data: draft, error: draftErr } = await svc
      .from("donation_drafts")
      .select("*")
      .eq("id", draftId)
      .maybeSingle();
    if (draftErr || !draft) return json({ error: "Draft not found" }, 404);
    if (draft.donor_id !== userId) return json({ error: "Not authorised" }, 403);

    if (!stripeKey) {
      return json({
        url: null,
        message:
          "Secure card payment is currently unavailable. Please use bank transfer, or contact the Trust.",
      });
    }

    const stripe = new Stripe(stripeKey, { apiVersion: "2024-06-20" });
    const origin = req.headers.get("origin") ?? "https://globalhealthaccesstrust.com";

    const session = await stripe.checkout.sessions.create({
      mode: draft.frequency === "one_time" ? "payment" : "subscription",
      line_items: [{
        price_data: {
          currency: (draft.currency || "gbp").toLowerCase(),
          product_data: { name: `GHAT — ${String(draft.purpose).replace(/_/g, " ")}` },
          unit_amount: Number(draft.amount_minor),
          ...(draft.frequency !== "one_time" ? {
            recurring: { interval: draft.frequency === "monthly" ? "month" : draft.frequency === "quarterly" ? "month" : "year",
                         interval_count: draft.frequency === "quarterly" ? 3 : 1 },
          } : {}),
        },
        quantity: 1,
      }],
      customer_email: userData.user.email ?? undefined,
      success_url: `${origin}/donation-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/donation-cancelled?draft_id=${draftId}`,
      metadata: { draft_id: draftId, donor_id: userId },
    });

    await svc.from("payment_attempts").insert({
      donation_draft_id: draftId,
      donor_id: userId,
      provider: "stripe",
      provider_session_id: session.id,
      amount_minor: draft.amount_minor,
      currency: draft.currency,
      status: "created",
    });

    return json({ url: session.url });
  } catch (err) {
    console.error("create-donation-checkout error", err);
    return json({ error: "server_error", message: String(err) }, 500);
  }
});
