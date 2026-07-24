import { africaAgriculture } from "./africaAgriculture";
import { asiaChildren } from "./asiaChildren";
import { conflictRecovery } from "./conflictRecovery";
import { aiHumanFirst } from "./aiHumanFirst";
import { mentalHealth } from "./mentalHealth";

export const WORKSTREAMS = [
  africaAgriculture,
  asiaChildren,
  conflictRecovery,
  aiHumanFirst,
  mentalHealth,
] as const;

export const getWorkstream = (slug?: string) =>
  WORKSTREAMS.find((workstream) => workstream.slug === slug);

export type { Workstream } from "./types";
