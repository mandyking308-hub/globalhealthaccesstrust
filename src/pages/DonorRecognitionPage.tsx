import { ContentLayout } from "@/components/layout/ContentLayout";
import { SEO } from "@/components/SEO";

export const DonorRecognitionPage = () => {
  return (
    <ContentLayout>
      <SEO
        title="Donor Recognition"
        description="Recognising the generosity and vision of those who support the Global Health Access Trust's mission to advance healthcare access worldwide."
        canonical="/donor-recognition"
      />
      <h1>Donor Recognition</h1>
      
      <p className="featured-text">"True generosity is not about acknowledgment—it is about legacy."</p>

      <p>The Global Health Access Trust was established through the vision, commitment, and generosity of individuals who believed that healthcare access is not a privilege, but a right to be protected and advanced for all humanity.</p>
      <p>We recognise our supporters not for display, but to honour their contributions to a mission that transcends individual recognition and serves the greater good.</p>

      <div className="section-container">
        <h2>Our Approach to Recognition</h2>
        <p>We believe in:</p>
        <ul>
          <li><strong>Dignity over Display:</strong> Recognition that respects the privacy and intentions of our supporters</li>
          <li><strong>Impact over Amount:</strong> Every contribution, regardless of size, advances our mission</li>
          <li><strong>Substance over Ceremony:</strong> Meaningful acknowledgment rather than performative gratitude</li>
          <li><strong>Legacy over Publicity:</strong> Recognition that honours lasting impact rather than momentary visibility</li>
        </ul>
      </div>

      <div className="section-container">
        <h2>Recognition Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="p-4 bg-background rounded border border-border">
            <h3>Founding Patrons</h3>
            <p>Visionary supporters whose transformational gifts of £100,000+ establish the foundation for the Trust's long-term sustainability and impact.</p>
          </div>
          <div className="p-4 bg-background rounded border border-border">
            <h3>Founding Benefactors</h3>
            <p>Major donors contributing £50,000+ who provide critical cornerstone funding for our strategic initiatives and programme development.</p>
          </div>
          <div className="p-4 bg-background rounded border border-border">
            <h3>Founding Supporters</h3>
            <p>Committed philanthropists donating £25,000+ who enable the Trust to undertake significant healthcare access projects.</p>
          </div>
          <div className="p-4 bg-background rounded border border-border">
            <h3>Charter Members</h3>
            <p>Dedicated supporters contributing £10,000+ who form the stable base of committed funders ensuring our operational continuity.</p>
          </div>
        </div>
        <h3 className="mt-6">The Legacy Circle</h3>
        <p>Those who choose to include the Trust in their will are invited to join The Legacy Circle—a private and dignified community of those who give beyond their lifetime.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="section-container">
          <h2>Private Recognition</h2>
          <ul>
            <li>Personal letters of thanks from the Chair of Trustees</li>
            <li>Annual impact reports showing the outcomes of their support</li>
            <li>Invitations to exclusive briefings with programme teams</li>
            <li>Direct updates on projects they have supported</li>
          </ul>
        </div>
        <div className="section-container">
          <h2>Institutional Recognition</h2>
          <ul>
            <li>Listing in our annual report (with permission)</li>
            <li>Recognition in governance documents</li>
            <li>Memorial plaques or dedications for significant legacy gifts</li>
            <li>Named programmes or initiatives (for transformational gifts)</li>
          </ul>
        </div>
      </div>

      <div className="section-container">
        <h2>Contact About Recognition</h2>
        <p>For questions about recognition, to update recognition preferences, or to discuss memorial recognition:</p>
        <p>Chair of Trustees<br />
        Subject: Donor Recognition - Confidential</p>
        <p>We welcome discussions about recognition preferences at any time and respect all donor wishes regarding acknowledgment of their generous support.</p>
      </div>
    </ContentLayout>
  );
};
