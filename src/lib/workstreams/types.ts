export type WorkstreamStat = {
  value: string;
  label: string;
  detail: string;
  sourceIds: string[];
};

export type WorkstreamSection = {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type WorkstreamPlanStep = {
  stage: string;
  title: string;
  description: string;
  current?: boolean;
};

export type WorkstreamMeasureGroup = {
  title: string;
  items: string[];
};

export type WorkstreamParticipationRoute = {
  title: string;
  description: string;
  items: string[];
  action: string;
  href: string;
};

export type WorkstreamSource = {
  id: string;
  organisation: string;
  title: string;
  url: string;
};

export type Workstream = {
  slug: string;
  number: string;
  title: string;
  shortTitle: string;
  region: string;
  status: string;
  currentStage: string;
  model: string;
  role: string;
  lastReviewed: string;
  tagline: string;
  summary: string;
  image: string;
  imageAlt: string;
  stats: WorkstreamStat[];
  context: WorkstreamSection[];
  whyGhat: string[];
  purpose: string;
  objectives: string[];
  currentWork: string[];
  deliveryAreas: WorkstreamSection[];
  plan: WorkstreamPlanStep[];
  outputs: string[];
  measures: WorkstreamMeasureGroup[];
  priorities: string[];
  participation: WorkstreamParticipationRoute[];
  safeguards: string[];
  evidence: string[];
  relatedExperience: string[];
  globalSignificance: string[];
  sources: WorkstreamSource[];
};
