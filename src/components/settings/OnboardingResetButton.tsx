import { Button } from "@/components/ui/button";

interface OnboardingResetButtonProps {
  onReset: () => void;
  label?: string;
}

export const OnboardingResetButton = ({ 
  onReset, 
  label = "Replay Onboarding Tour" 
}: OnboardingResetButtonProps) => {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-foreground">Onboarding Tour</h3>
      <p className="text-sm text-muted-foreground">
        Replay the guided walkthrough to revisit key features.
      </p>
      <Button
        variant="outline"
        onClick={onReset}
        className="gap-2"
      >
        
        {label}
      </Button>
    </div>
  );
};
