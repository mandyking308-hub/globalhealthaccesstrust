import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { LEGAL_ENTITY } from "@/lib/legalEntity";
import { getLegalDocument } from "@/lib/legalDocuments";

interface Section {
  id: string;
  number: number;
  title: string;
}

const SECTIONS: Section[] = [
  { number: 1, id: "definitions", title: "Definitions" },
  { number: 2, id: "scope", title: "Scope of these Terms" },
  { number: 3, id: "eligibility", title: "Eligibility and authority" },
  { number: 4, id: "accounts", title: "Portal accounts" },
  { number: 5, id: "role-based-access", title: "Role-based access" },
  { number: 6, id: "donor-portal", title: "The Donor Portal" },
  { number: 7, id: "project-team-portal", title: "The Project Team Portal" },
  { number: 8, id: "trustee-authority", title: "Trustee authority" },
  { number: 9, id: "project-information", title: "Project information and delivery" },
  { number: 10, id: "project-agreements", title: "Project agreements" },
  { number: 11, id: "communications", title: "Communications, comments and support requests" },
  { number: 12, id: "confidentiality", title: "Confidentiality" },
  { number: 13, id: "beneficiary-protection", title: "Beneficiary and Project Team protection" },
  { number: 14, id: "user-content", title: "User content" },
  { number: 15, id: "photographs", title: "Photographs and field evidence" },
  { number: 16, id: "acceptable-use", title: "Acceptable use" },
  { number: 17, id: "due-diligence", title: "Due diligence and compliance" },
  { number: 18, id: "payments", title: "Payments and donations" },
  { number: 19, id: "third-party", title: "Third-party services" },
  { number: 20, id: "intellectual-property", title: "Intellectual property" },
  { number: 21, id: "service-availability", title: "Service availability and security" },
  { number: 22, id: "suspension", title: "Suspension and termination" },
  { number: 23, id: "professional-advice", title: "Information and professional advice" },
  { number: 24, id: "our-responsibility", title: "The Trust’s responsibility" },
  { number: 25, id: "user-responsibility", title: "User responsibility" },
  { number: 26, id: "privacy-cookies", title: "Privacy and cookies" },
  { number: 27, id: "changes", title: "Changes to these Terms" },
  { number: 28, id: "records", title: "Records and electronic communications" },
  { number: 29, id: "complaints", title: "Complaints and concerns" },
  { number: 30, id: "governing-law", title: "Governing law and jurisdiction" },
  { number: 31, id: "general", title: "General provisions" },
  { number: 32, id: "contact", title: "Contact" },
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

const P = ({ children }: { children: React.ReactNode }) => (
  <p className="mt-4 text-[16px] leading-[1.75] text-foreground/85">{children}</p>
);

export const TermsOfUsePage = () => {
  const doc = getLegalDocument("terms-of-use")!;
  return (
    <div className="bg-background">
      <Helmet>
        <title>Website and Portal Terms of Use | Global Health Access Trust</title>
        <meta
          name="description"
          content="Website and Portal Terms of Use governing access to the public website, secure portals and digital services operated by Global Health Access Trust."
        />
        <link rel="canonical" href="https://globalhealthaccesstrust.com/terms-of-use" />
      </Helmet>

      <article className="max-w-[760px] mx-auto px-6 md:px-8 py-16 md:py-24 legal-document">
        <header className="pb-10 border-b border-foreground/15">
          <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
            Legal &amp; Governance
          </span>
          <h1
            className="mt-4 text-foreground"
            style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 500,
              fontSize: "clamp(32px, 4vw, 48px)",
              lineHeight: 1.08,
              letterSpacing: "-0.015em",
            }}
          >
            Website and Portal Terms of Use
          </h1>
          <p className="mt-5 text-[13px] text-muted-foreground uppercase tracking-[0.14em] font-semibold">
            Last updated 22 July 2026 · Version {doc.version}
          </p>
          <p className="mt-8 text-[17px] leading-[1.75] text-foreground/85">
            These Terms govern access to and use of the public website, secure portals and digital services
            operated by {LEGAL_ENTITY.legalName}.
          </p>
          <p className="mt-4 text-[16px] leading-[1.75] text-foreground/85">
            Global Health Access Trust is an unincorporated charitable organisation established in England and Wales.
            It is governed by its Constitution and administered by its Board of Trustees exclusively for
            charitable purposes.
          </p>
          <p className="mt-4 text-[16px] leading-[1.75] text-foreground/85">
            Please read these Terms carefully. By accessing or using the public Website, you agree to use it
            in accordance with these Terms. By creating or using a secure Portal account, submitting
            information through a Portal, or actively accepting these Terms electronically, you confirm that
            you have read and agree to them.
          </p>
          <p className="mt-4 text-[16px] leading-[1.75] text-foreground/85">
            These Terms do not replace any separate donation agreement, project memorandum, Project Charter,
            grant agreement, delivery agreement, Project Team agreement, confidentiality agreement,
            consultancy agreement or other written arrangement.
          </p>
          <p className="mt-4 text-[16px] leading-[1.75] text-foreground/85">
            Where a separate written agreement applies and conflicts with these Terms, the separate agreement
            will take priority in relation to its subject matter.
          </p>
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

        {/* 1 Definitions */}
        <H n={1} id="definitions">Definitions</H>
        <P>In these Terms:</P>
        <P><strong>“GHAT”, “the Trust”, “we”, “us” and “our”</strong> mean {LEGAL_ENTITY.legalName}.</P>
        <P><strong>“Website”</strong> means the public website at globalhealthaccesstrust.com and any public page operated by or on behalf of the Trust.</P>
        <P><strong>“Portal”</strong> means any secure donor, Project Team, administrator or other authenticated digital area operated by the Trust.</P>
        <P><strong>“Donor”</strong> means a person or organisation that makes, proposes, administers or advises on a donation, grant or other form of charitable funding.</P>
        <P><strong>“Project Team”</strong> means volunteers, workers, consultants, partner personnel and other authorised individuals involved in project assessment, preparation, management or delivery.</P>
        <P><strong>“User”</strong> and <strong>“you”</strong> mean any person accessing or using the Website or a Portal.</P>
        <P><strong>“Project Information”</strong> means information concerning a proposed, active, completed, suspended or cancelled project, including its scope, funding, budget, milestones, reports, communications, expenditure and evidence.</P>
        <P><strong>“User Content”</strong> means information, comments, documents, photographs, video, audio, receipts, reports or other material submitted by a User.</P>
        <P>Questions about these Terms may be submitted through the Trust’s <Link to="/contact-the-trust" className="text-primary hover:underline">secure contact form</Link>.</P>

        {/* 2 Scope */}
        <H n={2} id="scope">Scope of these Terms</H>
        <P>These Terms govern:</P>
        <List items={[
          "use of the public Website;",
          "creation and use of Portal accounts;",
          "access to Project Information;",
          "communications with the Trust;",
          "uploading, viewing and use of documents, reports, photographs and other material;",
          "acceptable conduct within the Website and Portals;",
          "account security;",
          "confidentiality; and",
          "the use of information made available through the Website and Portals.",
        ]} />
        <P>These Terms do not themselves:</P>
        <List items={[
          "require the Trust to accept a donation;",
          "create a right to commission, control or participate in a project;",
          "guarantee approval, commencement, continuation or completion of a project;",
          "transfer ownership or control of charitable funds to a Donor;",
          "appoint a User as a Trustee, employee, agent, partner or authorised representative of the Trust;",
          "authorise a User to enter into commitments on behalf of the Trust;",
          "create a direct contractual relationship between a Donor and an individual Project Team member, beneficiary or delivery partner; or",
          "replace any terms specifically governing a donation, grant, restricted fund or project.",
        ]} />
        <P>Separate terms may apply to donations, commissioned projects, grants, Project Charters, restricted funds, Project Team assignments and delivery partners.</P>

        {/* 3 Eligibility */}
        <H n={3} id="eligibility">Eligibility and authority</H>
        <P>You must be at least 18 years old to create a Portal account unless the Trust has expressly authorised a different lawful arrangement in writing.</P>
        <P>Where you act for a company, trust, foundation, family office, partnership, charity or other organisation, you confirm that:</P>
        <List items={[
          "you are authorised to act for that organisation;",
          "the information you provide is accurate;",
          "you have authority to accept these Terms on its behalf where applicable; and",
          "you will notify the Trust promptly if your authority changes or ends.",
        ]} />
        <P>The Trust may request reasonable evidence of identity, authority, ownership, control or capacity for security, governance, due-diligence or legal purposes.</P>

        {/* 4 Portal accounts */}
        <H n={4} id="accounts">Portal accounts</H>
        <P>Portal accounts are personal to the authorised User and must not be shared.</P>
        <P>You must:</P>
        <List items={[
          "provide accurate and current information;",
          "keep passwords, authentication codes and account-recovery information secure;",
          "use multi-factor authentication where provided or required;",
          "notify the Trust promptly if you suspect unauthorised access;",
          "sign out when using a shared device;",
          "avoid storing sensitive information on insecure devices;",
          "comply with reasonable security instructions issued by the Trust; and",
          "notify the Trust when you no longer require access.",
        ]} />
        <P>You must not:</P>
        <List items={[
          "allow another person to use your account;",
          "impersonate another person;",
          "create an account using false or misleading information;",
          "attempt to obtain another User’s credentials;",
          "circumvent access controls;",
          "access information outside your authorised role or project;",
          "use another User’s session; or",
          "continue to use Portal access after your authority has ended.",
        ]} />
        <P>The Trust may correct account roles, revoke compromised sessions, require a password reset or suspend access where reasonably necessary to protect Users, projects, beneficiaries, funds or systems.</P>

        {/* 5 Role-based access */}
        <H n={5} id="role-based-access">Role-based access</H>
        <P>Portal access is determined by the role assigned to the User and the permissions approved by the Trust.</P>
        <P>A Donor may access only the donor-facing information approved for that Donor and the relevant project.</P>
        <P>A Project Team member may access only the operational information required for projects to which that person has been assigned.</P>
        <P>An administrator may access information only in accordance with the administrator’s authorised role and responsibilities.</P>
        <P>The existence of technical access does not create permission to use, disclose, download or retain information beyond the User’s authorised purpose.</P>
        <P>Users must not attempt to identify, locate or contact a person through information that has been anonymised, masked, restricted or redacted.</P>

        {/* 6 Donor Portal */}
        <H n={6} id="donor-portal">The Donor Portal</H>
        <P>The Donor Portal may provide access to information including:</P>
        <List items={[
          "donations and funding allocations;",
          "project proposals;",
          "approved Project Charters or project memoranda;",
          "approved budgets and expenditure summaries;",
          "project milestones;",
          "delivery progress;",
          "approved reports;",
          "approved field evidence;",
          "approved project changes;",
          "project communications;",
          "support requests; and",
          "account and communication preferences.",
        ]} />
        <P>Donor access is provided for transparency, communication and responsible stewardship.</P>
        <P>Unless a separate written agreement expressly provides otherwise, Portal access does not give a Donor:</P>
        <List items={[
          "ownership of charitable funds after they have been validly donated;",
          "control over the Trustees;",
          "authority to manage, employ or instruct Project Team members;",
          "authority to select individual beneficiaries;",
          "a right to receive confidential, privileged, safeguarding-restricted or security-sensitive information;",
          "authority to make payments or commitments for the Trust;",
          "authority to speak for the Trust; or",
          "a right to require the Trust to act contrary to its Constitution, charitable purposes, legal responsibilities or safeguarding duties.",
        ]} />
        <P>Donors may express preferences, ask questions, comment on proposals and request reasonable changes.</P>
        <P>All decisions remain subject to the Constitution, applicable law, project feasibility, safeguarding, compliance and final approval by the Trust.</P>

        {/* 7 Project Team Portal */}
        <H n={7} id="project-team-portal">The Project Team Portal</H>
        <P>The Project Team Portal may provide access to:</P>
        <List items={[
          "assigned projects;",
          "role descriptions and responsibilities;",
          "project parameters and delivery plans;",
          "Project Charters;",
          "milestones and reporting dates;",
          "approved budgets and expense procedures;",
          "evidence requirements;",
          "project communications;",
          "support requests;",
          "delay and change-reporting routes; and",
          "confidential concern-reporting routes.",
        ]} />
        <P>A Project Team member must:</P>
        <List items={[
          "act honestly and in good faith;",
          "provide accurate information;",
          "report material delays, risks and concerns promptly;",
          "comply with agreed safeguarding, confidentiality and evidence requirements;",
          "submit only genuine expenses and supporting records;",
          "avoid making commitments on behalf of the Trust without authority;",
          "protect beneficiaries and confidential information;",
          "use the Portal only for assigned responsibilities;",
          "cooperate with reasonable monitoring and review requirements; and",
          "report any pressure to falsify, exaggerate or conceal project information.",
        ]} />
        <P>Project Team access does not create employment, agency, partnership or entitlement to payment unless a separate written agreement expressly provides for it.</P>

        {/* 8 Trustee authority */}
        <H n={8} id="trustee-authority">Trustee authority</H>
        <P>The Trust is administered by its Board of Trustees.</P>
        <P>The Trustees retain responsibility for:</P>
        <List items={[
          "the Trust’s strategy;",
          "decisions concerning acceptance, refusal and return of donations;",
          "the use and stewardship of charitable funds;",
          "approval, suspension, alteration and closure of projects;",
          "appointment and oversight of Project Team members and delivery partners;",
          "safeguarding;",
          "financial controls;",
          "legal and regulatory compliance; and",
          "decisions required in the best interests of the Trust and its charitable purposes.",
        ]} />
        <P>Donor consultation, Project Team agreement and Portal communications do not remove or transfer the Trustees’ responsibilities.</P>
        <P>The Trust may decline, pause or alter an action requested through a Portal where the requested action would be unlawful, unsafe, impracticable, inconsistent with the Constitution, outside the Trust’s charitable purposes, contrary to safeguarding requirements or not in the Trust’s best interests.</P>

        {/* 9 Project information and delivery */}
        <H n={9} id="project-information">Project information and delivery</H>
        <P>The Trust will take reasonable care to ensure that approved Project Information is clear and materially accurate when published.</P>
        <P>Project Information may contain estimates, forecasts, assumptions and information supplied by Project Team members, delivery partners, suppliers or other third parties.</P>
        <P>Projects may be affected by circumstances including:</P>
        <List items={[
          "safety and security conditions;",
          "armed conflict, civil disorder or political instability;",
          "sanctions or legal restrictions;",
          "supplier or delivery-partner failure;",
          "regulatory decisions;",
          "currency movements;",
          "transport and logistical disruption;",
          "public-health events;",
          "weather and natural disasters;",
          "changes in beneficiary need;",
          "availability of qualified personnel;",
          "local-law requirements; and",
          "other matters outside the Trust’s reasonable control.",
        ]} />
        <P>Dates, budgets, locations, methods and milestones may therefore change through the applicable project change-control process.</P>
        <P>A progress percentage, photograph, report or milestone update is not a guarantee of final completion or future performance.</P>
        <P>Photographs and field reports may support project reporting but do not, by themselves, constitute financial verification.</P>

        {/* 10 Project agreements */}
        <H n={10} id="project-agreements">Project agreements</H>
        <P>A proposed project may be supported by a versioned Project Charter, project memorandum or delivery plan.</P>
        <P>The relevant Donor and assigned Project Team members may be invited to:</P>
        <List items={[
          "review the project parameters;",
          "ask questions;",
          "request changes;",
          "accept the version presented; or",
          "decline participation.",
        ]} />
        <P>Acceptance by a Donor or Project Team member records that person’s agreement to the version and responsibilities presented to that person.</P>
        <P>It does not transfer the Trustees’ authority or prevent the Trust from making changes required by law, safety, safeguarding, feasibility or the Trust’s best interests.</P>
        <P>A material change should be recorded through the project change-control process and may require a revised version and further acceptance.</P>
        <P>A comment, email, Portal message or informal conversation does not amend an accepted Project Charter unless the Trust formally records and approves the amendment.</P>

        {/* 11 Communications */}
        <H n={11} id="communications">Communications, comments and support requests</H>
        <P>Users may communicate with the Trust through project messages, comments, contact forms and the Project Support Centre.</P>
        <P>Users must communicate respectfully and must not submit content that is:</P>
        <List items={[
          "threatening, abusive, defamatory or discriminatory;",
          "knowingly false or misleading;",
          "unlawful;",
          "commercially promotional without permission;",
          "intended to harass or improperly pressure another User;",
          "intended to bypass the Trust’s safeguarding or mediated-communication arrangements; or",
          "likely to expose confidential or identifying information improperly.",
        ]} />
        <P>The Trust may moderate communications, restrict their visibility, request clarification, redact personal information or decline to disclose content to another party.</P>
        <P>A general message or comment is not automatically:</P>
        <List items={[
          "a formal complaint;",
          "a safeguarding report;",
          "a protected or confidential concern;",
          "a project change request;",
          "an instruction accepted by the Trust; or",
          "a legally binding amendment.",
        ]} />
        <P>Users should use the designated process for the relevant type of request or concern.</P>

        {/* 12 Confidentiality */}
        <H n={12} id="confidentiality">Confidentiality</H>
        <P>Information available through a Portal may be confidential even where it is not expressly marked confidential.</P>
        <P>You must not, without proper authority:</P>
        <List items={[
          "disclose Portal information publicly;",
          "publish Portal screenshots;",
          "forward reports or documents;",
          "identify or attempt to identify a beneficiary;",
          "contact a beneficiary directly;",
          "contact a Project Team member outside approved communication routes;",
          "use Project Information for personal, political or commercial advantage;",
          "disclose security-sensitive locations;",
          "use photographs for facial recognition, geolocation or identity tracing;",
          "combine Portal information with external information to identify a protected person; or",
          "enable another person to access restricted information.",
        ]} />
        <P>These obligations continue after an account is closed or access ends.</P>
        <P>The Trust may withhold, delay, redact or withdraw information where reasonably necessary for privacy, safeguarding, security, legal privilege, regulatory compliance, contractual confidentiality or operational safety.</P>

        {/* 13 Beneficiary and Project Team protection */}
        <H n={13} id="beneficiary-protection">Beneficiary and Project Team protection</H>
        <P>Users must respect the dignity, privacy and safety of beneficiaries and Project Team members.</P>
        <P>Unless expressly authorised through a Trust-managed process, a Donor must not:</P>
        <List items={[
          "directly contact an individual beneficiary;",
          "request a beneficiary’s private contact information;",
          "arrange private payments to a beneficiary or Project Team member;",
          "direct or supervise an individual Project Team member;",
          "offer private employment or compensation linked to project reporting;",
          "request identifying information that the Trust has withheld;",
          "publish beneficiary stories or images; or",
          "arrange an independent site visit.",
        ]} />
        <P>Any authorised visit, interview, contact or recognition arrangement must follow the Trust’s safeguarding, confidentiality, consent and operational requirements.</P>

        {/* 14 User content */}
        <H n={14} id="user-content">User content</H>
        <P>You retain ownership of intellectual-property rights that you lawfully hold in your User Content.</P>
        <P>By submitting User Content, you grant the Trust a non-exclusive, worldwide, royalty-free licence to store, reproduce, review, redact, adapt, translate and use that material to the extent reasonably required to:</P>
        <List items={[
          "administer the Website and Portals;",
          "assess and deliver projects;",
          "meet governance, safeguarding, audit and reporting requirements;",
          "communicate with authorised parties;",
          "investigate concerns;",
          "protect beneficiaries;",
          "comply with law; and",
          "advance the Trust’s charitable purposes.",
        ]} />
        <P>This licence does not permit the public use of identifiable beneficiary images without an appropriate lawful basis, consent where required and safeguarding approval.</P>
        <P>You confirm that:</P>
        <List items={[
          "the material is accurate to the best of your knowledge;",
          "you are entitled to submit it;",
          "its submission does not infringe another person’s rights;",
          "all required permissions or consents have been obtained;",
          "it does not contain unnecessary personal information;",
          "it has not been falsified, manipulated or presented misleadingly; and",
          "it is not subject to a restriction that prevents the Trust from using it for the submitted purpose.",
        ]} />
        <P>The Trust may reject, quarantine, redact, crop, blur, restrict, archive or remove User Content where reasonably necessary.</P>

        {/* 15 Photographs and field evidence */}
        <H n={15} id="photographs">Photographs and field evidence</H>
        <P>Photographs, video and field evidence must be submitted only through authorised routes.</P>
        <P>Users must comply with:</P>
        <List items={[
          "consent requirements;",
          "safeguarding requirements;",
          "privacy requirements;",
          "security and location restrictions;",
          "instructions concerning children and vulnerable adults;",
          "metadata and geolocation controls; and",
          "project-specific evidence requirements.",
        ]} />
        <P>Submission does not guarantee donor visibility or public publication.</P>
        <P>The Trust may classify evidence as:</P>
        <List items={[
          "submitted;",
          "under review;",
          "changes requested;",
          "reviewed by the Trust;",
          "approved for donor viewing;",
          "restricted;",
          "withdrawn; or",
          "rejected.",
        ]} />
        <P>The Trust will not describe evidence as independently verified unless an appropriate verification process has genuinely occurred.</P>

        {/* 16 Acceptable use */}
        <H n={16} id="acceptable-use">Acceptable use</H>
        <P>You must not use the Website or a Portal to:</P>
        <List items={[
          "break any law;",
          "commit or facilitate fraud;",
          "submit false expenses or fabricated evidence;",
          "misrepresent project progress;",
          "distribute malicious software;",
          "test, scan or probe system security without written permission;",
          "scrape, harvest or bulk-download information;",
          "reverse engineer protected systems except where the law expressly permits it;",
          "interfere with service availability;",
          "obtain unauthorised access;",
          "create duplicate or deceptive accounts;",
          "process another person’s personal information unlawfully;",
          "intimidate or retaliate against a person raising a concern;",
          "contact vulnerable persons outside approved arrangements;",
          "misuse Donor, Project Team or beneficiary information;",
          "use the Portal for unauthorised political or commercial activity; or",
          "engage in dishonest or unlawful conduct affecting the Trust or its projects.",
        ]} />
        <P>Nothing in these Terms prevents a person from:</P>
        <List items={[
          "making a protected disclosure;",
          "reporting a safeguarding concern;",
          "reporting suspected crime;",
          "contacting a regulator or statutory authority lawfully; or",
          "obtaining independent legal advice.",
        ]} />

        {/* 17 Due diligence */}
        <H n={17} id="due-diligence">Due diligence and compliance</H>
        <P>The Trust may request information and documents where reasonably required to:</P>
        <List items={[
          "verify identity;",
          "verify authority;",
          "understand ownership and control;",
          "assess source of funds;",
          "consider source of wealth where proportionate;",
          "undertake sanctions screening;",
          "manage fraud and financial-crime risk;",
          "assess conflicts of interest;",
          "protect donors in vulnerable circumstances;",
          "assess reputational or operational risk; or",
          "comply with legal and regulatory obligations.",
        ]} />
        <P>Portal access, payment processing or receipt of funds does not necessarily mean that a donation, project, partner, expense or payment has received final approval.</P>
        <P>Sensitive due-diligence information will be restricted to authorised personnel and processed in accordance with the Privacy Notice.</P>

        {/* 18 Payments */}
        <H n={18} id="payments">Payments and donations</H>
        <P>Payment services may be provided by third-party payment processors.</P>
        <P>The Trust does not store complete payment-card details unless expressly stated and lawfully implemented.</P>
        <P>A successful payment confirmation means that the payment provider has reported the transaction as received or authorised.</P>
        <P>It does not, by itself:</P>
        <List items={[
          "confirm final acceptance of a donation;",
          "approve a project;",
          "give a Donor control over charitable funds;",
          "confirm eligibility for tax relief or Gift Aid;",
          "waive due-diligence requirements;",
          "prevent a payment from being investigated; or",
          "prevent a payment from being reversed, refunded, disputed or placed on hold where lawful.",
        ]} />
        <P>The treatment of a donation, restricted gift, grant or project contribution is governed by the applicable Donor and Project Funding Terms and any separate written agreement.</P>
        <P>The Trust must not represent that Gift Aid or another tax relief is available unless the required recognition, declarations and processes are in place.</P>

        {/* 19 Third-party services */}
        <H n={19} id="third-party">Third-party services</H>
        <P>The Website and Portals may rely on or link to third-party services, including:</P>
        <List items={[
          "payment providers;",
          "authentication providers;",
          "cloud hosting providers;",
          "mapping or translation services;",
          "delivery partners;",
          "professional advisers; and",
          "regulatory or public-information websites.",
        ]} />
        <P>A link does not mean that the Trust controls or endorses all content on the third-party service.</P>
        <P>Third-party services may have their own terms and privacy notices.</P>
        <P>The Trust is not responsible for a third party’s acts, omissions or service availability except to the extent that responsibility cannot lawfully be excluded or arises under a separate written agreement.</P>

        {/* 20 Intellectual property */}
        <H n={20} id="intellectual-property">Intellectual property</H>
        <P>Unless otherwise stated, the Website, Portal software, design, branding, original text, databases and materials created by or for the Trust are owned by the Trust or used under licence.</P>
        <P>You may view and use material only for:</P>
        <List items={[
          "personal use;",
          "internal organisational review;",
          "an authorised project purpose; or",
          "another purpose expressly approved by the Trust.",
        ]} />
        <P>You must not reproduce, sell, license, publish, commercially exploit, materially alter or create misleading derivative material from Trust content without permission.</P>
        <P>Nothing in these Terms transfers ownership of the Trust’s intellectual property to a User.</P>

        {/* 21 Service availability */}
        <H n={21} id="service-availability">Service availability and security</H>
        <P>The Trust aims to provide a secure and reliable service but does not guarantee that the Website or Portals will always be available, uninterrupted or free from defects.</P>
        <P>Access may be affected by:</P>
        <List items={[
          "maintenance;",
          "security incidents;",
          "system updates;",
          "third-party failure;",
          "network interruption;",
          "legal requirements; or",
          "events beyond the Trust’s reasonable control.",
        ]} />
        <P>The Trust may make reasonable changes to improve security, accessibility, performance or functionality.</P>
        <P>Users are responsible for maintaining appropriate device security, software updates and lawful backups of information they are permitted to retain.</P>

        {/* 22 Suspension */}
        <H n={22} id="suspension">Suspension and termination</H>
        <P>The Trust may temporarily restrict or suspend access where reasonably necessary to:</P>
        <List items={[
          "investigate suspected misuse;",
          "protect account security;",
          "prevent unauthorised disclosure;",
          "protect a beneficiary or Project Team member;",
          "respond to a safeguarding concern;",
          "comply with law or a lawful regulatory request;",
          "investigate suspected fraud or financial irregularity;",
          "manage a material breach of these Terms; or",
          "protect the integrity of a project or the Trust’s systems.",
        ]} />
        <P>Where appropriate and lawful, the Trust will explain the reason and provide an opportunity to respond.</P>
        <P>The Trust may terminate access where:</P>
        <List items={[
          "authority to use the account has ended;",
          "the account is no longer required;",
          "a serious or repeated breach has occurred;",
          "continued access creates an unacceptable security, legal or safeguarding risk; or",
          "a separate arrangement providing access has ended.",
        ]} />
        <P>Suspension or termination of Portal access does not determine whether any donation must be returned.</P>
        <P>Any question concerning donated funds will be considered under the applicable donation terms, the Constitution and applicable law.</P>

        {/* 23 Professional advice */}
        <H n={23} id="professional-advice">Information and professional advice</H>
        <P>Public Website content is provided for general information.</P>
        <P>It is not a substitute for legal, tax, financial, investment, medical, safeguarding or other professional advice.</P>
        <P>Donors, Project Team members and organisations should obtain independent advice where appropriate to their circumstances.</P>
        <P>Nothing on the Website constitutes:</P>
        <List items={[
          "an investment invitation;",
          "a financial promotion;",
          "tax advice;",
          "a guarantee of tax relief;",
          "medical advice to an individual patient;",
          "a promise of a particular charitable outcome; or",
          "a binding offer unless expressly stated in a separate written document.",
        ]} />

        {/* 24 Our responsibility */}
        <H n={24} id="our-responsibility">The Trust’s responsibility</H>
        <P>Nothing in these Terms excludes or limits liability for:</P>
        <List items={[
          "death or personal injury caused by negligence;",
          "fraud or fraudulent misrepresentation; or",
          "any other liability that cannot lawfully be excluded or limited.",
        ]} />
        <P>The Trust is responsible for loss or damage that is a foreseeable result of its breach of these Terms or failure to use reasonable care and skill where that responsibility arises under applicable law.</P>
        <P>The Trust is not responsible for loss or damage caused by:</P>
        <List items={[
          "a User’s breach of these Terms;",
          "inaccurate information supplied by a User or third party;",
          "unauthorised sharing of account credentials;",
          "action taken outside an authorised Portal process;",
          "third-party services outside the Trust’s reasonable control; or",
          "events outside the Trust’s reasonable control,",
        ]} />
        <P>except to the extent that the Trust remains legally responsible.</P>
        <P>Where a User acts for business, professional, foundation, family-office, trustee or organisational purposes, the Trust will not be responsible under these Website Terms for indirect or consequential loss, loss of profit, loss of revenue, loss of opportunity or loss of anticipated savings, except where that liability cannot lawfully be excluded or is expressly accepted in a separate written agreement.</P>
        <P>Nothing in this section limits obligations expressly contained in a separate donation, grant or project agreement.</P>

        {/* 25 User responsibility */}
        <H n={25} id="user-responsibility">User responsibility</H>
        <P>You are responsible for:</P>
        <List items={[
          "your lawful use of the Website and Portal;",
          "information submitted through your account;",
          "protecting your credentials;",
          "complying with the permissions attached to your role;",
          "respecting confidentiality and safeguarding controls;",
          "notifying the Trust promptly of material errors, unauthorised access or misuse; and",
          "ensuring that your own systems and devices are reasonably secure.",
        ]} />
        <P>An organisation is responsible for managing the authority of its representatives and informing the Trust when a representative’s access should change or end.</P>

        {/* 26 Privacy and cookies */}
        <H n={26} id="privacy-cookies">Privacy and cookies</H>
        <P>Personal information is processed in accordance with the Trust’s <Link to="/privacy-policy" className="text-primary hover:underline">Privacy Notice</Link>.</P>
        <P>Cookies and similar technologies are governed by the Trust’s <Link to="/cookie-policy" className="text-primary hover:underline">Cookie Policy</Link> and the User’s available consent choices.</P>
        <P>To exercise a data-access right, please use the <Link to="/data-access-request" className="text-primary hover:underline">Data Access Request</Link> route.</P>

        {/* 27 Changes */}
        <H n={27} id="changes">Changes to these Terms</H>
        <P>The Trust may update these Terms to reflect:</P>
        <List items={[
          "changes in law or regulation;",
          "changes to the Website or Portals;",
          "new security requirements;",
          "new project or support functions; or",
          "improvements in clarity or governance.",
        ]} />
        <P>The current version will state its effective date and version number.</P>
        <P>Material changes affecting Portal Users will be communicated through an appropriate notice.</P>
        <P>Where fresh electronic acceptance is appropriate, the Trust may request it.</P>
        <P>Changes to these Website and Portal Terms do not retrospectively amend a separate signed donation, grant or project agreement.</P>

        {/* 28 Records */}
        <H n={28} id="records">Records and electronic communications</H>
        <P>The Trust may retain records of:</P>
        <List items={[
          "account creation;",
          "the version of these Terms presented;",
          "electronic acceptance or acknowledgement;",
          "project communications;",
          "security events;",
          "changes to account permissions; and",
          "other actions reasonably required for governance, audit, safeguarding and legal compliance.",
        ]} />
        <P>Electronic communications and Portal records may be used as evidence of actions, instructions and decisions, subject to applicable law and any separate written agreement.</P>
        <P>A Portal click, checkbox or acknowledgement does not substitute for a deed, witnessed signature or other formal execution requirement where the law or a separate agreement requires one.</P>

        {/* 29 Complaints */}
        <H n={29} id="complaints">Complaints and concerns</H>
        <P>A User may raise:</P>
        <List items={[
          "a general enquiry;",
          "a project-support request;",
          "a complaint;",
          "a safeguarding concern;",
          "a confidential concern;",
          "suspected fraud;",
          "suspected misuse of funds; or",
          "a security concern",
        ]} />
        <P>through the appropriate route provided by the Trust.</P>
        <P>Complaints will be handled under the Complaints and Project Support Policy when that policy is implemented.</P>
        <P>Safeguarding and confidential concerns must be restricted to appropriately authorised personnel.</P>
        <P>Nothing in these Terms prevents a User from contacting an appropriate regulator, law-enforcement body, safeguarding authority or professional adviser.</P>
        <P>
          Use the following routes: <Link to="/contact-the-trust" className="text-primary hover:underline">Contact the Trust</Link>,
          {" "}<Link to="/safeguarding" className="text-primary hover:underline">Safeguarding</Link>, or
          {" "}<Link to="/whistleblowing" className="text-primary hover:underline">Whistleblowing</Link>.
        </P>

        {/* 30 Governing law */}
        <H n={30} id="governing-law">Governing law and jurisdiction</H>
        <P>These Terms are governed by the laws of England and Wales.</P>
        <P>Subject to any mandatory rights that apply to an individual User in another jurisdiction, the courts of England and Wales will have non-exclusive jurisdiction in relation to disputes arising from these Terms.</P>
        <P>A separate donation, grant, employment, consultancy, delivery or project agreement may contain its own governing-law and dispute provisions. Those provisions will apply to that separate agreement.</P>

        {/* 31 General */}
        <H n={31} id="general">General provisions</H>
        <P>If any provision of these Terms is found to be unlawful or unenforceable, the remaining provisions will continue in effect.</P>
        <P>A delay by the Trust in enforcing a provision does not waive the right to enforce it later.</P>
        <P>A User may not transfer Portal access or rights under these Terms to another person without the Trust’s written permission.</P>
        <P>Nothing in these Terms creates a partnership, joint venture, fiduciary relationship, employment relationship or agency relationship between the Trust and a User merely because the User accesses the Website or Portal.</P>
        <P>No person other than the Trust and the User has a right to enforce these Terms, except where a separate written agreement expressly provides otherwise.</P>

        {/* 32 Contact */}
        <H n={32} id="contact">Contact</H>
        <P>For questions about these Terms, legal enquiries or governance enquiries, please contact the Trust through the <Link to="/contact-the-trust" className="text-primary hover:underline">secure contact form</Link>.</P>
        <P>Correspondence address:</P>
        <address className="mt-3 not-italic text-[16px] leading-[1.75] text-foreground/85">
          {LEGAL_ENTITY.correspondenceAddress.lines.map((l, i) => (
            <span key={i}>{l}<br /></span>
          ))}
        </address>
        <P>This is the Trust’s correspondence address. It is not a registered office.</P>

        <footer className="mt-16 pt-8 border-t border-foreground/15 text-[13px] text-muted-foreground">
          Website and Portal Terms of Use · Version {doc.version} · Last updated 22 July 2026
        </footer>
      </article>
    </div>
  );
};

export default TermsOfUsePage;
