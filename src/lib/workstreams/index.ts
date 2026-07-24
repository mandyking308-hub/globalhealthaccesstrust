import recoveryInfrastructureImage from "@/assets/ghat-infrastructure-delivery.jpg";
import mentalHealthSystemsImage from "@/assets/systems-strengthening-hero.jpg";
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
  image: mentalHealthSystemsImage,
  imageAlt: "A health-systems setting representing professional collaboration, research and routes to mental-health support",
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
