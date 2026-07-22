import { Link } from "react-router-dom";
import { ContentLayout } from "@/components/layout/ContentLayout";
import { SEO } from "@/components/SEO";

export const HowWeWorkPage = () => (
  <ContentLayout>
    <SEO
      title="How We Work"
      description="How Global Health Access Trust assesses, approves, controls and reports on proposed charitable projects."
      canonical="/how-we-work"
    />
    <h1>How We Work</h1>
    <p className="featured-text">Trustee decisions, documented authority and evidence before public claims.</p>

    <div className="section-container">
      <h2>1. Initial assessment</h2>
      <p>
        A proposal is considered against the Trust Deed, charitable purpose, public benefit, legal permissibility, safeguarding, sanctions, financial-crime risk, conflicts, delivery capacity and available resources.
      </p>
      <p>The Trust does not currently operate an open grant-application programme.</p>
    </div>

    <div className="section-container">
      <h2>2. Due diligence</h2>
      <p>
        Proportionate checks may cover identity, authority, beneficial ownership, source of funds, sanctions, politically exposed persons, adverse information, partner capability, safeguarding and conflicts of interest.
      </p>
      <p>A relationship may be refused, paused or restricted where risk cannot be managed appropriately.</p>
    </div>

    <div className="section-container">
      <h2>3. Trustee approval</h2>
      <p>
        A formal project proceeds only after the Trustees approve its purpose, responsibilities, budget, restrictions, delivery arrangements, evidence requirements and reporting framework. Approval is recorded through an appropriate resolution, minute, Project Charter or agreement.
      </p>
    </div>

    <div className="section-container">
      <h2>4. Controlled delivery</h2>
      <ul>
        <li>Access to project information is role-based.</li>
        <li>Payments require appropriate authority and supporting evidence.</li>
        <li>Restricted and unrestricted funds are recorded separately.</li>
        <li>Committed, paid, remaining, refunded and reallocated amounts are distinguished.</li>
        <li>Material changes require review and approval.</li>
        <li>Safeguarding, privacy and security restrictions take priority over publicity.</li>
      </ul>
    </div>

    <div className="section-container">
      <h2>5. Reporting and evidence</h2>
      <p>
        Progress is assessed through defined milestones and appropriate evidence. Photographs, narrative updates and percentages do not, by themselves, establish financial verification or completed impact.
      </p>
      <p>
        The Trust will not describe evidence as independently verified, a project as completed or an outcome as achieved unless the relevant review has genuinely occurred.
      </p>
    </div>

    <div className="section-container">
      <h2>6. Closure and learning</h2>
      <p>
        Project closure records the final position, including work completed, expenditure, outstanding obligations, remaining funds, restrictions, refunds or reallocations, material incidents and lessons for future trustee decisions.
      </p>
    </div>

    <div className="flex flex-wrap gap-5 mt-8">
      <Link to="/governance-legal-framework" className="text-primary hover:underline">Governance framework →</Link>
      <Link to="/financial-controls" className="text-primary hover:underline">Financial controls →</Link>
      <Link to="/donor-due-diligence-and-sanctions-policy" className="text-primary hover:underline">Due diligence policy →</Link>
    </div>
  </ContentLayout>
);
