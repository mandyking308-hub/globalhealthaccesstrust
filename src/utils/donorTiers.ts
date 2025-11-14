// Donor tier calculation utility
export interface DonorTier {
  name: string;
  minAmount: number;
  maxAmount: number;
  benefits: string[];
}

export const DONOR_TIERS: DonorTier[] = [
  {
    name: "Core Donor",
    minAmount: 500,
    maxAmount: 4999,
    benefits: ["Thank-you message", "Project updates"]
  },
  {
    name: "Founding Supporter",
    minAmount: 5000,
    maxAmount: 24999,
    benefits: ["Impact reports", "Early access to events"]
  },
  {
    name: "Strategic Partner",
    minAmount: 25000,
    maxAmount: 99999,
    benefits: ["Naming opportunities", "Private briefings"]
  },
  {
    name: "Legacy Builder",
    minAmount: 100000,
    maxAmount: 999999,
    benefits: ["Direct updates", "Advisory participation opportunities"]
  },
  {
    name: "Visionary Donor",
    minAmount: 1000000,
    maxAmount: Infinity,
    benefits: ["Bespoke partnership", "Legacy recognition", "Co-designed impact programs"]
  }
];

export const calculateDonorTier = (totalDonated: number): DonorTier => {
  for (const tier of DONOR_TIERS) {
    if (totalDonated >= tier.minAmount && totalDonated <= tier.maxAmount) {
      return tier;
    }
  }
  return DONOR_TIERS[0]; // Default to Core Donor
};

export const formatTierAmount = (amount: number): string => {
  if (amount === Infinity) return "£1M+";
  return `£${amount.toLocaleString()}`;
};
