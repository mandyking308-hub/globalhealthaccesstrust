import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { TranslationProvider } from "@/hooks/useTranslation";
import { Layout } from "./components/layout/Layout";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
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
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="what-we-do" element={<WhatWeDoPage />} />
            <Route path="blog" element={<BlogIndexPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="get-involved" element={<GetInvolvedPage />} />
            <Route path="donate" element={<DonatePage />} />
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
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </TranslationProvider>
  </QueryClientProvider>
);

export default App;
