import { ContentLayout } from "@/components/layout/ContentLayout";
import { SEO } from "@/components/SEO";

export const GovernanceLegalFrameworkPage = () => {
  return (
    <ContentLayout>
      <SEO
        title="Governance & Legal Framework"
        description="Legal status, regulatory compliance, and governance framework of the Global Health Access Trust, a charitable trust under English and Welsh law."
        canonical="/governance-legal-framework"
      />
      <h1>Governance & Legal Framework</h1>
      
      <p className="featured-text">"Governance is not a formality—it is a responsibility owed to the public."</p>

      <div className="section-container">
        <h2>Legal Status</h2>
        <p>Global Health Access Trust is a charitable trust established under the laws of England and Wales. It is constituted by a formal Trust Deed and operates exclusively for charitable purposes and for the public benefit.</p>
        <p>The Trust is administered by its Board of Trustees, who are responsible for the proper stewardship of its assets, compliance with the governing document and the lawful advancement of its charitable purposes.</p>
        <p>The Trust's regulatory and registration particulars will be stated on this website when those particulars are formally confirmed and available for publication.</p>
        <p>All funds are administered in accordance with the Trust Deed, applicable law, the Trust's financial controls and the decisions of the Board of Trustees.</p>
      </div>


      <div className="section-container">
        <h2>Regulatory Compliance</h2>
        <p>The Trust is committed to full legal and regulatory compliance across all areas of operation. This includes:</p>
        <ul>
          <li>Charity law (Charities Act 2011 and related statutes)</li>
          <li>Trustee fiduciary duty and conduct standards</li>
          <li>Anti-Money Laundering (AML) compliance</li>
          <li>Counter-Terrorism and Sanctions regulations</li>
          <li>Data protection and GDPR</li>
          <li>Safeguarding and equality obligations (where applicable)</li>
        </ul>
        <p>Financial statements, governance reports and regulatory filings will be prepared, approved and published where required by law or determined appropriate by the Board of Trustees.</p>
      </div>


      <div className="section-container">
        <h2>Board of Trustees</h2>
        <p>The Trust is overseen by a Board of Trustees, each of whom serves without private gain and under binding fiduciary obligation.</p>
        <p>The Board is responsible for:</p>
        <ul>
          <li>Strategic oversight and mission alignment</li>
          <li>Approval of all grant-making and disbursements</li>
          <li>Legal compliance and risk management</li>
          <li>Appointment of advisors and external auditors (as applicable)</li>
        </ul>
        <p>No Trustee may benefit financially from the Trust's operations, except where lawfully permitted by the Charity Commission and transparently disclosed.</p>
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
          <p>The Trust operates under strict financial controls:</p>
          <ul>
            <li>Independent audit (when thresholds require)</li>
            <li>Segregation of duties in financial management</li>
            <li>Board-level approval for all significant expenditures</li>
            <li>Transparent reporting to donors and regulators</li>
            <li>Investment policies aligned with charitable purposes</li>
          </ul>
        </div>

        <div className="section-container">
          <h2>Risk Management</h2>
          <p>The Trust maintains a formal risk register covering:</p>
          <ul>
            <li>Governance and compliance risks</li>
            <li>Financial and operational risks</li>
            <li>Reputational and safeguarding risks</li>
            <li>Programme delivery and partnership risks</li>
          </ul>
          <p>Risk assessment is conducted quarterly and reported to the Board annually.</p>
        </div>
      </div>

      <div className="section-container">
        <h2>Accountability & Transparency</h2>
        <p>The Trust is committed to openness and public accountability:</p>
        <ul>
          <li>Annual governance statement (published)</li>
          <li>Financial accounts and trustee report (public filing)</li>
          <li>Programme impact reports (available on request)</li>
          <li>Complaints procedure and safeguarding policies (published)</li>
        </ul>
        <p>Any member of the public may request information about our governance, subject to data protection and confidentiality requirements.</p>
      </div>
    </ContentLayout>
  );
};
