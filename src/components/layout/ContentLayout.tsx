import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface ContentLayoutProps {
  children: ReactNode;
  className?: string;
}

export const ContentLayout = ({ children, className = "" }: ContentLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <div className="content-wrapper">
        <Card className="shadow-lg">
          <CardContent className={`content-prose p-8 lg:p-12 ${className}`}>
            {children}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};