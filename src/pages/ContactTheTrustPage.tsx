import { Card, CardContent } from "@/components/ui/card";

export const ContactTheTrustPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container-section py-16">
        <Card>
          <CardContent className="prose prose-lg max-w-none p-8">
            <h1 className="text-4xl font-serif font-bold mb-8">Contact the Trust</h1>
            
            <p className="text-lg italic mb-8">Discreet. Professional. Accountable.</p>

            <p>We welcome confidential enquiries from:</p>
            
            <ul>
              <li>Legal and financial representatives</li>
              <li>Family offices and philanthropic institutions</li>
              <li>Trustees and executors</li>
              <li>Academic and health system partners</li>
              <li>Members of the public seeking to understand our charitable work</li>
            </ul>

            <p>All communication is treated with discretion and handled in accordance with data protection and safeguarding law.</p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">General Enquiries</h2>
            <p>Global Health Access Trust<br />
            2 Harley Street, London<br />
            United Kingdom</p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Legacy & Legal Enquiries</h2>
            <p>Subject line: Legacy – Confidential</p>
            
            <p>To contact the Chair of Trustees or for guidance on testamentary giving, please use the secure contact form or email above.</p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Support the Trust</h2>
            <p>Every contribution entrusted to us strengthens our ability to act.</p>
            
            <p>We respectfully invite support via the following secure channels:</p>
            
            <ul>
              <li>One-off or recurring donations (via authorised platforms such as Stripe or CAF)</li>
              <li>Legacy giving (see suggested will wording on our Support the Trust page)</li>
              <li>Restricted gifts for specific programmes, bursaries, or geographies</li>
              <li>Founding benefactor capital (minimum thresholds apply)</li>
            </ul>

            <p>All donations are receipted, independently accounted for, and held exclusively for charitable purposes. Influence is never accepted in exchange for support.</p>
            
            <p>If you wish to discuss a significant gift, charitable vehicle, or family legacy, please contact us in confidence.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};