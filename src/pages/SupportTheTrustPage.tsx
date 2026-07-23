import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ContentLayout } from "@/components/layout/ContentLayout";
import { SEO } from "@/components/SEO";

export const SupportTheTrustPage = () => {
  return (
    <ContentLayout>
      <SEO
        title="Support the Trust"
        description="Support the Global Health Access Trust with funding, time, expertise, equipment, premises, technology, services, relationships, commissioned projects or legacy giving."
        canonical="/support-the-trust"
      />
      <h1>Support the Trust</h1>

      <p className="featured-text">
        Support may begin with funding, time, expertise, equipment, premises, relationships, a commissioned project or a long-term institutional commitment. Every form of support is governed with the same care.
      </p>

      <p>
        Supporters may contribute to existing work, pledge practical or professional resources,
        create and commission a new project through the secure donor dashboard, or discuss major,
        restricted, institutional or legacy support.
      </p>
      <p>
        Every accepted contribution must advance the Trust's charitable purposes and remains
        subject to appropriate gift acceptance, due diligence, financial controls, safeguarding
        and Trustee oversight.
      </p>

      <div className="section-container">
        <h2>Engagement Process</h2>
        <p>
          The route depends on the contribution. A supporter may pledge money, time, expertise,
          equipment, premises, technology, services, logistics or relationships for the Trust to
          review. Supporters ready to make a financial contribution may use the secure funding
          process. Commissioned projects are created through the donor dashboard. Major,
          institutional, restricted and legacy contributions may require direct engagement and
          additional documentation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
        <div className="section-container">
          <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">Step 1</span>
          <h3 className="my-2 text-foreground">Choose How to Support</h3>
          <p className="text-[15px] text-muted-foreground leading-[1.7]">
            Offer funding, time, expertise, equipment, premises, technology, operational support,
            relationships or a combination of resources. You may also support an approved area of
            work, commission a new project or discuss legacy and institutional support.
          </p>
        </div>
        <div className="section-container">
          <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">Step 2</span>
          <h3 className="my-2 text-foreground">Pledge or Contribute Securely</h3>
          <p className="text-[15px] text-muted-foreground leading-[1.7]">
            A pledge records an expression of interest for review and follow-up. Financial
            contributions use the approved secure funding process. Commissioned-project
            propositions are submitted through the donor dashboard with the proposed need,
            location, purpose, resources, budget and timing.
          </p>
        </div>
        <div className="section-container">
          <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">Step 3</span>
          <h3 className="my-2 text-foreground">Review &amp; Approval</h3>
          <p className="text-[15px] text-muted-foreground leading-[1.7]">
            Proposed gifts, resources, commissioned projects, restrictions and significant
            relationships are reviewed for charitable purpose, suitability, feasibility,
            safeguarding, due diligence, financial risk and the total cost of acceptance.
            Appropriate agreements are established where required.
          </p>
        </div>
        <div className="section-container">
          <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">Step 4</span>
          <h3 className="my-2 text-foreground">Acceptance, Stewardship &amp; Visibility</h3>
          <p className="text-[15px] text-muted-foreground leading-[1.7]">
            A contribution is recorded only after formal acceptance and, where applicable,
            receipt or transfer. Supporters receive appropriate acknowledgement, project
            information, milestones, evidence and financial visibility through secure systems
            where relevant.
          </p>
        </div>
      </div>

      <div className="section-container">
        <h2>Legacy Giving</h2>
        <p>A gift made through a will may support the Trust's general charitable purposes or an agreed area of work.</p>
        <p>Wills and estates require independent legal advice. The Trust can provide its correct legal name, governing-document information and correspondence address and can liaise confidentially with a supporter's solicitor or estate adviser.</p>
        <p>Any restriction attached to a legacy must remain capable of lawful and effective charitable application if circumstances change.</p>
      </div>

      <div className="section-container">
        <h2>Restricted Gifts &amp; Named Funds</h2>
        <p>A contribution may be restricted to an approved project or area of charitable work, subject to formal agreement and Trustee acceptance.</p>
        <p>Restricted gifts must:</p>
        <ul>
          <li>Advance the Trust's charitable purpose</li>
          <li>Define the intended use clearly</li>
          <li>Be recorded separately and applied only to the agreed purpose</li>
          <li>Permit an appropriate alternative charitable use if the original purpose becomes impossible, unlawful or no longer effective</li>
        </ul>
        <p>Supporters may express clear wishes and receive appropriate visibility, but responsibility for charitable funds and resources remains with the Trustees.</p>
      </div>

      <div className="section-container">
        <h2>Major Gifts, Family Offices &amp; Foundations</h2>
        <p>The Trust welcomes structured engagement with individuals, family offices, foundations and institutions seeking to support work at significant scale.</p>
        <p>Arrangements may include major gifts, multi-year commitments, restricted project funding, equipment or infrastructure support, access to premises, professional capability or endowment discussions, subject to due diligence, formal agreement and Board approval.</p>
        <p>Recognition or project involvement does not confer governance authority, ownership of charitable work or control over Trustee decisions.</p>
      </div>

      <div className="section-container">
        <h2>Documentation &amp; Stewardship</h2>
        <p>Every accepted contribution is:</p>
        <ul>
          <li>Recorded and acknowledged</li>
          <li>Allocated or used in accordance with its approved purpose</li>
          <li>Supported by appropriate financial, ownership, condition or delivery records</li>
          <li>Reported through secure or public channels proportionate to the contribution and project</li>
          <li>Protected by the Trust's financial controls and governance framework</li>
        </ul>
        <p>No contribution may provide inappropriate private benefit, override safeguarding or compromise the Trust's charitable independence.</p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mt-10">
        <Link to="/donate">
          <Button size="lg" variant="default">Pledge or Make a Contribution</Button>
        </Link>
        <Link to="/donation-form">
          <Button size="lg" variant="outline">Make a Financial Contribution</Button>
        </Link>
        <Link to="/commission-projects">
          <Button size="lg" variant="outline">Commission a Public-Benefit Project</Button>
        </Link>
        <Link to="/contact-the-trust">
          <Button size="lg" variant="outline">Discuss Institutional or Legacy Support</Button>
        </Link>
      </div>
    </ContentLayout>
  );
};
