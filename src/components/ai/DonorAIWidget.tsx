import { AIChatWidget } from "./AIchatWidget";

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
      icon={}
      accentColor="accent"
    />
  );
};