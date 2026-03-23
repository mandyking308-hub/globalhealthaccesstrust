import { ContentLayout } from "@/components/layout/ContentLayout";
import { SEO } from "@/components/SEO";

export const FrequentlyAskedQuestionsPage = () => {
  return (
    <ContentLayout>
      <SEO
        title="Frequently Asked Questions"
        description="Common questions about the Global Health Access Trust — our mission, governance, how to donate, volunteer, and support global healthcare access."
        canonical="/frequently-asked-questions"
      />
      <h1>Frequently Asked Questions</h1>
      
      <p className="text-lg italic mb-8">"Clarity of purpose demands clarity of communication."</p>

      <p>The following questions address common enquiries about the Global Health Access Trust, our work, and how individuals and organisations can support our mission.</p>

      <h2>About the Trust</h2>

      <h3>What is the Global Health Access Trust?</h3>
      <p>The Global Health Access Trust is a charitable trust established in 2025 under English law to advance health, relieve illness, and preserve life—particularly among vulnerable or underserved populations. We operate through lawful and equitable means as a registered charity.</p>

      <h3>What makes this Trust different from other health charities?</h3>
      <p>We are built as a permanent institution rather than a campaign or initiative. Our approach emphasises systems-building over dependency, dignity over publicity, and long-term sustainability over short-term visibility. We operate with strict governance standards and exist to serve, not to sell.</p>

      <h3>Where is the Trust registered?</h3>
      <p>The Trust is established under the laws of England and Wales, with registration pending with the Charity Commission. Our registered address is 2 Harley Street, London.</p>

      <h2>Our Work</h2>

      <h3>What type of healthcare programmes do you fund?</h3>
      <p>We focus on five core areas: ethical access to healthcare, building capacity rather than dependency, strengthening health systems, legal scholarship and strategic reform, and responding to humanitarian collapse. All programmes must demonstrate clear public benefit and align with our charitable purposes.</p>

      <h3>Do you accept unsolicited applications for funding?</h3>
      <p>The Trust does not accept unsolicited applications at this time. We engage directly with pre-vetted individuals, institutions, or partners whose values align with our objectives and who meet our due diligence standards.</p>

      <h3>Which countries or regions do you work in?</h3>
      <p>While our mandate is global, we prioritise regions where the gap between need and access is greatest, particularly in areas affected by conflict, systemic healthcare collapse, or where vulnerable populations lack access to basic healthcare services.</p>

      <h2>Supporting the Trust</h2>

      <h3>How can I partner with the Trust?</h3>
      <p>Partnerships can be made through secure online platforms, bank transfer, or by cheque. All UK taxpayers can increase the value of their gift through Gift Aid at no extra cost. We also welcome legacy giving through will bequests.</p>

      <h3>Can I specify how my donation is used?</h3>
      <p>Yes, donors may make restricted gifts to specific programmes or initiatives, subject to Board approval and formal documentation that aligns with our charitable objectives and includes reversion clauses if the original purpose becomes obsolete.</p>

      <h3>Do you provide tax receipts?</h3>
      <p>Yes, all contributions are formally receipted. UK taxpayers can benefit from Gift Aid, which allows us to claim an additional 25p for every £1 contributed at no extra cost to the contributor.</p>

      <h2>Governance & Operations</h2>

      <h3>Who governs the Trust?</h3>
      <p>The Trust is overseen by a Board of Trustees comprising senior professionals with decades of experience in healthcare leadership, public policy, governance, and international systems. All Trustees serve under fiduciary duty and are bound by our governing constitution.</p>

      <h3>How do you ensure transparency and accountability?</h3>
      <p>We operate under strict financial controls including independent oversight, board-level approval for significant expenditures, transparent reporting to donors and regulators, and regular compliance audits. Annual governance statements and financial accounts are made publicly available.</p>

      <h2>Contact Information</h2>

      <h3>How can I contact the Trust?</h3>
      <p>For all enquiries, please contact us via our secure channels with appropriate subject lines. General enquiries, legacy questions, and partnership discussions are welcomed through our confidential contact procedures. We respond to all serious enquiries within 48 hours.</p>

      <p className="mt-8 text-sm text-muted-foreground">If your question is not answered here, please contact us directly. We welcome all genuine enquiries about our work and mission.</p>
    </ContentLayout>
  );
};