import { Link } from "react-router-dom";
import { ContentLayout } from "@/components/layout/ContentLayout";
import { SEO } from "@/components/SEO";

export const OurWorkPage = () => {
  return (
    <ContentLayout>
      <SEO
        title="Our Work"
        description="Explore six areas of work developed by the Global Health Access Trust: healthcare access, clinical networks, health systems, responsible AI, research and humanitarian response."
        canonical="/our-work"
      />
      <h1>Our Work</h1>
      
      <p className="featured-text">"We do not fund moments. We fund movements."</p>

      <p>The Global Health Access Trust develops and supports defined projects that advance health, relieve illness and preserve life—particularly where stable systems are absent, failing or inaccessible.</p>
      <p>Our work brings together clinical expertise, human capability, responsible artificial intelligence, essential infrastructure, trusted local relationships and accountable funding.</p>
      <p>The Trust organises this work across six interconnected areas. Every project must demonstrate a clear route to public benefit and remain within the Trust's charitable purpose.</p>
      <p>We prioritise impact over volume, and depth over display.</p>

      <div className="section-container">
        <h2>1. Ethical Access to Healthcare</h2>
        <p>We develop and support lawful interventions where access to care is absent, delayed, unaffordable or under severe pressure. This may include:</p>
        <ul>
          <li>Treatment for excluded or vulnerable individuals</li>
          <li>Mobile clinics, field services and local clinical provision</li>
          <li>Lawful access to specialist knowledge or care across borders</li>
          <li>Diagnostics, medicines, equipment and essential supplies</li>
        </ul>
      </div>

      <div className="section-container">
        <h2>2. Clinical Networks &amp; Human Capability</h2>
        <p>Lasting health outcomes depend upon people and institutions able to continue the work. Projects may support:</p>
        <ul>
          <li>Clinical networks and access to specialist professional expertise</li>
          <li>Education and training for clinicians, carers and community teams</li>
          <li>Mental health, trauma and neurodiversity capability</li>
          <li>Mentoring, knowledge transfer and local professional leadership</li>
        </ul>
      </div>

      <div className="section-container">
        <h2>3. Health Systems &amp; Essential Infrastructure</h2>
        <p>Healthcare depends upon reliable facilities, supply arrangements and supporting systems. Where directly connected to health and public benefit, projects may support:</p>
        <ul>
          <li>Clinical and community facilities</li>
          <li>Medicine, equipment, food and essential supply systems</li>
          <li>Safe accommodation and healthy environments required for treatment, recovery or prevention</li>
          <li>Operational coordination, logistics and local service continuity</li>
        </ul>
      </div>

      <div className="section-container">
        <h2>4. Responsible AI &amp; Health Intelligence</h2>
        <p>The Trust develops and applies responsible technology where it can strengthen health, human capability and the systems on which communities depend. Projects may include:</p>
        <ul>
          <li>Intelligence systems that identify needs, risks and service gaps</li>
          <li>Tools that support clinicians, community teams and local decision-makers</li>
          <li>Coordination of food, medicine, logistics and essential supplies</li>
          <li>Evidence capture, early warning and accountable project reporting</li>
          <li>Education, neurodiversity and skills initiatives supported by artificial intelligence</li>
        </ul>
        <p>Technology is used to expand human capability, not remove human responsibility. Clinical judgment, local leadership, safeguarding and trustee oversight remain central.</p>
      </div>

      <div className="section-container">
        <h2>5. Evidence, Research &amp; Strategic Reform</h2>
        <p>Evidence supports better delivery, stronger accountability and the removal of barriers to care. The Trust may support:</p>
        <ul>
          <li>Health-needs assessments, impact evaluations and system reviews</li>
          <li>Public-health and healthcare-access research</li>
          <li>Lawful policy and legal work addressing barriers to care</li>
          <li>Practical research into responsible technology and stronger health services</li>
        </ul>
      </div>

      <div className="section-container">
        <h2>6. Humanitarian &amp; War-Affected Response</h2>
        <p>Where conflict, disaster or institutional failure removes access to essential services, the Trust may support coordinated, lawful and auditable interventions involving:</p>
        <ul>
          <li>Clinical aid and essential health supplies</li>
          <li>Field facilities and integrated service-centre capability</li>
          <li>Food, hygiene and safe space where directly required to protect health or life</li>
          <li>Trusted local partners, logistics and communications</li>
        </ul>
      </div>

      <div className="section-container">
        <h2>Readiness, Not Reaction</h2>
        <p>The Trust does not equate urgency with disorder. Each intervention is developed with:</p>
        <ul>
          <li>A clear charitable purpose and defined scope</li>
          <li>Trustee approval and proportionate due diligence</li>
          <li>A responsible team and safeguarding framework</li>
          <li>Milestones, expenditure controls and evidence requirements</li>
          <li>A route to sustained public benefit</li>
        </ul>
      </div>

      <div className="flex flex-wrap gap-4 mt-8">
        <Link to="/support-the-trust" className="inline-block text-sm font-medium text-primary hover:underline underline-offset-4">Support Our Work →</Link>
        <Link to="/contact-the-trust" className="inline-block text-sm font-medium text-primary hover:underline underline-offset-4">Contact the Trust →</Link>
      </div>
    </ContentLayout>
  );
};
