import { useState } from "react";
import { X, ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface OnboardingStep {
  title: string;
  message: string;
  highlightSelector?: string;
}

interface OnboardingTourProps {
  steps: OnboardingStep[];
  onComplete: () => void;
  onClose: () => void;
}

export const OnboardingTour = ({ steps, onComplete, onClose }: OnboardingTourProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const step = steps[currentStep];

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-50 animate-fade-in" />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-background rounded-xl shadow-elegant max-w-lg w-full p-8 animate-scale-in">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close onboarding"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Content */}
          <div className="space-y-6">
            {/* Title */}
            <h2 className="font-serif text-3xl text-foreground">
              {step.title}
            </h2>

            {/* Message */}
            <p className="text-base text-muted-foreground leading-relaxed">
              {step.message}
            </p>

            {/* Progress Dots */}
            <div className="flex items-center justify-center gap-2 pt-4">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-300",
                    index === currentStep
                      ? "bg-[#C2A878] w-8"
                      : index < currentStep
                      ? "bg-[#C2A878]/50"
                      : "bg-border"
                  )}
                />
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-4">
              <Button
                variant="ghost"
                onClick={handleBack}
                disabled={currentStep === 0}
                className="gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </Button>

              <Button
                onClick={handleNext}
                className="gap-2 bg-[#C2A878] hover:bg-[#C2A878]/90 text-white"
              >
                {currentStep === steps.length - 1 ? "Finish" : "Next"}
                {currentStep < steps.length - 1 && (
                  <ChevronRight className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
