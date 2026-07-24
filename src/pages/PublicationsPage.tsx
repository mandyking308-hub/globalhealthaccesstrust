import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";

interface PublicationLink {
  title: string;
  description: string;
  to: string;
}

const governanceDocuments: PublicationLink[] = [
  {
    title: "Governance & Legal Framework",
    description: "The Trust's legal status, regulatory responsibilities and institutional controls.",
    to: "/governance-legal-framework",
  },
  {
    title: "Governance & Oversight",
    description: "How the Board exercises authority, records decisions and oversees projects and risk.",
    to: "/governance",
  },
  {
    title: "Trustee Biographies",
    description: "The appointed Trustees responsible for the Trust's charitable purpose and stewardship.",
    to: "/trustee-biographies",
  },
  {
    title: "Legal, Privacy & Governance Index",
    description: "The versioned index of published and in-preparation legal and governance documents.",
    to: "/legal",
  },
];

const policiesAndControls: PublicationLink[] = [
  { title: "Safeguarding", description: "The Trust's safeguarding responsibilities and reporting framework.", to: "/safeguarding" },
  { title: "Financial Controls", description: "Controls governing approval, expenditure, records and financial oversight.", to: "/financial-controls" },
  { title: "Risk Management", description: "The framework for identifying, reviewing and escalating institutional risk.", to: "/risk-management" },
  { title: "Conflict of Interest", description: "Requirements for declaring, recording and managing conflicts.", to: "/conflict-of-interest" },
  { title: "Anti-Fraud", description: "The Trust's approach to preventing, identifying and responding to fraud.", to: "/anti-fraud" },
  { title: "Whistleblowing", description: "Protected routes for raising serious concerns about conduct or governance.", to: "/whistleblowing" },
  { title: "Complaints Policy", description: "How concerns and complaints are received, reviewed and resolved.", to: "/legal/complaints-policy" },
  { title: "Privacy Policy", description: "How the Trust processes and protects personal information.", to: "/privacy-policy" },
];

const donorAndProjectDocuments: PublicationLink[] = [
  {
    title: "Donor Project Funding Terms",
    description: "The terms governing significant project funding and commissioned-project relationships.",
    to: "/donor-project-funding-terms",
  },
  {
    title: "Gift Acceptance & Restricted Funds Policy",
    description: "How the Trust assesses, accepts and administers restricted and significant gifts.",
    to: "/gift-acceptance-and-restricted-funds-policy",
  },
  {
    title: "Donor Due Diligence & Sanctions Policy",
    description: "The Trust's proportionate donor-verification, sanctions and financial-crime controls.",
    to: "/donor-due-diligence-and-sanctions-policy",
  },
  {
    title: "Project Team Terms",
    description: "The terms applying to approved project-team participation and secure project work.",
    to: "/project-team-terms",
  },
  {
    title: "Donor Recognition",
    description: "Recognition, anonymity, dedications and the protection of charitable independence.",
    to: "/donor-recognition",
  },
  {
    title: "How We Work",
    description: "How projects are developed, approved, funded, delivered and evidenced.",
    to: "/how-we-work",
  },
];

const PublicationGrid = ({ links }: { links: PublicationLink[] }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
    {links.map((document) => (
      <Card key={document.to} className="card-professional h-full">
        <CardContent className="p-6 flex h-full flex-col">
          <h3 className="text-lg font-semibold mb-2">{document.title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">{document.description}</p>
          <Link to={document.to} className="text-sm font-semibold text-primary hover:underline">
            View document →
          </Link>
        </CardContent>
      </Card>
    ))}
  </div>
);

export const PublicationsPage = () => {
  return (
    <div className="py-16">
      <Helmet>
        <title>Publications & Documents | Global Health Access Trust</title>
        <meta
          name="description"
          content="Governing documents, policies, reports and project publications made available by the Global Health Access Trust."
        />
        <link rel="canonical" href="https://globalhealthaccesstrust.com/publications" />
      </Helmet>

      <div className="container-section">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Publications &amp; Documents</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-5">
            Governing documents, policies, reports and project publications made available by Global Health Access Trust.
          </p>
          <p className="text-base text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Materials are published when final, authorised and suitable for public access. Some information may be redacted or withheld where required to protect confidentiality, safeguarding, legal privilege, data protection or personal safety.
          </p>
        </div>

        <section className="mb-12">
          <Card className="card-elevated">
            <CardContent className="p-8">
              <span className="text-xs uppercase tracking-widest text-muted-foreground">Founding &amp; Governance Documents</span>
              <h2 className="text-2xl font-serif font-bold mt-2 mb-4">Trust Deed &amp; Signed Constitution</h2>
              <p className="text-muted-foreground leading-relaxed mb-6 max-w-3xl">
                The Trust Deed effective from 1 December 2024 is the founding and principal governing document of Global Health Access Trust. The signed Constitution adopted in June 2025 records supplementary governance and operating arrangements, including information prepared during banking due diligence. It supports, and does not replace, the Trust Deed.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 text-sm">
                <div><strong>Trust Deed</strong><br /><span className="text-muted-foreground">Effective 1 December 2024</span></div>
                <div><strong>Constitution</strong><br /><span className="text-muted-foreground">Signed June 2025</span></div>
                <div><strong>Legal form</strong><br /><span className="text-muted-foreground">Charitable trust</span></div>
              </div>
              <Button asChild>
                <Link to="/constitution">View the document record</Link>
              </Button>
            </CardContent>
          </Card>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-serif font-bold mb-3">Governance &amp; Institutional Documents</h2>
          <p className="text-muted-foreground leading-relaxed max-w-3xl">
            The following pages explain the Trust's legal status, Board responsibilities, decision-making and institutional accountability.
          </p>
          <PublicationGrid links={governanceDocuments} />
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-serif font-bold mb-3">Policies &amp; Controls</h2>
          <p className="text-muted-foreground leading-relaxed max-w-3xl">
            The Trust publishes policies and control frameworks where public access supports accountability, safe engagement and proper understanding of its operations.
          </p>
          <PublicationGrid links={policiesAndControls} />
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-serif font-bold mb-3">Donor &amp; Project Documents</h2>
          <p className="text-muted-foreground leading-relaxed max-w-3xl">
            These documents govern significant funding relationships, restricted contributions, donor due diligence and participation in project delivery.
          </p>
          <PublicationGrid links={donorAndProjectDocuments} />
        </section>

        <section className="mb-12">
          <Card className="card-professional">
            <CardContent className="p-8">
              <h2 className="text-3xl font-serif font-bold mb-4">Reports, Research &amp; Project Publications</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">This section will hold approved institutional and project material, including:</p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-6">
                <li>Annual reports and financial publications</li>
                <li>Public project summaries and evidence reports</li>
                <li>Research papers and strategic briefings</li>
                <li>Responsible-AI and health-intelligence publications</li>
                <li>Humanitarian and field reports</li>
                <li>Evaluations, lessons learned and completed-project records</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Publications will be added only after appropriate review and authorisation. Drafts, internal working materials and secure donor or project-team records will not be presented as final public publications.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Public reporting will protect beneficiary confidentiality, professional discretion, safeguarding and personal safety.
              </p>
            </CardContent>
          </Card>
        </section>

        <section className="mb-12">
          <Card className="card-professional">
            <CardContent className="p-8">
              <h2 className="text-3xl font-serif font-bold mb-4">Document Status &amp; Authenticity</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">Each publication will display the information appropriate to that document, which may include:</p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-6">
                <li>Approval or publication date</li>
                <li>Effective date</li>
                <li>Version number or document reference</li>
                <li>Review or replacement status</li>
                <li>Authoritative language</li>
                <li>Whether the document is current, archived or superseded</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Where a final downloadable file is provided, any file size or checksum displayed will be generated from that actual published file.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The English version is authoritative unless the document expressly states otherwise. Translations may be provided for accessibility and convenience.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Superseded material may be retained in an archive where this supports transparency and institutional record-keeping.
              </p>
            </CardContent>
          </Card>
        </section>

        <section>
          <Card className="card-elevated">
            <CardContent className="p-8">
              <h2 className="text-3xl font-serif font-bold mb-4">Questions or Corrections</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Questions about document status, access or content may be submitted through the secure contact form.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Suspected misconduct, fraud, safeguarding concerns or protected disclosures should use the relevant confidential reporting route rather than the general publications enquiry route.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button asChild><Link to="/contact-the-trust">Contact the Trust</Link></Button>
                <Button asChild variant="outline"><Link to="/legal">View Legal &amp; Governance Documents</Link></Button>
                <Button asChild variant="outline"><Link to="/protected-concerns/new">Report a Protected Concern</Link></Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};