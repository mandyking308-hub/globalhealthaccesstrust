import childrenImage from "@/assets/family-medical-care.jpg";
import type { Workstream } from "./types";

const slug = "asia-children-without-family-care";

export const asiaChildren: Workstream = {
  slug,
  number: "02",
  title: "Asia: Children Without Family Care and Vulnerable Children",
  shortTitle: "Children Without Family Care",
  region: "Asia",
  status: "Developing",
  currentStage: "Relationship development, safeguarding review and structured scoping",
  model: "Long-term, relationship-led and safeguarding-centred",
  role: "Project development, coordination and public-benefit planning",
  lastReviewed: "July 2026",
  tagline: "Safety, education and a dependable path into adult life.",
  summary:
    "Building upon longstanding voluntary support for children without stable family care, with a focus on safety, education, essential needs, trusted relationships and long-term opportunity.",
  image: childrenImage,
  imageAlt:
    "A family and child receiving compassionate support in a calm community-health setting",
  stats: [
    {
      value: "2m",
      label: "children in residential care",
      detail:
        "UNICEF estimated that approximately two million children were living in residential care worldwide in 2025.",
      sourceIds: ["unicef-alternative-care"],
    },
    {
      value: "48.8m",
      label: "children displaced by conflict and violence",
      detail:
        "By the end of 2024, close to 50 million children had been displaced globally by conflict and violence.",
      sourceIds: ["unicef-child-displacement"],
    },
    {
      value: "47%",
      label: "of displaced or stateless people in Asia-Pacific were children",
      detail:
        "Children represented almost half of the forcibly displaced or stateless population recorded by UNHCR in Asia and the Pacific at the end of 2024.",
      sourceIds: ["unhcr-asia-trends"],
    },
    {
      value: "210m",
      label: "children highly exposed to cyclones",
      detail:
        "UNICEF reports that children across East Asia and the Pacific face extensive exposure to cyclones, water scarcity, coastal flooding and air pollution.",
      sourceIds: ["unicef-climate-asia"],
    },
  ],
  context: [
    {
      title: "Children may be separated from family for many reasons",
      paragraphs: [
        "A child living without parental care is not necessarily an orphan. Poverty, disability, conflict, migration, disaster, family illness and the absence of local support services can all contribute to separation.",
        "Institutional care may appear to meet an immediate need, but large or impersonal settings can affect attachment, development, education, safety and preparation for adulthood. Where safe family or kinship care is possible, support should seek to preserve or restore it.",
      ],
    },
    {
      title: "Conflict and environmental shocks compound vulnerability",
      paragraphs: [
        "Asia includes communities affected by prolonged conflict, displacement, earthquakes, flooding, cyclones, drought, extreme heat and economic disruption. These pressures can interrupt education, destroy homes and livelihoods, separate families and overwhelm local organisations.",
      ],
      bullets: [
        "loss of safe or consistent care",
        "interrupted schooling and missing records",
        "food, clothing, water and healthcare needs",
        "heightened trafficking, exploitation and child-labour risks",
        "disability and health needs left unsupported",
        "psychological distress and loss",
        "young people leaving care without skills, housing or employment pathways",
      ],
    },
    {
      title: "Support must be sustained and carefully structured",
      paragraphs: [
        "A one-off gift may help in the moment but cannot by itself provide continuity, safety or a route into adult life. Poorly structured assistance can create dependency, disrupt existing relationships or expose children to publicity and contact that is not in their interests.",
      ],
    },
  ],
  whyGhat: [
    "This workstream builds upon longstanding voluntary, self-funded and relationship-led support for children and young people in Asia.",
    "GHAT is developing a structure that can connect education, safe living conditions, essential support, mentoring, healthcare access and preparation for adulthood without placing fundraising or organisational visibility ahead of children's dignity.",
    "The Trust will work through suitable local relationships and organisations. It will not assume that an external organisation understands a child's circumstances better than responsible people close to them.",
  ],
  purpose:
    "To strengthen safety, continuity, education and long-term opportunity for children without stable family care and other vulnerable young people.",
  objectives: [
    "Help prevent unnecessary family separation where safe support can preserve family or kinship care.",
    "Improve access to consistent, appropriate and safeguarding-centred care.",
    "Maintain education during displacement, poverty or changes in care.",
    "Meet defined essential needs without creating unmanaged dependency.",
    "Strengthen trusted relationships, mentoring and psychosocial support.",
    "Support local organisations to improve safeguarding, records and continuity.",
    "Prepare older children and care leavers for further education, skills, employment and independent living.",
    "Create evidence of outcomes while protecting identity and privacy.",
  ],
  currentWork: [
    "Reviewing longstanding voluntary and relationship-led experience to identify which needs can be translated into properly governed public-benefit projects.",
    "Considering education, essential support, safe living conditions, mentoring and preparation for adulthood as connected rather than separate interventions.",
    "Developing safeguarding, consent, privacy and contributor boundaries before wider participation is invited.",
    "Exploring how trusted local organisations can be strengthened rather than displaced by external support.",
    "Preparing an evidence framework that can demonstrate continuity and outcomes without exposing children or families publicly.",
  ],
  deliveryAreas: [
    {
      title: "Family preservation and appropriate care",
      paragraphs: [
        "Poverty or lack of services should not by itself cause a child to lose family care. Where safe and appropriate, projects may support family, extended-family or kinship arrangements before considering residential alternatives.",
      ],
      bullets: [
        "household and care assessment through appropriate local professionals",
        "support that helps families maintain safe care",
        "family tracing or reunification through qualified organisations",
        "care plans and continuity where alternative care is necessary",
        "review of disability and specialist support needs",
      ],
    },
    {
      title: "Education and learning continuity",
      bullets: [
        "school enrolment and attendance",
        "books, uniforms and learning materials",
        "devices and connectivity where appropriate",
        "temporary or community-based learning during displacement",
        "language and catch-up support",
        "retention through changes in care or location",
      ],
    },
    {
      title: "Essential needs and safe living conditions",
      bullets: [
        "food, clothing, hygiene and household essentials",
        "safe water and sanitation",
        "appropriate accommodation and heating or cooling",
        "healthcare access through qualified local providers",
        "transport required for education or services",
      ],
    },
    {
      title: "Safeguarding, identity and trusted relationships",
      paragraphs: [
        "Children need consistent adults and safe systems, not an uncontrolled flow of visitors or donors. Any direct or online contact must be purposeful, supervised and subject to appropriate checks.",
      ],
      bullets: [
        "individual safeguarding and risk plans",
        "clear reporting and escalation routes",
        "identity, consent and privacy protections",
        "careful control of photography and personal stories",
        "safe mentoring and relationship continuity",
      ],
    },
    {
      title: "Preparation for adulthood",
      bullets: [
        "career and further-education planning",
        "language, digital and financial capability",
        "employment and vocational skills",
        "mentoring and professional networks",
        "housing and independent-living preparation",
        "follow-up after leaving care",
      ],
    },
    {
      title: "Resilience to conflict and environmental shocks",
      paragraphs: [
        "Projects may help child-serving organisations and families prepare for displacement, disrupted services or extreme weather through portable records, continuity plans, emergency communication and links to education, health and protection services.",
      ],
    },
  ],
  plan: [
    {
      stage: "Listening",
      title: "Understand children's actual circumstances",
      description:
        "Work through trusted local relationships to understand care, family links, education, safety, health, identity, existing support and the views of the child where appropriate.",
      current: true,
    },
    {
      stage: "Scoping",
      title: "Complete safeguarding and suitability review",
      description:
        "Define the intended benefit, beneficiaries, responsibilities, duration, consent, privacy, budget, risks and conditions under which support should continue or end.",
      current: true,
    },
    {
      stage: "Team Building",
      title: "Build a responsible support network",
      description:
        "Engage suitable local organisations, educators, safeguarding professionals, mentors, healthcare providers and practical supporters.",
    },
    {
      stage: "Funding",
      title: "Secure resources for defined needs",
      description:
        "Match approved education, living, organisational or transition needs with suitable funding, materials, technology or professional capability.",
    },
    {
      stage: "Delivery",
      title: "Provide sustained, accountable support",
      description:
        "Deliver the agreed phase through clear care, safeguarding, financial and reporting arrangements.",
    },
    {
      stage: "Follow-Up",
      title: "Review continuity and outcomes",
      description:
        "Assess safety, school participation, care stability, wellbeing, capability, unintended effects and whether support remains appropriate.",
    },
    {
      stage: "Complete",
      title: "Conclude or transition responsibly",
      description:
        "Close or transition a phase only after records, expenditure, safeguarding, continuity and the next responsible arrangement have been reviewed.",
    },
  ],
  outputs: [
    "safeguarding-centred project and care-support plans",
    "verified education and school-continuity arrangements",
    "delivery of approved essential items and practical support",
    "safe family, kinship or appropriate alternative-care support",
    "individual mentoring or transition plans where appropriate",
    "portable education, identity or service records where lawful",
    "training and organisational-strengthening for local partners",
    "preparation for further education, employment and independent living",
    "anonymised evidence, financial records and learning reports",
  ],
  measures: [
    {
      title: "Safety and care",
      items: [
        "children and households safely assessed",
        "care and safeguarding plans completed",
        "safe family or appropriate alternative-care arrangements maintained",
        "safeguarding concerns identified, escalated and addressed",
      ],
    },
    {
      title: "Education",
      items: [
        "school enrolment, attendance and continuation",
        "learning materials or technology received and used",
        "education maintained through displacement or changes in care",
        "progress into further education or training",
      ],
    },
    {
      title: "Stability and wellbeing",
      items: [
        "agreed essential needs met",
        "access to healthcare or psychosocial support",
        "trusted mentoring or adult support maintained",
        "children remaining engaged at 6, 12 and 24 months where appropriate",
      ],
    },
    {
      title: "Transition to adulthood",
      items: [
        "education, skills and employment plans completed",
        "vocational or employment pathways entered",
        "independent-living capability developed",
        "follow-up after leaving care",
      ],
    },
    {
      title: "Local capability",
      items: [
        "local staff or carers trained",
        "records, safeguarding and continuity systems strengthened",
        "family separation prevented where safely measurable",
        "services remaining active after the project phase",
      ],
    },
  ],
  priorities: [
    "trusted child-serving and community organisations",
    "safeguarding and child-protection expertise",
    "education and school-continuity support",
    "family strengthening and appropriate alternative care",
    "health, disability and psychosocial capability",
    "mentoring and preparation for adult life",
    "digital access, records and learning technology",
    "climate and disaster continuity planning",
    "monitoring, evaluation and appropriately restricted funding",
  ],
  participation: [
    {
      title: "Pledge support for a defined need",
      description:
        "Offer funding, educational resources, technology, facilities, professional capability or practical support for an approved project phase.",
      items: [
        "education and learning resources",
        "safe living and essential support",
        "technology and connectivity",
        "skills and transition programmes",
        "organisational capability and safeguarding",
      ],
      action: "Pledge support",
      href: `/donate?workstream=${slug}#pledge-form`,
    },
    {
      title: "Contribute appropriate expertise",
      description:
        "Educators, safeguarding specialists, child-development professionals, mentors, healthcare advisers and technologists may register an interest.",
      items: [
        "education and learning support",
        "safeguarding and child protection",
        "psychosocial and disability expertise",
        "mentoring, careers and employability",
        "local-language and community capability",
      ],
      action: "Apply to contribute",
      href: `/volunteer-apply?workstream=${slug}`,
    },
    {
      title: "Ask about a responsible partnership",
      description:
        "Potential supporters and local organisations may request further information through a secure project-specific enquiry.",
      items: [
        "local delivery relationships",
        "education and youth partnerships",
        "family and organisational support",
        "funding of a defined phase",
        "research and evidence collaboration",
      ],
      action: "Ask about this project",
      href: `/contact?workstream=${slug}`,
    },
  ],
  safeguards: [
    "children's safety, dignity and best interests before publicity or fundraising",
    "identity, suitability and background checks for relevant roles",
    "local child-protection law and appropriate professional oversight",
    "consent, confidentiality and data minimisation",
    "strict control of direct and online contact with children",
    "careful use of photographs, names and personal stories",
    "financial controls and prevention of dependency or private benefit",
    "complaints, safeguarding reporting and escalation routes",
    "no automatic access to beneficiaries because support has been offered",
    "clear separation of earlier personal service from formal GHAT activity",
  ],
  evidence: [
    "approved project and safeguarding plans",
    "verified education participation and continuity",
    "delivery records for approved resources",
    "anonymised care, mentoring and transition outcomes",
    "local organisational improvements",
    "financial reconciliation and partner reporting",
    "photographs or case material only where safe, lawful and properly consented",
    "follow-up information and lessons for the next phase",
  ],
  relatedExperience: [
    "This workstream builds upon longstanding voluntary, self-funded and relationship-led support for children and vulnerable young people in Asia.",
    "Earlier work will be presented in the historical archive according to the period, country and nature of the contribution. Work predating December 2024 will not be described as formal GHAT delivery.",
  ],
  globalSignificance: [
    "Children who lose care, education and safety during conflict, poverty or environmental disaster can carry the effects throughout adult life. Protecting continuity is both an immediate humanitarian responsibility and a long-term investment in health, stability and human capability.",
    "The workstream is designed to demonstrate that practical support, safeguarding, family preservation, education and transition planning must operate together rather than as isolated acts of charity.",
  ],
  sources: [
    {
      id: "unicef-alternative-care",
      organisation: "UNICEF Data",
      title: "Children in alternative care",
      url: "https://data.unicef.org/topic/child-protection/children-alternative-care/",
    },
    {
      id: "unicef-child-displacement",
      organisation: "UNICEF Data",
      title: "Child displacement and refugees",
      url: "https://data.unicef.org/topic/child-migration-and-displacement/displacement/",
    },
    {
      id: "unhcr-asia-trends",
      organisation: "UNHCR Asia and the Pacific",
      title: "Asia-Pacific Regional Trends Report 2024",
      url: "https://www.unhcr.org/asia/news/announcements/asia-pacific-regional-trends-report-2024",
    },
    {
      id: "unicef-climate-asia",
      organisation: "UNICEF",
      title: "Children in East Asia and the Pacific face exposure to multiple climate disasters",
      url: "https://www.unicef.org/press-releases/children-east-asia-and-pacific-face-greatest-exposure-multiple-climate-disasters",
    },
  ],
};
