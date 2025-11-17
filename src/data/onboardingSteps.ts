import { OnboardingStep } from "@/components/onboarding/OnboardingTour";

export const donorOnboardingSteps: OnboardingStep[] = [
  {
    title: "Welcome to Your Impact Dashboard",
    message:
      "This is your private space to commission projects, track progress, and see real-world change unfold.",
  },
  {
    title: "Commission a Project",
    message:
      "Here you can create a bespoke health intervention that reflects your values.",
  },
  {
    title: "Tracking Progress",
    message:
      "Follow every milestone with photos, videos, notes, and transparent updates.",
  },
  {
    title: "Messaging & AI Support",
    message:
      "Your Impact Assistant is always here to answer questions and summarise updates.",
  },
  {
    title: "Completion Certificates",
    message:
      "Receive a verified impact certificate at the end of each project.",
  },
];

export const volunteerOnboardingSteps: OnboardingStep[] = [
  {
    title: "Welcome to the GHAT Volunteer Portal",
    message:
      "You're joining a global network of people delivering frontline impact.",
  },
  {
    title: "Available Projects",
    message:
      "Browse active projects and request to join the ones that match your skills.",
  },
  {
    title: "Uploading Evidence",
    message:
      "You'll upload photos, notes, and progress updates for each milestone.",
  },
  {
    title: "AI Field Support",
    message:
      "Your Field Assistant will guide you with reminders and help writing clear updates.",
  },
  {
    title: "Communication",
    message:
      "All communication is routed through admin to keep everyone safe and aligned.",
  },
];

export const adminOnboardingSteps: OnboardingStep[] = [
  {
    title: "Welcome to the GHAT Operations Console",
    message:
      "This is your command centre for donors, volunteers, projects, and impact.",
  },
  {
    title: "Dashboard Overview",
    message:
      "View high-level activity, alerts, milestones, and updates at a glance.",
  },
  {
    title: "Project Management",
    message:
      "Manage commissioned projects, milestones, evidence, volunteers, and approvals.",
  },
  {
    title: "Evidence Review",
    message:
      "Approve or request new evidence before donors see it.",
  },
  {
    title: "Messaging Centre",
    message:
      "All donor and volunteer communication flows through here.",
  },
  {
    title: "AI Operations Panel",
    message:
      "See AI summaries, flags, suggestions, and operational insights.",
  },
  {
    title: "Settings",
    message:
      "Control security, GDPR requests, onboarding resets, branding and logs.",
  },
];
