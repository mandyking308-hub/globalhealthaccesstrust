import { AIChatWidget } from "./AIchatWidget";

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
      accentColor="primary"
    />
  );
};