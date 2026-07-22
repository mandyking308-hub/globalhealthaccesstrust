import { Link } from "react-router-dom";
import { ContentLayout } from "@/components/layout/ContentLayout";
import { SEO } from "@/components/SEO";
import { LEGAL_ENTITY } from "@/lib/legalEntity";

export const AboutTheTrustPage = () => (
  <>
    <SEO
      title="About the Trust"
      description="The legal identity, charitable purpose, Trustees and operating model of Global Health Access Trust."
      canonical="/about-the-trust"
    />
    <ContentLayout>
      <h1>About the Trust</h1>
      <p className="featured-text">
        A trustee-led charitable structure for accountable healthcare-access projects.
      </p>

      <div className="section-container">
        <h2>Legal identity</h2>
        <p>{LEGAL_ENTITY.publicLegalDescription}</p>
        <p>
          The Trust is not presented as a company and no company number or Charity Commission registration number is claimed. Its governing authority comes from its signed Trust Deed and the decisions of its Trustees.
        </p>
      </div>

      <div className="section-container">
        <h2>Trustees</h2>
        <p>The current Trustees are:</p>
        <ul>
          <li>Mandy King — Chair of Trustees</li>
          <li>Dr Jagdev Thukral — Trustee</li>
          <li>John O'Sullivan BA FCA — Trustee</li>
        </ul>
        <p>
          The Trustees are responsible for charitable purpose, public benefit, financial stewardship, risk, safeguarding, project approval and compliance with the Trust Deed.
        </p>
        <Link to="/trustee-biographies" className="text-primary hover:underline">
          Trustee information →
        </Link>
      </div>

      <div className="section-container">
        <h2>Charitable purpose</h2>
        <p>
          The Trust exists to advance health, relieve illness and preserve life, particularly for people and communities facing barriers to appropriate healthcare. It may also advance education and capacity in health and care where doing so serves those charitable purposes.
        </p>
        <p>
          Projects must be for public benefit, fall within the Trust Deed, be lawful in every relevant jurisdiction and avoid unauthorised private benefit or donor control.
        </p>
      </div>

      <div className="section-container">
        <h2>Operating model</h2>
        <p>
          GHAT uses a secure digital platform to assess, commission, govern and report on defined projects. The platform supports administration; it does not replace trustee judgement, legal agreements, safeguarding decisions or financial controls.
        </p>
        <ul>
          <li>Project proposals are assessed before commitment.</li>
          <li>Trustees approve purpose, restrictions, budget and delivery arrangements.</li>
          <li>Approved work is documented through a Project Charter or appropriate agreement.</li>
          <li>Progress is derived from milestones rather than fundraising percentages.</li>
          <li>Financial records distinguish allocated, committed, spent, remaining, refunded and reallocated funds.</li>
          <li>Donor visibility does not transfer legal control away from the Trustees.</li>
        </ul>
      </div>

      <div className="section-container">
        <h2>Banking and receipt of funds</h2>
        <p>
          The Trust is establishing a bank account in its own legal name. Public bank details and live payment collection will not be activated until the account and related payment settings have been independently verified and approved by the Trustees.
        </p>
        <p>
          A proposal, payment instruction, mandate or pending collection is not treated as charitable income. A donation is recorded only after cleared funds have been received and reconciled.
        </p>
      </div>

      <div className="section-container">
        <h2>Governing document</h2>
        <p>
          The signed governing document is publicly available for banks, advisers, partners and other due-diligence reviewers. The authoritative PDF is retained separately from the website's policies and legal notices.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link to="/constitution" className="text-primary hover:underline">
            View Constitution (Signed) →
          </Link>
          <a
            href="/GHAT_Constitution_2025_Refined.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Open signed PDF →
          </a>
        </div>
      </div>

      <div className="section-container">
        <h2>Correspondence</h2>
        <p>{LEGAL_ENTITY.correspondenceAddress.lines.join(", ")}.</p>
        <p>
          This is the Trust's correspondence address. It is not described as a registered office.
        </p>
      </div>

      <div className="flex flex-wrap gap-5 mt-8">
        <Link to="/governance-legal-framework" className="text-primary hover:underline">Governance framework →</Link>
        <Link to="/financial-controls" className="text-primary hover:underline">Financial controls →</Link>
        <Link to="/contact-the-trust" className="text-primary hover:underline">Contact the Trust →</Link>
      </div>
    </ContentLayout>
  </>
);
