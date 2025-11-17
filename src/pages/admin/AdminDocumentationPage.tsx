import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, FileText, Download, Edit } from "lucide-react";
import { toast } from "sonner";

const categories = [
  "Admin Workflows",
  "Evidence Management", 
  "AI Governance",
  "Messaging & Communication",
  "Incident & Security",
  "GDPR & Compliance",
  "Training Material",
];

export const AdminDocumentationPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex h-screen bg-background">
      <div className="w-80 border-r border-border bg-card">
        <div className="p-6 border-b border-border">
          <h1 className="text-2xl font-serif text-foreground mb-4">Documentation Hub</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search documentation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <ScrollArea className="h-[calc(100vh-140px)]">
          <div className="p-4 space-y-2">
            <Button variant={selectedCategory === "All" ? "default" : "ghost"} className="w-full justify-start" onClick={() => setSelectedCategory("All")}>
              All Documents
            </Button>
            {categories.map((category) => (
              <Button key={category} variant={selectedCategory === category ? "default" : "ghost"} className="w-full justify-start" onClick={() => setSelectedCategory(category)}>
                {category}
              </Button>
            ))}
          </div>
        </ScrollArea>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <FileText className="h-16 w-16 mx-auto mb-4 opacity-50" />
          <p>Documentation will load after migration approval</p>
        </div>
      </div>
    </div>
  );
};
