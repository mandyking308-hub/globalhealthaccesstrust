import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { SmtpClient } from "https://deno.land/x/smtp@v0.7.0/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const TAG_MAP: Record<string, string[]> = {
  "Donation / Funding": ["funding", "donor", "capital"],
  "Partnership": ["partnership", "collaboration"],
  "Legal / Legacy": ["legal", "governance"],
  "Media": ["media", "communications"],
  "General": ["general"],
};

function getTags(enquiryType: string): string[] {
  return TAG_MAP[enquiryType] || ["general"];
}

function getSubject(priority: string): string {
  switch (priority) {
    case "High":
      return "New Priority Enquiry — GHAT";
    case "Medium":
      return "New Enquiry — GHAT";
    default:
      return "New Submission — GHAT";
  }
}

function formatTimestamp(isoStr: string): string {
  const d = new Date(isoStr);
  return d.toLocaleString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/London",
  });
}

function buildEmail(data: any): string {
  const tags = getTags(data.nature_of_enquiry);
  const divider = "————————————————————————————";

  return `GLOBAL HEALTH ACCESS TRUST — INTAKE NOTIFICATION
${divider}

Classification: ${data.nature_of_enquiry} / ${data.priority}

CORE DETAILS
${divider}
Name:               ${data.name}
Email:              ${data.email}
Phone:              ${data.phone || "Not provided"}
Organisation:       ${data.organisation || "Not provided"}
Position:           ${data.position || "Not provided"}
Nature of Enquiry:  ${data.nature_of_enquiry}

MESSAGE
${divider}
${data.message}

ADDITIONAL CONTEXT
${divider}
${data.additional_context || "Not provided"}

INTERNAL CLASSIFICATION
${divider}
Priority:           ${data.priority}
Internal Tags:      ${tags.join(", ")}

METADATA
${divider}
Submitted:          ${formatTimestamp(data.created_at)}
Source:              Global Health Access Trust
Record ID:          ${data.id}
${data.attachment_url ? `Attachment:          ${data.attachment_url}` : ""}

${divider}
This is an internal notification. Do not forward.
`;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data = await req.json();

    const smtpPassword = Deno.env.get("SMTP_PASSWORD");
    if (!smtpPassword) {
      throw new Error("SMTP_PASSWORD not configured");
    }

    const tags = getTags(data.nature_of_enquiry);
    const subject = getSubject(data.priority);
    const body = buildEmail(data);

    const client = new SmtpClient();

    await client.connectTLS({
      hostname: "smtp.ionos.co.uk",
      port: 587,
      username: "contact@globalhealthaccesstrust.com",
      password: smtpPassword,
    });

    await client.send({
      from: "contact@globalhealthaccesstrust.com",
      to: "contact@globalhealthaccesstrust.com",
      subject: subject,
      content: body,
    });

    await client.close();

    return new Response(
      JSON.stringify({
        success: true,
        tags,
        message: "Notification sent successfully",
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Contact notification error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200, // Return 200 so form submission isn't blocked
      }
    );
  }
});
