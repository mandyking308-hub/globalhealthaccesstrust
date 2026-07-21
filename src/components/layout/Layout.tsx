import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { CookieBanner } from "@/components/CookieBanner";
import { Analytics } from "@/components/Analytics";
import { ContentProtection } from "@/components/ContentProtection";
import "@/styles/ghat-public.css";

export const Layout = () => {
  return (
    <div className="ghat-public-shell min-h-screen flex flex-col">
      <Header />
      <main id="main-content" className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <CookieBanner />
      <Analytics />
      <ContentProtection />
    </div>
  );
};
