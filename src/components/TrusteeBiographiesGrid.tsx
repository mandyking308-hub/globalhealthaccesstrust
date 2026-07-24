import { Card, CardContent } from "@/components/ui/card";

interface TrusteeProps {
  name: string;
  role: string;
  bio: string;
  quote: string;
}

const constitutionalTrustees: TrusteeProps[] = [
  {
    name: "Mandy King",
    role: "Chair of Trustees",
    bio: "Mandy King is an experienced business operator and technology strategist whose work spans healthcare, social care, education, artificial intelligence and international operations. As Chair, she leads institutional strategy, governance and the development of long-term charitable programmes.",
    quote: "Our Trust is guided by duty, not profile. We exist to protect the dignity of human life—lawfully, ethically, and enduringly."
  },
  {
    name: "Dr Jagdev Thukral",
    role: "Trustee and Executive Lead",
    bio: "Dr Jagdev Thukral is an NHS psychiatrist with more than 25 years of clinical experience across public and private mental health services. As Executive Lead, he supports clinical strategy, safeguarding, professional partnerships and the development of health programmes.",
    quote: "Access to care must be equitable, safe, and lawful. This Trust exists to make that a reality."
  },
  {
    name: "John O'Sullivan BA FCA",
    role: "Trustee — Finance and Governance",
    bio: "John O'Sullivan BA FCA brings senior financial, commercial and governance experience. He supports the Board on financial stewardship, audit, risk and long-term institutional planning.",
    quote: "Every contribution is held with care, precision, and purpose. We are not just managing funds—we are safeguarding legacies."
  },
];

const advisoryContributors: TrusteeProps[] = [
  {
    name: "Rachael Duff",
    role: "Compliance & Operational Governance",
    bio: "Rachael Duff is a regulatory and compliance leader with over 24 years in operational and quality systems management across NHS, social care, and commercial healthcare. She has served as a Specialist Practice Manager Advisor for the CQC, participating in over 400 inspections. Rachael holds Level 4 certification in mediation and is a trained Expert Witness. Her oversight of compliance, governance, and quality assurance frameworks supports the Trust in operating at the highest legal and professional standards.",
    quote: "We are custodians of care. Compliance is not a checkbox—it is the foundation of trust."
  },
  {
    name: "Dr Joy Wong",
    role: "Psychological Health & Youth Mental Health",
    bio: "Dr Joy Wong is a Chartered Health Psychologist and Associate Fellow of the British Psychological Society. With a Ph.D. in Public Health focused on youth mental health, she is registered with the Health and Care Professions Council (HCPC) and brings a culturally diverse lens to care provision. Dr Wong's clinical specialisms include DBT and CBT, and she contributes on integrating holistic, evidence-based psychological support within health access frameworks.",
    quote: "Mental health is inseparable from public health. We build systems that recognise and respond to this truth."
  },
  {
    name: "Richard Banyard",
    role: "Health Systems & Commissioning",
    bio: "Richard Banyard is a former NHS Chief Executive and senior healthcare strategist with over 35 years of experience, including 10 years at Board level. With a Master's in Health Services Management and a PGCE, he has advised on commissioning, primary care transformation, and national health infrastructure projects. As a former educator and Head Examiner, Richard reinforces the Trust's commitment to knowledge, systems integrity, and enduring public benefit.",
    quote: "Our work is built on evidence, service, and the discipline of public duty."
  },
];

const TrusteeCard = ({ trustee }: { trustee: TrusteeProps }) => (
  <Card className="card-professional">
    <CardContent className="p-6">
      <h3 className="text-xl font-serif font-bold text-primary mb-2">
        {trustee.name}
      </h3>
      <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-primary mb-4">
        {trustee.role}
      </p>
      <p className="text-muted-foreground leading-relaxed mb-4 text-sm">
        {trustee.bio}
      </p>
      <blockquote className="border-l-4 border-primary/20 pl-4 italic text-sm text-muted-foreground">
        "{trustee.quote}"
      </blockquote>
    </CardContent>
  </Card>
);

export const TrusteeBiographiesGrid = () => {
  return (
    <div className="space-y-12 mt-8">
      <section>
        <h2 className="text-2xl md:text-3xl font-serif font-bold mb-3">
          Trustees and Constitutional Signatories
        </h2>
        <p className="text-muted-foreground mb-6 max-w-3xl">
          Mandy King, Dr Jagdev Thukral and John O'Sullivan BA FCA are the Trust's appointed Trustees and constitutional signatories. Trustee authority is exercised collectively and in accordance with the Constitution and published governance framework.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {constitutionalTrustees.map((t, i) => <TrusteeCard key={i} trustee={t} />)}
        </div>
      </section>

      <section>
        <h2 className="text-2xl md:text-3xl font-serif font-bold mb-3">
          Advisory and Specialist Contributors
        </h2>
        <p className="text-muted-foreground mb-6 max-w-3xl">
          The Trust also benefits from the experience of specialist contributors who support its thinking across governance, compliance, healthcare, commissioning and programme design. Inclusion in this section does not, by itself, constitute appointment as a Trustee.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {advisoryContributors.map((t, i) => <TrusteeCard key={i} trustee={t} />)}
        </div>
      </section>
    </div>
  );
};
