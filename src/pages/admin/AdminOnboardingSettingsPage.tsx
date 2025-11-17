import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RotateCcw } from "lucide-react";
import { useOnboarding } from "@/hooks/useOnboarding";

export const AdminOnboardingSettingsPage = () => {
  const { resetOnboarding } = useOnboarding("admin");

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-serif text-foreground mb-2">
          Onboarding Management
        </h1>
        <p className="text-muted-foreground">
          Manage onboarding tours and walkthroughs
        </p>
      </div>

      <Card className="p-6 space-y-6">
        <div>
          <h2 className="text-xl font-serif text-foreground mb-4">
            Admin Onboarding Tour
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            Replay the guided walkthrough to revisit key features of the admin console.
          </p>
          <Button
            variant="outline"
            onClick={resetOnboarding}
            className="gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Replay Admin Tour
          </Button>
        </div>

        <div className="border-t pt-6">
          <h3 className="text-lg font-medium text-foreground mb-2">
            Reset User Onboarding
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Future feature: Reset onboarding status for specific users or all users.
          </p>
          <Button variant="outline" disabled>
            Coming Soon
          </Button>
        </div>
      </Card>
    </div>
  );
};
