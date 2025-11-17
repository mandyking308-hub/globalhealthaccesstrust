// Standardized icon set for GHAT platform
// All icons use thin line weight (strokeWidth 1.5) and consistent sizing

import {
  Users,
  UserCheck,
  FolderKanban,
  Milestone,
  MessageSquare,
  FileCheck,
  Brain,
  Shield,
  Settings,
  Upload,
  Download,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  AlertCircle,
  Heart,
  Target,
  Globe,
  MapPin,
  Calendar,
  DollarSign,
  Award,
  FileText,
  Image as ImageIcon,
  Video,
  type LucideIcon,
} from "lucide-react";

export const brandIcons = {
  // User Types
  donors: Users,
  volunteers: UserCheck,
  
  // Project Management
  projects: FolderKanban,
  milestones: Milestone,
  evidence: FileCheck,
  
  // Communication
  messages: MessageSquare,
  ai: Brain,
  
  // Security & Admin
  security: Shield,
  settings: Settings,
  
  // Actions
  upload: Upload,
  download: Download,
  approve: CheckCircle,
  reject: XCircle,
  
  // Status
  pending: Clock,
  progress: TrendingUp,
  alert: AlertCircle,
  
  // Impact
  impact: Heart,
  target: Target,
  global: Globe,
  location: MapPin,
  
  // Donations
  calendar: Calendar,
  donation: DollarSign,
  recognition: Award,
  
  // Media
  document: FileText,
  image: ImageIcon,
  video: Video,
} as const;

export type BrandIconKey = keyof typeof brandIcons;

// Standard icon props for consistency
export const iconProps = {
  strokeWidth: 1.5,
  className: "w-5 h-5",
} as const;

// Helper to get icon with standard props
export const getBrandIcon = (key: BrandIconKey): LucideIcon => {
  return brandIcons[key];
};
