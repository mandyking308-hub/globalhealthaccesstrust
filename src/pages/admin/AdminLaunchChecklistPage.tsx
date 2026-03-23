import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface ChecklistItem {
  id: string;
  label: string;
  completed: boolean;
  notes: string;
  timestamp?: string;
}

export const AdminLaunchChecklistPage = () => {
  const { toast } = useToast();
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [contentFreezeMode, setContentFreezeMode] = useState(false);

  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>([
    { id: "1", label: "Donor login tested", completed: false, notes: "" },
    { id: "2", label: "Volunteer login tested", completed: false, notes: "" },
    { id: "3", label: "Admin login tested", completed: false, notes: "" },
    { id: "4", label: "2FA tested", completed: false, notes: "" },
    { id: "5", label: "GDPR tools tested", completed: false, notes: "" },
    { id: "6", label: "Evidence uploads tested", completed: false, notes: "" },
    { id: "7", label: "Messaging flows tested", completed: false, notes: "" },
    { id: "8", label: "AI widgets verified", completed: false, notes: "" },
    { id: "9", label: "Project commissioning tested", completed: false, notes: "" },
    { id: "10", label: "Project completion tested", completed: false, notes: "" },
    { id: "11", label: "PDF receipt generation tested", completed: false, notes: "" },
    { id: "12", label: "Certificate generation tested", completed: false, notes: "" },
    { id: "13", label: "Admin alerts functioning", completed: false, notes: "" },
    { id: "14", label: "System Health dashboard passing", completed: false, notes: "" },
    { id: "15", label: "Documentation Hub reviewed", completed: false, notes: "" },
    { id: "16", label: "Branding verified", completed: false, notes: "" },
    { id: "17", label: "Cookie banner tested", completed: false, notes: "" },
    { id: "18", label: "Privacy Policy reviewed", completed: false, notes: "" },
    { id: "19", label: "All links checked", completed: false, notes: "" },
  ]);

  const handleCheckboxChange = (id: string) => {
    setChecklistItems((items) =>
      items.map((item) =>
        item.id === id
          ? {
              ...item,
              completed: !item.completed,
              timestamp: !item.completed ? new Date().toISOString() : undefined,
            }
          : item
      )
    );
  };

  const handleNotesChange = (id: string, notes: string) => {
    setChecklistItems((items) =>
      items.map((item) => (item.id === id ? { ...item, notes } : item))
    );
  };

  const completedCount = checklistItems.filter((item) => item.completed).length;
  const totalCount = checklistItems.length;
  const progressPercentage = Math.round((completedCount / totalCount) * 100);

  const handleExportBackup = async () => {
    toast({
      title: "Backup Export",
      description: "Platform backup generation started...",
    });
  };

  const handleExportLogs = async () => {
    toast({
      title: "Log Export",
      description: "System logs export started...",
    });
  };

  const handleGenerateLaunchReport = async () => {
    toast({
      title: "Launch Report",
      description: "Generating launch summary report...",
    });
  };

  const handleMaintenanceModeToggle = async (enabled: boolean) => {
    setMaintenanceMode(enabled);
    toast({
      title: enabled ? "Maintenance Mode Enabled" : "Maintenance Mode Disabled",
      description: enabled
        ? "Only admins can access the platform"
        : "Platform is now fully accessible",
    });
  };

  const handleContentFreezeToggle = async (enabled: boolean) => {
    setContentFreezeMode(enabled);
    toast({
      title: enabled ? "Content Freeze Enabled" : "Content Freeze Disabled",
      description: enabled
        ? "Donor and volunteer actions are paused"
        : "All platform actions are enabled",
    });
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-serif text-foreground mb-2">Launch Preparation</h1>
        <p className="text-muted-foreground">
          Pre-launch verification, system controls, and go-live toolkit
        </p>
      </div>

      <Tabs defaultValue="checklist" className="space-y-6">
        <TabsList>
          <TabsTrigger value="checklist">Launch Checklist</TabsTrigger>
          <TabsTrigger value="system">System Controls</TabsTrigger>
          <TabsTrigger value="backups">Backups & Export</TabsTrigger>
          <TabsTrigger value="toolkit">Go-Live Toolkit</TabsTrigger>
        </TabsList>

        <TabsContent value="checklist" className="space-y-6">
          <Card className="p-6">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-serif text-foreground mb-1">
                    Pre-Launch Verification
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Complete all checks before going live
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-primary mb-1">
                    {progressPercentage}%
                  </div>
                  <Badge
                    variant={progressPercentage === 100 ? "default" : "secondary"}
                  >
                    {completedCount} / {totalCount} Complete
                  </Badge>
                </div>
              </div>

              <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                <div
                  className="bg-primary h-full transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>

            <div className="space-y-4">
              {checklistItems.map((item) => (
                <Card key={item.id} className="p-4 border-l-4 border-l-primary/20">
                  <div className="flex items-start gap-4">
                    <Checkbox
                      id={item.id}
                      checked={item.completed}
                      onCheckedChange={() => handleCheckboxChange(item.id)}
                      className="mt-1"
                    />
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <label
                          htmlFor={item.id}
                          className={`text-base font-medium cursor-pointer ${
                            item.completed
                              ? "line-through text-muted-foreground"
                              : "text-foreground"
                          }`}
                        >
                          {item.label}
                        </label>
                        {item.timestamp && (
                          <span className="text-xs text-muted-foreground">
                            {new Date(item.timestamp).toLocaleString()}
                          </span>
                        )}
                      </div>
                      <Textarea
                        placeholder="Add notes..."
                        value={item.notes}
                        onChange={(e) => handleNotesChange(item.id, e.target.value)}
                        className="min-h-[60px] text-sm"
                      />
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {progressPercentage === 100 && (
              <div className="mt-6 p-4 bg-primary/10 border border-primary/20 rounded-lg flex items-center gap-3">
                
                <div>
                  <p className="font-semibold text-foreground">
                    All checks complete!
                  </p>
                  <p className="text-sm text-muted-foreground">
                    GHAT is ready for launch
                  </p>
                </div>
              </div>
            )}
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <Card className="p-6">
            <h2 className="text-2xl font-serif text-foreground mb-4">
              System Controls
            </h2>

            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <Label htmlFor="maintenance-mode" className="text-base font-semibold">
                    Maintenance Mode
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Block donor & volunteer access. Only admins can sign in.
                  </p>
                </div>
                <Switch
                  id="maintenance-mode"
                  checked={maintenanceMode}
                  onCheckedChange={handleMaintenanceModeToggle}
                />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <Label htmlFor="content-freeze" className="text-base font-semibold">
                    Content Freeze Mode
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Pause donor project creation and volunteer evidence uploads
                  </p>
                </div>
                <Switch
                  id="content-freeze"
                  checked={contentFreezeMode}
                  onCheckedChange={handleContentFreezeToggle}
                />
              </div>

              {(maintenanceMode || contentFreezeMode) && (
                <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg flex items-start gap-3">
                  
                  <div>
                    <p className="font-semibold text-foreground">Active Restrictions</p>
                    <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                      {maintenanceMode && (
                        <li>• Maintenance Mode: Platform access restricted</li>
                      )}
                      {contentFreezeMode && (
                        <li>• Content Freeze: User actions paused</li>
                      )}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="backups" className="space-y-6">
          <Card className="p-6">
            <h2 className="text-2xl font-serif text-foreground mb-4">
              Backups & Export
            </h2>

            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Full Platform Backup</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Export settings, SOPs, branding config, deck templates, and project
                  metadata
                </p>
                <Button onClick={handleExportBackup} className="w-full sm:w-auto">
                  
                  Export Platform Backup
                </Button>
              </div>

              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Evidence Archive</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Download all evidence files (respects GDPR retention rules)
                </p>
                <Button
                  onClick={handleExportBackup}
                  variant="outline"
                  className="w-full sm:w-auto"
                >
                  
                  Download Evidence Archive
                </Button>
              </div>

              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">System Logs Export</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Export system logs filtered by timeframe
                </p>
                <Button
                  onClick={handleExportLogs}
                  variant="outline"
                  className="w-full sm:w-auto"
                >
                  
                  Export System Logs
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="toolkit" className="space-y-6">
          <Card className="p-6">
            <h2 className="text-2xl font-serif text-foreground mb-4">
              Go-Live Toolkit
            </h2>

            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">AI Message Templates</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Pre-configured welcome messages and onboarding templates
                </p>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full sm:w-auto">
                    Welcome Message - Donors
                  </Button>
                  <Button variant="outline" size="sm" className="w-full sm:w-auto">
                    Welcome Message - Volunteers
                  </Button>
                  <Button variant="outline" size="sm" className="w-full sm:w-auto">
                    First Project Onboarding
                  </Button>
                  <Button variant="outline" size="sm" className="w-full sm:w-auto">
                    Press Announcement Template
                  </Button>
                </div>
              </div>

              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Launch Summary Report</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Auto-generated summary including project status, volunteers, system
                  health, and security status
                </p>
                <Button onClick={handleGenerateLaunchReport} className="w-full sm:w-auto">
                  
                  Generate Launch Report
                </Button>
              </div>

              <div className="p-4 border rounded-lg bg-primary/5">
                <h3 className="font-semibold mb-2 text-primary">Ready to Launch?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Once all checks are complete and you've reviewed the launch report,
                  disable maintenance mode to go live
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Review Final Checklist
                  </Button>
                  <Button size="sm" disabled={progressPercentage !== 100}>
                    
                    Go Live
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
