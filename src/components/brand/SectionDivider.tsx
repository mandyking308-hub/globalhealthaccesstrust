import { cn } from "@/lib/utils";

interface SectionDividerProps {
  className?: string;
  withAccent?: boolean;
}

export const SectionDivider = ({ className, withAccent = true }: SectionDividerProps) => {
  return (
    <div 
      className={cn(
        "border-t border-border",
        withAccent && "relative before:content-[''] before:absolute before:left-0 before:top-0 before:w-20 before:h-0.5 before:bg-[#C2A878]",
        className
      )} 
    />
  );
};
