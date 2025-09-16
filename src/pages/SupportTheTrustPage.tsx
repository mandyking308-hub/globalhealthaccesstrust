import { Card, CardContent } from "@/components/ui/card";

export const SupportTheTrustPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container-section py-16">
        <Card>
          <CardContent className="prose prose-lg max-w-none p-8">
            <h1 className="text-4xl font-serif font-bold mb-8">Support the Trust</h1>
            
            <p className="text-lg italic mb-8">"Legacy is not measured by what we leave behind—but by how we uplift others while we are here."</p>

            <p>The Global Health Access Trust exists not for profile, popularity, or persuasion—but to quietly and lawfully serve those who are too often forgotten.</p>
            
            <p>We are structured to receive, safeguard, and deploy charitable capital with the solemnity of a public institution and the vigilance of a fiduciary body. We are bound by law, governed by conscience, and accountable to the public interest.</p>
            
            <p>Support is welcomed through the following lawful, transparent, and institutionally managed channels:</p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">I. Charitable Donations</h2>
            <p>Donors may contribute directly to the Trust via our registered bank details or through HMRC-recognised donation platforms.</p>
            
            <p>All gifts are receipted and may be eligible for Gift Aid (UK taxpayers), increasing the impact of your contribution at no cost to you.</p>
            
            <p className="italic">"A donation to the Trust is more than a gesture—it is an investment in enduring public service."</p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">II. Legacy Giving</h2>
            <p><strong>(Bequests Made by Will)</strong></p>
            
            <p>A gift in your will ensures your values endure beyond your lifetime. The following sample wording may be used with your solicitor:</p>
            
            <p>"I give [the sum of £____ / ___% of my residuary estate] to the Global Health Access Trust, registered at 2 Harley Street, London, for its general charitable purposes. I declare that the receipt of the Chair of Trustees or other authorised officer shall be full discharge to my executors."</p>
            
            <p>We welcome confidential engagement with legal representatives and estate planners to ensure your wishes are honoured with the dignity they deserve.</p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">III. Restricted Gifts & Named Funds</h2>
            <p>Support may also be given to a specific area of charitable interest (e.g. bursaries, field programmes, or public health infrastructure).</p>
            
            <p>Restricted gifts must:</p>
            
            <ul>
              <li>Align with the charitable objectives of the Trust</li>
              <li>Be formally documented via Deed of Gift or Memorandum of Understanding</li>
              <li>Include a clause of reversion in the event the original purpose becomes obsolete, unlawful, or no longer serves the public benefit</li>
            </ul>

            <p className="italic">We honour specificity—but we uphold duty first.</p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">IV. Founding Benefactors & Endowments</h2>
            <p>Individuals, family offices, and foundations who contribute at scale may be invited to become Founding Benefactors of the Trust.</p>
            
            <p>Subject to Board approval, founding benefactors may:</p>
            
            <ul>
              <li>Establish named endowments or strategic philanthropic funds</li>
              <li>Be recognised in official records, publications, or heritage listings</li>
              <li>Receive confidential stewardship reports</li>
              <li>Participate in ceremonial briefings or advisory gatherings (non-voting)</li>
            </ul>

            <p>At no stage may benefactors exert influence over governance, grant-making, or strategy. The Trust remains strictly independent.</p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Documentation & Stewardship</h2>
            <p>Every gift, whether £10 or £10 million, is:</p>
            
            <ul>
              <li>Logged, receipted, and formally acknowledged</li>
              <li>Applied only to charitable purposes under law</li>
              <li>Reported in our annual governance and financial disclosures</li>
            </ul>

            <p>No donor shall receive private benefit or inducement, and no contribution shall ever override the Trust's fiduciary independence.</p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">To Enquire Confidentially</h2>
            <p>For all questions relating to donations, legacies, or restricted gifts, please contact:</p>
            
            <p>Chair of Trustees<br />
            Subject: Support – Confidential</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};