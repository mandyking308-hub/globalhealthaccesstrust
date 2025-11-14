import { Badge } from "@/components/ui/badge";
import { Crown, Star, Gem, Award, Sparkles } from "lucide-react";

interface DonorTierBadgeProps {
  tierName: string;
  totalDonated: number;
  className?: string;
}

export const DonorTierBadge = ({ tierName, totalDonated, className }: DonorTierBadgeProps) => {
  const getTierIcon = () => {
    switch (tierName) {
      case "Visionary Donor":
        return <Crown className="w-4 h-4" />;
      case "Legacy Builder":
        return <Gem className="w-4 h-4" />;
      case "Strategic Partner":
        return <Star className="w-4 h-4" />;
      case "Founding Supporter":
        return <Award className="w-4 h-4" />;
      default:
        return <Sparkles className="w-4 h-4" />;
    }
  };

  const getTierVariant = () => {
    switch (tierName) {
      case "Visionary Donor":
        return "default";
      case "Legacy Builder":
        return "secondary";
      case "Strategic Partner":
        return "outline";
      default:
        return "secondary";
    }
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <Badge variant={getTierVariant()} className="w-fit flex items-center gap-2">
        {getTierIcon()}
        {tierName}
      </Badge>
      <p className="text-sm text-muted-foreground">
        Total Donated: £{totalDonated.toLocaleString()}
      </p>
    </div>
  );
};
