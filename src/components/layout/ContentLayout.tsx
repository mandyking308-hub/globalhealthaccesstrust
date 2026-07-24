import { Children, Fragment, ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { HistoryVisualInterlude } from "@/components/history/HistoryVisualInterlude";
import "@/styles/history-editorial.css";

interface ContentLayoutProps {
  children: ReactNode;
  className?: string;
}

const decadeRoutes = new Set([
  "/our-history/1991-1999",
  "/our-history/2000-2009",
  "/our-history/2010-2019",
  "/our-history/2020-2026",
]);

export const ContentLayout = ({ children, className = "" }: ContentLayoutProps) => {
  const location = useLocation();
  const childItems = Children.toArray(children);
  const isHistoryRoute = location.pathname === "/our-history" || location.pathname.startsWith("/our-history/");
  const isDecadeRoute = decadeRoutes.has(location.pathname);
  const visualAfter = Math.min(2, Math.max(0, childItems.length - 2));

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[1100px] mx-auto px-6 sm:px-8 lg:px-12 py-16 md:py-24 lg:py-32">
        <div className={`content-prose content-layout ${isHistoryRoute ? "history-editorial" : ""} ${className}`}>
          {childItems.map((child, index) => (
            <Fragment key={index}>
              {child}
              {isDecadeRoute && index === visualAfter && <HistoryVisualInterlude pathname={location.pathname} />}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
