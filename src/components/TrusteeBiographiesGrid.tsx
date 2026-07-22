import { Card, CardContent } from "@/components/ui/card";

interface PersonProfile {
  name: string;
  role: string;
  biography: string;
  contribution: string;
}

const trustees: PersonProfile[] = [
  {
    name: "Mandy King",
    role: "Chair of Trustees",
    biography:
      "Mandy King has more than 25 years of experience across healthcare, social care, education, business operations and international development. Her work includes strategic governance, regulated-service leadership, organisational development and the use of technology to improve administration and accountability.",
    contribution:
      "As Chair, Mandy coordinates the Board, oversees the Trust's operating framework and works with the other Trustees to ensure that decisions remain within the Trust Deed and serve the public benefit.",
  },
  {
    name: "Dr Jagdev Thukral",
    role: "Trustee",
    biography:
      "Dr Jagdev Thukral is a medical doctor and psychiatrist with more than 25 years of experience in NHS and private mental-health settings. His professional work includes clinical governance, service development, organisational change and the assessment of complex health needs.",
    contribution:
      "He contributes clinical perspective, safeguarding awareness and healthcare-sector knowledge to trustee decisions and project oversight.",
  },
  {
    name: "John O'Sullivan BA FCA",
    role: "Trustee",
    biography:
      "John O'Sullivan is a Fellow of the Institute of Chartered Accountants with senior executive and finance experience in the care sector. His background includes financial forecasting, investment oversight, governance and operational management within regulated healthcare environments.",
    contribution:
      "He contributes financial, governance and stewardship expertise, including the development of appropriate banking, accounting and expenditure controls.",
  },
];

const advisers: PersonProfile[] = [
  {
    name: "Rachael Duff",
    role: "Specialist adviser — Compliance and operational governance",
    biography:
      "Rachael Duff is a regulatory and compliance leader with more than 24 years of experience in operational and quality systems management across the NHS, social care and commercial healthcare. She has served as a Specialist Practice Manager Adviser for the Care Quality Commission and has participated in more than 400 inspections. She holds Level 4 certification in mediation and is trained as an expert witness.",
    contribution:
      "She may provide specialist input on compliance, governance, quality assurance and operational systems when requested by the Trustees.",
  },
  {
    name: "Dr Joy Wong",
    role: "Specialist adviser — Psychological health and youth mental health",
    biography:
      "Dr Joy Wong is a Chartered Health Psychologist and Associate Fellow of the British Psychological Society. She holds a PhD in Public Health focused on youth mental health, is registered with the Health and Care Professions Council and has experience in evidence-based psychological practice, including DBT and CBT.",
    contribution:
      "She may provide specialist input on psychological health, youth mental health, public health and culturally responsive programme design when requested by the Trustees.",
  },
  {
    name: "Richard Banyard",
    role: "Specialist adviser — Health systems and commissioning",
    biography:
      "Richard Banyard is a former NHS Chief Executive and senior healthcare strategist with more than 35 years of experience, including extensive Board-level service. His background includes commissioning, primary-care transformation, health-service management, education and national health-infrastructure work.",
    contribution:
      "He may provide specialist input on health systems, commissioning, service design and institutional partnerships when requested by the Trustees.",
  },
];

const ProfileCard = ({ person }: { person: PersonProfile }) => (
  <Card className="card-professional">
    <CardContent className="p-6">
      <h3 className="text-xl font-serif font-bold text-primary mb-2">{person.name}</h3>
      <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-primary mb-4">
        {person.role}
      </p>
      <p className="text-sm leading-relaxed text-muted-foreground">{person.biography}</p>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{person.contribution}</p>
    </CardContent>
  </Card>
);

export const TrusteeBiographiesGrid = () => (
  <div className="space-y-12 mt-8">
    <section>
      <h2 className="text-2xl md:text-3xl font-serif font-bold mb-3">Current Trustees</h2>
      <p className="text-muted-foreground mb-6 max-w-3xl">
        Mandy King, Dr Jagdev Thukral and John O'Sullivan BA FCA constitute the current Board of Trustees and are the constitutional signatories identified in the Trust's records.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {trustees.map((person) => <ProfileCard key={person.name} person={person} />)}
      </div>
    </section>

    <section>
      <h2 className="text-2xl md:text-3xl font-serif font-bold mb-3">Advisory and specialist contributors</h2>
      <p className="text-muted-foreground mb-6 max-w-3xl">
        The Trust values the experience of its advisory and specialist contributors. They are not Trustees, do not control Trust funds and cannot bind the Trust unless the Trustees give specific written authority. Their biographies describe their professional experience and do not imply that their employers or former employers are partners of GHAT.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {advisers.map((person) => <ProfileCard key={person.name} person={person} />)}
      </div>
    </section>

    <p className="text-sm text-muted-foreground max-w-4xl">
      The experience of the Trustees and advisers predates the formation of Global Health Access Trust. GHAT itself was formally established under its Trust Deed with effect from 1 December 2024.
    </p>
  </div>
);