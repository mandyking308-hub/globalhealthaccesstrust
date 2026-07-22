import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

Deno.serve(async (req) => {
  try {
    const { base_email } = await req.json();
    if (!base_email || !base_email.includes("@")) {
      return new Response(JSON.stringify({ error: "base_email required" }), { status: 400 });
    }
    const [local, domain] = base_email.split("@");
    const admin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    const password = "GhatTest!2026";
    const accounts = [
      { role: "donor", suffix: "donor", first: "Test", last: "Donor" },
      { role: "volunteer", suffix: "volunteer", first: "Test", last: "Volunteer" },
      { role: "admin", suffix: "admin", first: "Test", last: "Admin" },
    ];

    const results: any[] = [];

    for (const a of accounts) {
      const email = `${local}+${a.suffix}@${domain}`;
      // Try create
      const { data: created, error: createErr } = await admin.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: { first_name: a.first, last_name: a.last, gdpr_consent: true },
      });

      let userId: string | undefined = created?.user?.id;

      if (createErr && !userId) {
        // Already exists — look them up
        const { data: list } = await admin.auth.admin.listUsers({ page: 1, perPage: 200 });
        const existing = list?.users?.find((u) => u.email === email);
        userId = existing?.id;
        if (userId) {
          await admin.auth.admin.updateUserById(userId, { password, email_confirm: true });
        }
      }

      if (!userId) {
        results.push({ email, error: createErr?.message ?? "unknown" });
        continue;
      }

      // Set role explicitly for volunteer/admin (donor auto-created by trigger)
      if (a.role !== "donor") {
        // Remove default donor role
        await admin.from("user_roles").delete().eq("user_id", userId);
        await admin.from("user_roles").insert({ user_id: userId, role: a.role });
      }

      // For volunteer, create an approved volunteer record so dashboard works
      if (a.role === "volunteer") {
        const { data: existingVol } = await admin
          .from("volunteers")
          .select("id")
          .eq("user_id", userId)
          .maybeSingle();
        if (!existingVol) {
          await admin.from("volunteers").insert({
            user_id: userId,
            name: "Test Volunteer",
            email,
            phone: "N/A",
            status: "approved",
          });
        } else {
          await admin.from("volunteers").update({ status: "approved" }).eq("user_id", userId);
        }
      }

      results.push({ email, password, role: a.role, user_id: userId });
    }

    return new Response(JSON.stringify({ ok: true, accounts: results }, null, 2), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), { status: 500 });
  }
});
