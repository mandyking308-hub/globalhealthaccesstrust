import { AIChatWidget } from "./AIchatWidget";
import { Sparkles } from "lucide-react";

interface DonorAIWidgetProps {
  donorId: string;
}

export const DonorAIWidget = ({ donorId }: DonorAIWidgetProps) => {
  return (
    <AIChatWidget
      title="Impact Assistant"
      subtitle="Your personal guide to project clarity"
      endpoint="donor-ai-assistant"
      userId={donorId}
      icon={<Sparkles className="w-5 h-5 text-accent" />}
      accentColor="accent"
    />
  );
};