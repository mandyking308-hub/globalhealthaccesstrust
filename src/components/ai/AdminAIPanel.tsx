import { AIChatWidget } from "./AIchatWidget";

export const AdminAIPanel = () => {
  return (
    <AIChatWidget
      title="Operations AI"
      subtitle="Your intelligent coordination assistant"
      endpoint="admin-ai-assistant"
      userId="admin"
            accentColor="primary"
      defaultExpanded={false}
    />
  );
};