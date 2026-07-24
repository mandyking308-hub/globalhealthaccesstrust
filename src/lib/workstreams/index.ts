import recoveryInfrastructureImage from "@/assets/ghat-infrastructure-delivery.jpg";
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
  image: "https://images.pexels.com/photos/5711177/pexels-photo-5711177.jpeg?auto=compress&cs=tinysrgb&w=2200",
  imageAlt: "Three men supporting one another during a facilitated group conversation",
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
