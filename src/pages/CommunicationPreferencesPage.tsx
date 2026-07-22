import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";


interface Channel {
  code: string;
  label: string;
  description: string | null;
  is_service_message: boolean;
  is_project_update: boolean;
  is_optional_marketing: boolean;
  medium: string;
  active: boolean;
}

interface Preference {
  channel_code: string;
  opted_in: boolean;
}

const CommunicationPreferencesPage = () => {
  const navigate = useNavigate();
  const [channels, setChannels] = useState<Channel[]>([]);
  const [prefs, setPrefs] = useState<Record<string, boolean>>({});
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    void (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/auth?returnTo=/preferences");
        return;
      }
      setUserId(user.id);
      const [{ data: ch }, { data: pr }] = await Promise.all([
        supabase.from("communication_channels").select("*").eq("active", true).order("is_service_message", { ascending: false }),
        supabase.from("communication_preferences").select("channel_code, opted_in").eq("user_id", user.id),
      ]);
      setChannels((ch as Channel[]) ?? []);
      const map: Record<string, boolean> = {};
      ((pr as Preference[]) ?? []).forEach((p) => (map[p.channel_code] = p.opted_in));
      setPrefs(map);
      setLoading(false);
    })();
  }, [navigate]);

  const toggle = (code: string, value: boolean) => setPrefs((p) => ({ ...p, [code]: value }));

  const save = async () => {
    if (!userId) return;
    setSaving(true);
    const rows = channels
      .filter((c) => c.is_optional_marketing) // service/project-update are governed separately
      .map((c) => ({
        user_id: userId,
        channel_code: c.code,
        opted_in: !!prefs[c.code],
        lawful_basis: "consent",
        source: "self-service preferences",
        set_by: "user" as const,
      }));
    const { error } = await supabase
      .from("communication_preferences")
      .upsert(rows, { onConflict: "user_id,channel_code" });
    setSaving(false);
    if (error) {
      toast.error("Could not save preferences");
      return;
    }
    toast.success("Preferences saved");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow max-w-2xl mx-auto px-6 py-20">Loading…</main>
        <Footer />
      </div>
    );
  }

  const service = channels.filter((c) => c.is_service_message || c.is_project_update);
  const marketing = channels.filter((c) => c.is_optional_marketing);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow max-w-2xl mx-auto px-6 py-16 w-full">
        <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground mb-2">Account</p>
        <h1 className="text-4xl font-serif mb-6">Communication Preferences</h1>
        <p className="text-muted-foreground mb-10">
          Choose how the Trust may contact you. Marketing choices are optional and will not affect your account, any
          donation, or a project team application. You can change these at any time.
        </p>

        <section className="space-y-6 mb-12">
          <h2 className="text-xl font-serif border-b pb-2">Service and project updates</h2>
          {service.map((c) => (
            <div key={c.code} className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="font-medium">{c.label}</div>
                {c.description && <p className="text-sm text-muted-foreground mt-1">{c.description}</p>}
              </div>
              <Switch checked disabled />
            </div>
          ))}
          <p className="text-xs text-muted-foreground">
            These are needed to run your account or a project you have supported. They are not marketing.
          </p>
        </section>

        <section className="space-y-6 mb-10">
          <h2 className="text-xl font-serif border-b pb-2">Fundraising and optional contact</h2>
          {marketing.map((c) => (
            <div key={c.code} className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="font-medium">{c.label}</div>
                {c.description && <p className="text-sm text-muted-foreground mt-1">{c.description}</p>}
              </div>
              <Switch checked={!!prefs[c.code]} onCheckedChange={(v) => toggle(c.code, v)} />
            </div>
          ))}
        </section>

        <div className="flex items-center justify-between">
          <Link to="/donor-dashboard" className="text-sm underline">Return to Donor Portal</Link>
          <Button onClick={save} disabled={saving} className="h-11 min-w-[180px]">
            {saving ? "Saving…" : "Save preferences"}
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CommunicationPreferencesPage;
