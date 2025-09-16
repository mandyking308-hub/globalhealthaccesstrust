import { Card, CardContent } from "@/components/ui/card";

export const AboutTheTrustPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container-section py-16">
        <Card>
          <CardContent className="prose prose-lg max-w-none p-8">
            <h1 className="text-4xl font-serif font-bold mb-8">About the Trust</h1>
            
            <p className="text-lg italic mb-8">"A life of service begins with the solemnity of intention."</p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Origins & Founding Vision</h2>
            <p>The Global Health Access Trust was established in 2025 in response to a moral imperative: that health, healing, and human dignity must not be privileges of the few but protected rights of all. Founded by leaders in global health, governance, and social enterprise, the Trust was conceived not as a campaign or initiative—but as a long-term institution of public good.</p>
            
            <p>Its creation was rooted in the belief that healthcare access is not a fleeting cause, but a matter of justice, continuity, and national and global conscience. In a world marked by systemic inequities, the Trust exists to serve quietly but resolutely—through stewardship, not spotlight.</p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Our Structure & Leadership</h2>
            <p>The Global Health Access Trust is governed by a formal Board of Trustees, drawn from fields including health policy, law, finance, and public service.</p>
            
            <ul>
              <li>Chair of Trustees</li>
              <li>Executive Lead</li>
              <li>Senior Governance Advisor</li>
              <li>Legal Affairs Advisor</li>
              <li>Trust Development Coordinator</li>
            </ul>

            <p>(Full list of Trustees available upon request or in our annual governance filing.)</p>
            
            <p>All Trustees serve under fiduciary duty and are bound by the Trust's governing constitution, with oversight in accordance with the laws of England and Wales.</p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Charitable Purpose</h2>
            <p>The charitable purpose of the Trust is:</p>
            
            <p className="italic">"To advance health, relieve illness, and preserve life—particularly among vulnerable or underserved populations—through lawful and equitable means, as recognised under section 3 of the Charities Act 2011."</p>
            
            <p>All funding and programme activity is directed solely toward these ends.</p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Public Benefit Statement</h2>
            <p>In accordance with the Charity Commission's public benefit requirement, the Trust affirms that all of its charitable activities:</p>
            
            <ul>
              <li>Are exclusively for public benefit;</li>
              <li>Provide measurable outcomes that improve health or healthcare access;</li>
              <li>Are accessible without unjust exclusion, prejudice, or private gain;</li>
              <li>Operate under principles of transparency, non-partisanship, and institutional independence.</li>
            </ul>

            <p>We exist to serve—not to sell. We work to restore dignity where it has been denied, and to strengthen systems where they have failed.</p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Our Approach</h2>
            <p>The Trust takes a deliberately measured, disciplined approach to charitable intervention:</p>
            
            <ul>
              <li>We fund with purpose, not impulse.</li>
              <li>We prioritise systems-building, not dependency.</li>
              <li>We choose partnerships based on ethics, alignment, and legal compliance.</li>
              <li>We operate with quiet fidelity to our mission—always guided by public duty, not profile.</li>
            </ul>

            <p>Every action is reviewed for legality, impact, and integrity. This is not philanthropy in passing; this is long-term stewardship for public good.</p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Constitution & Governance</h2>
            <p>Global Health Access Trust is governed by a formal Constitution, which outlines our purpose, structure, and decision-making processes. This document sets out the roles of our trustees, how we operate, and our commitment to transparency and accountability.</p>
            
            <p><a href="https://cdn.shopify.com/s/files/1/0910/2442/5308/files/GHAT_Constitution_2025_Refined_V1_Signed_final_18062025.pdf?v=1750240952" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Download our signed Constitution (PDF)</a></p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};