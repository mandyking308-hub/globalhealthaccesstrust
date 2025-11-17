import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  centered?: boolean;
}

export const SectionHeading = ({ 
  title, 
  subtitle, 
  className, 
  centered = false 
}: SectionHeadingProps) => {
  return (
    <div className={cn("space-y-2", centered && "text-center", className)}>
      <h2 className="text-3xl md:text-4xl font-serif text-foreground relative inline-block pb-2">
        {title}
        <span className="absolute bottom-0 left-0 w-16 h-0.5 bg-[#C2A878]" />
      </h2>
      {subtitle && (
        <p className="text-base text-muted-foreground max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  );
};
