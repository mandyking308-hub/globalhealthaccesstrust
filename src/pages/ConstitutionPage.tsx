import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { SEO } from "@/components/SEO";

export const ConstitutionPage = () => {
  return (
    <>
      <SEO
        title="Trust Deed & Signed Constitution"
        description="The founding Trust Deed and signed supplementary Constitution of Global Health Access Trust, together setting out its charitable purposes and governance arrangements."
        canonical="/constitution"
      />
      <div className="py-16">
        <div className="container-content">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Badge variant="outline" className="text-sm">Founding & Governance Documents</Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Trust Deed &amp; Signed Constitution</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Global Health Access Trust was constituted as a charitable trust by Trust Deed with effect from 1 December 2024. The trustees later adopted a signed Constitution in June 2025 to record supplementary governance and operating arrangements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="card-elevated h-full">
              <CardHeader>
                <CardTitle>Trust Deed</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  The Trust Deed is the founding and principal governing document of Global Health Access Trust. It establishes the charitable trust, its purposes, trustee authority and the legal framework under which its assets must be applied.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div><strong>Effective date</strong><br /><span className="text-muted-foreground">1 December 2024</span></div>
                  <div><strong>Legal form</strong><br /><span className="text-muted-foreground">Charitable trust</span></div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  The executed copy is retained in the Trust's formal records and is supplied securely to banks, HMRC, the Charity Commission and professional advisers where required. A suitable copy may be requested from the Trust.
                </p>
                <Button variant="outline" asChild>
                  <a href="/contact-the-trust">Request the Trust Deed</a>
                </Button>
              </CardContent>
            </Card>

            <Card className="card-elevated h-full">
              <CardHeader>
                <CardTitle>Signed Constitution</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  The Constitution was adopted and signed by the three trustees in June 2025. It records supplementary governance and operating arrangements and was completed for institutional and banking due diligence. It supports, and does not replace, the Trust Deed.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div><strong>Adopted</strong><br /><span className="text-muted-foreground">June 2025</span></div>
                  <div><strong>Reference</strong><br /><span className="text-muted-foreground">GHAT-CONSTITUTION-2025</span></div>
                </div>
                <Button asChild>
                  <a href="/GHAT_Constitution_2025_Refined.pdf" target="_blank" rel="noopener noreferrer">Open Signed Constitution</a>
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card className="card-professional mb-8">
            <CardHeader>
              <CardTitle>How the Documents Work Together</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p><strong className="text-foreground">The Trust Deed is primary.</strong> It created the charitable trust and is the governing document used for Charity Commission registration as a charitable trust.</p>
                <p><strong className="text-foreground">The Constitution is supplementary.</strong> It records the trustees' later agreed governance and operating procedures, including information required during the NatWest community-account process.</p>
                <p>If any wording in a supplementary policy or the Constitution conflicts with the Trust Deed or applicable law, the Trust Deed and applicable law take priority.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gold/20 bg-gold/5">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-2">Document Integrity</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The English-language executed Trust Deed and signed Constitution are retained in the Trust's formal records. Public copies may be redacted where necessary to protect signatures, home addresses or other personal information. Full copies are provided securely where lawfully required.
              </p>
            </CardContent>
          </Card>

          <Separator className="my-8" />

          <div className="text-center">
            <h3 className="text-2xl font-serif font-bold mb-4">Related Documents</h3>
            <p className="text-muted-foreground mb-6">Explore the Trust's wider governance and policy framework.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" asChild><a href="/publications">View All Documents</a></Button>
              <Button variant="outline" asChild><a href="/governance">Governance Framework</a></Button>
              <Button variant="outline" asChild><a href="/contact-the-trust">Contact the Trust</a></Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
