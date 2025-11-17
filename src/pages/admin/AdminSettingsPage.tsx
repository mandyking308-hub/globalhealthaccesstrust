import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { useOnboarding } from "@/hooks/useOnboarding";
import { OnboardingResetButton } from "@/components/settings/OnboardingResetButton";

export const AdminSettingsPage = () => {
  const { resetOnboarding } = useOnboarding("admin");

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-serif text-foreground mb-2">
          Settings
        </h1>
        <p className="text-muted-foreground">System Configuration</p>
      </div>

      <Tabs defaultValue="onboarding" className="space-y-6">
        <TabsList>
          <TabsTrigger value="onboarding">Onboarding</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
          <TabsTrigger value="branding">Branding</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        <TabsContent value="onboarding" className="space-y-4">
          <Card className="p-6">
            <OnboardingResetButton onReset={resetOnboarding} />
          </Card>
        </TabsContent>

        <TabsContent value="system">
          <Card className="p-6">
            <p className="text-muted-foreground">System settings coming soon...</p>
          </Card>
        </TabsContent>

        <TabsContent value="branding">
          <Card className="p-6">
            <p className="text-muted-foreground">Branding settings coming soon...</p>
          </Card>
        </TabsContent>

        <TabsContent value="integrations">
          <Card className="p-6">
            <p className="text-muted-foreground">Integration settings coming soon...</p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
