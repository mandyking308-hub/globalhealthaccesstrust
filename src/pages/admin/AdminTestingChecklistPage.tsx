import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ChecklistItem {
  id: string;
  category: string;
  item: string;
  status: "pass" | "fail" | "pending";
  notes: string;
}

const DEFAULT_CHECKLIST: Omit<ChecklistItem, "status" | "notes">[] = [
  // Donor Dashboard Tests
  { id: "donor-1", category: "Donor Dashboard", item: "Login/logout functionality works correctly" },
  { id: "donor-2", category: "Donor Dashboard", item: "Donation history displays accurately" },
  { id: "donor-3", category: "Donor Dashboard", item: "Commission project form validates correctly" },
  { id: "donor-4", category: "Donor Dashboard", item: "Project tracking shows real-time updates" },
  { id: "donor-5", category: "Donor Dashboard", item: "Milestone cards display properly" },
  { id: "donor-6", category: "Donor Dashboard", item: "Evidence thumbnails load and enlarge" },
  { id: "donor-7", category: "Donor Dashboard", item: "Donor tier badge displays correctly" },
  { id: "donor-8", category: "Donor Dashboard", item: "Profile settings save successfully" },
  
  // Volunteer Dashboard Tests
  { id: "volunteer-1", category: "Volunteer Dashboard", item: "Volunteer application form submits" },
  { id: "volunteer-2", category: "Volunteer Dashboard", item: "CV upload works (PDF/DOCX)" },
  { id: "volunteer-3", category: "Volunteer Dashboard", item: "Project assignments display" },
  { id: "volunteer-4", category: "Volunteer Dashboard", item: "Evidence upload (photo/video/notes)" },
  { id: "volunteer-5", category: "Volunteer Dashboard", item: "Milestone tracking accessible" },
  { id: "volunteer-6", category: "Volunteer Dashboard", item: "Project request system functional" },
  
  // Admin Console Tests
  { id: "admin-1", category: "Admin Console", item: "Dashboard metrics load correctly" },
  { id: "admin-2", category: "Admin Console", item: "Donor management table searchable/filterable" },
  { id: "admin-3", category: "Admin Console", item: "Volunteer approval workflow complete" },
  { id: "admin-4", category: "Admin Console", item: "Project management tabs functional" },
  { id: "admin-5", category: "Admin Console", item: "Evidence review and approval works" },
  { id: "admin-6", category: "Admin Console", item: "Messaging console sends/receives" },
  { id: "admin-7", category: "Admin Console", item: "Security logs display activity" },
  { id: "admin-8", category: "Admin Console", item: "GDPR tools export/delete data" },
  { id: "admin-9", category: "Admin Console", item: "Settings save and persist" },
  
  // AI Assistants Tests
  { id: "ai-1", category: "AI Assistants", item: "Donor AI responds to queries" },
  { id: "ai-2", category: "AI Assistants", item: "Volunteer AI provides field support" },
  { id: "ai-3", category: "AI Assistants", item: "Admin AI generates summaries" },
  { id: "ai-4", category: "AI Assistants", item: "AI widgets position correctly" },
  { id: "ai-5", category: "AI Assistants", item: "Chat history persists in session" },
  
  // Forms & Validation Tests
  { id: "form-1", category: "Forms & Validation", item: "Registration form validates email" },
  { id: "form-2", category: "Forms & Validation", item: "Password requirements enforced (10+ chars)" },
  { id: "form-3", category: "Forms & Validation", item: "GDPR consent checkboxes required" },
  { id: "form-4", category: "Forms & Validation", item: "Error messages display clearly" },
  { id: "form-5", category: "Forms & Validation", item: "Success confirmations show properly" },
  { id: "form-6", category: "Forms & Validation", item: "File upload size limits enforced" },
  
  // Navigation Tests
  { id: "nav-1", category: "Navigation", item: "All header links work" },
  { id: "nav-2", category: "Navigation", item: "Footer links navigate correctly" },
  { id: "nav-3", category: "Navigation", item: "Breadcrumbs display on nested pages" },
  { id: "nav-4", category: "Navigation", item: "Admin sidebar highlights active route" },
  { id: "nav-5", category: "Navigation", item: "Mobile hamburger menu opens/closes" },
  
  // Security Tests
  { id: "security-1", category: "Security", item: "Rate limiting blocks excessive requests" },
  { id: "security-2", category: "Security", item: "Unauthorized users redirected from admin" },
  { id: "security-3", category: "Security", item: "2FA setup and verification work" },
  { id: "security-4", category: "Security", item: "Session timeout after 45 minutes" },
  { id: "security-5", category: "Security", item: "Password reset flow completes" },
  
  // Responsiveness Tests
  { id: "responsive-1", category: "Responsiveness", item: "Mobile (320-480px): All content readable" },
  { id: "responsive-2", category: "Responsiveness", item: "Tablet (768-1024px): Layouts adapt properly" },
  { id: "responsive-3", category: "Responsiveness", item: "Desktop (1920px+): No excessive whitespace" },
  { id: "responsive-4", category: "Responsiveness", item: "Tables collapse to cards on mobile" },
  { id: "responsive-5", category: "Responsiveness", item: "Modals fit screen without scrolling" },
  { id: "responsive-6", category: "Responsiveness", item: "AI widgets don't cover action buttons" },
];

export const AdminTestingChecklistPage = () => {
  const [checklist, setChecklist] = useState<ChecklistItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  useEffect(() => {
    // Load from localStorage or initialize
    const saved = localStorage.getItem("ghat_testing_checklist");
    if (saved) {
      setChecklist(JSON.parse(saved));
    } else {
      const initialized = DEFAULT_CHECKLIST.map(item => ({
        ...item,
        status: "pending" as const,
        notes: "",
      }));
      setChecklist(initialized);
    }
  }, []);

  useEffect(() => {
    // Save to localStorage whenever checklist changes
    if (checklist.length > 0) {
      localStorage.setItem("ghat_testing_checklist", JSON.stringify(checklist));
    }
  }, [checklist]);

  const updateItemStatus = (id: string, status: "pass" | "fail" | "pending") => {
    setChecklist(prev =>
      prev.map(item => (item.id === id ? { ...item, status } : item))
    );
  };

  const updateItemNotes = (id: string, notes: string) => {
    setChecklist(prev =>
      prev.map(item => (item.id === id ? { ...item, notes } : item))
    );
  };

  const resetChecklist = () => {
    const initialized = DEFAULT_CHECKLIST.map(item => ({
      ...item,
      status: "pending" as const,
      notes: "",
    }));
    setChecklist(initialized);
    localStorage.removeItem("ghat_testing_checklist");
  };

  const exportResults = () => {
    const results = {
      exportDate: new Date().toISOString(),
      checklist,
      summary: {
        total: checklist.length,
        passed: checklist.filter(i => i.status === "pass").length,
        failed: checklist.filter(i => i.status === "fail").length,
        pending: checklist.filter(i => i.status === "pending").length,
      },
    };

    const blob = new Blob([JSON.stringify(results, null, 2)], { type: "application/json" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ghat_testing_results_${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const categories = ["all", ...Array.from(new Set(checklist.map(i => i.category)))];
  const filteredChecklist = activeCategory === "all" 
    ? checklist 
    : checklist.filter(i => i.category === activeCategory);

  const stats = {
    total: filteredChecklist.length,
    passed: filteredChecklist.filter(i => i.status === "pass").length,
    failed: filteredChecklist.filter(i => i.status === "fail").length,
    pending: filteredChecklist.filter(i => i.status === "pending").length,
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pass":
        return ;
      case "fail":
        return ;
      default:
        return ;
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-serif text-foreground mb-2">Testing Checklist</h1>
        <p className="text-muted-foreground">
          Comprehensive testing checklist for platform quality assurance
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground">{stats.total}</div>
              <div className="text-sm text-muted-foreground mt-1">Total Tests</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{stats.passed}</div>
              <div className="text-sm text-muted-foreground mt-1">Passed</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600">{stats.failed}</div>
              <div className="text-sm text-muted-foreground mt-1">Failed</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-muted-foreground">{stats.pending}</div>
              <div className="text-sm text-muted-foreground mt-1">Pending</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex gap-3 mb-6">
        <Button onClick={exportResults}>
          
          Export Results
        </Button>
        <Button variant="outline" onClick={resetChecklist}>
          Reset All
        </Button>
      </div>

      {/* Category Filter */}
      <Tabs value={activeCategory} onValueChange={setActiveCategory} className="mb-6">
        <TabsList className="flex-wrap h-auto">
          {categories.map(category => (
            <TabsTrigger key={category} value={category} className="capitalize">
              {category === "all" ? "All Tests" : category}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Checklist */}
      <Card>
        <CardHeader>
          <CardTitle className="font-serif">Test Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredChecklist.map((item) => (
              <Card key={item.id} className="border-l-4" style={{
                borderLeftColor: item.status === "pass" ? "#16a34a" : item.status === "fail" ? "#dc2626" : "#94a3b8"
              }}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1">
                      {getStatusIcon(item.status)}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex-1">
                          <Badge variant="outline" className="mb-2">
                            {item.category}
                          </Badge>
                          <p className="font-medium text-foreground">{item.item}</p>
                        </div>
                        
                        <div className="flex gap-2 flex-shrink-0">
                          <Button
                            size="sm"
                            variant={item.status === "pass" ? "default" : "outline"}
                            onClick={() => updateItemStatus(item.id, "pass")}
                          >
                            Pass
                          </Button>
                          <Button
                            size="sm"
                            variant={item.status === "fail" ? "destructive" : "outline"}
                            onClick={() => updateItemStatus(item.id, "fail")}
                          >
                            Fail
                          </Button>
                          <Button
                            size="sm"
                            variant={item.status === "pending" ? "secondary" : "outline"}
                            onClick={() => updateItemStatus(item.id, "pending")}
                          >
                            Pending
                          </Button>
                        </div>
                      </div>
                      
                      <Textarea
                        placeholder="Add notes..."
                        value={item.notes}
                        onChange={(e) => updateItemNotes(item.id, e.target.value)}
                        className="text-sm"
                        rows={2}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Component Preview Section */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="font-serif">Component Visual Snapshots</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertDescription>
              Visual component previews for regression testing coming soon. This section will display
              snapshots of key UI components (cards, tables, forms, modals) for visual comparison.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
};
