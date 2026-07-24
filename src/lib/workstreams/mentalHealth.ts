import mentalHealthImage from "@/assets/policy-research-hero.jpg";
import type { Workstream } from "./types";

const slug = "global-mental-health-neurodiversity-suicide-prevention";

export const mentalHealth: Workstream = {
  slug,
  number: "05",
  title: "Global Mental Health, Neurodiversity and Suicide Prevention",
  shortTitle: "Mental Health and Suicide Prevention",
  region: "International",
  status: "Developing",
  currentStage: "Research, scoping and partnership development",
  model: "Research, education, prevention and system improvement",
  role: "Convening, project development, research and public education",
  lastReviewed: "July 2026",
  tagline: "Recognise distress earlier. Build safer conversations. Strengthen the route to help.",
  summary:
    "Supporting humane, evidence-informed and professionally responsible approaches to mental health, male suicide prevention and neurodiversity.",
  image: mentalHealthImage,
  imageAlt:
    "A thoughtful research and public-health setting representing mental health, evidence and professional collaboration",
  stats: [
    {
      value: "1bn+",
      label: "people living with a mental-health condition",
      detail:
        "WHO reports that more than one billion people worldwide live with a mental-health condition, while most remain underserved.",
      sourceIds: ["who-mental-health-2025"],
    },
    {
      value: "727,000",
      label: "suicide deaths in one year",
      detail:
        "WHO estimates that 727,000 people died by suicide in 2021—approximately one death every 43 seconds.",
      sourceIds: ["who-suicide-2025"],
    },
    {
      value: "3rd",
      label: "leading cause of death for ages 15–29",
      detail:
        "Suicide was the third-leading cause of death globally among people aged 15–29 in WHO's latest comparable estimates.",
      sourceIds: ["who-suicide-2025"],
    },
    {
      value: "73%",
      label: "of suicide deaths in lower-resource settings",
      detail:
        "Almost three-quarters of global suicide deaths occurred in low- and middle-income countries.",
      sourceIds: ["who-suicide-2025"],
    },
  ],
  context: [
    {
      title: "Mental-health need is widespread and support remains unequal",
      paragraphs: [
        "People may struggle for long periods before receiving suitable support. Services can be difficult to reach, fragmented between organisations or focused on crisis after opportunities for earlier help have been missed.",
      ],
      bullets: [
        "long waits and limited community support",
        "stigma and fear of disclosure",
        "under-recognised distress and suicide risk",
        "pressure on families, schools and employers",
        "inconsistent assessment and follow-up",
        "limited culturally appropriate support",
        "diagnosis without adequate practical or psychosocial support",
        "workplaces and communities uncertain how to respond",
      ],
    },
    {
      title: "Men require specific, careful attention",
      paragraphs: [
        "Many men experience barriers to recognising distress, talking about emotion or asking for help. Expectations around strength, work, family responsibility and self-reliance may delay support until problems become severe.",
        "A male-suicide initiative should not rely upon slogans. It must help men, families, friends, workplaces and community organisations recognise warning signs, begin safer conversations and understand where appropriate help can be found.",
      ],
    },
    {
      title: "Neurodiversity needs recognition and responsible pathways",
      paragraphs: [
        "People with ADHD, autism and other forms of neurodiversity deserve appropriate understanding, assessment and support. They can be harmed when genuine needs are dismissed and also when complex experiences are reduced too quickly to a label or medication pathway without adequate context, follow-up or informed choice.",
        "The workstream does not deny diagnosis or the value of medication for appropriate individuals. It seeks fuller assessment, professional responsibility, better information and support that extends beyond diagnosis.",
      ],
    },
  ],
  whyGhat: [
    "Mental health affects healthcare access, education, family life, employment, poverty, conflict recovery and community resilience across every GHAT workstream.",
    "This programme builds upon extensive professional and lived experience relating to mental health, psychiatry, neurodiversity, education, families and international community engagement.",
    "GHAT is not a clinical, diagnostic, prescribing or treatment provider. Its role is to develop public-benefit projects involving prevention, education, convening, research, community capability and stronger routes into appropriate services.",
  ],
  purpose:
    "To strengthen the ability of individuals, families, workplaces and communities to recognise distress earlier, have safer conversations, find appropriate support and respond before a crisis becomes irreversible.",
  objectives: [
    "Increase mental-health and suicide-prevention literacy.",
    "Help men develop language for distress, emotion and help-seeking.",
    "Strengthen families, workplaces, schools, community and faith organisations as safe points of recognition and support.",
    "Develop clear, locally relevant signposting and referral pathways.",
    "Support responsible understanding of ADHD, autism and other forms of neurodiversity.",
    "Encourage assessment, prescribing and follow-up that are evidence-informed and professionally accountable.",
    "Bring professional expertise and lived experience together safely.",
    "Measure changes in knowledge, confidence, help-seeking and system capability without making unsupported claims about lives saved.",
  ],
  currentWork: [
    "Supporting and planning public and professional discussion around male suicide and mental-health awareness.",
    "Considering how communities, families and workplaces can recognise distress and respond earlier.",
    "Reviewing concerns around inconsistent assessment, diagnosis, prescribing and support pathways for ADHD, autism and wider neurodiversity.",
    "Developing relationships with suitable professionals, researchers, organisations and communities.",
    "Considering an initial mix of public events, professional roundtables, education, research and defined system-improvement projects.",
  ],
  deliveryAreas: [
    {
      title: "Male mental-health and suicide-prevention literacy",
      bullets: [
        "recognising changes in behaviour, mood, sleep, substance use, relationships and work",
        "developing emotional vocabulary without judgement",
        "starting a direct but safe conversation about distress and suicide",
        "understanding immediate-risk and emergency routes",
        "supporting friends and family without becoming an unqualified therapist",
        "following up after the first conversation or referral",
      ],
    },
    {
      title: "Community, workplace and faith-based capability",
      paragraphs: [
        "People often disclose first to someone they know rather than to a formal service. Appropriate training can help managers, colleagues, teachers, community leaders and faith communities recognise concerns, respond within clear boundaries and signpost safely.",
      ],
    },
    {
      title: "Families and carers",
      bullets: [
        "understanding distress and neurodiversity",
        "communication and conflict reduction",
        "support during assessment, diagnosis or crisis",
        "navigation of services and educational pathways",
        "carer wellbeing and boundaries",
      ],
    },
    {
      title: "Responsible neurodiversity pathways",
      bullets: [
        "clear information before and after assessment",
        "recognition of co-occurring physical, mental-health, educational and social needs",
        "informed discussion of benefits, limitations and alternatives",
        "appropriate professional oversight of diagnosis and prescribing",
        "support at school, university, work and home",
        "follow-up that extends beyond the issue of medication",
      ],
    },
    {
      title: "Research and professional discussion",
      paragraphs: [
        "Projects may bring together clinicians, researchers, educators, employers, families and people with lived experience to examine a defined problem and produce practical recommendations or educational resources.",
      ],
    },
    {
      title: "Public education without sensationalism",
      paragraphs: [
        "Communications should be direct enough to address suicide and distress honestly but must not romanticise, simplify or present individual stories in ways that increase risk. Lived-experience contributors should not be expected to disclose publicly or repeatedly retell traumatic events.",
      ],
    },
  ],
  plan: [
    {
      stage: "Listening",
      title: "Identify the priority concern",
      description:
        "Gather experience from individuals, families, professionals, schools, employers and communities while recognising that personal testimony is valuable but not complete scientific evidence.",
      current: true,
    },
    {
      stage: "Scoping",
      title: "Review evidence and existing pathways",
      description:
        "Examine research, professional guidance, services, prescribing standards, community models, legal duties, safeguarding and the specific gap a project should address.",
      current: true,
    },
    {
      stage: "Team Building",
      title: "Establish the appropriate advisory and delivery group",
      description:
        "Engage suitable clinicians, public-health professionals, researchers, educators, employers, community organisations, families and people with lived experience.",
      current: true,
    },
    {
      stage: "Funding",
      title: "Resource a defined activity",
      description:
        "Secure appropriate professional time, venues, research capability, communications, evaluation and funding for an approved event, programme or project.",
    },
    {
      stage: "Delivery",
      title: "Deliver within clear professional boundaries",
      description:
        "Undertake the approved activity with crisis signposting, safeguarding, confidentiality, consent and role boundaries built into delivery.",
    },
    {
      stage: "Follow-Up",
      title: "Evaluate understanding, help-seeking and system capability",
      description:
        "Assess participation, learning, confidence, referral, follow-up, safety and practical organisational change.",
    },
    {
      stage: "Complete",
      title: "Publish learning and define further action",
      description:
        "Close the phase after evidence, expenditure, risks and feedback have been reviewed and determine whether to repeat, research further or develop a system-improvement project.",
    },
  ],
  outputs: [
    "evidence-informed public and professional educational material",
    "male mental-health and suicide-prevention events or programmes",
    "community, workplace or faith-based responder training",
    "local service directories and escalation pathways",
    "professional roundtables and practical recommendations",
    "responsible neurodiversity guidance for families, schools and employers",
    "research questions, reviews or commissioned studies",
    "safeguarding, crisis and communications standards",
    "participation, learning and follow-up evidence",
  ],
  measures: [
    {
      title: "Reach and participation",
      items: [
        "men, families and community members reached",
        "professionals and community responders trained",
        "workplaces, schools and organisations participating",
        "retention and follow-up engagement",
      ],
    },
    {
      title: "Knowledge and confidence",
      items: [
        "change in understanding before and after activity",
        "ability to recognise warning signs",
        "confidence beginning a safe conversation",
        "knowledge of crisis, referral and ongoing-support routes",
      ],
    },
    {
      title: "Help-seeking and referral",
      items: [
        "stated willingness to seek or recommend help",
        "people signposted or referred where lawfully measurable",
        "referral uptake and follow-up where consent and systems allow",
        "local pathways and service information improved",
      ],
    },
    {
      title: "System capability and safety",
      items: [
        "organisations adopting procedures or training",
        "professionals and lived-experience contributors supported safely",
        "safeguarding and crisis incidents managed appropriately",
        "recommendations or follow-on projects developed",
      ],
    },
  ],
  priorities: [
    "suicide-prevention and public-health expertise",
    "mental-health and neurodiversity professionals",
    "people with lived and family experience",
    "workplaces, schools, universities and community organisations",
    "faith-based and culturally relevant relationships",
    "research, ethics, evaluation and responsible communications",
    "event facilities and programme delivery capability",
    "funding for defined prevention, education or research activity",
  ],
  participation: [
    {
      title: "Pledge support for a defined programme",
      description:
        "Offer funding, venues, research, communications, educational resources or professional time for an approved activity.",
      items: [
        "event or programme funding",
        "venues and delivery support",
        "research and evaluation",
        "responsible communications",
        "professional and community capability",
      ],
      action: "Pledge support",
      href: `/donate?workstream=${slug}#pledge-form`,
    },
    {
      title: "Contribute professional or lived experience",
      description:
        "Suitable professionals, researchers, educators, community leaders and people with relevant lived experience may register an interest in an appropriately supported role.",
      items: [
        "mental health and public health",
        "suicide prevention and crisis pathways",
        "neurodiversity, education and employment",
        "research, ethics and evaluation",
        "community and culturally relevant engagement",
      ],
      action: "Apply to contribute",
      href: `/volunteer-apply?workstream=${slug}`,
    },
    {
      title: "Discuss a project or partnership",
      description:
        "Institutions, communities and potential funders may ask about current planning, proposed events, research priorities or system-improvement work.",
      items: [
        "male mental-health initiatives",
        "community or workplace programmes",
        "professional roundtables and research",
        "neurodiversity education and support",
        "funding a defined project phase",
      ],
      action: "Ask about this project",
      href: `/contact?workstream=${slug}`,
    },
  ],
  safeguards: [
    "GHAT does not diagnose, prescribe or provide individual treatment",
    "clear crisis and emergency signposting",
    "clinical and professional role boundaries",
    "safeguarding, confidentiality and informed consent",
    "safe participation by people with lived experience",
    "responsible discussion of medication and treatment",
    "verification of professional competence and registration where relevant",
    "research ethics and data protection",
    "responsible suicide and mental-health communications",
    "no claim that an event prevented a specific number of deaths without rigorous evidence",
  ],
  evidence: [
    "completed research and scoping records",
    "advisory and delivery group membership",
    "approved programme, event or research plans",
    "anonymised participation and learning outcomes",
    "training, referral and follow-up information where lawful",
    "published educational resources or recommendations",
    "safeguarding, crisis and communications review",
    "evidence of organisational or pathway improvement",
  ],
  relatedExperience: [
    "The workstream builds upon extensive experience in mental health, psychiatry, neurodiversity, education, family support and international community engagement.",
    "Professional or clinical experience connected with trustees will be distinguished clearly from activity formally delivered by the Trust, and earlier voluntary activity will be placed within the historical record.",
  ],
  globalSignificance: [
    "Every suicide affects families, friends, workplaces and communities. Earlier recognition, safer conversation and clearer routes to support are public-health responsibilities, not matters that should be left solely to specialist services after a crisis has developed.",
    "The workstream also addresses a wider system challenge: ensuring that neurodiversity is neither ignored nor reduced to a label without suitable support, context, informed choice and follow-up.",
  ],
  sources: [
    {
      id: "who-mental-health-2025",
      organisation: "World Health Organization",
      title: "World mental health today: latest data",
      url: "https://www.who.int/publications/i/item/9789240113817",
    },
    {
      id: "who-suicide-2025",
      organisation: "World Health Organization",
      title: "Suicide worldwide in 2021: global health estimates",
      url: "https://www.who.int/publications/i/item/9789240110069",
    },
    {
      id: "who-mental-health-fact-sheet",
      organisation: "World Health Organization",
      title: "Mental health: strengthening our response",
      url: "https://www.who.int/news-room/fact-sheets/detail/mental-health-strengthening-our-response",
    },
  ],
};
