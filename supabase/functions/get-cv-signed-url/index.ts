import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const json = (b: unknown, s = 200) =>
    new Response(JSON.stringify(b), { status: s, headers: { ...corsHeaders, "Content-Type": "application/json" } });

  try {
    const authHeader = req.headers.get("Authorization") ?? "";
    if (!authHeader.startsWith("Bearer ")) return json({ error: "Not authenticated" }, 401);

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const userClient = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: userData, error: userErr } = await userClient.auth.getUser();
    if (userErr || !userData.user) return json({ error: "Not authenticated" }, 401);

    // Admin check via has_role
    const { data: isAdminRow } = await userClient.rpc("is_admin", { _user_id: userData.user.id });
    if (!isAdminRow) return json({ error: "Admin only" }, 403);

    const { application_id } = await req.json().catch(() => ({} as any));
    if (!application_id) return json({ error: "application_id required" }, 400);

    const svc = createClient(supabaseUrl, serviceKey);
    const { data: app } = await svc
      .from("volunteer_applications")
      .select("cv_object_path,cv_original_filename")
      .eq("id", application_id)
      .maybeSingle();
    if (!app?.cv_object_path) return json({ error: "No CV attached" }, 404);

    const { data: signed, error: signErr } = await svc.storage
      .from("project-team-applications")
      .createSignedUrl(app.cv_object_path, 300, { download: app.cv_original_filename ?? undefined });
    if (signErr) throw signErr;

    // Audit access
    await userClient.rpc("log_volunteer_cv_access", { _application_id: application_id });

    return json({ url: signed.signedUrl, expires_in: 300 });
  } catch (err) {
    console.error("get-cv-signed-url error", err);
    return json({ error: "server_error", message: String(err) }, 500);
  }
});
