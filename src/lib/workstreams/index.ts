// Lovable sync marker: improved homepage flow, relevant workstream imagery and approved single hero.
import { africaAgriculture } from "./africaAgriculture";
import { asiaChildren } from "./asiaChildren";
import { conflictRecovery } from "./conflictRecovery";
import { aiHumanFirst } from "./aiHumanFirst";
import { mentalHealth } from "./mentalHealth";

const agriculture = {
  ...africaAgriculture,
  image:
    "https://images.unsplash.com/photo-1741874299706-2b8e16839aaa?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=82&w=2400",
  imageAlt: "A small-scale farmer examining crops in a green field in Malawi",
};

const children = {
  ...asiaChildren,
  image:
    "https://images.pexels.com/photos/1822387/pexels-photo-1822387.jpeg?auto=compress&cs=tinysrgb&w=2200",
  imageAlt: "Children taking part in a classroom lesson in Asia with adult guidance",
};

const ai = {
  ...aiHumanFirst,
  image:
    "https://images.pexels.com/photos/7742822/pexels-photo-7742822.jpeg?auto=compress&cs=tinysrgb&w=2200",
  imageAlt: "A teacher supporting teenagers as they work together on laptops",
};

const mentalHealthSupport = {
  ...mentalHealth,
  image:
    "https://images.pexels.com/photos/5711177/pexels-photo-5711177.jpeg?auto=compress&cs=tinysrgb&w=2200",
  imageAlt: "Three men supporting one another during a facilitated group conversation",
};

export const WORKSTREAMS = [
  agriculture,
  children,
  conflictRecovery,
  ai,
  mentalHealthSupport,
] as const;

export const getWorkstream = (slug?: string) =>
  WORKSTREAMS.find((workstream) => workstream.slug === slug);

export type { Workstream } from "./types";
