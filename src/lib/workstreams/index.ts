import recoveryInfrastructureImage from "@/assets/ghat-infrastructure-delivery.jpg";
import mentalHealthFamilyCareImage from "@/assets/family-medical-care.jpg";
import { africaAgriculture } from "./africaAgriculture";
import { asiaChildren } from "./asiaChildren";
import { conflictRecovery } from "./conflictRecovery";
import { aiHumanFirst } from "./aiHumanFirst";
import { mentalHealth } from "./mentalHealth";

const conflictAndRecovery = {
  ...conflictRecovery,
  image: recoveryInfrastructureImage,
  imageAlt: "Aid workers unloading essential supplies outside a damaged building in a conflict-affected community",
};

const mentalHealthAndPrevention = {
  ...mentalHealth,
  image: mentalHealthFamilyCareImage,
  imageAlt: "A family-care setting representing humane support, early recognition and a route to professional help",
};

export const WORKSTREAMS = [
  africaAgriculture,
  asiaChildren,
  conflictAndRecovery,
  aiHumanFirst,
  mentalHealthAndPrevention,
] as const;

export const getWorkstream = (slug?: string) =>
  WORKSTREAMS.find((workstream) => workstream.slug === slug);

export type { Workstream } from "./types";
