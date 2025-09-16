import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import { NotFoundPage } from "./pages/NotFoundPage";
import { DonatePage } from "./pages/DonatePage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
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
            <Route path="anti-fraud" element={<AntiFraudPage />} />
            <Route path="whistleblowing" element={<WhistleblowingPage />} />
            <Route path="governance" element={<GovernancePage />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
