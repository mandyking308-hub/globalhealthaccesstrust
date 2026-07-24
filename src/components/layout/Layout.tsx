import { Outlet, useLocation } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { WorkNavigationStrip } from "./WorkNavigationStrip";
import { CookieBanner } from "@/components/CookieBanner";
import { Analytics } from "@/components/Analytics";
import { ContentProtection } from "@/components/ContentProtection";
import { HomepageWorkstreamsSection } from "@/components/workstreams/HomepageWorkstreamsSection";
import { WorkstreamFormContext } from "@/components/workstreams/WorkstreamFormContext";
import "@/styles/workstream-type-overrides.css";

export const Layout = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <WorkNavigationStrip />
      <WorkstreamFormContext />
      <main id="main-content" className="flex-grow">
        <Outlet />
        {location.pathname === "/" && <HomepageWorkstreamsSection />}
      </main>
      <Footer />
      <CookieBanner />
      <Analytics />
      <ContentProtection />
    </div>
  );
};
