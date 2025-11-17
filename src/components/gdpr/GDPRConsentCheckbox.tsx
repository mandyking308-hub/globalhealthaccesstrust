import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

interface GDPRConsentCheckboxProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  type?: "data_processing" | "volunteer_storage";
  required?: boolean;
}

export const GDPRConsentCheckbox = ({ 
  checked, 
  onCheckedChange, 
  type = "data_processing",
  required = true 
}: GDPRConsentCheckboxProps) => {
  const getLabel = () => {
    switch (type) {
      case "data_processing":
        return (
          <>
            I consent to my personal data being processed under the{" "}
            <Link to="/privacy-policy" className="text-primary hover:text-primary/80 underline" target="_blank">
              GHAT Privacy Policy
            </Link>
            {required && <span className="text-destructive ml-1">*</span>}
          </>
        );
      case "volunteer_storage":
        return (
          <>
            I consent to GHAT storing my CV, skills information, and project-related evidence securely 
            in accordance with our{" "}
            <Link to="/privacy-policy" className="text-primary hover:text-primary/80 underline" target="_blank">
              Privacy Policy
            </Link>
            {required && <span className="text-destructive ml-1">*</span>}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex items-start space-x-3 p-4 border rounded-lg bg-muted/30">
      <Checkbox 
        id={`consent-${type}`}
        checked={checked}
        onCheckedChange={onCheckedChange}
        className="mt-1"
      />
      <Label 
        htmlFor={`consent-${type}`}
        className="text-sm leading-relaxed cursor-pointer flex-1"
      >
        {getLabel()}
      </Label>
    </div>
  );
};
