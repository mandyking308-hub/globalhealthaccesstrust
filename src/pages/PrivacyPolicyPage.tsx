import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { LEGAL_ENTITY } from "@/lib/legalEntity";
import { getLegalDocument } from "@/lib/legalDocuments";

interface Section { id: string; number: number; title: string; }

const SECTIONS: Section[] = [
  { number: 1, id: "who-we-are", title: "Who we are" },
  { number: 2, id: "scope", title: "Scope of this Notice" },
  { number: 3, id: "people", title: "People whose information we may process" },
  { number: 4, id: "information", title: "Personal information we collect" },
  { number: 5, id: "special-category", title: "Special category information" },
  { number: 6, id: "criminal-offence", title: "Criminal offence information" },
  { number: 7, id: "obtain", title: "How we obtain information" },
  { number: 8, id: "why", title: "Why we use personal information" },
  { number: 9, id: "lawful-bases", title: "Our lawful bases" },
  { number: 10, id: "due-diligence", title: "Donor due diligence" },
  { number: 11, id: "beneficiaries", title: "Project information and beneficiaries" },
  { number: 12, id: "project-team", title: "Project Team privacy" },
  { number: 13, id: "sharing", title: "Who we share information with" },
  { number: 14, id: "processors", title: "Processors and service providers" },
  { number: 15, id: "transfers", title: "International transfers" },
  { number: 16, id: "security", title: "Information security" },
  { number: 17, id: "retention", title: "How long we keep information" },
  { number: 18, id: "schedule", title: "Default retention schedule" },
  { number: 19, id: "holds", title: "Retention holds" },
  { number: 20, id: "automated", title: "Automated decision-making" },
  { number: 21, id: "children", title: "Children and vulnerable people" },
  { number: 22, id: "rights", title: "Your data-protection rights" },
  { number: 23, id: "complaints", title: "Complaints about personal information" },
  { number: 24, id: "changes", title: "Changes to this Notice" },
  { number: 25, id: "contact", title: "Contact" },
];

const List = ({ items }: { items: string[] }) => (
  <ol className="mt-3 space-y-2 list-none pl-0">
    {items.map((t, i) => (
      <li key={i} className="flex gap-3 text-[15.5px] leading-relaxed text-foreground/85">
        <span className="text-muted-foreground min-w-[1.75rem]">({String.fromCharCode(97 + i)})</span>
        <span>{t}</span>
      </li>
    ))}
  </ol>
);

const H = ({ n, id, children }: { n: number; id: string; children: React.ReactNode }) => (
  <h2
    id={id}
    className="mt-14 pt-8 border-t border-foreground/10 text-foreground scroll-mt-24"
    style={{ fontFamily: "var(--font-serif)", fontWeight: 500, fontSize: "clamp(22px, 2vw, 28px)", letterSpacing: "-0.01em", lineHeight: 1.2 }}
  >
    <span className="text-muted-foreground mr-3 tabular-nums">{n}.</span>
    {children}
  </h2>
);

const H3 = ({ children }: { children: React.ReactNode }) => (
  <h3 className="mt-8 text-foreground text-[14px] font-bold uppercase tracking-[0.16em]">{children}</h3>
);

const P = ({ children }: { children: React.ReactNode }) => (
  <p className="mt-4 text-[16px] leading-[1.75] text-foreground/85">{children}</p>
);

const R = ({ label, value }: { label: string; value: string }) => (
  <div className="mt-6 border-l-2 border-primary/60 pl-4">
    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">{label}</p>
    <p className="mt-2 text-[15.5px] leading-relaxed text-foreground/85">{value}</p>
  </div>
);

export const PrivacyPolicyPage = () => {
  const doc = getLegalDocument("privacy-notice")!;
  return (
    <div className="bg-background">
      <Helmet>
        <title>Privacy Notice | Global Health Access Trust</title>
        <meta
          name="description"
          content="Privacy Notice explaining how Global Health Access Trust collects, uses, shares, retains and protects personal information."
        />
        <link rel="canonical" href="https://globalhealthaccesstrust.com/privacy-policy" />
      </Helmet>

      <article className="max-w-[760px] mx-auto px-6 md:px-8 py-16 md:py-24 legal-document">
        <header className="pb-10 border-b border-foreground/15">
          <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
            Legal &amp; Governance
          </span>
          <h1
            className="mt-4 text-foreground"
            style={{ fontFamily: "var(--font-serif)", fontWeight: 500, fontSize: "clamp(32px, 4vw, 48px)", lineHeight: 1.08, letterSpacing: "-0.015em" }}
          >
            Privacy Notice
          </h1>
          <p className="mt-5 text-[13px] text-muted-foreground uppercase tracking-[0.14em] font-semibold">
            Last updated 22 July 2026 · Version {doc.version}
          </p>
          <P>
            This Privacy Notice explains how {LEGAL_ENTITY.legalName} collects, uses, shares, retains and
            protects personal information.
          </P>
          <P>
            {LEGAL_ENTITY.legalName} is a charitable trust established under the laws of England and Wales.
            It is governed by its Trust Deed and administered by its Board of Trustees exclusively for
            charitable purposes.
          </P>
          <P>
            For the purposes of UK data-protection law, {LEGAL_ENTITY.legalName} is the controller of the
            personal information described in this Notice, except where another organisation is separately
            identified as the controller.
          </P>
          <P>
            This Notice applies to Website visitors, Donors and prospective Donors, Portal Users, Project
            Team members and applicants, delivery partners, suppliers, advisers, beneficiaries,
            correspondents and other people whose information is processed in connection with the Trust’s
            work.
          </P>
        </header>

        <nav aria-label="Contents" className="mt-10 p-6 md:p-8 border border-foreground/15 bg-foreground/[0.02] print:border-0 print:p-0">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-muted-foreground">Contents</p>
          <ol className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 list-none pl-0">
            {SECTIONS.map((s) => (
              <li key={s.id} className="text-[14px] leading-snug">
                <a href={`#${s.id}`} className="text-foreground/80 hover:text-primary hover:underline">
                  <span className="text-muted-foreground tabular-nums mr-2">{s.number}.</span>
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {/* 1 */}
        <H n={1} id="who-we-are">Who we are</H>
        <P>
          {LEGAL_ENTITY.legalName} determines why and how personal information is used for the activities
          covered by this Notice.
        </P>
        <R label="Correspondence address" value={`${LEGAL_ENTITY.legalName}, ${LEGAL_ENTITY.correspondenceAddress.single}`} />
        <P>
          Questions about privacy or the exercise of data-protection rights may be submitted through the
          Trust’s <Link to="/contact-the-trust" className="text-primary hover:underline">secure contact form</Link>.
        </P>
        <P>
          The Trust has not appointed a Data Protection Officer unless a named appointment is separately
          confirmed. Privacy enquiries are managed by appropriately authorised members of Trust
          Administration and escalated to the Trustees where necessary.
        </P>

        {/* 2 */}
        <H n={2} id="scope">Scope of this Notice</H>
        <P>This Notice applies to personal information processed through:</P>
        <List items={[
          "the public Website;",
          "the Private Donor Portal;",
          "the Project Team Portal;",
          "Trust Administration systems;",
          "project applications and assessments;",
          "donations and funding arrangements;",
          "Project Charters and delivery agreements;",
          "expense, evidence and reporting processes;",
          "support requests and complaints;",
          "safeguarding and protected-concern processes;",
          "due-diligence and compliance reviews;",
          "communications and events;",
          "delivery-partner and professional relationships; and",
          "other activities undertaken for the Trust’s charitable purposes.",
        ]} />
        <P>
          A separate privacy notice or supplementary notice may be provided where a particular activity
          requires additional information.
        </P>

        {/* 3 */}
        <H n={3} id="people">People whose information we may process</H>
        <P>We may process information relating to:</P>
        <List items={[
          "Website visitors;",
          "account applicants and Portal Users;",
          "individual Donors and prospective Donors;",
          "representatives of companies, trusts, foundations, family offices, charities and other organisations;",
          "beneficial owners, controllers, trustees, settlors, protectors, directors and authorised signatories where relevant to due diligence;",
          "Project Team applicants and members;",
          "delivery-partner staff and representatives;",
          "consultants, suppliers and professional advisers;",
          "beneficiaries and prospective beneficiaries;",
          "parents, guardians and responsible adults;",
          "people shown or referred to in project reports and field evidence;",
          "people making enquiries, complaints, safeguarding reports or protected concerns;",
          "witnesses and people referred to in investigations;",
          "regulators, public officials and professional contacts; and",
          "other people with whom the Trust has a legitimate working relationship.",
        ]} />

        {/* 4 */}
        <H n={4} id="information">Personal information we collect</H>
        <P>Depending on the relationship and purpose, we may collect:</P>

        <H3>Identity and contact information</H3>
        <List items={[
          "name;",
          "title;",
          "date of birth where necessary;",
          "postal address;",
          "email address;",
          "telephone number;",
          "country of residence;",
          "nationality where relevant and lawful;",
          "identity-document information where required for verification; and",
          "emergency contact information where appropriate.",
        ]} />

        <H3>Account and security information</H3>
        <List items={[
          "User ID;",
          "Portal role;",
          "account status;",
          "authentication and recovery records;",
          "login and security-event information;",
          "account permissions;",
          "acceptance and acknowledgement records;",
          "IP address where necessary for security; and",
          "device and browser information where necessary for security and service operation.",
        ]} />

        <H3>Organisational information</H3>
        <List items={[
          "organisation name;",
          "role and authority;",
          "corporate, trust or foundation structure;",
          "beneficial ownership and control;",
          "professional contact details; and",
          "evidence of authority to act.",
        ]} />

        <H3>Donation and payment information</H3>
        <List items={[
          "proposed and completed donation amounts;",
          "currency;",
          "payment status;",
          "allocation and restriction information;",
          "billing or payment address;",
          "bank or payment-provider references;",
          "Gift Aid information where applicable;",
          "refund and chargeback information; and",
          "financial correspondence.",
        ]} />
        <P>
          The Trust does not ordinarily receive or store complete payment-card details where payment is
          processed by an authorised third-party payment provider.
        </P>

        <H3>Due-diligence and compliance information</H3>
        <List items={[
          "identity-verification results;",
          "source-of-funds information;",
          "source-of-wealth information where proportionate;",
          "beneficial-ownership information;",
          "sanctions-screening results;",
          "politically exposed person information;",
          "adverse-information review;",
          "conflicts of interest;",
          "fraud and financial-crime risk information;",
          "donor-capacity or vulnerability concerns where relevant; and",
          "trustee and compliance decisions.",
        ]} />

        <H3>Project and delivery information</H3>
        <List items={[
          "project interests and preferences;",
          "Project Charters and project memoranda;",
          "agreement decisions;",
          "roles and responsibilities;",
          "project dates and milestones;",
          "progress reports;",
          "budgets and expenditure;",
          "expense claims and receipts;",
          "project communications;",
          "change requests;",
          "risks and dependencies;",
          "monitoring and evaluation information; and",
          "project closure information.",
        ]} />

        <H3>Project Team information</H3>
        <List items={[
          "applications;",
          "experience and qualifications;",
          "employment or volunteer history;",
          "availability;",
          "references;",
          "identity and eligibility checks;",
          "background-check information where lawful and necessary;",
          "assignment records;",
          "performance and delivery information;",
          "training records;",
          "expense and payment information where applicable;",
          "conflicts of interest; and",
          "conduct or disciplinary information where relevant and lawful.",
        ]} />

        <H3>Communications and service information</H3>
        <List items={[
          "enquiries;",
          "Portal messages;",
          "comments;",
          "support requests;",
          "complaints;",
          "requested outcomes;",
          "responses;",
          "investigation notes;",
          "decisions;",
          "satisfaction feedback; and",
          "service and audit history.",
        ]} />

        <H3>Field evidence and media</H3>
        <List items={[
          "photographs;",
          "video;",
          "audio;",
          "reports;",
          "captions and descriptions;",
          "consent and permission records;",
          "location information where necessary and safe;",
          "metadata;",
          "evidence-review decisions; and",
          "redacted or restricted versions.",
        ]} />

        <H3>Technical information</H3>
        <List items={[
          "Website and Portal usage;",
          "browser and device type;",
          "service logs;",
          "error and diagnostic records;",
          "security events;",
          "cookie preferences;",
          "authentication records; and",
          "information required to prevent misuse or protect service availability.",
        ]} />

        <H3>Communication preferences</H3>
        <List items={[
          "preferred method of contact;",
          "language;",
          "accessibility requirements;",
          "donor-recognition preferences;",
          "confidentiality preferences;",
          "marketing preferences; and",
          "opt-out and suppression records.",
        ]} />

        {/* 5 */}
        <H n={5} id="special-category">Special category information</H>
        <P>Some Trust activities may involve special category personal information, including information about:</P>
        <List items={[
          "health or disability;",
          "racial or ethnic origin;",
          "religious or philosophical beliefs;",
          "political opinions where relevant to safety or sanctions risk;",
          "trade-union membership;",
          "genetic or biometric identification information;",
          "sex life; or",
          "sexual orientation.",
        ]} />
        <P>We process special category information only where:</P>
        <List items={[
          "it is necessary for a clear and lawful purpose;",
          "an Article 6 lawful basis applies;",
          "a separate condition for processing special category information applies;",
          "any additional requirements under the Data Protection Act 2018 are met; and",
          "appropriate access, security, retention and confidentiality controls are used.",
        ]} />
        <P>Depending on the circumstances, the additional condition may include:</P>
        <List items={[
          "explicit consent;",
          "vital interests;",
          "establishment, exercise or defence of legal claims;",
          "substantial public interest, including safeguarding or preventing unlawful acts;",
          "employment, social-security or social-protection obligations where applicable; or",
          "another condition permitted by law.",
        ]} />
        <P>
          We do not use explicit consent where the person has no genuine choice or where another condition
          more accurately reflects the processing.
        </P>

        {/* 6 */}
        <H n={6} id="criminal-offence">Criminal offence information</H>
        <P>We may process information concerning alleged or proven criminal conduct where necessary for:</P>
        <List items={[
          "safeguarding;",
          "safer recruitment;",
          "fraud prevention;",
          "sanctions and financial-crime compliance;",
          "investigating suspected misuse of funds;",
          "legal claims;",
          "protected concerns; or",
          "reporting to appropriate authorities.",
        ]} />
        <P>We process this information only where permitted by law, subject to appropriate safeguards and restricted access.</P>

        {/* 7 */}
        <H n={7} id="obtain">How we obtain information</H>
        <P>We may obtain information:</P>
        <List items={[
          "directly from the individual;",
          "from an authorised representative;",
          "from a Donor’s organisation or family office;",
          "from Project Team members;",
          "from delivery partners;",
          "from referees;",
          "from payment providers and banks;",
          "from identity-verification and due-diligence providers;",
          "from sanctions and public-information sources;",
          "from professional advisers;",
          "from public authorities and regulators;",
          "from publicly available records;",
          "from Website and Portal technologies;",
          "from project reports and evidence; and",
          "from other people involved in an enquiry, complaint, investigation or safeguarding matter.",
        ]} />
        <P>
          Where information is not obtained directly from the person, we provide privacy information where
          required and subject to lawful exceptions.
        </P>

        {/* 8 */}
        <H n={8} id="why">Why we use personal information</H>
        <P>We use personal information to:</P>
        <List items={[
          "operate the Website and Portals;",
          "create and administer accounts;",
          "authenticate Users and protect security;",
          "respond to enquiries;",
          "develop donor relationships;",
          "assess, receive and administer donations;",
          "perform due diligence;",
          "prevent fraud and financial crime;",
          "carry out sanctions and reputational checks;",
          "assess proposed projects;",
          "prepare and administer Project Charters;",
          "appoint and manage Project Team members and delivery partners;",
          "deliver, monitor and report on projects;",
          "review expenses and evidence;",
          "protect beneficiaries;",
          "manage safeguarding matters;",
          "investigate complaints and protected concerns;",
          "maintain financial, governance and audit records;",
          "comply with law and regulatory requests;",
          "establish, exercise or defend legal rights;",
          "communicate appropriate Trust and fundraising information;",
          "manage events and relationships;",
          "improve service quality, accessibility and security; and",
          "advance the Trust’s charitable purposes.",
        ]} />

        {/* 9 */}
        <H n={9} id="lawful-bases">Our lawful bases</H>
        <P>We must have a lawful basis for each use of personal information. Depending on the activity, we rely on one or more of the following:</P>

        <H3>Contract or steps before a contract</H3>
        <P>Where processing is necessary to:</P>
        <List items={[
          "provide requested Portal services;",
          "take steps requested before entering a written agreement;",
          "administer a Project Team, consultancy, grant, delivery or supplier agreement; or",
          "perform another agreement with the individual.",
        ]} />
        <P>A donation is not automatically treated as a contract. The applicable basis depends on the actual funding arrangement.</P>

        <H3>Legal obligation</H3>
        <P>Where processing is necessary to comply with a legal duty, including:</P>
        <List items={[
          "financial and accounting requirements;",
          "tax obligations;",
          "sanctions obligations;",
          "regulatory reporting;",
          "data-protection duties;",
          "safeguarding duties where legally applicable; or",
          "lawful requests from authorities.",
        ]} />

        <H3>Legitimate interests</H3>
        <P>Where processing is necessary for the Trust’s legitimate interests or those of another person, and those interests are not overridden by the individual’s rights. These interests may include:</P>
        <List items={[
          "operating and securing the Website and Portals;",
          "administering the Trust;",
          "managing donor and professional relationships;",
          "assessing and delivering charitable projects;",
          "keeping appropriate records;",
          "preventing misuse;",
          "protecting the Trust’s assets;",
          "handling complaints and legal claims;",
          "improving services; and",
          "communicating appropriately with people who have a relevant relationship with the Trust.",
        ]} />
        <P>Where required, we carry out and document a legitimate-interests assessment.</P>

        <H3>Recognised legitimate interests</H3>
        <P>
          Where applicable under current law, we may rely on a recognised legitimate interest for an
          authorised public-interest purpose, such as preventing or detecting crime.
        </P>

        <H3>Vital interests</H3>
        <P>Where processing is necessary to protect someone’s life or physical safety and another lawful basis is not appropriate.</P>

        <H3>Consent</H3>
        <P>
          Where a person has a genuine choice and consent is the appropriate basis, including certain
          optional communications, media uses or disclosures. Consent may be withdrawn at any time, although
          withdrawal does not make earlier lawful processing unlawful.
        </P>

        {/* 10 */}
        <H n={10} id="due-diligence">Donor due diligence</H>
        <P>
          We may verify a Donor, representative, organisation, beneficial owner, controller, source of funds
          or source of wealth where proportionate to the donation, risk or project.
        </P>
        <P>Due diligence may include:</P>
        <List items={[
          "identity verification;",
          "verification of authority;",
          "organisation and ownership checks;",
          "sanctions screening;",
          "politically exposed person review;",
          "adverse-information review;",
          "source-of-funds review;",
          "source-of-wealth review where proportionate;",
          "conflict-of-interest checks;",
          "fraud-prevention checks; and",
          "trustee review.",
        ]} />
        <P>Due-diligence information is restricted and is not made available to ordinary Donor or Project Team Portal Users.</P>
        <P>Receipt of a payment does not prevent the Trust from completing appropriate due diligence.</P>

        {/* 11 */}
        <H n={11} id="beneficiaries">Project information and beneficiaries</H>
        <P>Project information may include information concerning beneficiaries and communities.</P>
        <P>
          We apply data-minimisation, safeguarding and privacy controls and do not provide Donors with
          unrestricted access to identifiable beneficiary information.
        </P>
        <P>Donors may receive approved reports, expenditure summaries and evidence, but may not receive:</P>
        <List items={[
          "unnecessary beneficiary contact details;",
          "private medical information;",
          "private safeguarding information;",
          "exact security-sensitive locations;",
          "unrestricted identity documents;",
          "private Project Team information; or",
          "other information withheld for a lawful reason.",
        ]} />
        <P>Where possible and appropriate, beneficiary information is anonymised, pseudonymised, aggregated, redacted, cropped or blurred.</P>

        {/* 12 */}
        <H n={12} id="project-team">Project Team privacy</H>
        <P>Project Team information is visible only to Users who require it for authorised purposes.</P>
        <P>Donors must not receive Project Team:</P>
        <List items={[
          "personal email addresses;",
          "telephone numbers;",
          "home addresses;",
          "identity documents;",
          "CVs or application records;",
          "private performance notes;",
          "private support requests;",
          "confidential concerns;",
          "safeguarding information; or",
          "unrelated assignment information.",
        ]} />
        <P>The Donor Portal may display a safe name, assigned role and approved responsibilities where appropriate.</P>

        {/* 13 */}
        <H n={13} id="sharing">Who we share information with</H>
        <P>We may share information, where necessary and lawful, with:</P>
        <List items={[
          "Trustees;",
          "authorised Trust administrators;",
          "authorised Project Team members;",
          "delivery partners;",
          "payment providers;",
          "banks and financial institutions;",
          "hosting, authentication and technology providers;",
          "identity-verification, sanctions and due-diligence providers;",
          "accountants, auditors, solicitors and other professional advisers;",
          "insurers;",
          "regulators and public authorities;",
          "law-enforcement bodies;",
          "safeguarding authorities;",
          "courts and tribunals;",
          "funders and Donors receiving approved project information; and",
          "other parties where the individual has authorised disclosure or the law permits or requires it.",
        ]} />
        <P>We share only the information reasonably necessary for the relevant purpose.</P>
        <P>We do not sell personal information.</P>
        <P>We do not permit Donors to use protected beneficiary or Project Team information for unrelated purposes.</P>

        {/* 14 */}
        <H n={14} id="processors">Processors and service providers</H>
        <P>Some organisations process personal information on our behalf.</P>
        <P>Where required, we use contracts requiring processors to:</P>
        <List items={[
          "act only on documented instructions;",
          "maintain appropriate security;",
          "assist with individual rights and incidents;",
          "control subcontractors;",
          "return or delete information appropriately; and",
          "comply with applicable data-protection law.",
        ]} />
        <P>Trust Administration maintains an internal register of material processors and service providers.</P>

        {/* 15 */}
        <H n={15} id="transfers">International transfers</H>
        <P>
          The Trust undertakes and supports international projects and may use service providers or
          authorised Project Team members located outside the United Kingdom. This may involve an
          international transfer of personal information.
        </P>
        <P>
          Where the international-transfer rules apply, the Trust will identify and document an appropriate
          transfer mechanism, which may include:
        </P>
        <List items={[
          "United Kingdom adequacy regulations;",
          "an appropriate safeguard, including an approved international data transfer agreement or addendum;",
          "binding corporate rules;",
          "another approved safeguard; or",
          "a permitted exception where its legal requirements are met.",
        ]} />
        <P>Where required, the Trust will complete and document an appropriate transfer-risk assessment or data-protection test.</P>
        <P>Access from an overseas location must be limited to what is necessary for the authorised project purpose.</P>

        {/* 16 */}
        <H n={16} id="security">Information security</H>
        <P>We use proportionate technical and organisational measures designed to protect personal information. These may include:</P>
        <List items={[
          "role-based access;",
          "authentication controls;",
          "private storage;",
          "secure transmission;",
          "logging and monitoring;",
          "backups;",
          "restricted administrative permissions;",
          "staff and Project Team instructions;",
          "incident-response procedures;",
          "redaction and pseudonymisation;",
          "retention controls; and",
          "contractual security requirements.",
        ]} />
        <P>No system can be guaranteed completely secure.</P>
        <P>Users must protect their own credentials and report suspected unauthorised access promptly.</P>

        {/* 17 */}
        <H n={17} id="retention">How long we keep information</H>
        <P>
          We retain personal information only for as long as reasonably necessary for the purpose for which
          it was collected, including legal, accounting, safeguarding, audit, dispute and regulatory
          requirements. The default retention schedule is set out below.
        </P>
        <P>A record may be retained for longer where:</P>
        <List items={[
          "law requires it;",
          "legal proceedings are anticipated or active;",
          "an investigation is continuing;",
          "a safeguarding reason applies;",
          "a regulator or authority requires preservation;",
          "a contractual requirement applies; or",
          "deletion would prejudice an individual’s rights or safety.",
        ]} />
        <P>Information may be deleted, anonymised or permanently de-identified when it is no longer required.</P>

        {/* 18 */}
        <H n={18} id="schedule">Default retention schedule</H>
        <P>Use the following as the Trust’s default schedule:</P>

        <H3>Website contact enquiries</H3>
        <P>Three years after the enquiry is closed.</P>

        <H3>Portal account and profile information</H3>
        <P>While the account is active and for two years after closure, except information required for another record category.</P>

        <H3>Website and Portal Terms acceptances</H3>
        <P>Seven years after the account or relevant relationship ends.</P>

        <H3>Privacy Notice acknowledgements</H3>
        <P>Seven years after the account or relevant relationship ends.</P>

        <H3>Donation, payment, allocation and refund records</H3>
        <P>Seven years after the end of the financial year in which the relationship, transaction or project closes.</P>

        <H3>Restricted-fund and project-finance records</H3>
        <P>Seven years after final use, reallocation, return or closure of the fund.</P>

        <H3>Donor due-diligence, source-of-funds and sanctions records</H3>
        <P>Seven years after the donation decision or end of the Donor relationship, subject to legal, regulatory and risk requirements.</P>

        <H3>Project Charters, agreements and change records</H3>
        <P>Seven years after project closure or termination.</P>

        <H3>Project expenses, receipts and financial evidence</H3>
        <P>Seven years after project closure or the relevant financial year, whichever is later.</P>

        <H3>Project reports, milestones and audit history</H3>
        <P>Seven years after project closure.</P>

        <H3>Project Team applications that do not proceed</H3>
        <P>Twelve months after the application decision, unless a complaint, safeguarding concern or legal reason requires longer retention.</P>

        <H3>Project Team assignment and delivery records</H3>
        <P>Seven years after the assignment ends where the information supports financial, contractual, safeguarding or project-accountability records. Other routine administrative information should be reviewed after two years.</P>

        <H3>References and eligibility checks</H3>
        <P>For the duration of the relevant relationship and for up to two years afterwards, unless a longer period is required for safeguarding or legal reasons.</P>

        <H3>Background-check information</H3>
        <P>Record only the minimum necessary outcome and review date. Do not retain full certificates or detailed criminal records longer than necessary.</P>

        <H3>Routine support requests</H3>
        <P>Three years after closure.</P>

        <H3>Formal complaints</H3>
        <P>Six years after final closure.</P>

        <H3>Safeguarding records</H3>
        <P>Determined by the nature of the concern, applicable safeguarding guidance, the age and circumstances of the people involved, limitation periods and professional advice. Safeguarding records must not be automatically deleted through an ordinary retention job.</P>

        <H3>Protected concerns and whistleblowing records</H3>
        <P>Six years after closure, or longer where an investigation, claim, safeguarding need or regulatory requirement continues.</P>

        <H3>Field photographs, video and identifiable media</H3>
        <P>For the approved project and reporting period and no longer than necessary for the documented purpose, consent, safeguarding decision and legal basis. Publicly published or historically significant material must receive a separate archival assessment.</P>

        <H3>Consent and media-permission records</H3>
        <P>For as long as the relevant media is retained and for an appropriate period afterwards to evidence the permission or withdrawal.</P>

        <H3>Security and authentication logs</H3>
        <P>Twelve months, unless a security incident, fraud investigation or legal requirement justifies longer retention.</P>

        <H3>Security-incident and data-breach records</H3>
        <P>Seven years after closure of the incident.</P>

        <H3>Data-protection rights requests</H3>
        <P>Three years after completion.</P>

        <H3>Cookie and consent-preference records</H3>
        <P>Two years after the preference is recorded or replaced.</P>

        <H3>Marketing and communication preferences</H3>
        <P>While active. A minimal suppression record may be retained for as long as necessary to respect an opt-out.</P>

        <H3>Professional adviser, supplier and delivery-partner records</H3>
        <P>Seven years after the relationship or relevant project ends where the records relate to contracts, payments or accountability. Routine contact information should be reviewed earlier.</P>

        <H3>Trustee and governance records</H3>
        <P>Permanently where they form part of the Trust’s constitutional, decision-making or historical record, subject to appropriate restriction and data minimisation.</P>

        {/* 19 */}
        <H n={19} id="holds">Retention holds</H>
        <P>The Trust may place a retention hold on records that must not be deleted because of:</P>
        <List items={[
          "litigation;",
          "a threatened claim;",
          "an investigation;",
          "a safeguarding matter;",
          "a regulatory request;",
          "fraud or suspected misuse of funds;",
          "an audit;",
          "a protected concern; or",
          "another documented legal or governance need.",
        ]} />
        <P>A retention hold records the affected record category, project or person, reason, authorising person, date applied, review date, date released and release authority.</P>

        {/* 20 */}
        <H n={20} id="automated">Automated decision-making</H>
        <P>The Trust does not currently make decisions producing legal or similarly significant effects solely by automated means.</P>
        <P>Automated tools may assist with:</P>
        <List items={[
          "security alerts;",
          "duplicate detection;",
          "risk flags;",
          "project reminders;",
          "workflow prioritisation; or",
          "administrative checks.",
        ]} />
        <P>A human decision-maker remains responsible for material decisions concerning:</P>
        <List items={[
          "donation acceptance or refusal;",
          "Project Team appointment;",
          "safeguarding;",
          "complaints;",
          "sanctions escalation;",
          "project approval;",
          "refund decisions; and",
          "access suspension.",
        ]} />
        <P>If this position changes, the Privacy Notice will be updated before the relevant processing begins.</P>

        {/* 21 */}
        <H n={21} id="children">Children and vulnerable people</H>
        <P>The public Website and standard Portals are not intended for independent account creation by children.</P>
        <P>Projects may involve children or adults at risk. Where their information is processed, the Trust applies:</P>
        <List items={[
          "data minimisation;",
          "safeguarding review;",
          "an appropriate lawful basis;",
          "an appropriate special category condition where required;",
          "age-appropriate information where appropriate;",
          "parental or guardian involvement where legally and ethically required;",
          "strict access controls; and",
          "careful publication and retention decisions.",
        ]} />
        <P>A Donor must not receive unrestricted access to children’s or vulnerable people’s identities or contact details.</P>

        {/* 22 */}
        <H n={22} id="rights">Your data-protection rights</H>
        <P>Depending on the circumstances and the lawful basis, a person may have the right to:</P>
        <List items={[
          "receive privacy information;",
          "request access to personal information;",
          "request correction of inaccurate information;",
          "request completion of incomplete information;",
          "request deletion;",
          "request restriction of processing;",
          "object to processing;",
          "receive certain information in a portable format;",
          "withdraw consent where consent is relied upon;",
          "object to direct marketing; and",
          "challenge a qualifying solely automated decision.",
        ]} />
        <P>These rights are not absolute and exemptions may apply.</P>
        <P>The Trust may request reasonable information to verify identity before responding.</P>
        <P>
          Requests may be submitted through{" "}
          <Link to="/data-access-request" className="text-primary hover:underline">/data-access-request</Link>
          {" "}or through the{" "}
          <Link to="/contact-the-trust" className="text-primary hover:underline">secure contact form</Link>.
        </P>
        <P>The Trust will respond within the period required by applicable law and will explain any lawful extension, restriction or refusal.</P>

        {/* 23 */}
        <H n={23} id="complaints">Complaints about personal information</H>
        <P>
          A person who is concerned about how the Trust has used personal information should first contact
          the Trust through the{" "}
          <Link to="/contact-the-trust" className="text-primary hover:underline">secure contact form</Link>.
          The Trust will investigate the concern and respond appropriately.
        </P>
        <P>
          A person also has the right to complain to the{" "}
          <a
            href="https://ico.org.uk/make-a-complaint/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Information Commissioner’s Office
          </a>.
        </P>

        {/* 24 */}
        <H n={24} id="changes">Changes to this Notice</H>
        <P>The Trust may update this Notice where:</P>
        <List items={[
          "processing activities change;",
          "new Portal functions are introduced;",
          "service providers or transfer arrangements change;",
          "legal requirements change;",
          "retention practices change; or",
          "clarification is required.",
        ]} />
        <P>The current version and date will be displayed on this page. Material changes will be communicated appropriately.</P>
        <P>A change to the Privacy Notice does not convert acknowledgement into consent and does not create a contractual waiver of data-protection rights.</P>

        {/* 25 */}
        <H n={25} id="contact">Contact</H>
        <P>
          For privacy enquiries or to exercise a data-protection right, contact the Trust through the{" "}
          <Link to="/contact-the-trust" className="text-primary hover:underline">secure contact form</Link>.
        </P>
        <R label="Correspondence address" value={`${LEGAL_ENTITY.legalName}, ${LEGAL_ENTITY.correspondenceAddress.single}`} />
        <P>This is the Trust’s correspondence address.</P>

        <footer className="mt-16 pt-8 border-t border-foreground/15 text-[13px] text-muted-foreground leading-relaxed">
          <p>
            Related documents:{" "}
            <Link to="/terms-of-use" className="text-primary hover:underline">Website and Portal Terms of Use</Link>
            {" · "}
            <Link to="/cookie-policy" className="text-primary hover:underline">Cookie Policy</Link>
            {" · "}
            <Link to="/data-access-request" className="text-primary hover:underline">Data Access Request</Link>
            {" · "}
            <Link to="/safeguarding" className="text-primary hover:underline">Safeguarding</Link>
            {" · "}
            <Link to="/whistleblowing" className="text-primary hover:underline">Whistleblowing</Link>
          </p>
        </footer>
      </article>
    </div>
  );
};

export default PrivacyPolicyPage;
