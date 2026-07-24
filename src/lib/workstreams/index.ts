import emergencyRecoveryImage from "@/assets/emergency-relief-hero.jpg";
import { africaAgriculture } from "./africaAgriculture";
import { asiaChildren } from "./asiaChildren";
import { conflictRecovery } from "./conflictRecovery";
import { aiHumanFirst } from "./aiHumanFirst";
import { mentalHealth } from "./mentalHealth";

const conflictAndRecovery = {
  ...conflictRecovery,
  image: emergencyRecoveryImage,
  imageAlt: "Emergency relief supplies and practical recovery support in a conflict-affected community",
};

export const WORKSTREAMS = [
  africaAgriculture,
  asiaChildren,
  conflictAndRecovery,
  aiHumanFirst,
  mentalHealth,
] as const;

export const getWorkstream = (slug?: string) =>
  WORKSTREAMS.find((workstream) => workstream.slug === slug);

export type { Workstream } from "./types";
