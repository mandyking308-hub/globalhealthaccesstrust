import { AIChatWidget } from "./AIchatWidget";
import { Brain } from "lucide-react";

export const AdminAIPanel = () => {
  return (
    <AIChatWidget
      title="Operations AI"
      subtitle="Your intelligent coordination assistant"
      endpoint="admin-ai-assistant"
      userId="admin"
      icon={<Brain className="w-5 h-5 text-primary" />}
      accentColor="primary"
      defaultExpanded={false}
    />
  );
};