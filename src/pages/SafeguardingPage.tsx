import { Link } from "react-router-dom";
import { ContentLayout } from "@/components/layout/ContentLayout";
import { SEO } from "@/components/SEO";

export const SafeguardingPage = () => (
  <ContentLayout>
    <SEO
      title="Safeguarding"
      description="Safeguarding principles and secure reporting routes for Global Health Access Trust."
      canonical="/safeguarding"
    />
    <h1>Safeguarding</h1>
    <p className="featured-text">The safety, dignity and welfare of children and adults at risk take priority.</p>

    <div className="section-container">
      <h2>Trustee responsibility</h2>
      <p>
        The Trustees retain ultimate responsibility for safeguarding within the Trust. Any project involving children, adults at risk or sensitive beneficiary information must have proportionate safeguarding, consent, privacy, supervision and escalation arrangements before work proceeds.
      </p>
    </div>

    <div className="section-container">
      <h2>Expected standards</h2>
      <ul>
        <li>zero tolerance for abuse, exploitation, neglect, harassment or retaliation;</li>
        <li>safer recruitment, checks and training where relevant to a role;</li>
        <li>clear boundaries and authorised communication routes;</li>
        <li>minimum necessary collection and restricted handling of sensitive information;</li>
        <li>prompt escalation to statutory authorities where required; and</li>
        <li>documented trustee oversight of material safeguarding risks and incidents.</li>
      </ul>
    </div>

    <div className="section-container">
      <h2>Report a safeguarding concern</h2>
      <p>
        If a person is in immediate danger, contact the relevant local emergency service first. A concern relating to the Trust, its people, a project or a partner may then be submitted through the restricted safeguarding form.
      </p>
      <Link to="/safeguarding/report" className="text-primary hover:underline">Open the safeguarding report form →</Link>
    </div>

    <div className="section-container">
      <h2>Published policy</h2>
      <p>
        The versioned Legal Centre contains the safeguarding document approved for public release. Confidential case records and identifying information are not published.
      </p>
      <Link to="/legal/safeguarding-policy" className="text-primary hover:underline">View the published safeguarding policy →</Link>
    </div>
  </ContentLayout>
);

export const AntiFraudPage = () => (
  <ContentLayout>
    <SEO
      title="Anti-Fraud and Anti-Corruption"
      description="How Global Health Access Trust prevents, identifies and reports suspected fraud, corruption and misuse of charitable funds."
      canonical="/anti-fraud"
    />
    <h1>Anti-Fraud and Anti-Corruption</h1>
    <p className="featured-text">No tolerance for fraud, bribery, corruption or misuse of charitable assets.</p>

    <div className="section-container">
      <h2>Controls</h2>
      <ul>
        <li>trustee authority for banking users, signatories and material expenditure;</li>
        <li>verified accounts and private bank details;</li>
        <li>segregation or dual control for material transactions where available;</li>
        <li>identity, authority, beneficial-ownership and source-of-funds checks where proportionate;</li>
        <li>sanctions, politically exposed person and adverse-information screening where relevant;</li>
        <li>supporting evidence, reconciliation and audit trails; and</li>
        <li>conflict declarations and protected reporting routes.</li>
      </ul>
    </div>

    <div className="section-container">
      <h2>Reporting suspected wrongdoing</h2>
      <p>
        Suspected fraud, misuse of donations, false expenses, fabricated evidence, bribery, corruption or retaliation should be submitted through the protected-concerns route. Reports may be named or anonymous. Confidentiality is protected as far as safety and law allow.
      </p>
      <Link to="/protected-concerns/new" className="text-primary hover:underline">Report a protected concern →</Link>
    </div>

    <div className="flex flex-wrap gap-5 mt-8">
      <Link to="/financial-controls" className="text-primary hover:underline">Financial controls →</Link>
      <Link to="/donor-due-diligence-and-sanctions-policy" className="text-primary hover:underline">Due diligence and sanctions →</Link>
    </div>
  </ContentLayout>
);

export const WhistleblowingPage = () => (
  <ContentLayout>
    <SEO
      title="Whistleblowing and Protected Concerns"
      description="A confidential route for reporting serious wrongdoing, fraud, safeguarding failures or governance concerns relating to Global Health Access Trust."
      canonical="/whistleblowing"
    />
    <h1>Whistleblowing and Protected Concerns</h1>
    <p className="featured-text">Serious concerns may be raised without fear of retaliation.</p>

    <div className="section-container">
      <h2>Matters covered</h2>
      <ul>
        <li>suspected fraud, bribery, corruption or misuse of funds;</li>
        <li>serious breach of law, the Trust Deed or trustee duties;</li>
        <li>safeguarding failures or concealment of harm;</li>
        <li>falsified project, financial or evidence records;</li>
        <li>serious conflicts of interest or unauthorised private benefit;</li>
        <li>security or data incidents; and</li>
        <li>retaliation against a person who raises a concern in good faith.</li>
      </ul>
    </div>

    <div className="section-container">
      <h2>Confidential handling</h2>
      <p>
        A report may be made anonymously. Access is restricted to appropriately authorised people. Confidentiality cannot be absolute where disclosure is necessary to protect a person, investigate suspected crime or meet a legal obligation.
      </p>
    </div>

    <div className="section-container">
      <h2>Make a report</h2>
      <Link to="/protected-concerns/new" className="text-primary hover:underline">Open the protected-concerns form →</Link>
    </div>
  </ContentLayout>
);

export const GovernancePage = () => (
  <ContentLayout>
    <SEO
      title="Governance and Oversight"
      description="Trustee authority, governance records and accountability at Global Health Access Trust."
      canonical="/governance"
    />
    <h1>Governance and Oversight</h1>
    <p className="featured-text">The Trustees retain collective responsibility for the Trust.</p>

    <div className="section-container">
      <h2>Board of Trustees</h2>
      <p>
        Global Health Access Trust is administered by Mandy King, Chair of Trustees; Dr Jagdev Thukral; and John O'Sullivan BA FCA. Trustee decisions and authorities are documented according to their significance.
      </p>
    </div>

    <div className="section-container">
      <h2>Advisers</h2>
      <p>
        Specialist advisers contribute professional input when requested. They are not Trustees, do not control Trust funds and cannot bind the Trust without specific written authority.
      </p>
      <Link to="/trustee-biographies" className="text-primary hover:underline">Trustees and advisers →</Link>
    </div>

    <div className="section-container">
      <h2>Governance evidence</h2>
      <p>
        Appropriate trustee records, declarations, banking authorities and material approvals may be supplied to banks, professional advisers and regulators through controlled due diligence. Confidential and personal records are not published openly.
      </p>
    </div>

    <div className="flex flex-wrap gap-5 mt-8">
      <Link to="/governance-legal-framework" className="text-primary hover:underline">Governance and legal framework →</Link>
      <Link to="/constitution" className="text-primary hover:underline">Signed Constitution →</Link>
      <Link to="/legal" className="text-primary hover:underline">Legal Centre →</Link>
    </div>
  </ContentLayout>
);
