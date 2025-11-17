import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export const CookieConsentBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    checkCookieConsent();
  }, []);

  const checkCookieConsent = async () => {
    // Check localStorage first
    const localConsent = localStorage.getItem("cookie_consent");
    if (localConsent) {
      setIsVisible(false);
      return;
    }

    // If user is logged in, check database
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setUserId(user.id);
      const { data: profile } = await supabase
        .from("profiles")
        .select("cookie_consent")
        .eq("id", user.id)
        .single();

      if (profile?.cookie_consent) {
        localStorage.setItem("cookie_consent", "true");
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    } else {
      // Show banner for non-logged-in users
      setIsVisible(true);
    }
  };

  const handleAccept = async () => {
    localStorage.setItem("cookie_consent", "true");

    // If user is logged in, update database
    if (userId) {
      await supabase
        .from("profiles")
        .update({
          cookie_consent: true,
          cookie_consent_date: new Date().toISOString(),
        })
        .eq("id", userId);
    }

    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookie_consent", "essential_only");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 animate-in slide-in-from-bottom duration-300">
      <div className="bg-muted/95 backdrop-blur-sm border-t border-border shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex-1">
              <p className="text-sm text-foreground">
                We use essential cookies to enhance your experience and ensure secure access to your dashboard.{" "}
                <Link 
                  to="/cookie-policy" 
                  className="text-primary hover:text-primary/80 underline font-medium"
                >
                  View our Cookie Policy
                </Link>{" "}
                for details.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handleDecline}
                className="border-border hover:bg-accent"
              >
                Essential Only
              </Button>
              <Button
                size="sm"
                onClick={handleAccept}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Accept All
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleDecline}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
