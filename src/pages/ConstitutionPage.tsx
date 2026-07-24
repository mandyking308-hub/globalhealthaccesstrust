import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { SEO } from "@/components/SEO";

export const ConstitutionPage = () => {
  return (
    <>
      <SEO
        title="Signed Constitution & Trust Deed"
        description="The signed Constitution at the centre of Global Health Access Trust's governance, together with the Trust Deed held within its wider legal and governance framework."
        canonical="/constitution"
      />
      <div className="py-16">
        <div className="container-content">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Badge variant="outline" className="text-sm">Governing &amp; Legal Documents</Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Signed Constitution &amp; Trust Deed</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Global Health Access Trust builds on charitable and community work carried out since 2019. The organisation was formally established with effect from 1 December 2024. Its Trustees subsequently signed the Constitution in June 2025, confirming the governance and operating arrangements effective from that date.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="card-elevated h-full">
              <CardHeader>
                <CardTitle>Constitution (Signed)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  The signed Constitution sits at the centre of the Trust's governance. It records the Trust's charitable purposes, its Trustees, decision-making arrangements, financial governance and the framework through which the organisation operates.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div><strong>Signed</strong><br /><span className="text-muted-foreground">June 2025</span></div>
                  <div><strong>Signatories</strong><br /><span className="text-muted-foreground">Three Trustees</span></div>
                </div>
                <Button asChild>
                  <a href="/GHAT_Constitution_2025_Refined.pdf" target="_blank" rel="noopener noreferrer">Open Signed Constitution</a>
                </Button>
              </CardContent>
            </Card>

            <Card className="card-elevated h-full">
              <CardHeader>
                <CardTitle>Trust Deed</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  A Trust Deed is also held as part of the Trust's wider legal and governance framework. It sits alongside the signed Constitution and supports the formal record of the Trust's establishment and charitable arrangements.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div><strong>Formal establishment</strong><br /><span className="text-muted-foreground">1 December 2024</span></div>
                  <div><strong>Document position</strong><br /><span className="text-muted-foreground">Wider legal and governance framework</span></div>
                </div>
                <Button variant="outline" asChild>
                  <a href="/contact-the-trust">Trust Deed enquiries</a>
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
                <p><strong className="text-foreground">The signed Constitution is central.</strong> It confirms the governance and operating arrangements agreed by the Trustees and is the principal public reference for how the Trust is governed.</p>
                <p><strong className="text-foreground">The Trust Deed is held alongside it.</strong> It forms part of the wider legal and governance framework supporting the Trust's formal establishment and charitable arrangements.</p>
                <p>The two documents are maintained together with the Trust's policies, financial controls and recorded Trustee decisions so that the legal and operational record remains consistent.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gold/20 bg-gold/5">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-2">Document Integrity</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The signed Constitution and Trust Deed form part of the Trust's formal records. Public copies may be redacted where necessary to protect signatures, home addresses or other personal information, while full copies are provided securely where lawfully required.
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
