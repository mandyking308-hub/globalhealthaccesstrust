export type LegalDocumentStatus =
  | "draft"
  | "internal_review"
  | "solicitor_review"
  | "trustee_approved"
  | "published"
  | "superseded";

export type LegalSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type LegalDocumentDefinition = {
  slug: string;
  title: string;
  shortTitle: string;
  category: "Website" | "Donor & Funding" | "Project Delivery" | "Privacy & Data" | "Integrity & Protection";
  audience: string;
  summary: string;
  route: string;
  status: LegalDocumentStatus;
  version: string;
  requiresSolicitorReview: boolean;
  requiresTrusteeApproval: boolean;
  sections?: LegalSection[];
};

const draft = {
  status: "draft" as const,
  version: "0.1-draft",
  requiresSolicitorReview: true,
  requiresTrusteeApproval: true,
};

export const LEGAL_DOCUMENTS: LegalDocumentDefinition[] = [
  {
    slug: "terms-of-use",
    title: "Website and Portal Terms of Use",
    shortTitle: "Terms of Use",
    category: "Website",
    audience: "All website and portal users",
    summary: "Rules governing use of the public website, secure portals, accounts, content and acceptable conduct.",
    route: "/terms-of-use",
    ...draft,
  },
  {
    slug: "privacy-notice",
    title: "Privacy Notice",
    shortTitle: "Privacy Notice",
    category: "Privacy & Data",
    audience: "Donors, project-team members, applicants, contacts and website users",
    summary: "Explains the personal data GHAT processes, why it is used, who receives it, retention and individual rights.",
    route: "/privacy-policy",
    ...draft,
  },
  {
    slug: "cookie-notice",
    title: "Cookie and Tracking Notice",
    shortTitle: "Cookie Notice",
    category: "Privacy & Data",
    audience: "Website and portal users",
    summary: "Records the cookies and similar technologies actually deployed and the consent choices available.",
    route: "/cookie-policy",
    ...draft,
  },
  {
    slug: "donor-project-funding-terms",
    title: "Donor and Project Funding Terms",
    shortTitle: "Donor Funding Terms",
    category: "Donor & Funding",
    audience: "Donors and prospective donors",
    summary: "The core terms for donations, project allocations, donor consultation, trustee control, changes, refunds and project closure.",
    route: "/legal/donor-project-funding-terms",
    ...draft,
    sections: [
      {
        heading: "Status and legal effect",
        paragraphs: [
          "This document is a draft framework for trustee and specialist legal review. It must not be represented as solicitor-approved or used as the sole agreement for a material or bespoke donation until approved.",
          "A high-value or restricted gift may require a separate signed donation agreement, grant agreement or deed tailored to the donor, project and applicable law.",
        ],
      },
      {
        heading: "Nature of a donation",
        paragraphs: [
          "A donation is made to the verified legal entity operating as Global Health Access Trust for its charitable purposes. A donor may express preferences and agree a donor-facing project memorandum, but does not acquire ownership of charitable funds, management authority over project personnel, or trustee decision-making powers.",
        ],
        bullets: [
          "Trustees retain legal control and must act in the charity's best interests.",
          "Project parameters must remain within the Trust's charitable purposes and governing document.",
          "A payment is not treated as an accepted donation until required identity, source-of-funds, sanctions, reputational and trustee reviews are complete.",
        ],
      },
      {
        heading: "Funding allocation and stewardship",
        paragraphs: [
          "The donor-facing project memorandum must state the gross donation, Trust operating allocation, project delivery allocation, restricted or unrestricted status, authorised budget categories and the reporting arrangements before acceptance.",
        ],
        bullets: [
          "The current operating model may show a 20% Trust operating allocation and 80% project delivery allocation only where the donor has received and accepted that disclosure.",
          "Amounts committed, paid, refunded and remaining must be recorded separately.",
          "Restricted funds must be accounted for separately and used only in accordance with lawful restrictions.",
        ],
      },
      {
        heading: "Project scope, timetable and change control",
        paragraphs: [
          "The donor and assigned Project Team may review and accept the relevant project parameters. GHAT retains final approval and may change delivery arrangements where required by law, safety, safeguarding, feasibility, partner failure, sanctions, force majeure or the charity's best interests.",
        ],
        bullets: [
          "Material changes must be documented, explained and versioned.",
          "Where appropriate, revised donor and Project Team acceptance must be obtained.",
          "Delivery progress must be based on genuine weighted milestones rather than elapsed time or funding percentage.",
        ],
      },
      {
        heading: "Unused funds, failed projects and refunds",
        paragraphs: [
          "Refunds are not automatic. The Trust must consider the legal terms of the gift, its governing document, failed-appeal rules, trustee duties, tax consequences and the charity's best interests before refusing, returning, reallocating or retaining funds.",
        ],
        bullets: [
          "The project memorandum must explain the agreed treatment of surplus, unused or impracticable restricted funds.",
          "A return or reallocation above the configured threshold requires documented dual approval.",
          "No refund should be made to a different person or account without enhanced verification.",
        ],
      },
      {
        heading: "Confidentiality, reporting and evidence",
        bullets: [
          "Portal access is confidential and may not be used to identify, contact or exploit beneficiaries or Project Team members.",
          "Photographs and field evidence are supporting material, not financial proof by themselves.",
          "GHAT may withhold or redact information for privacy, safeguarding, security, legal privilege or operational safety.",
        ],
      },
      {
        heading: "Suspension, refusal and termination",
        bullets: [
          "GHAT may hold, refuse or return a proposed donation where required or permitted by law and trustee duties.",
          "Portal access may be suspended for misuse, security concerns, harassment, attempted circumvention of safeguards or unlawful conduct.",
          "Project delivery may be paused or terminated where continuation is unlawful, unsafe, impracticable or inconsistent with charitable purposes.",
        ],
      },
    ],
  },
  {
    slug: "bespoke-project-donation-agreement",
    title: "Bespoke Project Donation Agreement Framework",
    shortTitle: "Project Donation Agreement",
    category: "Donor & Funding",
    audience: "High-value and restricted donors",
    summary: "A transaction-specific framework to be completed and legally reviewed for substantial, restricted or bespoke gifts.",
    route: "/legal/bespoke-project-donation-agreement",
    ...draft,
    sections: [
      {
        heading: "Required transaction schedule",
        bullets: [
          "Verified legal names and addresses of the parties",
          "Donation amount, currency, payment method and payment schedule",
          "Restricted, designated or unrestricted status",
          "Project memorandum and approved budget",
          "Operating and delivery allocations",
          "Conditions precedent, due-diligence requirements and sanctions clearance",
          "Reporting, confidentiality and recognition preferences",
          "Change control, suspension, termination and treatment of unused funds",
          "Governing law and dispute provisions confirmed by legal counsel",
        ],
      },
      {
        heading: "Trustee independence",
        paragraphs: [
          "The agreement must preserve trustee independence. Consultation, reporting rights and agreed restrictions must not give the donor control over trustees, beneficiaries, staff, volunteers, delivery partners or operational decisions.",
        ],
      },
      {
        heading: "Execution control",
        paragraphs: [
          "No document may be marked executed until the final version has been approved under the Trust's delegated-authority rules and signed by authorised representatives. Electronic acceptance in the portal is not a substitute for a deed or formal agreement where one is legally required.",
        ],
      },
    ],
  },
  {
    slug: "gift-acceptance-refusal-return-policy",
    title: "Gift Acceptance, Refusal and Return Policy",
    shortTitle: "Gift Acceptance Policy",
    category: "Donor & Funding",
    audience: "Trustees, administrators and donors",
    summary: "The decision framework for accepting, holding, refusing, returning or reallocating donations.",
    route: "/legal/gift-acceptance-refusal-return-policy",
    ...draft,
    sections: [
      {
        heading: "Principle",
        paragraphs: [
          "Trustees start from the position that lawful donations furthering the Trust's purposes should ordinarily be accepted, but every decision must be within the Trust's powers, informed, reasonable and in the charity's best interests.",
        ],
      },
      {
        heading: "Mandatory refusal or hold indicators",
        bullets: [
          "Illegal source, illegal condition or suspected criminal property",
          "Sanctions match, ownership or control concern, or required licence not obtained",
          "Donation outside the Trust's purposes or beyond its legal powers",
          "Donor lacks capacity or does not own the donated property",
          "Condition undermines trustee independence or creates unacceptable private benefit",
          "Material identity, source-of-funds or beneficial-ownership information cannot be verified",
        ],
      },
      {
        heading: "Decision and documentation",
        bullets: [
          "Record relevant facts, risks, conflicts, advice, decision-maker and reasons.",
          "Ringfence or hold funds where appropriate while the review is completed.",
          "Escalate material, suspicious, anonymous or high-risk donations to trustees and advisers.",
          "Consider regulatory, law-enforcement and serious-incident reporting obligations.",
        ],
      },
      {
        heading: "Returns and reallocations",
        paragraphs: [
          "A return or reallocation must have a lawful basis, comply with any gift conditions and failed-appeal rules, and be approved under the Trust's delegated-authority and dual-control requirements.",
        ],
      },
    ],
  },
  {
    slug: "restricted-funds-reallocation-policy",
    title: "Restricted Funds, Surplus and Reallocation Policy",
    shortTitle: "Restricted Funds Policy",
    category: "Donor & Funding",
    audience: "Donors, trustees, finance and project administrators",
    summary: "Controls the classification, accounting and lawful use of restricted, designated and unrestricted funds.",
    route: "/legal/restricted-funds-reallocation-policy",
    ...draft,
    sections: [
      {
        heading: "Fund classification",
        bullets: [
          "Restricted funds are subject to a legally binding purpose restriction.",
          "Designated funds are unrestricted funds earmarked internally by trustees and may be redesignated.",
          "Unrestricted funds may be applied across the Trust's charitable purposes subject to trustee duties.",
        ],
      },
      {
        heading: "Ledger and controls",
        bullets: [
          "Each restricted purpose must have a traceable ledger and project allocation.",
          "Commitments, paid expenditure, refunds, transfers and remaining balance must be distinct.",
          "Reallocation requires a documented legal basis, donor consultation where appropriate and trustee approval.",
          "The original restriction, all approved changes and the final treatment of any surplus must remain auditable.",
        ],
      },
    ],
  },
  {
    slug: "donor-due-diligence-source-of-funds-policy",
    title: "Donor Due Diligence and Source-of-Funds Policy",
    shortTitle: "Donor Due Diligence",
    category: "Donor & Funding",
    audience: "Trustees, compliance administrators and high-value donors",
    summary: "Risk-based identity, beneficial-ownership, source-of-funds, PEP, sanctions and reputational review controls.",
    route: "/legal/donor-due-diligence-source-of-funds-policy",
    ...draft,
    sections: [
      {
        heading: "Risk-based review",
        paragraphs: [
          "The level of review must be proportionate to the amount, donor type, payment route, jurisdiction, restrictions, anonymity, intermediaries, project risk and any unusual features.",
        ],
      },
      {
        heading: "Information that may be required",
        bullets: [
          "Verified identity and current address",
          "Corporate, trust, foundation or family-office structure",
          "Beneficial owners, controllers, settlors, protectors, trustees or authorised signatories",
          "Source of funds and, where proportionate, source of wealth",
          "Purpose, restrictions, intermediaries and intended recognition",
          "Sanctions, politically exposed person and adverse-media review",
        ],
      },
      {
        heading: "Review outcomes",
        bullets: [
          "approved",
          "enhanced due diligence required",
          "source-of-funds information requested",
          "sanctions or ownership review",
          "trustee approval required",
          "held, refused or returned",
        ],
      },
      {
        heading: "Confidentiality and access",
        paragraphs: [
          "Due-diligence records are restricted compliance data. They must not be visible to Project Team members, ordinary donor-portal users or unrelated administrators.",
        ],
      },
    ],
  },
  {
    slug: "sanctions-high-risk-jurisdictions-policy",
    title: "Sanctions and High-Risk Jurisdictions Policy",
    shortTitle: "Sanctions Policy",
    category: "Integrity & Protection",
    audience: "Trustees, finance, compliance and international project teams",
    summary: "Controls screening, escalation, licensing and payments involving designated persons and higher-risk locations.",
    route: "/legal/sanctions-high-risk-jurisdictions-policy",
    ...draft,
    sections: [
      {
        heading: "Core control",
        paragraphs: [
          "GHAT must comply with UK sanctions wherever UK sanctions apply and must consider additional regimes where operations, persons, banks, goods or currencies create exposure.",
        ],
      },
      {
        heading: "Required checks",
        bullets: [
          "Screen donors, beneficial owners, delivery partners, recipients, banks and relevant counterparties against the current UK Sanctions List.",
          "Assess ownership and control, not only exact-name matches.",
          "Record screening date, source, reviewer, result and expiry or rescreen date.",
          "Pause transactions and escalate potential matches; do not alert or return funds without appropriate advice where criminal property or sanctions may be involved.",
          "Obtain and record licences or rely on legal exceptions only after specialist confirmation.",
        ],
      },
    ],
  },
  {
    slug: "complaints-policy",
    title: "Complaints and Service Resolution Policy",
    shortTitle: "Complaints Policy",
    category: "Integrity & Protection",
    audience: "Donors, Project Team members, applicants, partners and members of the public",
    summary: "How GHAT receives, acknowledges, investigates, resolves, escalates and records complaints.",
    route: "/legal/complaints-policy",
    ...draft,
    sections: [
      {
        heading: "What is a complaint",
        paragraphs: [
          "A complaint is an expression of dissatisfaction about fundraising, project delivery, conduct, communications, administration or a service provided by or on behalf of GHAT where a response or remedy is reasonably expected.",
        ],
      },
      {
        heading: "How complaints are handled",
        bullets: [
          "Issue a case reference and acknowledgement.",
          "Triage priority, conflicts, safeguarding, fraud and regulatory implications.",
          "Assign an impartial case owner and provide a target response date.",
          "Keep the complainant informed where investigation takes longer than expected.",
          "Give a clear outcome, reasons, action taken and escalation route.",
          "Retain a complete audit trail and use themes to improve services.",
        ],
      },
      {
        heading: "Confidential and protected matters",
        paragraphs: [
          "Safeguarding, fraud, whistleblowing, retaliation and serious misconduct reports must be routed to restricted workflows rather than ordinary project messaging.",
        ],
      },
    ],
  },
  {
    slug: "project-team-terms",
    title: "Project Team Participation and Delivery Terms",
    shortTitle: "Project Team Terms",
    category: "Project Delivery",
    audience: "Volunteers, field staff, clinicians, coordinators and delivery partners",
    summary: "The terms governing assignment acceptance, responsibilities, honest reporting, evidence, expenses, safety and withdrawal.",
    route: "/legal/project-team-terms",
    ...draft,
    sections: [
      {
        heading: "Assignment and agreement",
        bullets: [
          "No assignment is treated as agreed merely because an administrator created it.",
          "The Project Team member must receive the current delivery-plan version, role, responsibilities, dates, milestones, reporting frequency and evidence requirements.",
          "They may accept, request changes or decline without falsifying availability or progress.",
          "Material plan changes require a new version and, where applicable, fresh acceptance.",
        ],
      },
      {
        heading: "Standards of conduct",
        bullets: [
          "Act lawfully, honestly, safely and within the agreed role.",
          "Protect beneficiaries, confidential information and personal data.",
          "Disclose conflicts of interest and material relationships.",
          "Do not fabricate, stage, mislabel or manipulate evidence, expenditure or progress reports.",
          "Report delays, safety concerns, safeguarding issues, misuse of funds or pressure to misrepresent promptly.",
        ],
      },
      {
        heading: "Expenses and evidence",
        bullets: [
          "Submit only genuine project expenses with the required supporting records.",
          "An expense is not approved or paid merely because it was submitted.",
          "Field media must comply with consent, safeguarding, privacy, security and location-protection controls.",
        ],
      },
      {
        heading: "Status and local arrangements",
        paragraphs: [
          "The applicable written assignment must state whether the person is a volunteer, employee, worker, contractor, office-holder or representative of a delivery partner. This portal document must not be used to misclassify an employment or contractor relationship.",
        ],
      },
    ],
  },
  {
    slug: "field-evidence-media-policy",
    title: "Photography, Field Evidence and Media Policy",
    shortTitle: "Field Evidence Policy",
    category: "Project Delivery",
    audience: "Project Team members, administrators, donors and delivery partners",
    summary: "Consent, safeguarding, privacy, authenticity, secure storage, review and donor-publication rules for project evidence.",
    route: "/legal/field-evidence-media-policy",
    ...draft,
    sections: [
      {
        heading: "Evidence principles",
        bullets: [
          "Evidence must be genuine, accurately dated and described, and linked to the relevant activity or milestone.",
          "Photographs support reporting but do not, alone, prove expenditure, clinical outcomes or financial compliance.",
          "No person should be photographed or identified where consent is absent, unsafe, coercive or inconsistent with safeguarding duties.",
        ],
      },
      {
        heading: "Technical and review controls",
        bullets: [
          "Use private storage and time-limited signed access.",
          "Strip or protect precise EXIF and GPS data before donor access.",
          "Record consent and safeguarding status, uploader, date, general location, review decision and withdrawal status.",
          "Allow cropping, blurring, redaction and withdrawal without losing the audit record.",
          "Only Trust-approved and donor-visible evidence may appear in the donor portal.",
        ],
      },
    ],
  },
  {
    slug: "data-retention-records-policy",
    title: "Data Retention and Records Management Policy",
    shortTitle: "Retention Policy",
    category: "Privacy & Data",
    audience: "Trustees, administrators, donors and Project Team members",
    summary: "Retention, legal hold, deletion, redaction and archival controls for financial, project, support, safeguarding and portal records.",
    route: "/legal/data-retention-records-policy",
    ...draft,
    sections: [
      {
        heading: "Retention schedule",
        paragraphs: [
          "Retention periods must be approved by the Trust after considering charity, tax, accounting, employment, safeguarding, limitation, contract and data-protection requirements. The public privacy notice must match the operational schedule actually used.",
        ],
      },
      {
        heading: "Record classes",
        bullets: [
          "Donations, Gift Aid, refunds, restricted-fund ledgers and financial approvals",
          "Donor due diligence, sanctions and source-of-funds reviews",
          "Project charters, agreements, milestones, evidence and closure reports",
          "Project Team applications, assignments and participation records",
          "Support requests, complaints, protected concerns and safeguarding cases",
          "Consent, legal acceptance and audit records",
        ],
      },
      {
        heading: "Deletion and legal holds",
        bullets: [
          "Do not delete records subject to an investigation, complaint, dispute, legal hold, regulatory request or safeguarding need.",
          "Use controlled deletion, anonymisation or redaction workflows with approval and audit.",
          "Backups, exports and third-party processors must be included in the retention design.",
        ],
      },
    ],
  },
  {
    slug: "cybersecurity-data-breach-policy",
    title: "Cybersecurity and Personal Data Breach Response Policy",
    shortTitle: "Cybersecurity & Breach Response",
    category: "Privacy & Data",
    audience: "Trustees, administrators, processors and technical providers",
    summary: "Access control, incident response, breach assessment, notification, recovery and evidence-preservation requirements.",
    route: "/legal/cybersecurity-data-breach-policy",
    ...draft,
    sections: [
      {
        heading: "Minimum controls",
        bullets: [
          "Role-based access and least privilege",
          "Multi-factor authentication for privileged users",
          "Secure secrets management and no raw card-data storage",
          "Private evidence storage and signed URLs",
          "Logging, monitoring, backup and tested recovery",
          "Prompt removal of access when roles end",
          "Supplier security and data-processing due diligence",
        ],
      },
      {
        heading: "Incident response",
        bullets: [
          "Contain the incident and preserve evidence.",
          "Assess affected data, people, systems, jurisdictions and risk.",
          "Record decisions and determine whether notification to the ICO, affected individuals, trustees, insurers, law enforcement or other regulators is required.",
          "Remediate, recover, review root cause and track corrective actions.",
        ],
      },
    ],
  },
  {
    slug: "safeguarding-protected-concerns-policy",
    title: "Safeguarding and Protected Concerns Policy",
    shortTitle: "Safeguarding & Concerns",
    category: "Integrity & Protection",
    audience: "Everyone working with or engaging with GHAT",
    summary: "The protected route for safeguarding, retaliation, misconduct, fraud and serious integrity concerns.",
    route: "/safeguarding",
    ...draft,
  },
  {
    slug: "whistleblowing-policy",
    title: "Whistleblowing Policy",
    shortTitle: "Whistleblowing",
    category: "Integrity & Protection",
    audience: "Trustees, staff, volunteers, contractors and delivery partners",
    summary: "Confidential reporting and protection from retaliation for qualifying and serious concerns.",
    route: "/whistleblowing",
    ...draft,
  },
];

export const REQUIRED_HIGH_VALUE_READINESS_CHECKS = [
  "Verified legal entity name, status, governing document and correspondence details",
  "Trustee-approved Website and Portal Terms of Use",
  "Trustee- and solicitor-approved Donor and Project Funding Terms",
  "Bespoke high-value donation agreement framework approved by legal counsel",
  "Privacy Notice matching actual portal, payment, due-diligence and safeguarding processing",
  "Cookie inventory and consent manager tested",
  "Published complaints and service-resolution procedure",
  "Gift acceptance, refusal and return policy approved",
  "Restricted-fund, surplus and reallocation policy approved",
  "Donor due-diligence and source-of-funds workflow active",
  "Sanctions and high-risk jurisdiction workflow active",
  "Project Team terms and protected concern route active",
  "Field evidence, consent and media controls tested",
  "Data retention schedule and legal-hold process approved",
  "Cybersecurity and personal-data breach response tested",
  "Project Charter acceptance and versioned change control operational",
  "High-value payment hold, reconciliation, refund and dual-approval controls tested",
  "Cross-donor, cross-project and worker-PII RLS tests passed",
  "Trustee launch resolution recorded",
] as const;

export const legalStatusLabel = (status: LegalDocumentStatus) =>
  ({
    draft: "Draft",
    internal_review: "Internal review",
    solicitor_review: "Solicitor review",
    trustee_approved: "Trustee approved",
    published: "Published",
    superseded: "Superseded",
  }[status]);
