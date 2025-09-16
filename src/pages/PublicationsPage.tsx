import { FileText, Download, Search, Filter } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const PublicationsPage = () => {
  return (
    <div className="py-16">
      <div className="container-section">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            Publications & Documents
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Access our official publications, reports, governance documents, and constitution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="card-elevated">
            <CardContent className="p-6">
              <FileText className="w-8 h-8 text-primary mb-4" />
              <Badge variant="secondary" className="mb-3">Constitution</Badge>
              <h3 className="text-lg font-semibold mb-2">Trust Constitution (Signed)</h3>
              <p className="text-sm text-muted-foreground mb-4">
                The governing document establishing our charitable purposes and legal framework.
              </p>
              <Button size="sm" variant="outline" className="w-full">
                <Download className="w-4 h-4 mr-2" />
                View & Download
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground">Document management system with PDF viewer coming soon</p>
        </div>
      </div>
    </div>
  );
};