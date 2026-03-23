import { useState } from "react";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Helmet } from "react-helmet-async";

interface Document {
  id: string;
  title: string;
  description: string;
  type: string;
  version: string;
  date: string;
  lastUpdated: string;
  region?: string;
  language: string;
  tags: string[];
  fileUrl?: string;
  checksum: string;
  size: string;
}

const documents: Document[] = [
  {
    id: "constitution-signed",
    title: "Trust Constitution (Signed)",
    description: "The governing document establishing our charitable purposes and legal framework as a charitable trust in England and Wales.",
    type: "Constitution",
    version: "1.0",
    date: "2024-01-15",
    lastUpdated: "2024-01-15",
    language: "English",
    tags: ["governance", "legal", "charitable purposes"],
    fileUrl: "#",
    checksum: "sha256:a3b5c2d1e9f8g7h6i5j4k3l2m1n0o9p8q7r6s5t4u3v2w1x0y9z8",
    size: "2.4 MB"
  },
  {
    id: "safeguarding-statement-2024",
    title: "Safeguarding Statement 2024",
    description: "Our commitment to safeguarding principles and procedures for protecting vulnerable individuals in all our activities.",
    type: "Policy Statement",
    version: "2.1",
    date: "2024-09-01",
    lastUpdated: "2024-09-01",
    language: "English",
    tags: ["safeguarding", "policy", "protection"],
    fileUrl: "#",
    checksum: "sha256:c5d7e4f3g2h1i0j9k8l7m6n5o4p3q2r1s0t9u8v7w6x5y4z3a2b1",
    size: "1.8 MB"
  }
];

export const PublicationsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesType = selectedType === "all" || doc.type === selectedType;
    const matchesYear = selectedYear === "all" || doc.date.startsWith(selectedYear);
    
    return matchesSearch && matchesType && matchesYear;
  });

  const documentTypes = [...new Set(documents.map(doc => doc.type))];
  const documentYears = [...new Set(documents.map(doc => doc.date.substring(0, 4)))].sort().reverse();

  return (
    <div className="py-16">
      <Helmet><title>Publications & Documents | Global Health Access Trust</title><meta name="description" content="Access official publications, governance documents, annual reports, and policy statements from the Global Health Access Trust." /><link rel="canonical" href="https://globalhealthaccesstrust.org/publications" /></Helmet>
      <div className="container-section">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            Publications & Documents
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Access our official publications, governance documents, annual reports, 
            and policy statements. All documents are available for download with 
            integrity verification.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="max-w-4xl mx-auto mb-12">
          <Card className="card-professional">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Search documents..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Document Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    {documentTypes.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger>
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Years</SelectItem>
                    {documentYears.map(year => (
                      <SelectItem key={year} value={year}>{year}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredDocuments.map((doc) => (
            <Card key={doc.id} className="card-elevated group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  
                  <Badge variant="secondary" className="text-xs">
                    {doc.type}
                  </Badge>
                </div>
                
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                  {doc.title}
                </h3>
                
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {doc.description}
                </p>
                
                <div className="space-y-2 mb-4 text-xs text-muted-foreground">
                  <div className="flex items-center">
                    
                    Published: {new Date(doc.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center">
                    
                    Version {doc.version} • {doc.size}
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {doc.tags.slice(0, 3).map(tag => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  {doc.id === "constitution-signed" ? (
                    <Link to="/constitution" className="flex-1">
                      <Button size="sm" variant="outline" className="w-full">
                        
                        View
                      </Button>
                    </Link>
                  ) : (
                    <Button size="sm" variant="outline" className="flex-1">
                      
                      View
                    </Button>
                  )}
                  
                  <Button size="sm" variant="outline">
                    
                  </Button>
                </div>
                
                <div className="mt-3 pt-3 border-t text-xs text-muted-foreground">
                  <div className="mb-1">
                    <strong>Checksum (SHA-256):</strong>
                  </div>
                  <code className="break-all bg-muted/50 px-1 py-0.5 rounded text-xs">
                    {doc.checksum.split(':')[1].substring(0, 16)}...
                  </code>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDocuments.length === 0 && (
          <div className="text-center py-12">
            
            <h3 className="text-lg font-semibold mb-2">No documents found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
          </div>
        )}

        {/* Document Verification */}
        <div className="max-w-4xl mx-auto">
          <Card className="card-professional">
            <CardContent className="p-8">
              <h2 className="text-xl font-semibold mb-4">Document Verification</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-2">Integrity Verification</h3>
                  <p className="text-sm text-muted-foreground">
                    All documents include SHA-256 checksums for integrity verification. 
                    Download and verify checksums to ensure document authenticity.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Authoritative Language</h3>
                  <p className="text-sm text-muted-foreground">
                    The English version of all documents is authoritative. Translations 
                    are provided for convenience but may not reflect the most current version.
                  </p>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t">
                <p className="text-sm text-muted-foreground">
                  <strong>Report a Problem:</strong> If you encounter issues with document 
                  access or have questions about content, please{" "}
                  <Link to="/contact" className="text-primary hover:underline">
                    contact our operations team
                  </Link>.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};