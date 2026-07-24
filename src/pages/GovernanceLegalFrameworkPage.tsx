import { ContentLayout } from "@/components/layout/ContentLayout";
import { SEO } from "@/components/SEO";

export const GovernanceLegalFrameworkPage = () => {
  return (
    <ContentLayout>
      <SEO
        title="Governance & Legal Framework"
        description="Legal status, regulatory responsibilities and governance framework of Global Health Access Trust, a charitable trust constituted by Trust Deed under the laws of England and Wales."
        canonical="/governance-legal-framework"
      />
      <h1>Governance &amp; Legal Framework</h1>
      
      <p className="featured-text">"Governance is not a formality—it is a responsibility owed to the public."</p>

      <div className="section-container">
        <h2>Legal Status</h2>
        <p>Global Health Access Trust is a charitable trust constituted by Trust Deed with effect from 1 December 2024 under the laws of England and Wales. It operates exclusively for charitable purposes and for the public benefit.</p>
        <p>The Trust Deed is the founding and principal governing document. The trustees later adopted a signed Constitution in June 2025 to record supplementary governance and operating arrangements, including information prepared during banking due diligence. The Constitution supports, and does not replace, the Trust Deed.</p>
        <p>The Trust is administered by its Board of Trustees, which is collectively responsible for the stewardship of its assets, compliance with the governing documents and the lawful advancement of its charitable purposes.</p>
        <p>Any regulatory or registration particulars will be published only when formally confirmed and available for publication.</p>
        <p>All funds are administered in accordance with the Trust Deed, applicable law, the supplementary Constitution, the Trust's financial controls and formal decisions of the Board.</p>
      </div>

      <div className="section-container">
        <h2>Regulatory Compliance</h2>
        <p>The Trust maintains policies and procedures proportionate to its activities, including:</p>
        <ul>
          <li>Charity and trust law</li>
          <li>Trustee fiduciary duties and conflicts of interest</li>
          <li>Anti-money laundering, counter-terrorist financing and sanctions compliance</li>
          <li>Data protection, confidentiality and cyber security</li>
          <li>Safeguarding, equality and non-discrimination</li>
          <li>Responsible use of technology and artificial intelligence, with appropriate human oversight</li>
        </ul>
        <p>Records, reports and regulatory filings are prepared, approved and published where required by law, the Trust's governance framework or formal decision of the Board.</p>
      </div>

      <div className="section-container">
        <h2>Board of Trustees</h2>
        <p>The Board acts collectively and each Trustee serves under binding fiduciary obligations.</p>
        <p>The Board is responsible for:</p>
        <ul>
          <li>Safeguarding the Trust's charitable purpose and independence</li>
          <li>Approving programmes, grants, project allocations and significant expenditure</li>
          <li>Overseeing safeguarding, legal compliance and institutional risk</li>
          <li>Appointing and overseeing advisers, delivery partners, independent reviewers and auditors where appropriate</li>
        </ul>
        <p>No Trustee may receive private benefit from the Trust except where expressly permitted by the Trust Deed and applicable law, properly authorised and transparently recorded.</p>
      </div>

      <div className="section-container">
        <h2>Governance Principles</h2>
        <p>All decisions taken by the Trust are guided by the following principles:</p>
        <ul>
          <li>Legal compliance in all jurisdictions of operation</li>
          <li>Transparent and accountable use of charitable funds</li>
          <li>Independence from political, commercial, or sectarian influence</li>
          <li>Evidence-based programme design and delivery</li>
          <li>Respect for human dignity and rights</li>
          <li>Long-term sustainability and institutional continuity</li>
        </ul>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="section-container">
          <h2>Financial Governance</h2>
          <p>The Trust operates under documented financial controls, including:</p>
          <ul>
            <li>Segregation of duties</li>
            <li>Board approval for significant expenditure</li>
            <li>Separate recording of restricted funds and project allocations</li>
            <li>Expenditure evidence and reconciliation</li>
            <li>Independent examination or audit where required</li>
            <li>Proportionate reporting to donors and regulators</li>
          </ul>
        </div>

        <div className="section-container">
          <h2>Risk Management</h2>
          <p>The Trust maintains a formal risk register covering:</p>
          <ul>
            <li>Governance, legal and regulatory risk</li>
            <li>Financial and operational risk</li>
            <li>Safeguarding and programme-delivery risk</li>
            <li>Data protection, cyber security and technology risk</li>
            <li>Reputational, partnership and jurisdictional risk</li>
          </ul>
          <p>Risks are reviewed at intervals proportionate to their seriousness and whenever a material change occurs. Significant risks are reported to the Board.</p>
        </div>
      </div>

      <div className="section-container">
        <h2>Accountability &amp; Transparency</h2>
        <p>The Trust publishes the governance and policy documents required to explain how it operates. Its accountability framework includes:</p>
        <ul>
          <li>The Trust Deed, signed supplementary Constitution and published governance policies</li>
          <li>Financial accounts and trustee reporting prepared or filed where required</li>
          <li>Secure donor reporting on approved projects, allocations, milestones and evidence</li>
          <li>Published complaints, safeguarding and protected-concerns procedures</li>
          <li>Public project and impact information where appropriate</li>
        </ul>
        <p>Transparency does not override data protection, clinical confidentiality, safeguarding or personal safety. Information may be withheld or redacted where necessary to protect beneficiaries, contributors, donors or delivery partners.</p>
      </div>
    </ContentLayout>
  );
};