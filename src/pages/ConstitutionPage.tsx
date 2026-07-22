import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { SEO } from "@/components/SEO";

export const ConstitutionPage = () => {
  return (
    <>
      <SEO
        title="Constitution"
        description="The founding constitution of the Global Health Access Trust, setting out our charitable objects, trustee powers, and governance structure."
        canonical="/constitution"
      />
      <div className="py-16">
      <div className="container-content">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            
            <Badge variant="outline" className="text-sm">
              Authoritative Document
            </Badge>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            Constitution (Signed)
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            The formal governing document of the Global Health Access Trust, establishing 
            its charitable purposes, trustees' powers, and operational framework in 
            accordance with English charity law.
          </p>
        </div>

        {/* Document Metadata */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="card-professional">
            <CardContent className="p-6 text-center">
              
              <h3 className="font-semibold mb-1">Effective Date</h3>
              <p className="text-muted-foreground">1 December 2024</p>
            </CardContent>
          </Card>
          
          <Card className="card-professional">
            <CardContent className="p-6 text-center">
              
              <h3 className="font-semibold mb-1">Version</h3>
              <p className="text-muted-foreground">1.0 (Original)</p>
            </CardContent>
          </Card>
          
          <Card className="card-professional">
            <CardContent className="p-6 text-center">
              
              <h3 className="font-semibold mb-1">Document Reference</h3>
              <p className="text-muted-foreground text-xs">GHAT-CONSTITUTION-1.0</p>
            </CardContent>
          </Card>
        </div>

        {/* Document Viewer Section */}
        <Card className="card-elevated mb-8">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Constitution Document</span>
              <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
                <a
                  href="/GHAT_Constitution_2025_Refined.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download PDF
                </a>
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-muted rounded-lg p-8 border border-border">
              <div className="max-w-2xl mx-auto text-center">
                <h3 className="text-lg font-semibold mb-3">Governing Document</h3>
                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                  The signed governing document is retained in the Trust's formal records. A copy may be requested from the Trust, subject to appropriate redaction of personal information where required.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button asChild>
                    <a
                      href="/GHAT_Constitution_2025_Refined.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Open PDF
                    </a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="/contact-the-trust">Request a Copy</a>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>


        {/* Version History */}
        <Card className="card-professional mb-8">
          <CardHeader>
            <CardTitle>Version History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-accent/20 rounded-lg">
                <div>
                  <h4 className="font-semibold">Version 1.0</h4>
                  <p className="text-sm text-muted-foreground">Original Constitution</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">1 December 2024</p>
                  <p className="text-xs text-muted-foreground">Initial establishment</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Legal Notice */}
        <Card className="border-gold/20 bg-gold/5">
          <CardContent className="p-6">
            <div className="flex items-start">
              
              <div>
                <h3 className="font-semibold mb-2">Authoritative English Version</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  This Constitution is the authoritative governing document of the Global Health Access Trust. 
                  Any translations provided on this website are for convenience only. In case of any 
                  discrepancy, the English version shall prevail.
                </p>
                <p className="text-xs text-muted-foreground">
                  Document reference: GHAT-CONSTITUTION-1.0
                </p>

              </div>
            </div>
          </CardContent>
        </Card>

        <Separator className="my-8" />

        {/* Related Documents */}
        <div className="text-center">
          <h3 className="text-2xl font-serif font-bold mb-4">Related Documents</h3>
          <p className="text-muted-foreground mb-6">
            Explore other governance and policy documents
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" asChild>
              <a href="/publications">View All Documents</a>
            </Button>
            <Button variant="outline" asChild>
              <a href="/governance">Governance Framework</a>
            </Button>
            <Button variant="outline" asChild>
              <a href="/contact">Report an Issue</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};