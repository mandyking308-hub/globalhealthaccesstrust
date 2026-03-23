import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface BrandedCardProps {
  title: string;
  icon?: LucideIcon;
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
}

export const BrandedCard = ({ 
  title, 
  icon: Icon, 
  children, 
  className,
  hoverable = true 
}: BrandedCardProps) => {
  return (
    <Card 
      className={cn(
        "rounded-lg border-border overflow-hidden",
        hoverable && "transition-all duration-300 hover:shadow-xl hover:-translate-y-1",
        className
      )}
    >
      <CardHeader className="border-b border-border/50 bg-gradient-to-r from-primary/5 to-accent/5">
        <CardTitle className="flex items-center gap-3 text-foreground">
          {Icon && <Icon className="w-5 h-5 text-[#C2A878]" strokeWidth={1.5} />}
          <span className="font-serif">{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        {children}
      </CardContent>
    </Card>
  );
};
