import { Search, Calendar, User, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const BlogIndexPage = () => {
  return (
    <div className="py-16">
      <div className="container-section">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            Impact & Insights
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Stories of healthcare justice, policy insights, and programme updates from the field.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input placeholder="Search articles..." className="pl-10" />
            </div>
            <Button variant="outline">Filter</Button>
          </div>
        </div>

        {/* Blog Posts Grid - Placeholder */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="card-elevated">
              <CardContent className="p-6">
                <div className="aspect-video bg-muted rounded-lg mb-4"></div>
                <Badge variant="secondary" className="mb-3">Healthcare Access</Badge>
                <h3 className="text-xl font-semibold mb-3">
                  Healthcare Access in Crisis Zones: A Dignified Response
                </h3>
                <p className="text-muted-foreground mb-4 line-clamp-3">
                  Examining the challenges and opportunities for delivering dignified healthcare in conflict-affected regions...
                </p>
                <div className="flex items-center text-sm text-muted-foreground">
                  <User className="w-4 h-4 mr-1" />
                  <span className="mr-4">Dr. Sarah Johnson</span>
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>March 15, 2024</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">Blog CMS with 50 pre-populated posts coming soon</p>
          <Button disabled>Load More Articles</Button>
        </div>
      </div>
    </div>
  );
};