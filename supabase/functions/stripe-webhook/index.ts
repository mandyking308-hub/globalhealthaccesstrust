import { createClient } from "npm:@supabase/supabase-js@2";
import Stripe from "npm:stripe@14";

// Public webhook — no JWT verification
Deno.serve(async (req) => {
  const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
  const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
  if (!stripeKey || !webhookSecret) {
    return new Response("Stripe not configured", { status: 503 });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const svc = createClient(supabaseUrl, serviceKey);

  const stripe = new Stripe(stripeKey, { apiVersion: "2024-06-20" });
  const sig = req.headers.get("stripe-signature") ?? "";
  const raw = await req.text();

  let event: Stripe.Event;
  try {
    event = await stripe.webhooks.constructEventAsync(raw, sig, webhookSecret);
  } catch (err) {
    console.error("stripe signature verify failed", err);
    return new Response("Bad signature", { status: 400 });
  }

  await svc.from("payment_webhook_events").insert({
    provider: "stripe",
    provider_event_id: event.id,
    event_type: event.type,
    payload: event as unknown as Record<string, unknown>,
  });

  try {
    if (event.type === "checkout.session.completed" || event.type === "checkout.session.async_payment_succeeded") {
      const session = event.data.object as Stripe.Checkout.Session;
      const draftId = session.metadata?.draft_id;
      if (draftId) {
        await svc.rpc("donation_finalize_from_provider", {
          _draft_id: draftId,
          _provider: "stripe",
          _provider_reference: session.id,
          _amount_minor_paid: session.amount_total ?? 0,
        });
        await svc.from("payment_attempts")
          .update({ status: "succeeded", completed_at: new Date().toISOString() })
          .eq("provider_session_id", session.id);
      }
    }
    if (event.type === "checkout.session.expired" || event.type === "checkout.session.async_payment_failed") {
      const session = event.data.object as Stripe.Checkout.Session;
      await svc.from("payment_attempts")
        .update({ status: "failed", completed_at: new Date().toISOString() })
        .eq("provider_session_id", session.id);
    }
  } catch (err) {
    console.error("stripe-webhook handler error", err);
    return new Response("handler error", { status: 500 });
  }

  return new Response(JSON.stringify({ received: true }), {
    headers: { "Content-Type": "application/json" },
  });
});
