import { Card, CardContent } from "@/components/ui/card";

interface TrusteeProps {
  name: string;
  role: string;
  bio: string;
  quote: string;
}

const trustees: TrusteeProps[] = [
  {
    name: "Mandy King",
    role: "Chair of Trustees",
    bio: "Mandy King is the Principal Group Owner and Business Operator of a portfolio of high-impact healthcare ventures. With over 25 years of experience spanning the NHS, care, education, and international operations, Mandy leads with vision and discipline. Her qualifications include a Master's in Business Administration, a Level 5 Award in Health and Social Care Management (Higher Distinction), and certifications from Microsoft and Cisco. As Chair of Trustees, she oversees strategic governance, public accountability, and charitable stewardship. Her focus on AI and machine learning drives innovation across platforms, contributing to equitable global health systems.",
    quote: "Our Trust is guided by duty, not profile. We exist to protect the dignity of human life—lawfully, ethically, and enduringly."
  },
  {
    name: "Dr. Jagdev Thukral",
    role: "Executive Lead",
    bio: "Dr. Thukral is a seasoned medical director with over 25 years of experience in both NHS and private mental health settings. With a Master's in Organisational Psychology and a Level 5 Award in Health and Social Care Management, he brings exceptional leadership in clinical governance and change management. As Executive Lead, Dr. Thukral oversees programme strategy, clinical partnerships, and cross-border health initiatives. His career is defined by a consistent drive to advance equality, safety, and global healthcare outcomes.",
    quote: "Access to care must be equitable, safe, and lawful. This Trust exists to make that a reality."
  },
  {
    name: "Rachael Duff",
    role: "Compliance & Operational Governance",
    bio: "Rachael Duff is a regulatory and compliance leader with over 24 years in operational and quality systems management across NHS, social care, and commercial healthcare. She has served as a Specialist Practice Manager Advisor for the CQC, participating in over 400 inspections. Rachael holds Level 4 certification in mediation and is a trained Expert Witness. Her oversight of compliance, governance, and quality assurance frameworks ensures the Trust operates at the highest legal and professional standards.",
    quote: "We are custodians of care. Compliance is not a checkbox—it is the foundation of trust."
  },
  {
    name: "Dr. Joy Wong",
    role: "Psychological Health & Youth Mental Health",
    bio: "Dr. Joy Wong is a Chartered Health Psychologist and Associate Fellow of the British Psychological Society. With a Ph.D. in Public Health focused on youth mental health, she is registered with the Health and Care Professions Council (HCPC) and brings a culturally diverse lens to care provision. Dr. Wong's clinical specialisms include DBT and CBT, and she leads on integrating holistic, evidence-based psychological support within health access frameworks.",
    quote: "Mental health is inseparable from public health. We build systems that recognise and respond to this truth."
  },
  {
    name: "Richard Banyard",
    role: "Health Systems & Commissioning",
    bio: "Richard Banyard is a former NHS Chief Executive and senior healthcare strategist with over 35 years of experience, including 10 years at Board level. With a Master's in Health Services Management and a PGCE, he has advised on commissioning, primary care transformation, and national health infrastructure projects. As a former educator and Head Examiner, Richard reinforces the Trust's commitment to knowledge, systems integrity, and enduring public benefit.",
    quote: "Our work is built on evidence, service, and the discipline of public duty."
  },
  {
    name: "John O'Sullivan",
    role: "Trustee - Finance & Strategic Investment",
    bio: "John O'Sullivan is a seasoned care-sector executive and finance director, having served as CEO across multiple large care groups. His expertise spans financial forecasting, investment oversight, and operational management within regulated healthcare environments. At the Trust, John leads on financial governance, audit strategy, and fiduciary stewardship.",
    quote: "Every contribution is held with care, precision, and purpose. We are not just managing funds—we are safeguarding legacies."
  },
];

export const TrusteeBiographiesGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
      {trustees.map((trustee, index) => (
        <Card key={index} className="card-professional">
          <CardContent className="p-6">
            <h3 className="text-xl font-serif font-bold text-primary mb-2">
              {trustee.name}
            </h3>
            <p className="text-sm font-medium text-gold mb-4">
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
      ))}
    </div>
  );
};