import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
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
  const [preferences, setPreferences] = useState<Record<string, boolean>>({});
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    void (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/auth?returnTo=/preferences");
        return;
      }

      setUserId(user.id);
      const [{ data: channelData, error: channelError }, { data: preferenceData, error: preferenceError }] = await Promise.all([
        supabase.from("communication_channels").select("*").eq("active", true).order("is_service_message", { ascending: false }),
        supabase.from("communication_preferences").select("channel_code, opted_in").eq("user_id", user.id),
      ]);

      if (channelError || preferenceError) {
        setLoadError(true);
        setLoading(false);
        return;
      }

      setChannels((channelData as Channel[]) ?? []);
      const map: Record<string, boolean> = {};
      ((preferenceData as Preference[]) ?? []).forEach((preference) => {
        map[preference.channel_code] = preference.opted_in;
      });
      setPreferences(map);
      setLoading(false);
    })();
  }, [navigate]);

  const toggle = (code: string, value: boolean) => {
    setPreferences((current) => ({ ...current, [code]: value }));
  };

  const save = async () => {
    if (!userId) return;
    setSaving(true);

    const rows = channels
      .filter((channel) => channel.is_optional_marketing)
      .map((channel) => ({
        user_id: userId,
        channel_code: channel.code,
        opted_in: !!preferences[channel.code],
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

  const pageHead = (
    <Helmet>
      <title>Communication Preferences | Global Health Access Trust</title>
      <meta name="robots" content="noindex, nofollow" />
    </Helmet>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        {pageHead}
        <Header />
        <main className="flex-grow max-w-2xl mx-auto px-6 py-20 w-full">Loading…</main>
        <Footer />
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="min-h-screen flex flex-col">
        {pageHead}
        <Header />
        <main className="flex-grow max-w-2xl mx-auto px-6 py-20 w-full">
          <h1 className="text-4xl font-serif mb-6">Communication Preferences</h1>
          <p className="text-muted-foreground mb-6">Your preferences could not be loaded. Please try again from the Donor Portal.</p>
          <Button asChild><Link to="/donor-dashboard">Return to Donor Portal</Link></Button>
        </main>
        <Footer />
      </div>
    );
  }

  const serviceChannels = channels.filter((channel) => channel.is_service_message || channel.is_project_update);
  const marketingChannels = channels.filter((channel) => channel.is_optional_marketing);

  return (
    <div className="min-h-screen flex flex-col">
      {pageHead}
      <Header />
      <main className="flex-grow max-w-2xl mx-auto px-6 py-16 w-full">
        <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground mb-2">Account</p>
        <h1 className="text-4xl font-serif mb-6">Communication Preferences</h1>
        <p className="text-muted-foreground mb-10">
          Choose how the Trust may contact you. Marketing choices are optional and will not affect your account, any donation, or a project team application. You can change these at any time.
        </p>

        <section className="space-y-6 mb-12">
          <h2 className="text-xl font-serif border-b pb-2">Service and project updates</h2>
          {serviceChannels.map((channel) => (
            <div key={channel.code} className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="font-medium">{channel.label}</div>
                {channel.description && <p className="text-sm text-muted-foreground mt-1">{channel.description}</p>}
              </div>
              <Switch checked disabled aria-label={`${channel.label} required`} />
            </div>
          ))}
          <p className="text-xs text-muted-foreground">
            These are needed to run your account or a project you have supported. They are not marketing.
          </p>
        </section>

        <section className="space-y-6 mb-10">
          <h2 className="text-xl font-serif border-b pb-2">Fundraising and optional contact</h2>
          {marketingChannels.map((channel) => (
            <div key={channel.code} className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="font-medium">{channel.label}</div>
                {channel.description && <p className="text-sm text-muted-foreground mt-1">{channel.description}</p>}
              </div>
              <Switch
                checked={!!preferences[channel.code]}
                onCheckedChange={(value) => toggle(channel.code, value)}
                aria-label={`${channel.label} preference`}
              />
            </div>
          ))}
        </section>

        <div className="flex items-center justify-between gap-4">
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
