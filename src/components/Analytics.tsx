import { useEffect } from "react";
import { getStoredPrefs } from "@/components/CookieBanner";

/**
 * Analytics loader.
 * Nothing that stores or reads data on the user's device runs before consent.
 * `getStoredPrefs()` returns null until the visitor makes a choice, so the analytics
 * branch stays inert until then. Re-evaluated on every consent update.
 */
export const Analytics = () => {
  useEffect(() => {
    const trackEvent = (eventName: string, parameters: Record<string, unknown> = {}) => {
      const p = getStoredPrefs();
      if (!p?.analytics) return;
      if (window.plausible) window.plausible(eventName, { props: parameters });
      if (window.gtag) window.gtag("event", eventName, parameters);
    };

    window.trackEvent = trackEvent;
    return () => {
      delete window.trackEvent;
    };
  }, []);

  return null;
};

declare global {
  interface Window {
    plausible?: (eventName: string, options?: { props: Record<string, unknown> }) => void;
    trackEvent?: (eventName: string, parameters?: Record<string, unknown>) => void;
  }
}
