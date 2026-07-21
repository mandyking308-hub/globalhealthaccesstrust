import { ReactNode } from "react";

interface ContentLayoutProps {
  children: ReactNode;
  className?: string;
}

export const ContentLayout = ({ children, className = "" }: ContentLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[1100px] mx-auto px-6 sm:px-8 lg:px-12 py-16 md:py-24 lg:py-32">
        <div className={`content-prose content-layout ${className}`}>
          {children}
        </div>
      </div>
    </div>
  );
};
