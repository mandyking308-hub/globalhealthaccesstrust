import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ContentLayout } from "@/components/layout/ContentLayout";
import { SEO } from "@/components/SEO";

export const SupportTheTrustPage = () => {
  return (
    <ContentLayout>
      <SEO
        title="Support the Trust"
        description="The Global Health Access Trust engages with donors, institutions, and partners through a structured and selective process aligned with its governance and funding mandate."
        canonical="/support-the-trust"
      />
      <h1>Support the Trust</h1>
      
      <p className="featured-text">"The Trust engages with a limited number of aligned partners through a structured process. Participation is based on alignment, scope, and the ability to deploy capital effectively within defined areas of intervention."</p>

      <p>The Global Health Access Trust does not operate an open funding model. All funding relationships are established through a selective engagement process to ensure alignment with the Trust's mandate, governance framework, and charitable objectives.</p>

      <div className="section-container">
        <h2>Engagement Process</h2>
        <p>Support for the Trust follows a defined pathway designed to ensure governance, transparency, and alignment with our charitable objectives.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
        <div className="section-container">
          <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">Step 1</span>
          <h3 className="my-2 text-foreground">Initial Enquiry</h3>
          <p className="text-[15px] text-muted-foreground leading-[1.7]">
            Engagement begins through a direct enquiry to the Trust, submitted via the official contact form or through authorised channels.
          </p>
        </div>
        <div className="section-container">
          <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">Step 2</span>
          <h3 className="my-2 text-foreground">Review &amp; Alignment</h3>
          <p className="text-[15px] text-muted-foreground leading-[1.7]">
            Each enquiry is assessed to ensure alignment with the Trust's mandate, governance framework, and charitable objectives.
          </p>
        </div>
        <div className="section-container">
          <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">Step 3</span>
          <h3 className="my-2 text-foreground">Structured Engagement</h3>
          <p className="text-[15px] text-muted-foreground leading-[1.7]">
            Funding relationships are formalised with defined scope, objectives, and reporting expectations through appropriate legal documentation.
          </p>
        </div>
        <div className="section-container">
          <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">Step 4</span>
          <h3 className="my-2 text-foreground">Project Deployment</h3>
          <p className="text-[15px] text-muted-foreground leading-[1.7]">
            Capital is deployed into clearly defined initiatives with ongoing monitoring, accountability, and structured reporting.
          </p>
        </div>
      </div>

      <div className="section-container">
        <h2>Legacy Giving</h2>
        <p><strong>(Bequests Made by Will)</strong></p>
        <p>A gift in your will ensures your values endure beyond your lifetime. The following sample wording may be used with your solicitor:</p>
        <p className="featured-text">"I give [the sum of £____ / ___% of my residuary estate] to the Global Health Access Trust, a charitable trust established under the laws of England and Wales, with correspondence at 2 Harley Street, London, for its general charitable purposes. I declare that the receipt of the Chair of Trustees or other authorised officer shall be full discharge to my executors."</p>
        <p>We welcome confidential engagement with legal representatives and estate planners to ensure your wishes are honoured with the dignity they deserve.</p>
      </div>

      <div className="section-container">
        <h2>Restricted Gifts &amp; Named Funds</h2>
        <p>Support may also be directed to a specific area of charitable interest, subject to formal agreement.</p>
        <p>Restricted gifts must:</p>
        <ul>
          <li>Align with the charitable objectives of the Trust</li>
          <li>Be formally documented via Deed of Gift or Memorandum of Understanding</li>
          <li>Include a clause of reversion in the event the original purpose becomes obsolete, unlawful, or no longer serves the public benefit</li>
        </ul>
      </div>

      <div className="section-container">
        <h2>Founding Benefactors &amp; Endowments</h2>
        <p>Individuals, family offices, and foundations who engage at scale may be invited to become Founding Benefactors of the Trust, subject to Board approval.</p>
        <p>At no stage may benefactors exert influence over governance, grant-making, or strategy. The Trust remains strictly independent.</p>
      </div>

      <div className="section-container">
        <h2>Documentation &amp; Stewardship</h2>
        <p>Every contribution is:</p>
        <ul>
          <li>Logged, receipted, and formally acknowledged</li>
          <li>Applied only to charitable purposes under law</li>
          <li>Reported in annual governance and financial disclosures</li>
        </ul>
        <p>No supporter shall receive private benefit or inducement, and no contribution shall override the Trust's fiduciary independence.</p>
      </div>

      <div className="text-center mt-10">
        <Link to="/contact">
          <Button size="lg" variant="default">
            Request Private Engagement
          </Button>
        </Link>
      </div>
    </ContentLayout>
  );
};
