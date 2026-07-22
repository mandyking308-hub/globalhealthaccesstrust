import { Card, CardContent } from "@/components/ui/card";

interface PersonProfile {
  name: string;
  role: string;
  summary: string;
}

const trustees: PersonProfile[] = [
  {
    name: "Mandy King",
    role: "Chair of Trustees",
    summary:
      "Mandy King chairs the Board and leads strategic governance, trustee coordination and the development of the Trust's operating framework. As Chair, she is accountable with the other Trustees for ensuring that decisions remain within the Trust Deed and serve the public benefit.",
  },
  {
    name: "Dr Jagdev Thukral",
    role: "Trustee",
    summary:
      "Dr Jagdev Thukral is a medical doctor and psychiatrist with NHS experience. He contributes clinical perspective, safeguarding awareness and healthcare-sector knowledge to trustee decisions.",
  },
  {
    name: "John O'Sullivan BA FCA",
    role: "Trustee",
    summary:
      "John O'Sullivan is a chartered accountant. He contributes financial, governance and stewardship expertise to trustee oversight, including the development of appropriate banking and financial controls.",
  },
];

const advisers: PersonProfile[] = [
  {
    name: "Rachael Duff",
    role: "Specialist adviser",
    summary: "Provides specialist input on compliance and operational governance when requested by the Trustees.",
  },
  {
    name: "Dr Joy Wong",
    role: "Specialist adviser",
    summary: "Provides specialist input on psychological health and youth mental health when requested by the Trustees.",
  },
  {
    name: "Richard Banyard",
    role: "Specialist adviser",
    summary: "Provides specialist input on health systems and commissioning when requested by the Trustees.",
  },
];

const ProfileCard = ({ person }: { person: PersonProfile }) => (
  <Card className="card-professional">
    <CardContent className="p-6">
      <h3 className="text-xl font-serif font-bold text-primary mb-2">{person.name}</h3>
      <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-primary mb-4">
        {person.role}
      </p>
      <p className="text-sm leading-relaxed text-muted-foreground">{person.summary}</p>
    </CardContent>
  </Card>
);

export const TrusteeBiographiesGrid = () => (
  <div className="space-y-12 mt-8">
    <section>
      <h2 className="text-2xl md:text-3xl font-serif font-bold mb-3">Current Trustees</h2>
      <p className="text-muted-foreground mb-6 max-w-3xl">
        These three people constitute the current Board of Trustees and are the constitutional signatories identified in the Trust's records.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {trustees.map((person) => <ProfileCard key={person.name} person={person} />)}
      </div>
    </section>

    <section>
      <h2 className="text-2xl md:text-3xl font-serif font-bold mb-3">Specialist advisers</h2>
      <p className="text-muted-foreground mb-6 max-w-3xl">
        Advisers may provide specialist input but are not Trustees, do not control Trust funds and cannot bind the Trust unless the Trustees give specific written authority.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {advisers.map((person) => <ProfileCard key={person.name} person={person} />)}
      </div>
    </section>
  </div>
);
