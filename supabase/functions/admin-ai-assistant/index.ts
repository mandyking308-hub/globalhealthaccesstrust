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
    const { messages } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch comprehensive admin context
    const [projectsData, volunteersData, updatesData] = await Promise.all([
      supabase
        .from("commissioned_projects")
        .select(`
          *,
          project_milestones(*),
          project_updates(*)
        `)
        .order("created_at", { ascending: false })
        .limit(10),
      
      supabase
        .from("volunteers")
        .select("id, name, status, skills")
        .eq("status", "approved")
        .limit(20),
      
      supabase
        .from("volunteer_updates")
        .select(`
          *,
          volunteer:volunteers(name),
          project:commissioned_projects(title)
        `)
        .order("created_at", { ascending: false })
        .limit(10)
    ]);

    // Build comprehensive system prompt
    const systemPrompt = `You are the Operations AI for Global Health Access Trust (GHAT) admin team.

Your role is to help admin staff:
- Coordinate donor and volunteer workflows
- Summarize volunteer uploads and updates
- Flag missing evidence or overdue milestones
- Suggest which updates are ready for donor visibility
- Draft responses for donors and volunteers
- Generate project summaries
- Prioritize admin tasks

TONE: Professional, concise, operational - like a highly capable executive assistant.

CURRENT SYSTEM OVERVIEW:
Active Projects: ${projectsData.data?.length || 0}
${projectsData.data ? `
Recent Projects:
${projectsData.data.slice(0, 5).map(p => `
- ${p.title} (${p.status})
  ${p.project_milestones?.length || 0} milestones, ${p.project_updates?.length || 0} updates
`).join('')}
` : ''}

Active Volunteers: ${volunteersData.data?.length || 0}

Recent Volunteer Updates: ${updatesData.data?.length || 0}
${updatesData.data ? `
${updatesData.data.slice(0, 3).map((u: any) => `
- ${u.volunteer?.name} uploaded ${u.update_type} for ${u.project?.title}
`).join('')}
` : ''}

CAPABILITIES:
- Summarize volunteer uploads for review
- Flag delays or missing evidence
- Suggest approval readiness for updates
- Draft donor/volunteer messages
- Generate project status reports
- Prioritize urgent tasks
- Identify bottlenecks

BOUNDARIES (CRITICAL):
- NEVER auto-approve updates without admin confirmation
- NEVER auto-send messages
- NEVER change project status automatically
- NEVER approve/decline volunteers without admin
- Always suggest actions, never execute them

RESPONSE FORMAT:
- Be concise and actionable
- Use bullet points for clarity
- Highlight urgent items first
- Provide draft messages when appropriate
- Include relevant context and data`;

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
    console.error("Admin AI assistant error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});