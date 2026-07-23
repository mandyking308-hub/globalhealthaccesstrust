import { ContentLayout } from "@/components/layout/ContentLayout";
import { SEO } from "@/components/SEO";

export const HowWeWorkPage = () => {
  return (
    <ContentLayout>
      <SEO
        title="How We Work"
        description="How the Global Health Access Trust develops, commissions, funds and oversees healthcare-enabling charitable projects through people, responsible technology and accountable evidence."
        canonical="/how-we-work"
      />
      <h1>How We Work</h1>
      
      <p className="featured-text">"Our method is measured. Our purpose is enduring."</p>

      <p>The Global Health Access Trust develops projects around clearly defined healthcare-access, infrastructure, workforce and system needs. We bring together people, professional expertise, responsible technology, local knowledge and accountable funding to create practical routes to public benefit.</p>
      <p>Projects move through disciplined stages of listening, scoping, approval, team formation, funding, delivery and evidence.</p>

      <div className="section-container">
        <h2>1. Purpose-Led Project Development</h2>
        <p>Every project must advance health, relieve illness or preserve life and demonstrate a clear route to public benefit.</p>
        <p>Before work begins, the Trust defines:</p>
        <ul>
          <li>The healthcare-access, infrastructure, workforce or system need</li>
          <li>The population, community or service context the project exists to support</li>
          <li>The expertise, systems and resources required</li>
          <li>The legal, safeguarding and delivery risks</li>
          <li>The evidence by which progress will be assessed</li>
        </ul>
        <p>Our six areas of work are set out on the Our Work page. They guide project development without limiting the Trust's ability to respond intelligently to complex needs.</p>
      </div>

      <div className="section-container">
        <h2>2. Creating and Commissioning Projects</h2>
        <p>Supporters can create and submit a commissioned project directly through the Trust's secure donor dashboard.</p>
        <p>The project form enables a supporter to define:</p>
        <ul>
          <li>The project title and intended public-benefit purpose</li>
          <li>The region and country</li>
          <li>The type of healthcare-enabling, infrastructure, education, research or system intervention</li>
          <li>The population, service or access challenge the project is intended to address</li>
          <li>The proposed budget and level of urgency</li>
          <li>An optional dedication or anonymity preference</li>
        </ul>
        <p>Once submitted, the project enters the Trust's project system for scoping, due diligence and Trustee review. The Trust works with the supporter to test feasibility, define the charitable outcome, establish the delivery structure and agree appropriate milestones.</p>
        <p>Approved projects can then be followed through the secure dashboard, including project agreements, messages, progress updates, evidence and financial information appropriate to the project.</p>
        <p>The supporter creates and helps shape the project. Trustee approval, safeguarding, charitable purpose and control of charitable funds remain with the Trust.</p>
      </div>

      <div className="section-container">
        <h2>3. Scoping, Approval &amp; Funding</h2>
        <p>The Trust may develop, commission, coordinate or fund a project. Not every project is structured as a conventional grant.</p>
        <p>Before approval, the Trust establishes:</p>
        <ul>
          <li>A defined scope, budget and intended outcome</li>
          <li>Proportionate due diligence on people, organisations and jurisdictions</li>
          <li>Safeguarding, data-protection and risk requirements</li>
          <li>Delivery responsibilities, milestones and evidence standards</li>
          <li>Where relevant, the regulated provider responsible for clinical delivery and governance</li>
          <li>The appropriate agreement and funding structure</li>
        </ul>
        <p>Projects and significant allocations require Trustee approval. Funding may be restricted to a particular project and released in stages where appropriate.</p>
      </div>

      <div className="section-container">
        <h2>4. Teams &amp; Delivery Relationships</h2>
        <p>The Trust forms teams around the requirements of each project. These may include:</p>
        <ul>
          <li>Clinicians and other professional specialists contributing within clearly defined roles</li>
          <li>Technologists, researchers and operational contributors</li>
          <li>Hospitals, universities, charities and public institutions</li>
          <li>Faith-based organisations and community structures</li>
          <li>Local leaders, logistics providers and delivery partners</li>
        </ul>
        <p>Due diligence is proportionate to the role and risk. Participants must demonstrate appropriate capability, integrity, safeguarding and legal compliance.</p>
        <p>Clinical services within a project remain under the governance, supervision and professional responsibility of the regulated provider delivering them.</p>
        <p>Contributors may remain publicly anonymous where confidentiality, professional discretion or personal safety requires it.</p>
      </div>

      <div className="section-container">
        <h2>5. Responsible AI &amp; Human Oversight</h2>
        <p>Artificial intelligence may be used to identify population or service needs, analyse information, support research, coordinate complex systems, improve logistics, develop solutions and strengthen evidence.</p>
        <p>The Trust may also develop AI-enabled tools as part of an approved charitable project, subject to appropriate legal, ethical, technical and safeguarding review.</p>
        <p>Where technology informs clinical work, clinical decisions remain with appropriately regulated healthcare professionals and providers. Safeguarding decisions, local leadership, financial authority and Trustee accountability remain human responsibilities.</p>
      </div>

      <div className="section-container">
        <h2>6. Evidence, Learning &amp; Accountability</h2>
        <p>Each approved project is assigned milestones, reporting requirements and evidence standards proportionate to its scale and risk.</p>
        <p>Records may include:</p>
        <ul>
          <li>Project decisions and approvals</li>
          <li>Funding allocations and expenditure</li>
          <li>Delivery milestones and field updates</li>
          <li>Photographs, documents and other appropriate evidence</li>
          <li>Risks, changes and lessons learned</li>
        </ul>
        <p>Donors receive appropriate project visibility through secure systems. Public reporting is provided where appropriate without compromising confidentiality, safeguarding, data protection, regulated-provider responsibility or personal safety.</p>
      </div>

      <div className="section-container">
        <h2>7. Independence, Confidentiality &amp; Dignity</h2>
        <p>The Trust does not:</p>
        <ul>
          <li>Surrender Trustee authority in exchange for funding</li>
          <li>Permit private benefit or inappropriate donor control</li>
          <li>Enter relationships that compromise its charitable independence</li>
          <li>Publish beneficiary, contributor or partner identities without an appropriate basis</li>
          <li>Allow urgency, technology or publicity to override safeguarding and professional responsibility</li>
        </ul>
        <p className="featured-text">We are built to endure. And with that comes the duty to act wisely, carefully and with purpose.</p>
      </div>

      <div className="section-container">
        <h2>Final Note</h2>
        <p>Supporters may fund existing work or create a new commissioned project through the secure donor dashboard.</p>
        <p>Organisations, clinicians, communities and professional contributors may approach the Trust with a defined healthcare-access, infrastructure, workforce or system proposition.</p>
        <p>Every project remains subject to charitable purpose, feasibility, safeguarding, due diligence and Trustee approval. Any clinical component is delivered and governed by an appropriately regulated provider.</p>
      </div>
    </ContentLayout>
  );
};