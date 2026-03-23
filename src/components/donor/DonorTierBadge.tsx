import { Badge } from "@/components/ui/badge";

interface DonorTierBadgeProps {
  tierName: string;
  totalDonated: number;
  className?: string;
}

export const DonorTierBadge = ({ tierName, totalDonated, className }: DonorTierBadgeProps) => {
  const getTierIcon = () => {
    switch (tierName) {
      case "Visionary Donor":
        return ;
      case "Legacy Builder":
        return ;
      case "Strategic Partner":
        return ;
      case "Founding Supporter":
        return ;
      default:
        return ;
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
