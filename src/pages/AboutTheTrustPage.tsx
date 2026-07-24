import { Link } from "react-router-dom";
import { ContentLayout } from "@/components/layout/ContentLayout";
import { SEO } from "@/components/SEO";

export const AboutTheTrustPage = () => {
  return (
    <>
      <SEO 
        title="About the Trust - Global Health Access Trust"
        description="Learn about the Global Health Access Trust's origins, governance structure, charitable purpose, and commitment to building lasting healthcare access for vulnerable populations worldwide."
        canonical="/about-the-trust"
      />
      <ContentLayout>
        <h1>About the Trust</h1>
        
        <p className="featured-text">"A life of service begins with the solemnity of intention."</p>

        <div className="section-container">
          <h2>Origins &amp; Institutional Development</h2>
          <p>Global Health Access Trust builds on decades of voluntary, self-funded and pro bono work across healthcare, technology, education, community support and humanitarian response.</p>
          <p>From 2019, this work developed through an international network of clinicians, technologists, faith-based organisations and professional contributors, many of whom contributed their time, expertise and practical support without charge.</p>
          <p>The organisation adopted its Constitution in June 2025, bringing that experience within a defined charitable governance framework capable of developing and supporting larger, longer-term projects.</p>
          <p>Today, the Trust applies that experience through defined programmes, trusted delivery relationships and accountable systems established for enduring public benefit.</p>
          <p className="block"><Link to="/our-history" className="text-primary hover:underline inline-block py-2">Explore Our History of Charitable Work →</Link></p>
        </div>

        <div className="section-container">
          <h2>Structure &amp; Leadership</h2>
          <p>Global Health Access Trust is governed by a Board of Trustees with responsibility for charitable purpose, strategy, safeguarding, financial stewardship and institutional oversight.</p>
          <p>The Board is supported, where appropriate, by advisers and professional contributors with experience across healthcare, finance, law, technology and international delivery.</p>
          <p>All Trustees act under fiduciary duty and in accordance with the Constitution, applicable law and the Trust's published governance framework.</p>
          <p className="block"><Link to="/trustee-biographies" className="text-primary hover:underline inline-block py-2">View Trustee Biographies →</Link></p>
        </div>

        <div className="section-container">
          <h2>Charitable Purpose</h2>
          <p>The charitable purpose of the Trust is:</p>
          <p className="featured-text">"To advance health, relieve illness, and preserve life—particularly among vulnerable or underserved populations—through lawful and equitable means, as recognised under section 3 of the Charities Act 2011."</p>
          <p>All funding and programme activity is directed solely toward these ends.</p>
        </div>

        <div className="section-container">
          <h2>Public Benefit Statement</h2>
          <p>In accordance with the Charity Commission's public benefit requirement, the Trust affirms that all of its charitable activities:</p>
          <ul>
            <li>Are exclusively for public benefit;</li>
            <li>Provide measurable outcomes that improve health or healthcare access;</li>
            <li>Are accessible without unjust exclusion, prejudice, or private gain;</li>
            <li>Operate under principles of transparency, non-partisanship, and institutional independence.</li>
          </ul>
          <p className="featured-text">We exist to serve—not to sell. We work to restore dignity where it has been denied, and to strengthen systems where they have failed.</p>
        </div>

        <div className="section-container">
          <h2>Our Approach</h2>
          <p>The Trust takes a deliberately measured, disciplined approach to charitable intervention:</p>
          <ul>
            <li>We fund with purpose, not impulse.</li>
            <li>We prioritise systems-building, not dependency.</li>
            <li>We choose partnerships based on ethics, alignment, and legal compliance.</li>
            <li>We operate with quiet fidelity to our mission—always guided by public duty, not profile.</li>
          </ul>
          <p>Every action is reviewed for legality, impact, and integrity. This is not philanthropy in passing; this is long-term stewardship for public good.</p>
        </div>

        <div className="section-container">
          <h2>Constitution &amp; Governance</h2>
          <p>Global Health Access Trust is governed by its signed Constitution, adopted in June 2025. It establishes the organisation's charitable purposes, trustee powers and decision-making framework, supported by the governance policies published on this website.</p>
          <p className="block"><a href="/GHAT_Constitution_2025_Refined.pdf" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-block py-2">View the Signed Constitution — Adopted June 2025</a></p>
        </div>

        <div className="flex flex-wrap gap-4 mt-8">
          <Link to="/contact-the-trust" className="inline-block text-sm font-medium text-primary hover:underline underline-offset-4">Contact the Trust →</Link>
          <Link to="/governance" className="inline-block text-sm font-medium text-primary hover:underline underline-offset-4">View Governance →</Link>
          <Link to="/support-the-trust" className="inline-block text-sm font-medium text-primary hover:underline underline-offset-4">Support the Trust →</Link>
        </div>
      </ContentLayout>
    </>
  );
};