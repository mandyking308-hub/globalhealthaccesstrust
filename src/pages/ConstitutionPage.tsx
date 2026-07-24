import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { SEO } from "@/components/SEO";

export const ConstitutionPage = () => {
  return (
    <>
      <SEO
        title="Signed Constitution"
        description="The signed Constitution of the Global Health Access Trust, setting out its charitable objectives, trustee powers and governance framework."
        canonical="/constitution"
      />
      <div className="py-16">
      <div className="container-content">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Badge variant="outline" className="text-sm">
              Governing Document
            </Badge>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            Constitution (Signed)
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            The signed governing document of Global Health Access Trust, establishing its charitable objectives, trustees' powers and operational framework.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="card-professional">
            <CardContent className="p-6 text-center">
              <h3 className="font-semibold mb-1">Adopted</h3>
              <p className="text-muted-foreground">June 2025</p>
            </CardContent>
          </Card>
          
          <Card className="card-professional">
            <CardContent className="p-6 text-center">
              <h3 className="font-semibold mb-1">Version</h3>
              <p className="text-muted-foreground">1.0</p>
            </CardContent>
          </Card>
          
          <Card className="card-professional">
            <CardContent className="p-6 text-center">
              <h3 className="font-semibold mb-1">Document Reference</h3>
              <p className="text-muted-foreground text-xs">GHAT-CONSTITUTION-2025</p>
            </CardContent>
          </Card>
        </div>

        <Card className="card-elevated mb-8">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Signed Constitution</span>
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
                  This is the Constitution adopted and signed by the three founding trustees in June 2025. The signed PDF is published here for public and institutional reference.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button asChild>
                    <a
                      href="/GHAT_Constitution_2025_Refined.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Open Signed PDF
                    </a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="/contact-the-trust">Contact the Trust</a>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-professional mb-8">
          <CardHeader>
            <CardTitle>Document Record</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-accent/20 rounded-lg">
                <div>
                  <h4 className="font-semibold">Version 1.0</h4>
                  <p className="text-sm text-muted-foreground">Signed Constitution</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">June 2025</p>
                  <p className="text-xs text-muted-foreground">Adopted by the founding trustees</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gold/20 bg-gold/5">
          <CardContent className="p-6">
            <div className="flex items-start">
              <div>
                <h3 className="font-semibold mb-2">Authoritative English Version</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  The signed English-language Constitution is the governing document of Global Health Access Trust. Any translations provided on this website are for convenience only. If there is a discrepancy, the signed English version prevails.
                </p>
                <p className="text-xs text-muted-foreground">
                  Document reference: GHAT-CONSTITUTION-2025
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Separator className="my-8" />

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
              <a href="/contact-the-trust">Report an Issue</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};
