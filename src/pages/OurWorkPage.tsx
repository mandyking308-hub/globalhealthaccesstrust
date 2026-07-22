import { Link } from "react-router-dom";
import { ContentLayout } from "@/components/layout/ContentLayout";
import { SEO } from "@/components/SEO";

export const OurWorkPage = () => (
  <ContentLayout>
    <SEO
      title="Our Work"
      description="The established network, current pro bono work and future trustee-approved charitable scope of Global Health Access Trust."
      canonical="/our-work"
    />
    <h1>Our Work</h1>
    <p className="featured-text">Genuine history and current work, clearly separated from future trustee-approved projects.</p>

    <div className="section-container">
      <h2>Charitable work since 2019</h2>
      <p>
        The charitable and public-benefit work that led to Global Health Access Trust began in 2019. GHAT itself was formally established under its Trust Deed with effect from 1 December 2024.
      </p>
      <p>
        The earlier work includes the Clinicians Check international clinician network, with registrations numbering in the thousands, representation across 12 countries and more than 40 partner and organisational relationships.
      </p>
      <p>
        These figures describe wider network reach and capacity. They are not presented as evidence that GHAT funded or completed projects in every country or through every relationship.
      </p>
    </div>

    <div className="section-container">
      <h2>Current pro bono work in Nigeria</h2>
      <p>
        The wider team is providing unpaid technical and operational support to an agricultural supply-chain organisation in Nigeria. The work is intended to improve visibility, coordination and controls across farmers, partners, logistics, quality assurance, buyer delivery and payment risk, helping to protect harvest outcomes and farmer livelihoods.
      </p>
      <p>
        The organisation is not publicly named. No fee is being charged and no completed impact result is claimed. The work will be presented as a formal GHAT project only if the Trustees approve an appropriate project charter or minute.
      </p>
    </div>

    <div className="section-container">
      <h2>Areas within the Trust's charitable mandate</h2>
      <p>The Trustees may approve lawful work in areas including:</p>
      <ul>
        <li>access to healthcare and the relief of illness;</li>
        <li>education and professional capacity in health and care;</li>
        <li>health-system infrastructure, logistics and continuity;</li>
        <li>research, public-benefit policy and lawful systems improvement; and</li>
        <li>emergency or exceptional relief where healthcare access is disrupted.</li>
      </ul>
      <p>
        These areas describe what the Trust may support. They are not a list of completed grants or active country programmes.
      </p>
    </div>

    <div className="section-container">
      <h2>Project approval</h2>
      <p>
        A proposed project must be assessed against the Trust Deed, public benefit, due diligence, sanctions, safeguarding, financial controls, delivery risk and available resources. Work proceeds as a formal GHAT project only after documented trustee approval and appropriate terms.
      </p>
    </div>

    <div className="flex flex-wrap gap-5 mt-8">
      <Link to="/what-we-do" className="text-primary hover:underline">Full charitable mandate →</Link>
      <Link to="/how-we-work" className="text-primary hover:underline">How projects are governed →</Link>
      <Link to="/contact-the-trust" className="text-primary hover:underline">Contact the Trust →</Link>
    </div>
  </ContentLayout>
);
