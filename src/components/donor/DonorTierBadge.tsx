import { Badge } from "@/components/ui/badge";

interface DonorTierBadgeProps {
  tierName: string;
  totalDonated: number;
  className?: string;
}

export const DonorTierBadge = ({ tierName, totalDonated, className }: DonorTierBadgeProps) => {
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
      <Badge variant={getTierVariant()} className="w-fit">
        {tierName}
      </Badge>
      <p className="text-sm text-muted-foreground">
        Total Donated: £{totalDonated.toLocaleString()}
      </p>
    </div>
  );
};
