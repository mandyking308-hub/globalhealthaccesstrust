import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ContentLayout } from "@/components/layout/ContentLayout";
import { SEO } from "@/components/SEO";

const projectAreas = [
  {
    title: "Healthcare Access and Health Systems",
    description:
      "Projects that strengthen access, workforce capability, facilities, equipment, referral pathways, public-health systems or the infrastructure required for better healthcare.",
  },
  {
    title: "Land, Buildings and Essential Infrastructure",
    description:
      "The development, improvement or use of land, buildings and essential infrastructure where this directly supports health, safety, education, humanitarian relief or community resilience.",
  },
  {
    title: "Housing and Safe Living Conditions",
    description:
      "Projects addressing unsafe, unstable or unsuitable living conditions where housing is materially connected to health, vulnerability, protection or recovery.",
  },
  {
    title: "Food Systems, Agriculture and Nutrition",
    description:
      "Work that strengthens food security, agricultural systems, storage, supply chains, nutrition, farmer capability or access to essential food resources.",
  },
  {
    title: "Water, Sanitation and Essential Utilities",
    description:
      "Projects supporting safe water, sanitation, hygiene, energy or other essential utilities required for health and dignified living.",
  },
  {
    title: "Education, Skills and Professional Capability",
    description:
      "Education, training, bursaries, professional development and practical capability-building where these improve health access, resilience or public benefit.",
  },
  {
    title: "Employment, Livelihoods and Enterprise",
    description:
      "Projects that create sustainable livelihoods, employment pathways or enterprise capability where these relieve vulnerability and directly support health, dignity or community resilience. Ordinary commercial business development does not fall within the Trust's charitable project model.",
  },
  {
    title: "Responsible AI, Technology and Data",
    description:
      "Technology and artificial intelligence used to improve research, coordination, evidence, communication, logistics, access and accountable delivery while keeping human judgment and responsibility central.",
  },
  {
    title: "Logistics and Supply Systems",
    description:
      "Projects improving the movement, storage and availability of food, equipment, medicines, essential supplies or humanitarian resources.",
  },
  {
    title: "Humanitarian and Emergency Response",
    description:
      "Time-sensitive support in conflict, displacement, disaster, public-health emergency or serious system failure, delivered through appropriate partners and accountable structures.",
  },
  {
    title: "Community Protection and Vulnerability",
    description:
      "Work supporting vulnerable children, women, displaced people, marginalised communities and others facing exclusion, exploitation, violence or serious barriers to safety and wellbeing.",
  },
  {
    title: "Research, Policy and Systems Reform",
    description:
      "Research, legal inquiry, system analysis and practical policy work intended to improve access, accountability, resilience and public-benefit outcomes.",
  },
];

const projectSteps = [
  {
    number: "01",
    title: "Submit the Initial Proposition",
    description:
      "Create or access a secure donor account and provide enough information for the Trust to understand the need, setting, intended outcome and likely resources required.",
  },
  {
    number: "02",
    title: "Scoping and Feasibility",
    description:
      "The Trust reviews the proposition, considers how it relates to its charitable purposes and may request further information from the supporter, local contributors or potential delivery organisations.",
  },
  {
    number: "03",
    title: "Project Design and Approval",
    description:
      "Where the proposition can progress, the Trust develops the scope, delivery structure, budget, milestones, evidence requirements and appropriate safeguards. Final approval remains with the Trustees.",
  },
  {
    number: "04",
    title: "Agreement and Funding",
    description:
      "The project agreement records the approved purpose, responsibilities, funding arrangements, reporting expectations and any restrictions applying to the contribution.",
  },
  {
    number: "05",
    title: "Team and Delivery Structure",
    description:
      "The Trust identifies the people, organisations, technology, suppliers and practical capability required. Delivery may involve local organisations, professional contributors, institutions, contractors and community partners.",
  },
  {
    number: "06",
    title: "Progress and Evidence",
    description:
      "Approved information may be made available through the secure donor dashboard, including milestones, messages, expenditure records and appropriate evidence, subject to confidentiality, safeguarding and safety.",
  },
  {
    number: "07",
    title: "Completion and Learning",
    description:
      "The project is reviewed against its agreed purpose, milestones and evidence requirements. Completion records, lessons learned and approved public material may be retained or published where appropriate.",
  },
];

export const CommissionProjectsPage = () => {
  return (
    <ContentLayout>
      <SEO
        title="Commission a Public-Benefit Project"
        description="Propose and help shape a structured charitable project addressing the systems and conditions on which health, safety, dignity and human capability depend."
        canonical="/commission-projects"
      />

      <h1>Commission a Public-Benefit Project</h1>

      <p className="featured-text">Turn a defined need into a structured charitable project.</p>

      <p>
        The Global Health Access Trust enables supporters to propose and help shape projects
        addressing the systems and conditions on which health, safety, dignity and human
        capability depend.
      </p>
      <p>
        Projects may involve infrastructure, food systems, education, technology, responsible
        AI, livelihoods, logistics, humanitarian support, research or healthcare access, where
        the work directly advances the Trust's charitable purposes.
      </p>

      <div className="flex flex-wrap gap-3 my-8">
        <Button asChild><Link to="/donor-login">Commission a Project</Link></Button>
        <Button asChild variant="outline"><Link to="/donor-login">Donor Login</Link></Button>
        <Button asChild variant="outline"><Link to="/contact">Discuss a Proposition First</Link></Button>
      </div>

      <div className="section-container">
        <h2>A Broader Approach to Public Benefit</h2>
        <p>Better healthcare does not depend on healthcare services alone.</p>
        <p>
          People's health and ability to thrive are shaped by whether they have safe places to
          live, nutritious food, clean water, education, functioning infrastructure, economic
          opportunity, reliable supply systems and access to appropriate technology and
          professional support.
        </p>
        <p>
          The Trust therefore develops integrated projects that address the causes and systems
          surrounding poor health, exclusion and vulnerability—not only the visible outcome.
        </p>
      </div>

      <h2 className="mt-12">Areas a Project May Address</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
        {projectAreas.map((area) => (
          <div key={area.title} className="section-container">
            <h3>{area.title}</h3>
            <p>{area.description}</p>
          </div>
        ))}
      </div>

      <div className="section-container">
        <h2>What a Supporter Can Propose</h2>
        <p>A supporter may identify:</p>
        <ul>
          <li>The country, region or community</li>
          <li>The need or system challenge</li>
          <li>The intended charitable outcome</li>
          <li>The type of project or combination of workstreams</li>
          <li>The proposed budget or funding range</li>
          <li>The desired timing</li>
          <li>Relevant organisations, expertise or relationships</li>
          <li>A dedication, recognition or anonymity preference</li>
        </ul>
        <p>
          The supporter may help shape the proposition and remain closely informed, while
          project approval, charitable control and the proper use of funds remain with the
          Trustees.
        </p>
      </div>

      <h2 className="mt-12">How Commissioned Projects Work</h2>
      <div className="space-y-6 my-8">
        {projectSteps.map((step) => (
          <div key={step.number} className="section-container grid grid-cols-1 md:grid-cols-[80px_1fr] gap-5">
            <span className="text-sm font-semibold tracking-[0.18em] text-primary">{step.number}</span>
            <div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="section-container">
        <h2>Integrated Projects</h2>
        <p>Some of the strongest projects will involve more than one area.</p>
        <p>
          A food-system project may require technology, logistics, farmer education and access
          to finance. A housing project may include land, sanitation, skills and employment. A
          humanitarian project may require food, protection, infrastructure, communications and
          regulated healthcare partners.
        </p>
        <p>
          The Trust may therefore design a single integrated project rather than divide one
          real-world problem into artificial categories.
        </p>
      </div>

      <div className="section-container">
        <h2>Governance and Independence</h2>
        <p>
          Commissioning a project does not transfer ownership of charitable work or give the
          supporter control over Trustee decisions.
        </p>
        <p>Every project remains subject to:</p>
        <ul>
          <li>The Trust's charitable purposes</li>
          <li>Feasibility and public-benefit assessment</li>
          <li>Due diligence and financial controls</li>
          <li>Safeguarding and data protection</li>
          <li>Legal and jurisdictional requirements</li>
          <li>Appropriate delivery capability</li>
          <li>Trustee approval and oversight</li>
        </ul>
        <p>
          The Trust may decline, reshape, postpone or discontinue a proposition where the
          required conditions cannot be met.
        </p>
      </div>

      <div className="section-container">
        <h2>Recognition and Privacy</h2>
        <p>Supporters may discuss how their contribution should be recognised.</p>
        <p>
          Options may include public or private recognition, anonymity, a personal dedication,
          recognition of an organisation or family, or no recognition.
        </p>
        <p>
          Recognition does not confer ownership, special access to beneficiaries or influence
          over charitable decisions.
        </p>
      </div>

      <div className="section-container">
        <h2>What Happens After Submission</h2>
        <p>Submission creates an initial project proposition for review.</p>
        <p>
          It does not constitute project approval, acceptance of funds or a commitment to
          deliver.
        </p>
        <p>
          The next step will depend on the proposition's purpose, location, scale, complexity,
          urgency and the capability required to progress it.
        </p>
      </div>

      <div className="section-container">
        <p className="featured-text">
          A commissioned project begins with a defined purpose and becomes real through
          disciplined governance, appropriate capability and accountable delivery.
        </p>
        <p>
          The Trust's role is to turn good intent into work that is properly structured,
          responsibly delivered and capable of creating lasting public benefit.
        </p>
        <div className="flex flex-wrap gap-3 mt-5">
          <Button asChild><Link to="/donor-login">Commission a Public-Benefit Project</Link></Button>
          <Button asChild variant="outline"><Link to="/how-we-work">Read How We Work</Link></Button>
          <Button asChild variant="outline"><Link to="/contact-the-trust">Contact the Trust</Link></Button>
        </div>
      </div>
    </ContentLayout>
  );
};