import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { WorkNavigationStrip } from "./WorkNavigationStrip";
import { CookieBanner } from "@/components/CookieBanner";
import { Analytics } from "@/components/Analytics";
import { WorkstreamFormContext } from "@/components/workstreams/WorkstreamFormContext";
import "@/styles/workstream-type-overrides.css";
import "@/styles/content-selection.css";

export const Layout = () => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <WorkNavigationStrip />
    <WorkstreamFormContext />
    <main id="main-content" className="flex-grow">
      <Outlet />
    </main>
    <Footer />
    <CookieBanner />
    <Analytics />
  </div>
);
