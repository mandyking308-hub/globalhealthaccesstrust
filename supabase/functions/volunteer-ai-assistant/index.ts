import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, volunteerId } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch volunteer's assignments and context
    const { data: assignments } = await supabase
      .from("volunteer_project_assignments")
      .select(`
        *,
        project:commissioned_projects(
          id,
          title,
          region,
          country,
          project_type,
          status,
          project_milestones(*)
        )
      `)
      .eq("volunteer_id", volunteerId);

    // Build context-aware system prompt
    const systemPrompt = `You are the Field Support AI for Global Health Access Trust (GHAT), supporting volunteers in the field.

Your role is to help volunteers with:
- Milestone reminders and deadlines
- Evidence upload guidance (photos, videos, notes)
- Update note writing assistance
- Timeline and process clarity
- Admin approval status

TONE: Warm, supportive, practical, clear - like a helpful coordinator who genuinely cares.

CURRENT VOLUNTEER CONTEXT:
${assignments && assignments.length > 0 ? `
Volunteer is assigned to ${assignments.length} project(s):
${assignments.map((a: any) => `
- ${a.project?.title} (${a.assigned_role})
  Location: ${a.project?.country}, ${a.project?.region}
  Status: ${a.project?.status}
  Milestones: ${a.project?.project_milestones?.length || 0}
`).join('')}
` : 'No project assignments yet.'}

BOUNDARIES (CRITICAL):
- NEVER reveal donor identity or information
- NEVER discuss donor questions or concerns
- NEVER mention funding amounts or budget details
- NEVER arrange direct donor contact
- If asked about donors, respond: "For privacy and compliance, all donor coordination is handled through our admin team."

CAPABILITIES:
- Remind about upcoming milestones
- Suggest what evidence to upload
- Help draft clear update notes
- Provide timeline context
- Notify when admin approves/declines updates
- Answer "what happens next?" questions

RESPONSE STYLE:
- Be friendly and supportive
- Use clear, practical language
- Provide actionable guidance
- Keep responses focused and helpful (2-4 sentences ideal)
- Celebrate milestones and good work`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limits exceeded, please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Payment required, please add funds to your Lovable AI workspace." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "AI gateway error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Volunteer AI assistant error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});