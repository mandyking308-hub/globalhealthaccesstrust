import { useEffect } from "react";

// Analytics component for Plausible and GA4 integration
export const Analytics = () => {
  useEffect(() => {
    // Temporarily disabled external analytics to fix tablet loading issues
    // Will re-enable with proper error handling
    
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