import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { TranslationProvider } from "@/hooks/useTranslation";
import { Layout } from "./components/layout/Layout";
import { TestingChecklistPage } from "./pages/TestingChecklistPage";
import { VolunteersPage } from "./pages/VolunteersPage";
import { VolunteerDashboardPage } from "./pages/VolunteerDashboardPage";
import { CommissionProjectsPage } from "./pages/CommissionProjectsPage";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { AboutTheTrustPage } from "./pages/AboutTheTrustPage";
import { TrusteeBiographiesPage } from "./pages/TrusteeBiographiesPage";
import { GovernanceLegalFrameworkPage } from "./pages/GovernanceLegalFrameworkPage";
import { OurWorkPage } from "./pages/OurWorkPage";
import { HowWeWorkPage } from "./pages/HowWeWorkPage";
import { DonorRecognitionPage } from "./pages/DonorRecognitionPage";
import { SupportTheTrustPage } from "./pages/SupportTheTrustPage";
import { FrequentlyAskedQuestionsPage } from "./pages/FrequentlyAskedQuestionsPage";
import { ContactTheTrustPage } from "./pages/ContactTheTrustPage";
import { WhatWeDoPage } from "./pages/WhatWeDoPage";
import { BlogIndexPage } from "./pages/BlogIndexPage";
import { BlogPostPage } from "./pages/BlogPostPage";
import { GetInvolvedPage } from "./pages/GetInvolvedPage";
import { PublicationsPage } from "./pages/PublicationsPage";
import { ContactPage } from "./pages/ContactPage";
import { ConstitutionPage } from "./pages/ConstitutionPage";
import { PrivacyPolicyPage } from "./pages/PrivacyPolicyPage";
import { CookiePolicyPage } from "./pages/CookiePolicyPage";
import { TermsOfUsePage } from "./pages/TermsOfUsePage";
import { AccessibilityStatementPage } from "./pages/AccessibilityStatementPage";
import { SafeguardingPage, AntiFraudPage, WhistleblowingPage, GovernancePage } from "./pages/SafeguardingPage";
import { ConflictOfInterestPage } from "./pages/ConflictOfInterestPage";
import { FinancialControlsPage } from "./pages/FinancialControlsPage";
import { RiskManagementPage } from "./pages/RiskManagementPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { DonatePage } from "./pages/DonatePage";
import { DonationFormPage } from "./pages/DonationFormPage";
import { DonorGuidePage } from "./pages/DonorGuidePage";
import { AuthPage } from "./pages/AuthPage";
import { DonorDashboardPage } from "./pages/DonorDashboardPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import { AdminLayout } from "./components/admin/AdminLayout";
import { AdminDashboardPage as NewAdminDashboardPage } from "./pages/admin/AdminDashboardPage";
import { AdminDonorsPage } from "./pages/admin/AdminDonorsPage";
import { AdminVolunteersPage } from "./pages/admin/AdminVolunteersPage";
import { AdminProjectsPage } from "./pages/admin/AdminProjectsPage";
import { AdminEvidencePage } from "./pages/admin/AdminEvidencePage";
import { AdminMessagesPage } from "./pages/admin/AdminMessagesPage";
import { AdminAIPage } from "./pages/admin/AdminAIPage";
import { AdminSecurityPage } from "./pages/admin/AdminSecurityPage";
import { AdminSettingsPage } from "./pages/admin/AdminSettingsPage";
import { AdminGDPRPage } from "./pages/admin/AdminGDPRPage";
import { AdminTestingChecklistPage } from "./pages/admin/AdminTestingChecklistPage";
import { AdminBrandingPage } from "./pages/admin/AdminBrandingPage";
import { AdminDocumentationPage } from "./pages/admin/AdminDocumentationPage";
import { AdminPresentationsPage } from "./pages/admin/AdminPresentationsPage";
import { AdminSystemHealthPage } from "./pages/admin/AdminSystemHealthPage";
import { AdminLaunchChecklistPage } from "./pages/admin/AdminLaunchChecklistPage";
import { AdminContactsPage } from "./pages/admin/AdminContactsPage";
import { AdminManualPage } from "./pages/admin/AdminManualPage";
import AdminServiceConsolePage from "./pages/admin/AdminServiceConsolePage";
import AdminAgreementsPage from "./pages/admin/AdminAgreementsPage";
import { DataAccessRequestPage } from "./pages/DataAccessRequestPage";
import AdminLegalPage from "./pages/admin/AdminLegalPage";
import LegalIndexPage from "./pages/LegalIndexPage";
import LegalDocumentPage from "./pages/LegalDocumentPage";
import { DonationSuccessPage } from "./pages/DonationSuccessPage";
import { DonationCancelledPage } from "./pages/DonationCancelledPage";
import AdminPaymentsPage from "./pages/admin/AdminPaymentsPage";

const queryClient = new QueryClient();

// Component to handle scroll-to-top on route changes
const ScrollToTop = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Set scroll restoration to manual
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    
    // Scroll to top on route change (unless there's a hash)
    if (!location.hash) {
      window.scrollTo(0, 0);
    }
  }, [location]);
  
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TranslationProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <ScrollToTop />
        <Routes>
          <Route path="learn-about-our-mission" element={<Navigate to="/about-the-trust" replace />} />
          <Route path="volunteers" element={<Navigate to="/volunteer-apply" replace />} />
          <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about-the-trust" element={<AboutTheTrustPage />} />
          <Route path="trustee-biographies" element={<TrusteeBiographiesPage />} />
          <Route path="governance-legal-framework" element={<GovernanceLegalFrameworkPage />} />
          <Route path="our-work" element={<OurWorkPage />} />
          <Route path="how-we-work" element={<HowWeWorkPage />} />
          <Route path="support-the-trust" element={<SupportTheTrustPage />} />
          <Route path="donor-recognition" element={<DonorRecognitionPage />} />
          <Route path="frequently-asked-questions" element={<FrequentlyAskedQuestionsPage />} />
          <Route path="contact-the-trust" element={<ContactTheTrustPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="what-we-do" element={<WhatWeDoPage />} />
          <Route path="blog" element={<BlogIndexPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="get-involved" element={<GetInvolvedPage />} />
          <Route path="donate" element={<DonatePage />} />
          <Route path="commission-projects" element={<CommissionProjectsPage />} />
          <Route path="publications" element={<PublicationsPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="constitution" element={<ConstitutionPage />} />
          
          {/* Governance & Policy Pages */}
          <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="cookie-policy" element={<CookiePolicyPage />} />
          <Route path="terms-of-use" element={<TermsOfUsePage />} />
          <Route path="data-access-request" element={<DataAccessRequestPage />} />
          <Route path="accessibility-statement" element={<AccessibilityStatementPage />} />
          <Route path="safeguarding" element={<SafeguardingPage />} />
          <Route path="conflict-of-interest" element={<ConflictOfInterestPage />} />
          <Route path="financial-controls" element={<FinancialControlsPage />} />
          <Route path="risk-management" element={<RiskManagementPage />} />
          <Route path="anti-fraud" element={<AntiFraudPage />} />
          <Route path="whistleblowing" element={<WhistleblowingPage />} />
          <Route path="governance" element={<GovernancePage />} />
          <Route path="legal" element={<LegalIndexPage />} />
          <Route path="legal/:slug" element={<LegalDocumentPage />} />
        </Route>
        
          {/* Donor Portal Routes (outside Layout - full page) */}
          <Route path="donate" element={<DonatePage />} />
          <Route path="donation-form" element={<DonationFormPage />} />
          <Route path="donor-guide" element={<DonorGuidePage />} />
          <Route path="auth" element={<AuthPage />} />
          <Route path="donor-dashboard" element={<DonorDashboardPage />} />
          <Route path="admin-dashboard" element={<AdminDashboardPage />} />
          
          {/* New Admin Console Routes */}
          <Route path="admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<NewAdminDashboardPage />} />
            <Route path="donors" element={<AdminDonorsPage />} />
            <Route path="volunteers" element={<AdminVolunteersPage />} />
            <Route path="projects" element={<AdminProjectsPage />} />
            <Route path="evidence" element={<AdminEvidencePage />} />
            <Route path="messages" element={<AdminMessagesPage />} />
            <Route path="ai" element={<AdminAIPage />} />
            <Route path="security" element={<AdminSecurityPage />} />
            <Route path="gdpr" element={<AdminGDPRPage />} />
            <Route path="testing" element={<AdminTestingChecklistPage />} />
            <Route path="documentation" element={<AdminDocumentationPage />} />
            <Route path="presentations" element={<AdminPresentationsPage />} />
            <Route path="system-health" element={<AdminSystemHealthPage />} />
            <Route path="branding" element={<AdminBrandingPage />} />
            <Route path="launch-checklist" element={<AdminLaunchChecklistPage />} />
            <Route path="contacts" element={<AdminContactsPage />} />
            <Route path="manual" element={<AdminManualPage />} />
            <Route path="service-console" element={<AdminServiceConsolePage />} />
            <Route path="agreements" element={<AdminAgreementsPage />} />
            <Route path="legal" element={<AdminLegalPage />} />
            <Route path="settings" element={<AdminSettingsPage />} />
          </Route>
          
          {/* Project Team Portal Routes (formerly Volunteer Portal) */}
          <Route path="volunteer-apply" element={<VolunteersPage />} />
          <Route path="volunteer-dashboard" element={<VolunteerDashboardPage />} />
          <Route path="project-team-login" element={<Navigate to="/auth?portal=team" replace />} />
          <Route path="donor-login" element={<Navigate to="/auth?portal=donor" replace />} />
          
          {/* Admin Testing Route (Hidden) */}
          <Route path="testing-checklist" element={<TestingChecklistPage />} />
        
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      </TooltipProvider>
    </TranslationProvider>
  </QueryClientProvider>
);

export default App;
