import recoveryInfrastructureImage from "@/assets/ghat-infrastructure-delivery.jpg";
import mentalHealthSupportImage from "@/assets/ghat-capacity-training.jpg";
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
  image: mentalHealthSupportImage,
  imageAlt: "A diverse group of professionals taking part in a facilitated health and community-support session",
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
