import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import "@/styles/cookie-banner.css";

const PREFERENCE_VERSION = "cookie-notice-1.0";
const STORAGE_KEY = "ghat-cookie-consent";
const TIMESTAMP_KEY = "ghat-consent-timestamp";
const VERSION_KEY = "ghat-consent-version";
export const OPEN_COOKIE_SETTINGS_EVENT = "ghat:open-cookie-settings";

export interface CookiePreferences {
  necessary: true;
  functional: boolean;
  analytics: boolean;
  other: boolean;
}

const DEFAULT_PREFS: CookiePreferences = {
  necessary: true,
  functional: false,
  analytics: false,
  other: false,
};

export const getStoredPrefs = (): CookiePreferences | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const ver = localStorage.getItem(VERSION_KEY);
    if (!raw || ver !== PREFERENCE_VERSION) return null;
    const p = JSON.parse(raw);
    return { necessary: true, functional: !!p.functional, analytics: !!p.analytics, other: !!p.other };
  } catch {
    return null;
  }
};

const applyGtagConsent = (p: CookiePreferences) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("consent", "update", {
      analytics_storage: p.analytics ? "granted" : "denied",
      ad_storage: p.other ? "granted" : "denied",
      ad_user_data: p.other ? "granted" : "denied",
      ad_personalization: p.other ? "granted" : "denied",
      functionality_storage: p.functional ? "granted" : "denied",
      security_storage: "granted",
    });
  }
};

const recordConsent = async (p: CookiePreferences, action: "accept_all" | "reject_non_essential" | "custom" | "withdraw") => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    await supabase.from("cookie_consent_events").insert({
      user_id: user?.id ?? null,
      necessary: true,
      functional: p.functional,
      analytics: p.analytics,
      other: p.other,
      action,
      preference_version: PREFERENCE_VERSION,
      user_agent: navigator.userAgent.slice(0, 500),
    });
  } catch {
    // Non-blocking: local state is authoritative for the browser
  }
};

export const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showManage, setShowManage] = useState(false);
  const [prefs, setPrefs] = useState<CookiePreferences>(DEFAULT_PREFS);

  const persist = useCallback((p: CookiePreferences, action: Parameters<typeof recordConsent>[1]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
    localStorage.setItem(TIMESTAMP_KEY, new Date().toISOString());
    localStorage.setItem(VERSION_KEY, PREFERENCE_VERSION);
    applyGtagConsent(p);
    setPrefs(p);
    setShowBanner(false);
    setShowManage(false);
    void recordConsent(p, action);
    window.dispatchEvent(new CustomEvent("ghat:consent-updated", { detail: p }));
  }, []);

  useEffect(() => {
    const stored = getStoredPrefs();
    if (!stored) {
      applyGtagConsent(DEFAULT_PREFS);
      setShowBanner(true);
    } else {
      setPrefs(stored);
      applyGtagConsent(stored);
    }

    const openHandler = () => {
      const current = getStoredPrefs() ?? DEFAULT_PREFS;
      setPrefs(current);
      setShowManage(true);
    };
    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, openHandler);
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, openHandler);
  }, []);

  const acceptAll = () => persist({ necessary: true, functional: true, analytics: true, other: true }, "accept_all");
  const rejectNonEssential = () => persist({ ...DEFAULT_PREFS }, "reject_non_essential");
  const saveCustom = () => persist(prefs, "custom");

  return (
    <>
      {showBanner && (
        <div
          role="dialog"
          aria-label="Cookie choices"
          aria-live="polite"
          className="ghat-cookie-banner fixed inset-x-0 bottom-0 z-50"
        >
          <div className="ghat-cookie-banner__inner">
            <div className="ghat-cookie-banner__copy">
              <p className="ghat-cookie-banner__title">Your cookie choices</p>
              <p className="ghat-cookie-banner__text">
                Necessary storage keeps the site working. With consent, we also use functional, analytics and other optional technologies. You can accept all, reject non-essential, or manage each category. Read the{" "}
                <Link to="/cookie-policy" className="underline underline-offset-2">Cookie Notice</Link>.
              </p>
            </div>
            <div className="ghat-cookie-banner__actions">
              <Button variant="outline" onClick={rejectNonEssential}>Reject non-essential</Button>
              <Button variant="outline" onClick={() => setShowManage(true)}>Manage choices</Button>
              <Button onClick={acceptAll}>Accept all</Button>
            </div>
          </div>
        </div>
      )}

      <Dialog open={showManage} onOpenChange={setShowManage}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Manage cookie choices</DialogTitle>
            <DialogDescription>
              Strictly necessary items always run because they keep the site secure and functional. All other categories are off unless you turn them on.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-5">
            <Row label="Necessary" description="Session, security and cookie-preference storage. Always active." checked disabled />
            <Row
              label="Functional"
              description="Remembers non-essential choices such as UI preferences."
              checked={prefs.functional}
              onChange={(v) => setPrefs((p) => ({ ...p, functional: v }))}
            />
            <Row
              label="Analytics"
              description="Anonymous, aggregated measurement of how the site is used."
              checked={prefs.analytics}
              onChange={(v) => setPrefs((p) => ({ ...p, analytics: v }))}
            />
            <Row
              label="Other optional technologies"
              description="Embedded content or optional integrations that store data on your device."
              checked={prefs.other}
              onChange={(v) => setPrefs((p) => ({ ...p, other: v }))}
            />
          </div>
          <div className="flex flex-wrap gap-2 justify-end pt-4 border-t">
            <Button variant="outline" onClick={rejectNonEssential}>Reject non-essential</Button>
            <Button variant="outline" onClick={acceptAll}>Accept all</Button>
            <Button onClick={saveCustom}>Save choices</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

const Row = ({
  label,
  description,
  checked,
  onChange,
  disabled,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange?: (v: boolean) => void;
  disabled?: boolean;
}) => (
  <div className="flex items-start justify-between gap-4">
    <div className="flex-1">
      <div className="font-medium">{label}</div>
      <p className="text-sm text-muted-foreground mt-1">{description}</p>
    </div>
    <Switch checked={checked} onCheckedChange={onChange} disabled={disabled} />
  </div>
);

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}
