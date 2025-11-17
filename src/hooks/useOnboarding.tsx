import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type OnboardingRole = "donor" | "volunteer" | "admin";

export const useOnboarding = (role: OnboardingRole) => {
  const [isComplete, setIsComplete] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const checkOnboardingStatus = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("onboarding_status")
        .select(`${role}_onboarding_complete`)
        .eq("user_id", user.id)
        .maybeSingle();

      if (error) throw error;

      // If no record exists, onboarding is not complete
      const fieldName = `${role}_onboarding_complete` as keyof typeof data;
      setIsComplete(data ? data[fieldName] : false);
    } catch (error) {
      console.error("Error checking onboarding status:", error);
      setIsComplete(false);
    } finally {
      setIsLoading(false);
    }
  };

  const markOnboardingComplete = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Get user's role from user_roles table
      const { data: roleData } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .single();

      if (!roleData) return;

      const updateData = {
        user_id: user.id,
        role: roleData.role,
        [`${role}_onboarding_complete`]: true,
      };

      const { error } = await supabase
        .from("onboarding_status")
        .upsert(updateData, { onConflict: "user_id,role" });

      if (error) throw error;

      setIsComplete(true);
      toast({
        title: "Welcome!",
        description: "You can replay this tour anytime from your settings.",
      });
    } catch (error) {
      console.error("Error marking onboarding complete:", error);
      toast({
        title: "Error",
        description: "Could not save onboarding progress.",
        variant: "destructive",
      });
    }
  };

  const resetOnboarding = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: roleData } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .single();

      if (!roleData) return;

      const updateData = {
        user_id: user.id,
        role: roleData.role,
        [`${role}_onboarding_complete`]: false,
      };

      const { error } = await supabase
        .from("onboarding_status")
        .upsert(updateData, { onConflict: "user_id,role" });

      if (error) throw error;

      setIsComplete(false);
      toast({
        title: "Onboarding Reset",
        description: "Refresh the page to see the tour again.",
      });
    } catch (error) {
      console.error("Error resetting onboarding:", error);
      toast({
        title: "Error",
        description: "Could not reset onboarding.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    checkOnboardingStatus();
  }, []);

  return {
    isComplete,
    isLoading,
    markOnboardingComplete,
    resetOnboarding,
  };
};
