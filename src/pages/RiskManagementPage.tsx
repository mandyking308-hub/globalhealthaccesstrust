import { Link } from "react-router-dom";
import { ContentLayout } from "@/components/layout/ContentLayout";
import { SEO } from "@/components/SEO";

export const RiskManagementPage = () => (
  <ContentLayout>
    <SEO
      title="Risk Management"
      description="The trustee-led risk identification, control, escalation and review framework of Global Health Access Trust."
      canonical="/risk-management"
    />
    <h1>Risk Management</h1>
    <p className="featured-text">Proportionate controls, documented ownership and prompt escalation.</p>

    <div className="section-container">
      <h2>Trustee oversight</h2>
      <p>
        The Trustees retain overall responsibility for identifying and managing risks that may affect the Trust's charitable purposes, assets, people, beneficiaries, reputation, systems or legal obligations.
      </p>
      <p>
        Risk records, responsible owners, decisions and mitigations are maintained within the Trust's private governance records. The website does not claim that a particular review cycle or external audit has occurred unless supported by the relevant record.
      </p>
    </div>

    <div className="section-container">
      <h2>Risk areas</h2>
      <ul>
        <li>legal identity, trustee duties and regulatory compliance;</li>
        <li>banking, fraud, source of funds, sanctions and financial controls;</li>
        <li>safeguarding, beneficiary welfare and duty of care;</li>
        <li>project design, partner capability, logistics and delivery;</li>
        <li>privacy, cybersecurity, access control and confidential information;</li>
        <li>conflicts of interest and unauthorised private benefit;</li>
        <li>reputation, public statements and unsupported impact claims; and</li>
        <li>business continuity, supplier dependence and incident response.</li>
      </ul>
    </div>

    <div className="section-container">
      <h2>Assessment and control</h2>
      <p>
        Risks are considered according to their likelihood, impact, urgency and the vulnerability of people or assets affected. Controls may include refusal, additional due diligence, restricted access, segregation of duties, dual approval, written agreements, safeguarding measures, monitoring, contingency planning or suspension of activity.
      </p>
    </div>

    <div className="section-container">
      <h2>Escalation</h2>
      <p>
        Material concerns are escalated to an appropriately authorised Trustee or officer. Matters involving immediate danger, suspected crime, safeguarding, fraud, sanctions, data breaches or protected disclosures are routed through the relevant dedicated pathway and to statutory authorities where required.
      </p>
      <Link to="/support" className="text-primary hover:underline">Support and concern-reporting pathways →</Link>
    </div>

    <div className="section-container">
      <h2>Review and learning</h2>
      <p>
        The Trustees may review risk records following material changes, project decisions, incidents, complaints, regulatory developments or lessons from delivery. Actions and decisions are documented according to their significance.
      </p>
    </div>

    <div className="flex flex-wrap gap-5 mt-8">
      <Link to="/financial-controls" className="text-primary hover:underline">Financial controls →</Link>
      <Link to="/donor-due-diligence-and-sanctions-policy" className="text-primary hover:underline">Due diligence and sanctions →</Link>
      <Link to="/contact-the-trust" className="text-primary hover:underline">Risk and compliance enquiry →</Link>
    </div>
  </ContentLayout>
);
