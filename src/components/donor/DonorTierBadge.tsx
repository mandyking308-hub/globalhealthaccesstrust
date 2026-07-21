interface DonorTierBadgeProps {
  tierName: string;
  totalDonated: number;
  className?: string;
}

export const DonorTierBadge = ({ tierName, totalDonated, className }: DonorTierBadgeProps) => {
  return (
    <div className={`flex flex-col gap-2 ${className ?? ""}`}>
      <span className="inline-flex items-center w-fit px-3 py-1.5 border border-primary text-primary text-[11px] font-bold uppercase tracking-[0.18em]">
        {tierName}
      </span>
      <p className="text-sm text-muted-foreground">
        Total Donated: £{totalDonated.toLocaleString()}
      </p>
    </div>
  );
};
