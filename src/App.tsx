import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { TranslationProvider } from "@/hooks/useTranslation";
import { Layout } from "./components/layout/Layout";
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
          <Route path="accessibility-statement" element={<AccessibilityStatementPage />} />
          <Route path="safeguarding" element={<SafeguardingPage />} />
          <Route path="conflict-of-interest" element={<ConflictOfInterestPage />} />
          <Route path="financial-controls" element={<FinancialControlsPage />} />
          <Route path="risk-management" element={<RiskManagementPage />} />
          <Route path="anti-fraud" element={<AntiFraudPage />} />
          <Route path="whistleblowing" element={<WhistleblowingPage />} />
          <Route path="governance" element={<GovernancePage />} />
        </Route>
        
        {/* Donor Portal Routes (outside Layout - full page) */}
          <Route path="donate" element={<DonatePage />} />
          <Route path="donation-form" element={<DonationFormPage />} />
          <Route path="donor-guide" element={<DonorGuidePage />} />
          <Route path="auth" element={<AuthPage />} />
          <Route path="donor-dashboard" element={<DonorDashboardPage />} />
          <Route path="admin-dashboard" element={<AdminDashboardPage />} />
          
          {/* Volunteer Portal Routes */}
          <Route path="volunteers" element={<VolunteersPage />} />
          <Route path="volunteer-dashboard" element={<VolunteerDashboardPage />} />
        
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      </TooltipProvider>
    </TranslationProvider>
  </QueryClientProvider>
);

export default App;
