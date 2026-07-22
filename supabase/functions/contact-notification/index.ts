// deno-lint-ignore-file no-import-prefix
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import nodemailer from "npm:nodemailer@6.9.8";

const allowedOrigins = new Set([
  "https://globalhealthaccesstrust.com",
  "https://www.globalhealthaccesstrust.com",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
]);

const enquiryOptions = new Set([
  "General Enquiry",
  "Partnership Opportunity",
  "Funding Engagement",
  "Legal / Legacy Matters",
  "Media / Press",
  "Other",
]);

const tagMap: Record<string, string[]> = {
  "Funding Engagement": ["funding", "donor", "capital"],
  "Partnership Opportunity": ["partnership", "collaboration"],
  "Legal / Legacy Matters": ["legal", "governance"],
  "Media / Press": ["media", "communications"],
  "General Enquiry": ["general"],
  Other: ["general"],
};

const jsonHeaders = (origin: string | null) => ({
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": origin && allowedOrigins.has(origin) ? origin : "https://globalhealthaccesstrust.com",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  Vary: "Origin",
});

const response = (status: number, body: Record<string, unknown>, origin: string | null) =>
  new Response(JSON.stringify(body), { status, headers: jsonHeaders(origin) });

const clean = (value: unknown, max: number) =>
  typeof value === "string" ? value.trim().replaceAll("\u0000", "").slice(0, max) : "";

const validEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 320;

const priorityFor = (enquiryType: string) => {
  if (["Funding Engagement", "Legal / Legacy Matters"].includes(enquiryType)) return "High";
  if (["Partnership Opportunity", "Media / Press"].includes(enquiryType)) return "Medium";
  return "Low";
};

const subjectFor = (priority: string) => {
  if (priority === "High") return "New Priority Enquiry — GHAT";
  if (priority === "Medium") return "New Enquiry — GHAT";
  return "New Submission — GHAT";
};

const formatTimestamp = (iso: string) => {
  try {
    return new Date(iso).toLocaleString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Europe/London",
    });
  } catch {
    return iso;
  }
};

const hashValue = async (value: string, secret: string) => {
  const encoded = new TextEncoder().encode(`${secret}:${value}`);
  const digest = await crypto.subtle.digest("SHA-256", encoded);
  return Array.from(new Uint8Array(digest)).map((byte) => byte.toString(16).padStart(2, "0")).join("");
};

serve(async (req) => {
  const origin = req.headers.get("origin");

  if (req.method === "OPTIONS") {
    if (origin && !allowedOrigins.has(origin)) return response(403, { success: false }, origin);
    return new Response(null, { status: 204, headers: jsonHeaders(origin) });
  }

  if (req.method !== "POST") return response(405, { success: false }, origin);
  if (origin && !allowedOrigins.has(origin)) return response(403, { success: false }, origin);

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const smtpPassword = Deno.env.get("SMTP_PASSWORD");

  if (!supabaseUrl || !serviceRoleKey || !smtpPassword) {
    console.error("Contact intake configuration is incomplete");
    return response(503, { success: false, message: "The contact service is temporarily unavailable." }, origin);
  }

  const admin = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  try {
    const forwarded = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
    const clientIp = req.headers.get("cf-connecting-ip") || req.headers.get("x-real-ip") || forwarded || "unknown";
    const ipHash = await hashValue(clientIp, Deno.env.get("CONTACT_RATE_LIMIT_SALT") || serviceRoleKey);
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();

    const { count, error: countError } = await admin
      .from("contact_submission_attempts")
      .select("id", { count: "exact", head: true })
      .eq("ip_hash", ipHash)
      .gte("created_at", oneHourAgo);

    if (countError) throw countError;
    if ((count || 0) >= 5) {
      return response(429, { success: false, message: "Too many submissions. Please try again later." }, origin);
    }

    await admin.from("contact_submission_attempts").insert({ ip_hash: ipHash });

    const raw = await req.json();
    if (clean(raw.honeypot, 200)) {
      return response(202, { success: true }, origin);
    }

    const name = clean(raw.name, 200);
    const email = clean(raw.email, 320).toLowerCase();
    const phone = clean(raw.phone, 40);
    const organisation = clean(raw.organisation, 200);
    const position = clean(raw.position, 150);
    const natureOfEnquiry = clean(raw.nature_of_enquiry, 80);
    const message = clean(raw.message, 5000);
    const additionalContext = clean(raw.additional_context, 5000);
    const consent = raw.consent === true;

    if (!name || !validEmail(email) || !message || !consent || !enquiryOptions.has(natureOfEnquiry)) {
      return response(400, { success: false, message: "Please check the required fields and try again." }, origin);
    }

    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();
    const priority = priorityFor(natureOfEnquiry);
    const tags = tagMap[natureOfEnquiry] || ["general"];

    const record = {
      id,
      name,
      email,
      phone: phone || null,
      organisation: organisation || null,
      position: position || null,
      nature_of_enquiry: natureOfEnquiry,
      message,
      additional_context: additionalContext || null,
      gdpr_consent: true,
      status: "New",
      priority,
      attachment_url: null,
      internal_tags: tags,
      created_at: createdAt,
    };

    const { error: insertError } = await admin.from("inbound_contacts").insert(record);
    if (insertError) throw insertError;

    const divider = "————————————————————————————";
    const body = `GLOBAL HEALTH ACCESS TRUST — INTAKE NOTIFICATION
${divider}

Classification: ${natureOfEnquiry} / ${priority}

CORE DETAILS
${divider}
Name:               ${name}
Email:              ${email}
Phone:              ${phone || "Not provided"}
Organisation:       ${organisation || "Not provided"}
Position:           ${position || "Not provided"}
Nature of Enquiry:  ${natureOfEnquiry}

MESSAGE
${divider}
${message}

ADDITIONAL CONTEXT
${divider}
${additionalContext || "Not provided"}

INTERNAL CLASSIFICATION
${divider}
Priority:           ${priority}
Internal Tags:      ${tags.join(", ")}

METADATA
${divider}
Submitted:          ${formatTimestamp(createdAt)}
Source:             globalhealthaccesstrust.com secure contact form
Record ID:          ${id}

${divider}
This is an internal notification. Do not forward.`;

    try {
      const transporter = nodemailer.createTransport({
        host: "smtp.ionos.co.uk",
        port: 587,
        secure: false,
        auth: {
          user: "contact@globalhealthaccesstrust.com",
          pass: smtpPassword,
        },
        tls: { rejectUnauthorized: true },
      });

      await transporter.sendMail({
        from: '"GHAT Intake System" <contact@globalhealthaccesstrust.com>',
        to: "contact@globalhealthaccesstrust.com",
        subject: subjectFor(priority),
        text: body,
      });
    } catch (mailError) {
      console.error("Contact record saved but SMTP notification failed", mailError);
    }

    return response(202, { success: true, reference: id }, origin);
  } catch (error) {
    console.error("Secure contact intake failed", error);
    return response(500, { success: false, message: "The enquiry could not be submitted. Please try again later." }, origin);
  }
});
