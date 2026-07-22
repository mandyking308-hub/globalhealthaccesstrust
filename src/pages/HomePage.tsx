import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import { organizationSchema } from "@/lib/seo";
import { LEGAL_ENTITY } from "@/lib/legalEntity";
import heroImage from "@/assets/ghat-hero-community-health.jpg";
import clinicImage from "@/assets/ghat-maternal-care.jpg";
import systemsImage from "@/assets/ghat-infrastructure-delivery.jpg";
import ruralImage from "@/assets/ghat-capacity-training.jpg";

const operatingSteps = [
  {
    title: "Trustee assessment",
    body: "Proposed work is considered against the Trust Deed, public benefit, safeguarding, sanctions, financial crime and delivery risk.",
  },
  {
    title: "Documented approval",
    body: "A project proceeds only after the Trustees approve its purpose, budget, restrictions, responsibilities and reporting arrangements.",
  },
  {
    title: "Controlled delivery",
    body: "Approved work is governed through a Project Charter, milestone reporting, restricted access and documented expenditure controls.",
  },
  {
    title: "Accountable closure",
    body: "The Trust records outcomes, expenditure, remaining funds, decisions and any approved refund or reallocation.",
  },
];

const priorityAreas = [
  {
    image: clinicImage,
    title: "Healthcare access",
    body: "Projects intended to relieve illness and improve access to ethical, appropriate healthcare for underserved people.",
    alt: "Healthcare professional supporting a mother and infant in a clinical setting",
  },
  {
    image: systemsImage,
    title: "Health-system capacity",
    body: "Projects intended to strengthen the infrastructure, supplies, logistics and systems needed for care to reach people safely.",
    alt: "Medical supplies being handled outside a healthcare facility",
  },
  {
    image: ruralImage,
    title: "Education and professional capacity",
    body: "Projects intended to support training, knowledge and sustainable local capability in health and care.",
    alt: "Healthcare professionals taking part in a training session",
  },
];

const networkFacts = [
  {
    value: "2019",
    label: "Public-benefit work began",
    detail: "The charitable work that led to GHAT began before the Trust was formally established.",
  },
  {
    value: "12",
    label: "Countries represented",
    detail: "Representation across the wider international clinical network.",
  },
  {
    value: "40+",
    label: "Organisational relationships",
    detail: "Partner and organisational relationships developed through the wider work.",
  },
  {
    value: "3",
    label: "Current Trustees",
    detail: "Mandy King, Dr Jagdev Thukral and John O'Sullivan BA FCA.",
  },
];

export const HomePage = () => (
  <>
    <SEO
      title="Global Health Access Trust"
      description="Global Health Access Trust is a trustee-governed charitable trust established in December 2024, building on charitable and public-benefit work undertaken since 2019."
      canonical="/"
      schema={organizationSchema}
    />

    <div className="homepage-editorial flex flex-col bg-background">
      <section className="border-b border-foreground/10 bg-background">
        <div className="grid min-h-[calc(100vh-108px)] grid-cols-1 lg:grid-cols-2">
          <div className="order-2 flex flex-col justify-center px-6 py-20 md:px-16 lg:order-1 lg:px-24 lg:py-24">
            <div className="max-w-[680px]">
              <div className="mb-8 flex items-center gap-3">
                <span className="h-px w-10 bg-foreground" />
                <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-foreground">
                  Charitable trust · England and Wales
                </span>
              </div>
              <h1 className="text-foreground">
                Trustee-led work for accountable healthcare access.
              </h1>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
                Global Health Access Trust was formally established under its Trust Deed with effect from 1 December 2024, building upon charitable and public-benefit work undertaken since 2019.
              </p>
              <p className="mt-5 max-w-xl leading-relaxed text-muted-foreground">
                The Trustees assess, approve, govern and report on defined work for the public benefit and retain responsibility for every charitable decision and every use of Trust funds.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Button asChild size="lg" className="rounded-none">
                  <Link to="/about-the-trust">About the Trust</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-none">
                  <Link to="/constitution">View the signed Constitution</Link>
                </Button>
              </div>
            </div>
          </div>
          <div className="relative order-1 min-h-[45vh] overflow-hidden bg-muted lg:order-2 lg:min-h-full">
            <img
              src={heroImage}
              alt="A parent and child in a community affected by disruption to healthcare access"
              className="absolute inset-0 h-full w-full object-cover object-center"
              loading="eager"
            />
            <span className="absolute bottom-4 right-4 bg-background/90 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground">
              Illustrative documentary image
            </span>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 border-b border-foreground/10 bg-background sm:grid-cols-2 lg:grid-cols-4">
        {networkFacts.map((item, index) => (
          <div
            key={item.label}
            className={`p-10 md:p-12 ${index < networkFacts.length - 1 ? "border-b border-foreground/10 sm:border-r lg:border-b-0" : ""}`}
          >
            <span className="display-condensed block text-5xl font-black text-foreground md:text-6xl">
              {item.value}
            </span>
            <h2 className="mt-5 text-sm font-bold uppercase tracking-[0.18em] text-foreground">
              {item.label}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.detail}</p>
          </div>
        ))}
      </section>

      <section className="border-b border-foreground/10 bg-secondary/40 py-24 md:py-28">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-12 px-6 md:grid-cols-[0.8fr_1.2fr] md:px-10">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              History and wider network
            </p>
            <h2 className="mt-5 text-foreground">Public-benefit work since 2019.</h2>
          </div>
          <div className="space-y-5 text-[16px] leading-relaxed text-muted-foreground">
            <p>
              The charitable and public-benefit work that led to Global Health Access Trust began in 2019. Global Health Access Trust was formally established under its Trust Deed with effect from 1 December 2024.
            </p>
            <p>
              The earlier work includes the Clinicians Check international clinician network. Registrations across that wider network number in the thousands, with representation in 12 countries and more than 40 partner and organisational relationships. Source exports are being reconciled and deduplicated before an exact registration total is published.
            </p>
            <p>
              These figures describe the reach and capacity of the wider clinical and volunteer network. They are not presented as a claim that GHAT funded or completed projects in every represented country or through every relationship.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-foreground/10 bg-primary py-24 text-primary-foreground md:py-28">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary-foreground/70">
            Legal identity
          </p>
          <h2 className="mt-5 max-w-4xl text-primary-foreground">A charitable trust governed by its Trustees.</h2>
          <p className="mt-8 max-w-4xl text-lg leading-relaxed text-primary-foreground/90">
            {LEGAL_ENTITY.publicLegalDescription}
          </p>
          <p className="mt-6 max-w-4xl leading-relaxed text-primary-foreground/80">
            GHAT is not presented as a company or as a registered charity. Its correspondence address is clearly distinguished from a registered office, and regulatory particulars will be published only when formally confirmed.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button asChild variant="secondary" className="rounded-none">
              <Link to="/governance-legal-framework">Governance and legal framework</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-none border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <Link to="/trustee-biographies">Trustees and advisers</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="border-b border-foreground/10 bg-background py-24 md:py-28">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">Operating framework</p>
          <h2 className="mt-5 max-w-3xl text-foreground">How a project moves from proposal to accountable delivery.</h2>
          <ol className="mt-14 grid grid-cols-1 border-l border-t border-foreground/15 md:grid-cols-2 lg:grid-cols-4">
            {operatingSteps.map((step, index) => (
              <li key={step.title} className="border-b border-r border-foreground/15 p-8">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">0{index + 1}</span>
                <h3 className="mt-5 text-foreground">{step.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-b border-foreground/10 bg-secondary/50 py-24 md:py-28">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">Charitable scope</p>
          <h2 className="mt-5 text-foreground">Priority areas within the Trust's mandate.</h2>
          <p className="mt-6 max-w-3xl leading-relaxed text-muted-foreground">
            These are areas in which the Trustees may commission work. They are not claims that a particular country programme, grant or partnership is already active.
          </p>
          <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-3">
            {priorityAreas.map((area) => (
              <article key={area.title}>
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                  <img src={area.image} alt={area.alt} className="h-full w-full object-cover" loading="lazy" />
                  <span className="absolute bottom-3 right-3 bg-background/90 px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.15em]">
                    Illustrative image
                  </span>
                </div>
                <h3 className="mt-6 text-foreground">{area.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{area.body}</p>
              </article>
            ))}
          </div>
          <Button asChild variant="outline" className="mt-12 rounded-none">
            <Link to="/what-we-do">Read the full charitable mandate</Link>
          </Button>
        </div>
      </section>

      <section className="border-b border-foreground/10 bg-background py-24 md:py-28">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-12 px-6 md:grid-cols-[0.8fr_1.2fr] md:px-10">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">Current pro bono work</p>
            <h2 className="mt-5 text-foreground">Supporting agricultural supply-chain resilience in Nigeria.</h2>
          </div>
          <div className="space-y-5 text-[16px] leading-relaxed text-muted-foreground">
            <p>
              The Trust's wider team currently provides pro bono technical and operational support to an agricultural supply-chain organisation in Nigeria. No fee is being charged for this work.
            </p>
            <p>
              The work is intended to strengthen visibility and coordination across farmers, partners, logistics, quality assurance, buyer delivery and payment-risk processes, helping to protect agricultural output and the livelihoods that depend upon it.
            </p>
            <p className="text-sm">
              The organisation is not named publicly. Any decision to adopt this work as a formal GHAT project requires a documented trustee approval and project charter.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-foreground/10 bg-background py-24 md:py-28">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-12 px-6 md:grid-cols-2 md:px-10">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">Financial integrity</p>
            <h2 className="mt-5 text-foreground">Banking before public fundraising.</h2>
          </div>
          <div className="space-y-5 text-[16px] leading-relaxed text-muted-foreground">
            <p>
              The Trustees are applying for a UK bank account in the legal name Global Health Access Trust. No public bank details are displayed and no public payment channel should be treated as active until the Trustees have verified and approved the account and provider settings.
            </p>
            <p>
              A proposed gift is not recorded as received income until cleared funds are reconciled. Mandates, draft instructions and pending collections are not treated as completed donations.
            </p>
            <p>
              Restricted and unrestricted funds will be recorded separately, material payments will require documented approval, and accounts will be independently examined or audited where required by law or approved by the Trustees.
            </p>
            <Button asChild variant="outline" className="rounded-none">
              <Link to="/financial-controls">Financial controls</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-background py-24 md:py-28">
        <div className="mx-auto max-w-[1200px] px-6 text-center md:px-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">Contact</p>
          <h2 className="mx-auto mt-5 max-w-3xl text-foreground">Enquiries are routed through the Trust's secure contact form.</h2>
          <p className="mx-auto mt-6 max-w-2xl leading-relaxed text-muted-foreground">
            Direct email addresses and bank details are not published on the public website. This protects the Trust and allows each matter to be recorded and directed appropriately.
          </p>
          <Button asChild size="lg" className="mt-9 rounded-none">
            <Link to="/contact-the-trust">Contact the Trust</Link>
          </Button>
        </div>
      </section>
    </div>
  </>
);
