import { AIChatWidget } from "./AIchatWidget";
import { HeartHandshake } from "lucide-react";

interface VolunteerAIWidgetProps {
  volunteerId: string;
}

export const VolunteerAIWidget = ({ volunteerId }: VolunteerAIWidgetProps) => {
  return (
    <AIChatWidget
      title="Field Support AI"
      subtitle="Your coordination partner in the field"
      endpoint="volunteer-ai-assistant"
      userId={volunteerId}
      icon={<HeartHandshake className="w-5 h-5 text-primary" />}
      accentColor="primary"
    />
  );
};