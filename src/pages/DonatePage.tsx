import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ContentLayout } from "@/components/layout/ContentLayout";
import { SEO } from "@/components/SEO";

export const DonatePage = () => {
  return (
    <ContentLayout>
      <SEO
        title="Funding & Engagement"
        description="The Global Health Access Trust operates a structured funding model. All funding relationships are established through a governed engagement process."
        canonical="/donate"
      />
      <h1>Funding &amp; Engagement</h1>

      <p className="featured-text">"The Trust does not operate an open donation model. All funding relationships are established through a structured engagement process to ensure alignment, accountability, and effective deployment of capital."</p>

      <p>The Global Health Access Trust directs capital into healthcare access, system infrastructure, and capacity building through structured, governed funding relationships.</p>
      <p>This approach ensures that all funding is aligned with the Trust's charitable mandate, subject to independent oversight, and deployed with full accountability.</p>

      <div className="section-container">
        <h2>Why Structured Engagement</h2>
        <p>The Trust's funding model is designed to ensure:</p>
        <ul>
          <li>Alignment with the Trust's charitable objectives and governance framework</li>
          <li>Full accountability for how capital is allocated and deployed</li>
          <li>Structured reporting and oversight throughout the lifecycle of each initiative</li>
          <li>Compliance with all applicable legal and regulatory requirements</li>
        </ul>
      </div>

      <div className="section-container">
        <h2>How to Engage</h2>
        <p>If you are an individual, family office, institution, or organisation interested in supporting the Trust's work, the first step is to submit a formal enquiry.</p>
        <p>All enquiries are reviewed by the Trust's administrative team to assess alignment and determine the appropriate engagement pathway.</p>
      </div>

      <div className="text-center mt-10">
        <Link to="/contact">
          <Button size="lg" variant="default">
            Contact the Trust
          </Button>
        </Link>
      </div>
    </ContentLayout>
  );
};
