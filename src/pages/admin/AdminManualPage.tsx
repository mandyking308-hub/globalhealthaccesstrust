import { useState, useEffect } from "react";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { format } from "date-fns";
import {
  Search,
  Download,
  ChevronDown,
  ChevronRight,
  Globe,
  FileText,
  Database,
  Shield,
  Palette,
  Settings,
  Layout,
  FormInput,
  Lock,
  BookOpen,
  BarChart3,
  Layers,
  Activity,
} from "lucide-react";
import jsPDF from "jspdf";

// ─── VERSION ───────────────────────────────────────────────────────────────────

const MANUAL_VERSION = "1.0";

// ─── MANUAL DATA ───────────────────────────────────────────────────────────────

const SITE_OVERVIEW = {
  projectName: "Global Health Access Trust (GHAT)",
  domain: "globalhealthaccesstrust.lovable.app",
  purpose:
    "An institutional digital platform for a UK charitable trust focused on global health access. Serves as the public-facing website, donor portal, volunteer management system, and administrative command centre.",
  positioning:
    "Formal, institutional tone aligned with UK charity governance standards. Professional, high-trust design with clean white backgrounds and structured layouts.",
};

const PAGE_REGISTRY: {
  route: string;
  title: string;
  sections: string;
  category: "Public" | "Legal" | "Governance" | "Portal" | "Admin";
  hasForm: boolean;
}[] = [
  { route: "/", title: "Home", sections: "Hero, mission overview, CTA blocks", category: "Public", hasForm: false },
  { route: "/about-the-trust", title: "About the Trust", sections: "Mission, values, history", category: "Public", hasForm: false },
  { route: "/trustee-biographies", title: "Trustee Biographies", sections: "Trustee grid with bios", category: "Public", hasForm: false },
  { route: "/governance-legal-framework", title: "Governance & Legal Framework", sections: "Governance structure, legal docs", category: "Public", hasForm: false },
  { route: "/our-work", title: "Our Work", sections: "Programme areas, impact", category: "Public", hasForm: false },
  { route: "/how-we-work", title: "How We Work", sections: "Methodology, approach", category: "Public", hasForm: false },
  { route: "/support-the-trust", title: "Support the Trust", sections: "Donation CTA, ways to give", category: "Public", hasForm: false },
  { route: "/donor-recognition", title: "Donor Recognition", sections: "Donor tiers, acknowledgments", category: "Public", hasForm: false },
  { route: "/frequently-asked-questions", title: "FAQs", sections: "Accordion Q&A", category: "Public", hasForm: false },
  { route: "/contact-the-trust", title: "Contact the Trust", sections: "Info page", category: "Public", hasForm: false },
  { route: "/contact", title: "Contact Form", sections: "Structured enquiry intake form", category: "Public", hasForm: true },
  { route: "/blog", title: "Blog Index", sections: "Blog grid, pagination", category: "Public", hasForm: false },
  { route: "/blog/:slug", title: "Blog Post", sections: "Article content, metadata", category: "Public", hasForm: false },
  { route: "/get-involved", title: "Get Involved", sections: "Volunteer + donate CTAs", category: "Public", hasForm: false },
  { route: "/donate", title: "Donate", sections: "Donation options", category: "Public", hasForm: false },
  { route: "/commission-projects", title: "Commission Projects", sections: "Project commissioning form", category: "Public", hasForm: true },
  { route: "/publications", title: "Publications", sections: "Document library", category: "Public", hasForm: false },
  { route: "/constitution", title: "Constitution", sections: "Legal constitution document", category: "Legal", hasForm: false },
  { route: "/privacy-policy", title: "Privacy Policy", sections: "GDPR-compliant privacy policy", category: "Legal", hasForm: false },
  { route: "/cookie-policy", title: "Cookie Policy", sections: "Cookie usage disclosure", category: "Legal", hasForm: false },
  { route: "/terms-of-use", title: "Terms of Use", sections: "Site usage terms", category: "Legal", hasForm: false },
  { route: "/accessibility-statement", title: "Accessibility Statement", sections: "WCAG compliance", category: "Legal", hasForm: false },
  { route: "/data-access-request", title: "Data Access Request", sections: "DSAR submission form", category: "Legal", hasForm: true },
  { route: "/safeguarding", title: "Safeguarding", sections: "Safeguarding policy", category: "Governance", hasForm: false },
  { route: "/anti-fraud", title: "Anti-Fraud", sections: "Anti-fraud policy", category: "Governance", hasForm: false },
  { route: "/whistleblowing", title: "Whistleblowing", sections: "Whistleblowing procedures", category: "Governance", hasForm: false },
  { route: "/governance", title: "Governance", sections: "Governance overview", category: "Governance", hasForm: false },
  { route: "/conflict-of-interest", title: "Conflict of Interest", sections: "COI policy", category: "Governance", hasForm: false },
  { route: "/financial-controls", title: "Financial Controls", sections: "Financial procedures", category: "Governance", hasForm: false },
  { route: "/risk-management", title: "Risk Management", sections: "Risk framework", category: "Governance", hasForm: false },
  { route: "/auth", title: "Login / Sign Up", sections: "Authentication forms", category: "Portal", hasForm: true },
  { route: "/donor-dashboard", title: "Donor Dashboard", sections: "Donations, receipts, projects, messages", category: "Portal", hasForm: false },
  { route: "/volunteer-dashboard", title: "Volunteer Dashboard", sections: "Assignments, updates", category: "Portal", hasForm: false },
  { route: "/admin/dashboard", title: "Admin Dashboard", sections: "Metrics, alerts, quick actions", category: "Admin", hasForm: false },
  { route: "/admin/donors", title: "Admin Donors", sections: "Donor management table", category: "Admin", hasForm: false },
  { route: "/admin/volunteers", title: "Admin Volunteers", sections: "Volunteer management", category: "Admin", hasForm: false },
  { route: "/admin/projects", title: "Admin Projects", sections: "Project management", category: "Admin", hasForm: false },
  { route: "/admin/contacts", title: "Admin Contacts", sections: "Inbound enquiry management", category: "Admin", hasForm: false },
  { route: "/admin/evidence", title: "Admin Evidence", sections: "Evidence review console", category: "Admin", hasForm: false },
  { route: "/admin/messages", title: "Admin Messages", sections: "Messaging console", category: "Admin", hasForm: false },
  { route: "/admin/ai", title: "Admin AI Panel", sections: "AI operations", category: "Admin", hasForm: false },
  { route: "/admin/security", title: "Admin Security", sections: "Security overview, sessions", category: "Admin", hasForm: false },
  { route: "/admin/gdpr", title: "Admin GDPR", sections: "GDPR request management", category: "Admin", hasForm: false },
  { route: "/admin/documentation", title: "Admin Documentation", sections: "Internal SOPs hub", category: "Admin", hasForm: false },
  { route: "/admin/presentations", title: "Admin Presentations", sections: "Presentation builder", category: "Admin", hasForm: false },
  { route: "/admin/system-health", title: "Admin System Health", sections: "System metrics", category: "Admin", hasForm: false },
  { route: "/admin/branding", title: "Admin Branding", sections: "Brand guidelines", category: "Admin", hasForm: false },
  { route: "/admin/launch-checklist", title: "Admin Launch Prep", sections: "Launch readiness", category: "Admin", hasForm: false },
  { route: "/admin/settings", title: "Admin Settings", sections: "System configuration", category: "Admin", hasForm: false },
  { route: "/admin/manual", title: "System Manual", sections: "This page — live documentation", category: "Admin", hasForm: false },
];

const FORMS_DATA = [
  {
    location: "/contact",
    name: "Contact Enquiry Form",
    fields: [
      { name: "Full Name", type: "text", required: true, dbColumn: "name" },
      { name: "Email Address", type: "email", required: true, dbColumn: "email" },
      { name: "Direct Contact Number", type: "tel", required: false, dbColumn: "phone" },
      { name: "Organisation", type: "text", required: false, dbColumn: "organisation" },
      { name: "Position / Role", type: "text", required: false, dbColumn: "position" },
      { name: "Nature of Enquiry", type: "select", required: true, dbColumn: "nature_of_enquiry" },
      { name: "Summary of Enquiry", type: "textarea", required: true, dbColumn: "message" },
      { name: "Additional Context", type: "textarea", required: false, dbColumn: "additional_context" },
      { name: "GDPR Consent", type: "checkbox", required: true, dbColumn: "gdpr_consent" },
    ],
    table: "inbound_contacts",
  },
  {
    location: "/auth (Sign Up)",
    name: "Registration Form",
    fields: [
      { name: "First Name", type: "text", required: true, dbColumn: "first_name (profiles)" },
      { name: "Last Name", type: "text", required: true, dbColumn: "last_name (profiles)" },
      { name: "Email", type: "email", required: true, dbColumn: "email (auth.users)" },
      { name: "Password", type: "password", required: true, dbColumn: "auth.users" },
      { name: "Confirm Password", type: "password", required: true, dbColumn: "—" },
      { name: "GDPR Consent", type: "checkbox", required: true, dbColumn: "gdpr_consent (profiles)" },
    ],
    table: "auth.users + profiles + user_roles",
  },
  {
    location: "/data-access-request",
    name: "Data Subject Access Request",
    fields: [
      { name: "Request Type", type: "select", required: true, dbColumn: "request_type" },
      { name: "Email", type: "email", required: true, dbColumn: "email" },
      { name: "Request Details", type: "textarea", required: false, dbColumn: "request_details" },
    ],
    table: "gdpr_requests",
  },
];

const DB_TABLES = [
  { name: "profiles", description: "User profile data linked to auth.users", fields: ["id (uuid, PK)", "first_name", "last_name", "email", "gdpr_consent", "two_factor_enabled", "cookie_consent", "marketing_consent", "data_processing_consent", "created_at", "updated_at"] },
  { name: "user_roles", description: "Role assignments (donor, admin, super_admin)", fields: ["id (uuid, PK)", "user_id (FK → auth.users)", "role (enum: donor|admin|super_admin)", "created_at"] },
  { name: "inbound_contacts", description: "Contact form submissions / enquiry pipeline", fields: ["id (uuid, PK)", "name", "email", "phone", "organisation", "position", "nature_of_enquiry", "message", "additional_context", "gdpr_consent", "status (default: New)", "admin_notes", "created_at"] },
  { name: "donations", description: "Donation records with payment tracking", fields: ["id (uuid, PK)", "donor_id (FK)", "amount", "currency (default: GBP)", "purpose (enum)", "frequency (enum)", "status", "stripe_payment_id", "receipt_url", "created_at", "processed_at"] },
  { name: "commissioned_projects", description: "Donor-commissioned project records", fields: ["id (uuid, PK)", "donor_id (FK)", "title", "region", "country", "project_type", "description", "budget_range", "urgency", "dedication", "status (default: pending)", "start_date", "end_date", "created_at", "updated_at"] },
  { name: "project_milestones", description: "Milestones within commissioned projects", fields: ["id (uuid, PK)", "project_id (FK)", "milestone_title", "milestone_description", "is_completed", "completed_at", "created_at"] },
  { name: "volunteers", description: "Volunteer applications and profiles", fields: ["id (uuid, PK)", "user_id (FK)", "name", "email", "phone", "country", "skills", "experience", "languages", "cv_url", "status (default: pending)", "notes", "created_at", "updated_at"] },
  { name: "messages", description: "Internal messaging system", fields: ["id (uuid, PK)", "from_user_id", "to_user_id", "subject", "body", "status (enum: unread|read|archived)", "is_template", "read_at", "created_at"] },
  { name: "audit_logs", description: "Admin action audit trail", fields: ["id (uuid, PK)", "user_id", "action", "action_type", "target_type", "target_id", "details (jsonb)", "ip_address", "created_at"] },
  { name: "gdpr_requests", description: "Data subject access/deletion requests", fields: ["id (uuid, PK)", "user_id", "request_type", "status", "email", "request_details", "processed_by", "processed_at", "created_at"] },
  { name: "system_alerts", description: "System-wide alert notifications", fields: ["id (uuid, PK)", "alert_type", "severity", "title", "description", "status", "related_type", "related_id", "assigned_to", "resolved_at", "metadata (jsonb)", "created_at"] },
];

const SECURITY_CONFIG = {
  authentication: [
    "Email + password authentication via Lovable Cloud",
    "Registration requires GDPR consent",
    "Auto-confirm disabled in production (email verification required)",
    "Password minimum 6 characters (production: 10 chars, 1 uppercase, 1 number, 1 symbol)",
    "Account lockout after 5 failed attempts (10 minutes)",
    "45-minute inactivity auto-logout, 24-hour session expiry",
  ],
  rls: [
    "All tables have Row Level Security (RLS) enabled",
    "Public users: INSERT only on inbound_contacts (form submissions)",
    "Donors: SELECT/INSERT own data only (donations, projects, messages)",
    "Volunteers: SELECT/INSERT/UPDATE own data only",
    "Admins: Full SELECT/UPDATE on operational tables via is_admin() function",
    "Super admins: Full access including user_roles management",
  ],
  headers: [
    "X-Frame-Options: DENY",
    "X-Content-Type-Options: nosniff",
    "Referrer-Policy: strict-origin-when-cross-origin",
    "Content-Security-Policy configured",
  ],
  indexing: [
    "robots.txt blocks /admin/, /donor-dashboard, /volunteer-dashboard",
    "All admin pages include noindex, nofollow meta tags",
    "Auth page is noindex, nofollow",
  ],
};

const DESIGN_SYSTEM = {
  fonts: [
    { usage: "Headings", font: "Playfair Display (serif)" },
    { usage: "Body text", font: "Inter (sans-serif)" },
  ],
  colors: [
    { name: "Deep Navy (Primary)", value: "hsl(219, 71%, 9%)" },
    { name: "Muted Gold (Accent)", value: "#C2A878" },
    { name: "White (Background)", value: "#FFFFFF" },
    { name: "Charcoal (Foreground)", value: "hsl(222, 47%, 11%)" },
    { name: "Muted Foreground", value: "hsl(215, 16%, 47%)" },
  ],
  layout: [
    "Max container width: responsive breakpoints",
    "White backgrounds with subtle gradients",
    "Card-based content presentation",
    "Two-column layouts where appropriate",
    "Mobile-first responsive design",
  ],
};

const SYSTEM_PRIORITY_LAYERS = [
  {
    layer: "External Interface",
    description: "Public-facing pages and forms that interact with external users",
    systems: ["Public website (15 pages)", "Contact enquiry form", "Blog", "Publications", "Volunteer application"],
  },
  {
    layer: "Core Operations",
    description: "Mission-critical systems managing donations, projects, and stakeholder data",
    systems: ["Donations pipeline", "Inbound contacts pipeline", "Commissioned projects", "Volunteer management", "Messaging system"],
  },
  {
    layer: "Internal Control",
    description: "Administrative, security, and governance systems",
    systems: ["Admin command console (16 sections)", "Role-based access control", "Audit logging", "GDPR compliance", "System health monitoring", "Security controls"],
  },
];

const ADMIN_ROUTES = [
  { route: "/admin/dashboard", feature: "Command hub with metrics and quick actions", access: "admin, super_admin" },
  { route: "/admin/donors", feature: "Donor management with search, filter, export", access: "admin, super_admin" },
  { route: "/admin/volunteers", feature: "Volunteer applications and assignments", access: "admin, super_admin" },
  { route: "/admin/projects", feature: "Commissioned project lifecycle management", access: "admin, super_admin" },
  { route: "/admin/contacts", feature: "Inbound enquiry pipeline with status tracking", access: "admin, super_admin" },
  { route: "/admin/evidence", feature: "Evidence review and approval console", access: "admin, super_admin" },
  { route: "/admin/messages", feature: "Unified messaging console", access: "admin, super_admin" },
  { route: "/admin/ai", feature: "AI operations panel", access: "admin, super_admin" },
  { route: "/admin/security", feature: "Security overview, sessions, audit logs", access: "admin, super_admin" },
  { route: "/admin/gdpr", feature: "GDPR request processing", access: "admin, super_admin" },
  { route: "/admin/settings", feature: "System configuration", access: "super_admin" },
  { route: "/admin/manual", feature: "System manual (this page)", access: "admin, super_admin" },
];

// ─── NAV ITEMS ─────────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { id: "executive", label: "Executive Summary", icon: BarChart3 },
  { id: "priority", label: "System Layers", icon: Layers },
  { id: "overview", label: "Site Overview", icon: Globe },
  { id: "activity", label: "Activity Indicators", icon: Activity },
  { id: "pages", label: "Page Registry", icon: Layout },
  { id: "forms", label: "Forms & Data", icon: FormInput },
  { id: "database", label: "Database Schema", icon: Database },
  { id: "admin", label: "Admin Systems", icon: Settings },
  { id: "security", label: "Security", icon: Shield },
  { id: "design", label: "Design System", icon: Palette },
  { id: "seo", label: "SEO & Technical", icon: FileText },
  { id: "changelog", label: "Change Log", icon: BookOpen },
];

// ─── SECTION COMPONENT ────────────────────────────────────────────────────────

const ManualSection = ({
  id, title, icon: Icon, children, defaultOpen = false, searchMatch = false,
}: {
  id: string; title: string; icon: React.ElementType; children: React.ReactNode; defaultOpen?: boolean; searchMatch?: boolean;
}) => {
  const [open, setOpen] = useState(defaultOpen || searchMatch);
  useEffect(() => { if (searchMatch) setOpen(true); }, [searchMatch]);

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger asChild>
        <button
          id={id}
          className={`w-full flex items-center justify-between p-4 rounded-lg border transition-colors text-left ${
            open ? "bg-primary/5 border-primary/20" : "bg-background border-border hover:bg-muted/50"
          }`}
        >
          <div className="flex items-center gap-3">
            <Icon className="h-5 w-5 text-primary" />
            <span className="font-serif font-semibold text-lg">{title}</span>
          </div>
          {open ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-2 pl-4 pr-2 pb-4">{children}</CollapsibleContent>
    </Collapsible>
  );
};

// ─── TYPES ─────────────────────────────────────────────────────────────────────

type LiveStats = {
  totalUsers: number;
  totalDonations: number;
  totalContacts: number;
  totalVolunteers: number;
  totalProjects: number;
  totalMessages: number;
  totalAuditLogs: number;
  lastContact: string | null;
  lastDonation: string | null;
  lastVolunteer: string | null;
  lastAuditLog: string | null;
};

// ─── MAIN PAGE ─────────────────────────────────────────────────────────────────

export const AdminManualPage = () => {
  const [search, setSearch] = useState("");
  const [generating, setGenerating] = useState(false);
  const [liveStats, setLiveStats] = useState<LiveStats>({
    totalUsers: 0, totalDonations: 0, totalContacts: 0, totalVolunteers: 0,
    totalProjects: 0, totalMessages: 0, totalAuditLogs: 0,
    lastContact: null, lastDonation: null, lastVolunteer: null, lastAuditLog: null,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const [profiles, donations, contacts, volunteers, projects, messages, auditLogs,
        lastContact, lastDonation, lastVolunteer, lastAudit] = await Promise.all([
        supabase.from("profiles").select("id", { count: "exact", head: true }),
        supabase.from("donations").select("id", { count: "exact", head: true }),
        supabase.from("inbound_contacts").select("id", { count: "exact", head: true }),
        supabase.from("volunteers").select("id", { count: "exact", head: true }),
        supabase.from("commissioned_projects").select("id", { count: "exact", head: true }),
        supabase.from("messages").select("id", { count: "exact", head: true }),
        supabase.from("audit_logs").select("id", { count: "exact", head: true }),
        supabase.from("inbound_contacts").select("created_at").order("created_at", { ascending: false }).limit(1),
        supabase.from("donations").select("created_at").order("created_at", { ascending: false }).limit(1),
        supabase.from("volunteers").select("created_at").order("created_at", { ascending: false }).limit(1),
        supabase.from("audit_logs").select("created_at").order("created_at", { ascending: false }).limit(1),
      ]);
      setLiveStats({
        totalUsers: profiles.count || 0,
        totalDonations: donations.count || 0,
        totalContacts: contacts.count || 0,
        totalVolunteers: volunteers.count || 0,
        totalProjects: projects.count || 0,
        totalMessages: messages.count || 0,
        totalAuditLogs: auditLogs.count || 0,
        lastContact: lastContact.data?.[0]?.created_at || null,
        lastDonation: lastDonation.data?.[0]?.created_at || null,
        lastVolunteer: lastVolunteer.data?.[0]?.created_at || null,
        lastAuditLog: lastAudit.data?.[0]?.created_at || null,
      });
    };
    fetchStats();
  }, []);

  const matchesSearch = (text: string) =>
    !search || text.toLowerCase().includes(search.toLowerCase());

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const formatTimestamp = (ts: string | null) =>
    ts ? format(new Date(ts), "dd MMM yyyy, HH:mm") : "No activity";

  // ─── PDF GENERATION ──────────────────────────────────────────────────────────

  const generatePDF = async () => {
    setGenerating(true);
    try {
      const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 20;
      const contentWidth = pageWidth - margin * 2;
      let y = 30;
      let pageNum = 1;

      const addFooter = () => {
        doc.setFontSize(8);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(150);
        doc.text(`GHAT System Manual v${MANUAL_VERSION}`, margin, pageHeight - 10);
        doc.text(`Page ${pageNum}`, pageWidth - margin, pageHeight - 10, { align: "right" });
        doc.text("CONFIDENTIAL — Admin Use Only", pageWidth / 2, pageHeight - 10, { align: "center" });
        doc.setTextColor(0);
      };

      const addPage = () => {
        addFooter();
        doc.addPage();
        pageNum++;
        y = 30;
      };

      const checkPage = (needed: number) => { if (y + needed > pageHeight - 25) addPage(); };

      const addSectionDivider = (title: string, sectionNum: number) => {
        addPage();
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(100);
        doc.text(`SECTION ${sectionNum}`, pageWidth / 2, 60, { align: "center" });
        doc.setFontSize(22);
        doc.setTextColor(0);
        doc.text(title, pageWidth / 2, 75, { align: "center" });
        doc.setDrawColor(180);
        doc.line(margin + 40, 80, pageWidth - margin - 40, 80);
        y = 100;
      };

      const addHeading = (text: string, size: number = 16) => {
        checkPage(15);
        doc.setFontSize(size);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(0);
        doc.text(text, margin, y);
        y += size * 0.6 + 4;
      };

      const addText = (text: string, size: number = 10) => {
        doc.setFontSize(size);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(0);
        const lines = doc.splitTextToSize(text, contentWidth);
        lines.forEach((line: string) => {
          checkPage(6);
          doc.text(line, margin, y);
          y += 5;
        });
        y += 2;
      };

      const addBullet = (text: string) => {
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        const lines = doc.splitTextToSize(text, contentWidth - 8);
        lines.forEach((line: string, i: number) => {
          checkPage(6);
          doc.text(i === 0 ? `• ${line}` : `  ${line}`, margin + 4, y);
          y += 5;
        });
      };

      // ── COVER PAGE ──────────────────────────────────────────────────────
      doc.setFontSize(14);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(120);
      doc.text("CONFIDENTIAL — ADMIN USE ONLY", pageWidth / 2, 50, { align: "center" });

      doc.setFontSize(28);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(20, 35, 60);
      doc.text("Global Health Access Trust", pageWidth / 2, 85, { align: "center" });

      doc.setFontSize(20);
      doc.setTextColor(60);
      doc.text("System Manual", pageWidth / 2, 100, { align: "center" });

      doc.setDrawColor(180, 160, 120);
      doc.setLineWidth(0.5);
      doc.line(margin + 30, 110, pageWidth - margin - 30, 110);

      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(80);
      doc.text(`Version ${MANUAL_VERSION}`, pageWidth / 2, 125, { align: "center" });
      doc.text(`Generated: ${format(new Date(), "dd MMMM yyyy, HH:mm")}`, pageWidth / 2, 135, { align: "center" });

      doc.setFontSize(10);
      doc.setTextColor(100);
      const descLines = doc.splitTextToSize(
        "This document reflects the live operational state of the Global Health Access Trust platform, including all systems, data structures, and administrative controls.",
        contentWidth - 20
      );
      descLines.forEach((line: string, i: number) => {
        doc.text(line, pageWidth / 2, 160 + i * 5, { align: "center" });
      });

      // ── 1. EXECUTIVE SUMMARY ────────────────────────────────────────────
      addSectionDivider("Executive Summary", 1);
      addText("A unified platform managing public engagement, donor activity, volunteer coordination, and administrative control.");
      y += 4;
      addHeading("System Statistics", 13);
      addBullet(`Total Pages: ${PAGE_REGISTRY.length}`);
      addBullet(`Total Admin Systems: ${ADMIN_ROUTES.length}`);
      addBullet(`Total Database Tables: ${DB_TABLES.length}`);
      addBullet(`Total Forms: ${FORMS_DATA.length}`);
      addBullet(`Registered Users: ${liveStats.totalUsers}`);
      addBullet(`Total Donations: ${liveStats.totalDonations}`);
      addBullet(`Total Enquiries: ${liveStats.totalContacts}`);
      addBullet(`Volunteer Applications: ${liveStats.totalVolunteers}`);
      addBullet(`Commissioned Projects: ${liveStats.totalProjects}`);
      addBullet(`Audit Log Entries: ${liveStats.totalAuditLogs}`);

      // ── 2. SYSTEM PRIORITY LAYERS ───────────────────────────────────────
      addSectionDivider("System Priority Layers", 2);
      SYSTEM_PRIORITY_LAYERS.forEach((layer) => {
        addHeading(layer.layer, 14);
        addText(layer.description);
        layer.systems.forEach((s) => addBullet(s));
        y += 4;
      });

      // ── 3. SITE OVERVIEW ────────────────────────────────────────────────
      addSectionDivider("Site Overview", 3);
      addText(`Project: ${SITE_OVERVIEW.projectName}`);
      addText(`Domain: ${SITE_OVERVIEW.domain}`);
      addText(`Purpose: ${SITE_OVERVIEW.purpose}`);
      addText(`Positioning: ${SITE_OVERVIEW.positioning}`);

      // ── 4. ACTIVITY INDICATORS ──────────────────────────────────────────
      addSectionDivider("Activity Indicators", 4);
      const activityItems = [
        { system: "Inbound Contacts", count: liveStats.totalContacts, last: liveStats.lastContact },
        { system: "Donations", count: liveStats.totalDonations, last: liveStats.lastDonation },
        { system: "Volunteer Applications", count: liveStats.totalVolunteers, last: liveStats.lastVolunteer },
        { system: "Commissioned Projects", count: liveStats.totalProjects, last: null },
        { system: "Messages", count: liveStats.totalMessages, last: null },
        { system: "Audit Logs", count: liveStats.totalAuditLogs, last: liveStats.lastAuditLog },
      ];
      activityItems.forEach((a) => {
        checkPage(12);
        addHeading(a.system, 12);
        addBullet(`Total records: ${a.count}`);
        addBullet(`Last activity: ${a.last ? format(new Date(a.last), "dd MMM yyyy, HH:mm") : "No activity"}`);
        y += 2;
      });

      // ── 5. PAGE REGISTRY ────────────────────────────────────────────────
      addSectionDivider("Page Registry", 5);
      const categories = [...new Set(PAGE_REGISTRY.map((p) => p.category))];
      categories.forEach((cat) => {
        addHeading(cat, 13);
        PAGE_REGISTRY.filter((p) => p.category === cat).forEach((p) => {
          checkPage(8);
          addBullet(`${p.route} — ${p.title} ${p.hasForm ? "[FORM]" : ""}: ${p.sections}`);
        });
        y += 4;
      });

      // ── 6. FORMS ────────────────────────────────────────────────────────
      addSectionDivider("Forms & Data Capture", 6);
      FORMS_DATA.forEach((form) => {
        addHeading(`${form.name} (${form.location})`, 13);
        addText(`Database table: ${form.table}`);
        form.fields.forEach((f) => {
          addBullet(`${f.name} [${f.type}] ${f.required ? "(required)" : "(optional)"} → ${f.dbColumn}`);
        });
        y += 4;
      });

      // ── 7. DATABASE SCHEMA ──────────────────────────────────────────────
      addSectionDivider("Database Schema", 7);
      DB_TABLES.forEach((table) => {
        checkPage(20);
        addHeading(table.name, 13);
        addText(table.description);
        table.fields.forEach((f) => addBullet(f));
        y += 4;
      });

      // ── 8. ADMIN SYSTEMS ────────────────────────────────────────────────
      addSectionDivider("Admin Systems", 8);
      ADMIN_ROUTES.forEach((r) => {
        checkPage(10);
        addBullet(`${r.route} — ${r.feature} [Access: ${r.access}]`);
      });

      // ── 9. SECURITY ─────────────────────────────────────────────────────
      addSectionDivider("Security & Compliance", 9);
      addHeading("Authentication", 13);
      SECURITY_CONFIG.authentication.forEach((r) => addBullet(r));
      y += 4;
      addHeading("Row Level Security (RLS)", 13);
      SECURITY_CONFIG.rls.forEach((r) => addBullet(r));
      y += 4;
      addHeading("Security Headers", 13);
      SECURITY_CONFIG.headers.forEach((r) => addBullet(r));
      y += 4;
      addHeading("Indexing & Visibility", 13);
      SECURITY_CONFIG.indexing.forEach((r) => addBullet(r));

      // ── 10. DESIGN SYSTEM ───────────────────────────────────────────────
      addSectionDivider("Design System", 10);
      addHeading("Typography", 13);
      DESIGN_SYSTEM.fonts.forEach((f) => addBullet(`${f.usage}: ${f.font}`));
      y += 4;
      addHeading("Colour Palette", 13);
      DESIGN_SYSTEM.colors.forEach((c) => addBullet(`${c.name}: ${c.value}`));
      y += 4;
      addHeading("Layout Rules", 13);
      DESIGN_SYSTEM.layout.forEach((l) => addBullet(l));

      // ── 11. SEO ─────────────────────────────────────────────────────────
      addSectionDivider("SEO & Technical", 11);
      addBullet("Unique meta titles and descriptions on all pages");
      addBullet("Single H1 per page with semantic heading hierarchy");
      addBullet("Canonical URLs on all pages");
      addBullet("Open Graph tags for social sharing");
      addBullet("XML Sitemap at /sitemap.xml");
      addBullet("robots.txt configured at /robots.txt");
      addBullet("Lazy loading on images");
      addBullet("React 18 + Vite + Tailwind CSS + TypeScript");
      addBullet("Lovable Cloud backend (database, auth, storage, edge functions)");

      // Add final footer
      addFooter();

      const dateStr = format(new Date(), "yyyy-MM-dd");
      doc.save(`GHAT_System_Manual_${dateStr}.pdf`);
      toast.success("System manual PDF downloaded");
    } catch (err) {
      console.error(err);
      toast.error("Failed to generate PDF");
    } finally {
      setGenerating(false);
    }
  };

  // ─── RENDER ──────────────────────────────────────────────────────────────────

  return (
    <div className="space-y-6">
      <SEO title="System Manual | Admin" description="Live system documentation and manual." noindex />

      {/* Cover Header */}
      <div className="border rounded-lg p-6 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <Badge variant="outline" className="mb-2 text-xs">v{MANUAL_VERSION} — CONFIDENTIAL</Badge>
            <h1 className="text-2xl font-serif font-bold">System Manual</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Global Health Access Trust — Live Documentation
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Snapshot: {format(new Date(), "dd MMMM yyyy, HH:mm")}
            </p>
          </div>
          <Button onClick={generatePDF} disabled={generating} size="lg">
            <Download className="h-4 w-4 mr-2" />
            {generating ? "Generating…" : "Download Manual (PDF)"}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-3 border-t pt-3 border-border/50">
          This document reflects the live operational state of the platform, including all systems, data structures, and administrative controls.
        </p>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search manual…" value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
      </div>

      {/* Quick nav */}
      <div className="flex flex-wrap gap-2">
        {NAV_ITEMS.map((item) => (
          <Button key={item.id} variant="outline" size="sm" onClick={() => scrollTo(item.id)} className="text-xs">
            <item.icon className="h-3 w-3 mr-1" />
            {item.label}
          </Button>
        ))}
      </div>

      {/* SECTIONS */}
      <div className="space-y-3">
        {/* 1. Executive Summary */}
        <ManualSection id="executive" title="Executive Summary" icon={BarChart3} defaultOpen>
          <div className="space-y-4 text-sm">
            <p className="text-muted-foreground">
              A unified platform managing public engagement, donor activity, volunteer coordination, and administrative control.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: "Pages", value: PAGE_REGISTRY.length },
                { label: "Admin Systems", value: ADMIN_ROUTES.length },
                { label: "Database Tables", value: DB_TABLES.length },
                { label: "Forms", value: FORMS_DATA.length },
              ].map((s) => (
                <Card key={s.label} className="text-center">
                  <CardContent className="pt-4 pb-3">
                    <p className="text-2xl font-bold">{s.value}</p>
                    <p className="text-xs text-muted-foreground">{s.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: "Users", value: liveStats.totalUsers },
                { label: "Donations", value: liveStats.totalDonations },
                { label: "Enquiries", value: liveStats.totalContacts },
                { label: "Volunteers", value: liveStats.totalVolunteers },
              ].map((s) => (
                <Card key={s.label} className="text-center border-primary/20">
                  <CardContent className="pt-4 pb-3">
                    <p className="text-2xl font-bold text-primary">{s.value}</p>
                    <p className="text-xs text-muted-foreground">{s.label} (live)</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </ManualSection>

        {/* 2. System Priority Layers */}
        <ManualSection id="priority" title="System Priority Layers" icon={Layers} searchMatch={matchesSearch("priority layer external core internal")}>
          <div className="space-y-4 text-sm">
            {SYSTEM_PRIORITY_LAYERS.map((layer, i) => (
              <Card key={layer.layer}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Badge variant={i === 0 ? "default" : i === 1 ? "secondary" : "outline"} className="text-xs">
                      Layer {i + 1}
                    </Badge>
                    {layer.layer}
                  </CardTitle>
                  <p className="text-xs text-muted-foreground">{layer.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1">
                    {layer.systems.map((s) => (
                      <li key={s} className="flex items-center gap-2 text-sm">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </ManualSection>

        {/* 3. Site Overview */}
        <ManualSection id="overview" title="Site Overview" icon={Globe} searchMatch={matchesSearch("overview site project domain")}>
          <div className="space-y-3 text-sm">
            <div><strong>Project:</strong> {SITE_OVERVIEW.projectName}</div>
            <div><strong>Domain:</strong> {SITE_OVERVIEW.domain}</div>
            <div><strong>Purpose:</strong> {SITE_OVERVIEW.purpose}</div>
            <div><strong>Positioning:</strong> {SITE_OVERVIEW.positioning}</div>
          </div>
        </ManualSection>

        {/* 4. Activity Indicators */}
        <ManualSection id="activity" title="Activity Indicators" icon={Activity} searchMatch={matchesSearch("activity count last submission")}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            {[
              { system: "Inbound Contacts", count: liveStats.totalContacts, last: liveStats.lastContact },
              { system: "Donations", count: liveStats.totalDonations, last: liveStats.lastDonation },
              { system: "Volunteer Applications", count: liveStats.totalVolunteers, last: liveStats.lastVolunteer },
              { system: "Commissioned Projects", count: liveStats.totalProjects, last: null },
              { system: "Messages", count: liveStats.totalMessages, last: null },
              { system: "Audit Logs", count: liveStats.totalAuditLogs, last: liveStats.lastAuditLog },
            ].map((a) => (
              <Card key={a.system}>
                <CardContent className="pt-4 pb-3">
                  <p className="font-medium">{a.system}</p>
                  <div className="flex justify-between mt-1">
                    <span className="text-muted-foreground text-xs">Records:</span>
                    <span className="font-bold">{a.count}</span>
                  </div>
                  <div className="flex justify-between mt-0.5">
                    <span className="text-muted-foreground text-xs">Last activity:</span>
                    <span className="text-xs">{formatTimestamp(a.last)}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ManualSection>

        {/* 5. Page Registry */}
        <ManualSection id="pages" title="Page Registry" icon={Layout} searchMatch={matchesSearch("page route url")}>
          <div className="space-y-4 text-sm">
            {([...new Set(PAGE_REGISTRY.map((p) => p.category))] as string[]).map((cat) => (
              <div key={cat}>
                <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                  <Badge variant="outline">{cat}</Badge>
                  <span className="text-muted-foreground text-xs">
                    ({PAGE_REGISTRY.filter((p) => p.category === cat).length} pages)
                  </span>
                </h4>
                <div className="space-y-1 ml-2">
                  {PAGE_REGISTRY.filter((p) => p.category === cat)
                    .filter((p) => matchesSearch(`${p.route} ${p.title} ${p.sections}`))
                    .map((p) => (
                      <div key={p.route} className="flex gap-3 py-1 border-b border-border/50 last:border-0 items-center">
                        <code className="text-xs bg-muted px-1.5 py-0.5 rounded min-w-[180px]">{p.route}</code>
                        <span className="font-medium min-w-[140px]">{p.title}</span>
                        {p.hasForm && <Badge className="text-[10px] bg-amber-100 text-amber-800 border-amber-300">Form</Badge>}
                        <span className="text-muted-foreground text-xs flex-1">{p.sections}</span>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </ManualSection>

        {/* 6. Forms */}
        <ManualSection id="forms" title="Forms & Data Capture" icon={FormInput} searchMatch={matchesSearch("form field input contact")}>
          <div className="space-y-6 text-sm">
            {FORMS_DATA.map((form) => (
              <Card key={form.location}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{form.name}</CardTitle>
                  <p className="text-xs text-muted-foreground">Location: {form.location} → Table: <code>{form.table}</code></p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    {form.fields.map((f) => (
                      <div key={f.name} className="flex items-center gap-3 py-1 border-b border-border/30 last:border-0">
                        <span className="min-w-[160px] font-medium">{f.name}</span>
                        <Badge variant="outline" className="text-xs">{f.type}</Badge>
                        {f.required ? (
                          <Badge className="text-xs bg-red-100 text-red-700 border-red-300">Required</Badge>
                        ) : (
                          <Badge variant="secondary" className="text-xs">Optional</Badge>
                        )}
                        <code className="text-xs text-muted-foreground ml-auto">→ {f.dbColumn}</code>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ManualSection>

        {/* 7. Database Schema */}
        <ManualSection id="database" title="Database Schema" icon={Database} searchMatch={matchesSearch("database table column schema")}>
          <div className="space-y-4 text-sm">
            {DB_TABLES.filter((t) => matchesSearch(`${t.name} ${t.description}`)).map((table) => (
              <Card key={table.name}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-mono">{table.name}</CardTitle>
                  <p className="text-xs text-muted-foreground">{table.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1.5">
                    {table.fields.map((f) => (
                      <Badge key={f} variant="outline" className="text-xs font-mono">{f}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ManualSection>

        {/* 8. Admin Systems */}
        <ManualSection id="admin" title="Admin Systems" icon={Settings} searchMatch={matchesSearch("admin route dashboard")}>
          <div className="space-y-1 text-sm">
            {ADMIN_ROUTES.map((r) => (
              <div key={r.route} className="flex gap-3 py-2 border-b border-border/50 last:border-0">
                <code className="text-xs bg-muted px-1.5 py-0.5 rounded min-w-[180px]">{r.route}</code>
                <span className="flex-1">{r.feature}</span>
                <Badge variant="outline" className="text-xs">{r.access}</Badge>
              </div>
            ))}
          </div>
        </ManualSection>

        {/* 9. Security */}
        <ManualSection id="security" title="Security & Compliance" icon={Shield} searchMatch={matchesSearch("security rls auth password gdpr")}>
          <div className="space-y-4 text-sm">
            {Object.entries(SECURITY_CONFIG).map(([key, items]) => (
              <div key={key}>
                <h4 className="font-semibold capitalize mb-2">{key.replace(/_/g, " ")}</h4>
                <ul className="space-y-1 ml-4">
                  {items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Lock className="h-3 w-3 mt-1 text-primary shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </ManualSection>

        {/* 10. Design System */}
        <ManualSection id="design" title="Design System" icon={Palette} searchMatch={matchesSearch("font color design layout style")}>
          <div className="space-y-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2">Typography</h4>
              {DESIGN_SYSTEM.fonts.map((f) => (
                <div key={f.usage} className="flex gap-3 py-1">
                  <span className="font-medium min-w-[100px]">{f.usage}:</span>
                  <span>{f.font}</span>
                </div>
              ))}
            </div>
            <div>
              <h4 className="font-semibold mb-2">Colour Palette</h4>
              <div className="flex flex-wrap gap-3">
                {DESIGN_SYSTEM.colors.map((c) => (
                  <div key={c.name} className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded border" style={{ backgroundColor: c.value }} />
                    <div>
                      <p className="font-medium text-xs">{c.name}</p>
                      <p className="text-xs text-muted-foreground">{c.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Layout Rules</h4>
              <ul className="space-y-1 ml-4">
                {DESIGN_SYSTEM.layout.map((l, i) => (
                  <li key={i} className="list-disc text-muted-foreground">{l}</li>
                ))}
              </ul>
            </div>
          </div>
        </ManualSection>

        {/* 11. SEO & Technical */}
        <ManualSection id="seo" title="SEO & Technical" icon={FileText} searchMatch={matchesSearch("seo meta sitemap robots performance")}>
          <div className="space-y-3 text-sm">
            <div>
              <h4 className="font-semibold mb-2">Meta Configuration</h4>
              <ul className="space-y-1 ml-4">
                <li className="list-disc">Unique meta titles and descriptions on all pages</li>
                <li className="list-disc">Single H1 per page with semantic heading hierarchy</li>
                <li className="list-disc">Canonical URLs on all pages</li>
                <li className="list-disc">Open Graph tags for social sharing</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Technical Stack</h4>
              <ul className="space-y-1 ml-4">
                <li className="list-disc">XML Sitemap at /sitemap.xml</li>
                <li className="list-disc">robots.txt configured at /robots.txt</li>
                <li className="list-disc">Lazy loading on images</li>
                <li className="list-disc">React 18 + Vite + Tailwind CSS + TypeScript</li>
                <li className="list-disc">Lovable Cloud backend (database, auth, storage, edge functions)</li>
              </ul>
            </div>
          </div>
        </ManualSection>

        {/* 12. Change Log */}
        <ManualSection id="changelog" title="Change Log" icon={BookOpen} searchMatch={matchesSearch("change log update history")}>
          <div className="space-y-2 text-sm">
            <p className="text-muted-foreground mb-3">
              Recent system changes tracked automatically via audit logs.
            </p>
            <ChangeLogEntries />
          </div>
        </ManualSection>
      </div>
    </div>
  );
};

// ─── CHANGE LOG (LIVE FROM AUDIT_LOGS) ─────────────────────────────────────────

const ChangeLogEntries = () => {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      const { data, error } = await supabase
        .from("audit_logs")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(50);
      if (!error && data) setLogs(data);
      setLoading(false);
    };
    fetchLogs();
  }, []);

  if (loading) return <p className="text-muted-foreground">Loading change log…</p>;
  if (logs.length === 0) return <p className="text-muted-foreground">No changes recorded yet.</p>;

  return (
    <div className="space-y-1">
      {logs.map((log) => (
        <div key={log.id} className="flex items-start gap-3 py-2 border-b border-border/30 last:border-0">
          <span className="text-xs text-muted-foreground whitespace-nowrap min-w-[130px]">
            {format(new Date(log.created_at), "dd MMM yyyy HH:mm")}
          </span>
          <Badge variant="outline" className="text-xs">{log.action_type || "action"}</Badge>
          <span className="text-sm">{log.action}</span>
        </div>
      ))}
    </div>
  );
};
