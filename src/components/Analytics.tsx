import { useEffect } from "react";

// Analytics component for Plausible and GA4 integration
export const Analytics = () => {
  useEffect(() => {
    // Plausible Analytics - Privacy-friendly by default
    if (typeof window !== 'undefined') {
      const script = document.createElement('script');
      script.defer = true;
      script.dataset.domain = 'globalhealthaccesstrust.org';
      script.src = 'https://plausible.io/js/script.js';
      document.head.appendChild(script);
    }

    // Google Analytics 4 (GA4) - Only loads with consent
    const initGA4 = () => {
      if (typeof window !== 'undefined' && window.gtag) {
        // Initialize Google Consent Mode v2
        window.gtag('consent', 'default', {
          analytics_storage: 'denied',
          ad_storage: 'denied',
          ad_user_data: 'denied',
          ad_personalization: 'denied',
          wait_for_update: 500
        });

        // Track page views
        window.gtag('config', 'GA_MEASUREMENT_ID', {
          page_title: document.title,
          page_location: window.location.href
        });
      }
    };

    // Check for consent and initialize GA4 if granted
    const consent = localStorage.getItem('ghat-cookie-consent');
    if (consent) {
      const preferences = JSON.parse(consent);
      if (preferences.analytics) {
        initGA4();
      }
    }

    // Track key events for measurement
    const trackEvent = (eventName: string, parameters: any = {}) => {
      // Plausible event tracking
      if (window.plausible) {
        window.plausible(eventName, { props: parameters });
      }
      
      // GA4 event tracking (only if consent given)
      const consent = localStorage.getItem('ghat-cookie-consent');
      if (consent && window.gtag) {
        const preferences = JSON.parse(consent);
        if (preferences.analytics) {
          window.gtag('event', eventName, parameters);
        }
      }
    };

    // Set up global event tracking
    window.trackEvent = trackEvent;

    return () => {
      // Cleanup if needed
      delete window.trackEvent;
    };
  }, []);

  return null;
};

// Extend Window interface
declare global {
  interface Window {
    plausible?: (eventName: string, options?: { props: any }) => void;
    trackEvent?: (eventName: string, parameters?: any) => void;
  }
}