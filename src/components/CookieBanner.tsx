import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}

export const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    analytics: false,
    marketing: false
  });

  useEffect(() => {
    const consent = localStorage.getItem('ghat-cookie-consent');
    if (!consent) {
      setShowBanner(true);
    } else {
      const savedPreferences = JSON.parse(consent);
      setPreferences(savedPreferences);
      // Initialize Google Consent Mode v2
      if (window.gtag) {
        window.gtag('consent', 'update', {
          analytics_storage: savedPreferences.analytics ? 'granted' : 'denied',
          ad_storage: savedPreferences.marketing ? 'granted' : 'denied',
          ad_user_data: savedPreferences.marketing ? 'granted' : 'denied',
          ad_personalization: savedPreferences.marketing ? 'granted' : 'denied'
        });
      }
    }
  }, []);

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem('ghat-cookie-consent', JSON.stringify(prefs));
    localStorage.setItem('ghat-consent-timestamp', new Date().toISOString());
    
    // Update Google Consent Mode v2
    if (window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: prefs.analytics ? 'granted' : 'denied',
        ad_storage: prefs.marketing ? 'granted' : 'denied',
        ad_user_data: prefs.marketing ? 'granted' : 'denied',
        ad_personalization: prefs.marketing ? 'granted' : 'denied'
      });
    }

    setShowBanner(false);
    setShowPreferences(false);
  };

  const acceptAll = () => {
    const allAccepted = {
      essential: true,
      analytics: true,
      marketing: true
    };
    setPreferences(allAccepted);
    savePreferences(allAccepted);
  };

  const acceptEssential = () => {
    const essentialOnly = {
      essential: true,
      analytics: false,
      marketing: false
    };
    setPreferences(essentialOnly);
    savePreferences(essentialOnly);
  };

  if (!showBanner) return null;

  return (
    <>
      {/* Cookie Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-background/95 backdrop-blur border-t shadow-strong">
        <Card className="max-w-4xl mx-auto">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              
              <div className="flex-1">
                <h3 className="font-semibold mb-2">We use cookies to enhance your experience</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  We use essential cookies for website functionality and, with your consent, 
                  analytics cookies to improve our services. You can customize your preferences 
                  or accept all cookies. See our{" "}
                  <a href="/cookie-policy" className="text-primary hover:underline">Cookie Policy</a>{" "}
                  for more details.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button onClick={acceptAll} className="bg-primary text-primary-foreground">
                    Accept All
                  </Button>
                  <Button onClick={acceptEssential} variant="outline">
                    Essential Only
                  </Button>
                  <Button 
                    onClick={() => setShowPreferences(true)} 
                    variant="outline"
                  >
                    
                    Customize
                  </Button>
                </div>
              </div>
              <Button
                onClick={() => setShowBanner(false)}
                variant="ghost"
                size="sm"
                className="flex-shrink-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cookie Preferences Dialog */}
      <Dialog open={showPreferences} onOpenChange={setShowPreferences}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              
              Cookie Preferences
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            {/* Essential Cookies */}
            <div className="flex items-start justify-between">
              <div className="flex-1 mr-4">
                <h4 className="font-semibold text-success">Essential Cookies</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Required for website functionality, security, and form submissions. 
                  These cannot be disabled.
                </p>
              </div>
              <Switch checked={true} disabled />
            </div>

            {/* Analytics Cookies */}
            <div className="flex items-start justify-between">
              <div className="flex-1 mr-4">
                <h4 className="font-semibold">Analytics Cookies</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Help us understand how visitors use our website through privacy-friendly 
                  analytics (Plausible Analytics).
                </p>
              </div>
              <Switch 
                checked={preferences.analytics}
                onCheckedChange={(checked) => 
                  setPreferences(prev => ({ ...prev, analytics: checked }))
                }
              />
            </div>

            {/* Marketing Cookies */}
            <div className="flex items-start justify-between">
              <div className="flex-1 mr-4">
                <h4 className="font-semibold">Marketing Cookies</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Used for advertising and measuring campaign effectiveness. 
                  Currently not used on this website.
                </p>
              </div>
              <Switch 
                checked={preferences.marketing}
                onCheckedChange={(checked) => 
                  setPreferences(prev => ({ ...prev, marketing: checked }))
                }
                disabled
              />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button variant="outline" onClick={() => setShowPreferences(false)}>
                Cancel
              </Button>
              <Button onClick={() => savePreferences(preferences)}>
                Save Preferences
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

// Extend Window interface for gtag
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}