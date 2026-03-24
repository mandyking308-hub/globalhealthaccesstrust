import { Link } from "react-router-dom";
import { ContentLayout } from "@/components/layout/ContentLayout";
import { SEO } from "@/components/SEO";

export const OurWorkPage = () => {
  return (
    <ContentLayout>
      <SEO
        title="Our Work"
        description="Explore the five funding pillars of the Global Health Access Trust: ethical healthcare access, capacity building, systems strengthening, research, and emergency relief."
        canonical="/our-work"
      />
      <h1>Our Work</h1>
      
      <p className="featured-text">"We do not fund moments. We fund movements."</p>

      <p>The Global Health Access Trust was founded to advance lawful, measurable, and dignified access to healthcare—particularly for those outside the reach of stable systems or statutory support.</p>
      <p>Our work is guided by five legally defined funding pillars and is delivered through trusted partners, registered institutions, and internationally recognised frameworks.</p>
      <p>We prioritise impact over volume, and depth over display.</p>

      <div className="section-container">
        <h2>1. Ethical Access to Healthcare</h2>
        <p>We fund and facilitate initiatives that deliver healthcare access in areas where need is urgent and provision is absent, under strain, or unjustly withheld. We focus on:</p>
        <ul>
          <li>Subsidised treatment for excluded individuals</li>
          <li>Support for mobile clinics and field hospitals</li>
          <li>Legal funding for cross-border healthcare needs</li>
          <li>Strategic access to diagnostics, supplies, and medicines</li>
        </ul>
      </div>

      <div className="section-container">
        <h2>2. Building Capacity, Not Dependency</h2>
        <p>Rather than funding dependence, we invest in training the next generation of carers and clinicians. Our work includes:</p>
        <ul>
          <li>Bursaries for medical and public health students</li>
          <li>Training for mental health and trauma professionals</li>
          <li>Capacity-building for systems delivery and leadership</li>
          <li>Legal and cultural training in rights-based healthcare models</li>
        </ul>
      </div>

      <div className="section-container">
        <h2>3. Strengthening Health Systems</h2>
        <p>We support lawful development of healthcare systems and services that benefit the public—not corporations, campaigns, or governments. We act where:</p>
        <ul>
          <li>Public systems have collapsed</li>
          <li>Private access is inequitable</li>
          <li>Infrastructure is failing</li>
          <li>Emergency provisions are unsustainable</li>
        </ul>
      </div>

      <div className="section-container">
        <h2>4. Legal Scholarship & Strategic Reform</h2>
        <p>Justice is foundational to health. We fund legal and policy work that strengthens the systems meant to protect life. This includes:</p>
        <ul>
          <li>Impact evaluations and system audits</li>
          <li>Public health policy research</li>
          <li>Access-to-care legal advocacy</li>
          <li>Support for rights-based constitutional development</li>
        </ul>
      </div>

      <div className="section-container">
        <h2>5. Responding to Humanitarian Collapse</h2>
        <p>When systems fail, we act. Our emergency relief protocols allow us to deliver healthcare aid through trusted, lawful, and auditable partners during:</p>
        <ul>
          <li>Armed conflict</li>
          <li>Border-zone healthcare voids</li>
          <li>Disease outbreak or systemic collapse</li>
          <li>Natural disasters and refugee crises</li>
        </ul>
      </div>

      <div className="section-container">
        <h2>Readiness, Not Reaction</h2>
        <p>The Trust is committed to deploying funds strategically, not reactively. All interventions are:</p>
        <ul>
          <li>Lawful and apolitical</li>
          <li>Delivered through formal due diligence</li>
          <li>Audited, reviewed, and governed with strict neutrality</li>
          <li>Undertaken in the service of long-term public benefit</li>
        </ul>
        </div>

        <div className="flex flex-wrap gap-4 mt-8">
          <Link to="/support-the-trust" className="inline-block text-sm font-medium text-primary hover:underline underline-offset-4">Support Our Work →</Link>
          <Link to="/contact-the-trust" className="inline-block text-sm font-medium text-primary hover:underline underline-offset-4">Contact the Trust →</Link>
        </div>
    </ContentLayout>
  );
};
