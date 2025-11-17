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
    const { messages, donorId } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch donor's projects and context
    const { data: projects } = await supabase
      .from("commissioned_projects")
      .select(`
        *,
        project_milestones(*),
        project_updates(*)
      `)
      .eq("donor_id", donorId);

    // Build context-aware system prompt
    const systemPrompt = `You are the Impact Assistant for Global Health Access Trust (GHAT), a luxury humanitarian organization. 

Your role is to support donors with:
- Clarity and reassurance about their commissioned projects
- Status updates and milestone explanations
- Timeline context and delay explanations
- Process guidance

TONE: Elegant, warm, reassuring - like a private banking concierge for philanthropy.

CURRENT DONOR CONTEXT:
${projects ? `
Donor has ${projects.length} commissioned project(s):
${projects.map(p => `
- ${p.title} (Status: ${p.status})
  Region: ${p.country}, ${p.region}
  Budget: ${p.budget_range}
  Milestones: ${p.project_milestones?.length || 0}
  Updates: ${p.project_updates?.length || 0}
`).join('')}
` : 'No projects yet.'}

BOUNDARIES (CRITICAL):
- NEVER reveal volunteer identities or personal information
- NEVER show raw volunteer messages
- NEVER make promises admin hasn't confirmed
- NEVER discuss specific volunteers
- If asked about volunteers, respond: "For privacy and compliance, all field coordination is managed through our admin team."

CAPABILITIES:
- Summarize project status
- Explain delays calmly and professionally
- Provide milestone clarity
- Notify about approved updates
- Answer process questions

RESPONSE STYLE:
- Use elegant, professional language
- Be warm but not overly casual
- Provide specific details when available
- If information requires admin review, say: "Let me check this with your project coordinator and I'll update you shortly."
- Keep responses concise but complete (2-4 sentences ideal)`;

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
    console.error("Donor AI assistant error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});