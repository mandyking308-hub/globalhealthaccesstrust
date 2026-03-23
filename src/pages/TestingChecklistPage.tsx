import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SEO } from "@/components/SEO";
interface TestItem {
  id: string;
  category: string;
  label: string;
  checked: boolean;
}

export const TestingChecklistPage = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const [testItems, setTestItems] = useState<TestItem[]>([
    // Mobile Tests
    { id: "m1", category: "mobile", label: "Homepage displays correctly on iPhone SE", checked: false },
    { id: "m2", category: "mobile", label: "Homepage displays correctly on iPhone 15 Pro Max", checked: false },
    { id: "m3", category: "mobile", label: "Navigation menu collapses properly", checked: false },
    { id: "m4", category: "mobile", label: "Forms are fully accessible and scrollable", checked: false },
    { id: "m5", category: "mobile", label: "AI widget position doesn't overlap content", checked: false },
    { id: "m6", category: "mobile", label: "Buttons have minimum 48px tap area", checked: false },
    { id: "m7", category: "mobile", label: "No horizontal scrolling on any page", checked: false },
    
    // Tablet Tests
    { id: "t1", category: "tablet", label: "Layout adapts correctly on iPad Mini", checked: false },
    { id: "t2", category: "tablet", label: "Layout adapts correctly on iPad Pro", checked: false },
    { id: "t3", category: "tablet", label: "Two-column layouts reflow properly", checked: false },
    { id: "t4", category: "tablet", label: "Modals and dialogs center correctly", checked: false },
    { id: "t5", category: "tablet", label: "AI assistant resizes appropriately", checked: false },
    
    // Desktop Tests
    { id: "d1", category: "desktop", label: "All dashboards display with proper spacing", checked: false },
    { id: "d2", category: "desktop", label: "Wide screens don't have excessive empty space", checked: false },
    { id: "d3", category: "desktop", label: "Tables are fully visible without scrolling", checked: false },
    { id: "d4", category: "desktop", label: "AI widget fixed bottom-right positioning", checked: false },
    
    // Upload & Media Tests
    { id: "u1", category: "upload", label: "CV upload works in volunteer form", checked: false },
    { id: "u2", category: "upload", label: "File size validation (5MB limit)", checked: false },
    { id: "u3", category: "upload", label: "File type validation (PDF, DOC, DOCX)", checked: false },
    { id: "u4", category: "upload", label: "Upload progress indicator works", checked: false },
    { id: "u5", category: "upload", label: "Error messages display clearly", checked: false },
    
    // Form Validation Tests
    { id: "f1", category: "forms", label: "Required fields properly marked", checked: false },
    { id: "f2", category: "forms", label: "Email validation works correctly", checked: false },
    { id: "f3", category: "forms", label: "Error messages are clear and helpful", checked: false },
    { id: "f4", category: "forms", label: "Success states display properly", checked: false },
    { id: "f5", category: "forms", label: "Double submission is prevented", checked: false },
    { id: "f6", category: "forms", label: "Form persists data on validation errors", checked: false },
    
    // Dashboard Navigation
    { id: "n1", category: "navigation", label: "Donor dashboard tabs work smoothly", checked: false },
    { id: "n2", category: "navigation", label: "Volunteer dashboard tabs work smoothly", checked: false },
    { id: "n3", category: "navigation", label: "Admin console tabs work smoothly", checked: false },
    { id: "n4", category: "navigation", label: "Breadcrumbs navigate correctly", checked: false },
    { id: "n5", category: "navigation", label: "Back navigation preserves state", checked: false },
    
    // AI Widget Behavior
    { id: "a1", category: "ai", label: "Donor AI responds appropriately", checked: false },
    { id: "a2", category: "ai", label: "Volunteer AI responds appropriately", checked: false },
    { id: "a3", category: "ai", label: "Admin AI responds appropriately", checked: false },
    { id: "a4", category: "ai", label: "AI widget expands/collapses smoothly", checked: false },
    { id: "a5", category: "ai", label: "Streaming chat works without glitches", checked: false },
    { id: "a6", category: "ai", label: "Error states display properly (429, 402)", checked: false },
    
    // Permissions Tests
    { id: "p1", category: "permissions", label: "Donors cannot access volunteer dashboard", checked: false },
    { id: "p2", category: "permissions", label: "Volunteers cannot access donor dashboard", checked: false },
    { id: "p3", category: "permissions", label: "Non-admins cannot access admin console", checked: false },
    { id: "p4", category: "permissions", label: "Unauthenticated users redirected to login", checked: false },
    { id: "p5", category: "permissions", label: "RLS policies prevent unauthorized data access", checked: false },
  ]);

  useEffect(() => {
    checkAdminAccess();
  }, []);

  const checkAdminAccess = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }

      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .in("role", ["admin", "super_admin"]);

      if (!roles || roles.length === 0) {
        navigate("/");
        return;
      }

      setIsAdmin(true);
    } catch (error) {
      console.error("Admin check error:", error);
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  const toggleItem = (id: string) => {
    setTestItems(items =>
      items.map(item =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const getCategoryLabel = (category: string) => {
    return <span className="text-xs font-medium text-muted-foreground uppercase">{category}</span>;
  };

  const getCategoryProgress = (category: string) => {
    const categoryItems = testItems.filter(item => item.category === category);
    const checkedItems = categoryItems.filter(item => item.checked);
    return {
      completed: checkedItems.length,
      total: categoryItems.length,
      percentage: Math.round((checkedItems.length / categoryItems.length) * 100)
    };
  };

  const overallProgress = () => {
    const checked = testItems.filter(item => item.checked).length;
    return {
      completed: checked,
      total: testItems.length,
      percentage: Math.round((checked / testItems.length) * 100)
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAdmin) return null;

  const categories = [
    { key: "mobile", name: "Mobile Tests" },
    { key: "tablet", name: "Tablet Tests" },
    { key: "desktop", name: "Desktop Tests" },
    { key: "upload", name: "Upload & Media" },
    { key: "forms", name: "Form Validation" },
    { key: "navigation", name: "Dashboard Navigation" },
    { key: "ai", name: "AI Widget Behavior" },
    { key: "permissions", name: "Permissions" },
  ];

  const overall = overallProgress();

  return (
    <>
      <SEO
        title="Testing Checklist - GHAT Admin"
        description="Internal testing checklist for GHAT platform"
        canonical="/testing-checklist"
      />

      <div className="min-h-screen bg-background">
        <header className="border-b bg-card">
          <div className="container-section py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">Testing Checklist</h1>
                <p className="text-sm text-muted-foreground">Admin-only quality assurance dashboard</p>
              </div>
              <Button variant="outline" onClick={() => navigate("/admin-dashboard")}>
                Back to Admin
              </Button>
            </div>
          </div>
        </header>

        <div className="container-section py-8">
          {/* Overall Progress */}
          <Card className="mb-8 border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Overall Progress</span>
                <Badge variant="outline" className="text-lg px-4 py-2">
                  {overall.percentage}%
                </Badge>
              </CardTitle>
              <CardDescription>
                {overall.completed} of {overall.total} tests completed
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="w-full bg-muted rounded-full h-4">
                <div
                  className="bg-primary h-4 rounded-full transition-all duration-500"
                  style={{ width: `${overall.percentage}%` }}
                />
              </div>
            </CardContent>
          </Card>

          {/* Test Categories */}
          <div className="space-y-6">
            {categories.map((category) => {
              const progress = getCategoryProgress(category.key);
              const items = testItems.filter(item => item.category === category.key);

              return (
                <Card key={category.key} className="shadow-soft">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {getCategoryIcon(category.key)}
                        <div>
                          <CardTitle className="text-lg">{category.name}</CardTitle>
                          <CardDescription>
                            {progress.completed} / {progress.total} completed
                          </CardDescription>
                        </div>
                      </div>
                      <Badge variant={progress.percentage === 100 ? "default" : "secondary"}>
                        {progress.percentage}%
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {items.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <Checkbox
                            id={item.id}
                            checked={item.checked}
                            onCheckedChange={() => toggleItem(item.id)}
                          />
                          <label
                            htmlFor={item.id}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-1"
                          >
                            {item.label}
                          </label>
                          {item.checked && (
                            <span className="text-xs text-green-600 font-medium">✓</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Warning Notice */}
          <Card className="mt-8 border-yellow-200 bg-yellow-50">
            <CardContent className="pt-6">
              <div className="flex gap-3">
                
                <div>
                  <p className="font-semibold text-yellow-900 mb-1">Testing Reminder</p>
                  <p className="text-sm text-yellow-800">
                    This checklist is for internal quality assurance only. Complete all tests before production deployment.
                    Test across real devices when possible, not just browser dev tools.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};