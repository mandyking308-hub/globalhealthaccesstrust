import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ContentLayout } from "@/components/layout/ContentLayout";
import { SEO } from "@/components/SEO";

export const DonorRecognitionPage = () => {
  return (
    <ContentLayout>
      <SEO
        title="Donor Recognition"
        description="How the Global Health Access Trust recognises supporters, contributors and legacy gifts while protecting dignity, privacy and charitable independence."
        canonical="/donor-recognition"
      />
      <h1>Donor Recognition</h1>
      
      <p className="featured-text">"True generosity is not about acknowledgment—it is about legacy."</p>

      <p>The Global Health Access Trust recognises those who contribute funding, expertise, time, relationships and practical support to its charitable work.</p>
      <p>Recognition is guided by the supporter's wishes, the nature of the contribution and the dignity of the people and communities involved. Support may be acknowledged publicly, privately, within project records or not at all.</p>

      <div className="section-container">
        <h2>Our Approach to Recognition</h2>
        <p>We believe in:</p>
        <ul>
          <li><strong>Dignity over Display:</strong> Recognition must respect the preferences of supporters and the dignity, safety and privacy of those served.</li>
          <li><strong>Impact over Amount:</strong> Recognition is not purchased through a financial threshold.</li>
          <li><strong>Substance over Ceremony:</strong> Acknowledgement should reflect genuine contribution rather than create implied status or influence.</li>
          <li><strong>Legacy over Publicity:</strong> Lasting public benefit matters more than temporary visibility.</li>
        </ul>
        <p>Recognition never confers ownership of a project, governance authority, preferential access to beneficiaries or control over charitable decisions.</p>
      </div>

      <div className="section-container">
        <h2>Recognition Choices</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="p-4 bg-background rounded border border-border">
            <h3>Public Recognition</h3>
            <p>A supporter, family, organisation or institution may be acknowledged publicly where consent has been given and publication is appropriate.</p>
          </div>
          <div className="p-4 bg-background rounded border border-border">
            <h3>Private Recognition</h3>
            <p>A contribution may be acknowledged directly through correspondence, secure project records or private reporting without public identification.</p>
          </div>
          <div className="p-4 bg-background rounded border border-border">
            <h3>Anonymous Support</h3>
            <p>A supporter may remain anonymous publicly. The Trust will still retain the information required for financial control, due diligence and legal compliance.</p>
          </div>
          <div className="p-4 bg-background rounded border border-border">
            <h3>Project Dedications</h3>
            <p>A commissioned or supported project may include an approved dedication, memorial or acknowledgement where this is consistent with charitable purpose, dignity and safeguarding.</p>
          </div>
        </div>
        <h3 className="mt-6">Legacy Recognition</h3>
        <p>Those supporting the Trust through a will may choose private, public, memorial or anonymous recognition. Any recognition remains subject to the final terms of the gift and the circumstances existing when it is received.</p>
      </div>

      <div className="section-container">
        <h2>How Recognition May Be Given</h2>
        <p>Depending on the supporter's wishes and the nature of the contribution, recognition may include:</p>
        <ul>
          <li>A formal acknowledgement or letter of thanks</li>
          <li>Acknowledgement within approved project records</li>
          <li>Public recognition on the Trust's website or in appropriate publications</li>
          <li>A family, organisational, memorial or project dedication</li>
          <li>Appropriate project updates and reporting</li>
          <li>Complete public anonymity</li>
        </ul>
        <p>Recognition in governance documents will occur only where relevant to governance or legally required. Project updates and access to information remain subject to confidentiality, safeguarding, data protection and personal safety.</p>
      </div>

      <div className="section-container">
        <h2>Naming and Project Recognition</h2>
        <p>Naming of a project, programme, facility or initiative is considered individually and requires Trustee approval.</p>
        <p>Naming must remain consistent with charitable purpose, institutional independence and the dignity of the work. It does not give the supporter ownership of the project or authority over delivery, beneficiaries, personnel or charitable funds.</p>
      </div>

      <div className="section-container">
        <h2>Contact About Recognition</h2>
        <p>Supporters can discuss recognition, anonymity, dedications or memorial arrangements through the Trust's contact form or the secure messaging area of the donor dashboard.</p>
        <p>Please use the subject <strong>“Donor Recognition – Confidential”</strong> for sensitive enquiries.</p>
        <p>Recognition preferences may be reviewed as circumstances change, although information already lawfully published may not always be capable of complete withdrawal.</p>
        <div className="flex flex-wrap gap-4 mt-6">
          <Link to="/donor-login">
            <Button size="lg" variant="default">Open Donor Portal</Button>
          </Link>
          <Link to="/contact-the-trust">
            <Button size="lg" variant="outline">Contact the Trust</Button>
          </Link>
        </div>
      </div>
    </ContentLayout>
  );
};