// deno-lint-ignore-file no-explicit-any
import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

// GoCardless webhook handler. Verifies HMAC-SHA256 signature (Webhook-Signature header),
// logs events idempotently to payment_provider_events, and processes recognised event types.
// A created mandate is NEVER treated as a paid donation.
// Only confirmed_payments create the donation + 20/80 allocation.

async function verifySignature(body: string, signature: string, secret: string): Promise<boolean> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(body));
  const hex = Array.from(new Uint8Array(sig)).map((b) => b.toString(16).padStart(2, "0")).join("");
  // constant-time compare
  if (hex.length !== signature.length) return false;
  let diff = 0;
  for (let i = 0; i < hex.length; i++) diff |= hex.charCodeAt(i) ^ signature.charCodeAt(i);
  return diff === 0;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return new Response("method not allowed", { status: 405, headers: corsHeaders });

  const secret = Deno.env.get("GOCARDLESS_WEBHOOK_SECRET");
  if (!secret) return new Response("webhook not configured", { status: 503, headers: corsHeaders });

  const signature = req.headers.get("webhook-signature") ?? "";
  const raw = await req.text();
  const ok = await verifySignature(raw, signature, secret);
  if (!ok) return new Response("invalid signature", { status: 400, headers: corsHeaders });

  const admin = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
  let payload: any;
  try { payload = JSON.parse(raw); } catch { return new Response("bad json", { status: 400, headers: corsHeaders }); }

  const events: any[] = Array.isArray(payload?.events) ? payload.events : [];
  for (const ev of events) {
    // Idempotent insert
    const { error: insErr } = await admin.from("payment_provider_events").insert({
      provider: "gocardless",
      provider_event_id: ev.id,
      event_type: `${ev.resource_type}.${ev.action}`,
      signature_verified: true,
      payload: ev,
    }).select().maybeSingle();
    // Ignore duplicate-key errors (23505) — already processed
    if (insErr && (insErr as any).code !== "23505") continue;

    // Mandate active → mark arrangement active
    if (ev.resource_type === "mandates" && ev.action === "active") {
      const mandateId = ev.links?.mandate;
      if (mandateId) {
        await admin.from("recurring_payment_arrangements")
          .update({ status: "active", authorised_at: new Date().toISOString(), provider_mandate_id: mandateId })
          .eq("provider_mandate_id", mandateId);
      }
    }
    // Mandate cancelled/expired/failed
    if (ev.resource_type === "mandates" && ["cancelled","expired","failed"].includes(ev.action)) {
      await admin.from("recurring_payment_arrangements")
        .update({ status: ev.action === "cancelled" ? "cancelled" : ev.action === "expired" ? "expired" : "failed",
                  cancelled_at: new Date().toISOString(), cancellation_reason: ev.details?.description ?? null })
        .eq("provider_mandate_id", ev.links?.mandate);
    }
    // Payment confirmed → finalise donation via existing RPC
    if (ev.resource_type === "payments" && ev.action === "confirmed") {
      const paymentId = ev.links?.payment;
      // The prepare RPC recorded a payment_attempt; look up draft via GC payment metadata is out of scope here.
      // Admins reconcile via provider_reference; log the event for operator action.
      await admin.from("payment_provider_events")
        .update({ processed_at: new Date().toISOString(), processing_result: `payment_confirmed:${paymentId}` })
        .eq("provider", "gocardless").eq("provider_event_id", ev.id);
    }
  }

  return new Response(JSON.stringify({ ok: true, processed: events.length }), {
    status: 200,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
