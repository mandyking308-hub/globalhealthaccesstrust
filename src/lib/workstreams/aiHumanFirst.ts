import aiImage from "@/assets/education-training-hero.jpg";
import type { Workstream } from "./types";

const slug = "ai-first-human-first-youth-enterprise-employment";

export const aiHumanFirst: Workstream = {
  slug,
  number: "04",
  title: "AI First, Human First: Young People, Enterprise and Employment",
  shortTitle: "AI First, Human First",
  region: "International",
  status: "Developing",
  currentStage: "Programme design, responsible-AI framework and team building",
  model: "Educational, repeatable and adaptable",
  role: "Programme design, partnership development and responsible-AI governance",
  lastReviewed: "July 2026",
  tagline: "Prepare young people for an AI-enabled world without surrendering human judgement.",
  summary:
    "Helping young people use artificial intelligence to strengthen learning, creativity, enterprise and employment while protecting privacy, critical thinking, responsibility and human relationships.",
  image: aiImage,
  imageAlt:
    "Young people learning together in a practical education and technology setting",
  stats: [
    {
      value: "~40%",
      label: "of global employment exposed to AI",
      detail:
        "IMF analysis estimates that almost 40% of jobs worldwide are exposed to AI, through a mixture of task automation, job transformation and productivity gains.",
      sourceIds: ["imf-ai-work"],
    },
    {
      value: "64.9m",
      label: "young people unemployed",
      detail:
        "The ILO estimated that 64.9 million people aged 15–24 were unemployed globally in 2023.",
      sourceIds: ["ilo-youth-2024"],
    },
    {
      value: "20.4%",
      label: "of young people not in work, education or training",
      detail:
        "One in five young people globally were not in employment, education or training in 2023.",
      sourceIds: ["ilo-youth-2024"],
    },
    {
      value: "11",
      label: "countries in UNESCO's K–12 AI curriculum mapping",
      detail:
        "UNESCO's global mapping found only 11 countries with developed and endorsed K–12 AI curricula, with four more developing them at the time of the study.",
      sourceIds: ["unesco-ai-curricula"],
    },
  ],
  context: [
    {
      title: "AI is changing entry-level work as well as specialist work",
      paragraphs: [
        "Artificial intelligence can increase productivity and create new kinds of work. It can also reduce demand for some tasks, change recruitment and weaken traditional entry routes through which young people once learned within organisations.",
        "No credible single statistic can tell us exactly how many jobs have already been lost solely because of AI. Economic conditions, automation, restructuring and technological change overlap. The responsible question is how much work is exposed, what skills are changing and whether young people are being prepared.",
      ],
    },
    {
      title: "Access to a tool is not the same as capability",
      paragraphs: [
        "A young person may be able to open an AI service without understanding how to verify its output, protect personal data, recognise bias, preserve intellectual property or decide when a human must remain responsible.",
      ],
      bullets: [
        "unequal access to devices, connectivity and experienced guidance",
        "overconfidence in inaccurate or fabricated output",
        "loss of independent research and critical-thinking habits",
        "privacy and safeguarding risks",
        "pressure to automate before understanding the work",
        "limited routes from digital learning into employment or enterprise",
        "neurodivergent learners excluded by rigid teaching or inaccessible systems",
      ],
    },
    {
      title: "Education systems are adapting unevenly",
      paragraphs: [
        "Schools and governments are moving at different speeds. Some young people receive structured AI literacy and project-based learning; others encounter the technology primarily through commercial products with little guidance about ethics, safety or the changing labour market.",
      ],
    },
  ],
  whyGhat: [
    "Technology influences education, employment, mental health, inequality and access to services. Preparing young people for responsible use therefore sits within GHAT's wider public-benefit purpose.",
    "The workstream draws upon experience across education, technology, healthcare, enterprise, neurodiversity and international project development.",
    "It is deliberately separate from any private commercial technology or proprietary business infrastructure connected with trustees or related parties. Any proposed relationship involving a connected organisation must be declared, independently reviewed and managed under the Trust's conflicts framework.",
  ],
  purpose:
    "To help young people build the judgement, practical capability and human relationships required to learn, work and create responsibly in an AI-enabled economy.",
  objectives: [
    "Develop practical AI literacy rather than product-specific dependence.",
    "Strengthen critical thinking, research, verification and communication.",
    "Teach privacy, safety, bias, intellectual-property and responsible-use principles.",
    "Connect AI learning with genuine community, employment and enterprise problems.",
    "Create mentoring, work-experience and employer pathways.",
    "Include disadvantaged and neurodivergent learners through accessible programme design.",
    "Help teachers, youth workers and families understand appropriate boundaries.",
    "Develop an evidence-based model that can be repeated across settings.",
  ],
  currentWork: [
    "Designing a public-benefit programme around responsible AI literacy, practical problem-solving, enterprise and employability.",
    "Developing a human-first framework covering safety, privacy, educational integrity, bias, accountability and appropriate human oversight.",
    "Considering schools, youth organisations, mentors, employers and entrepreneurs as one connected pathway rather than separate audiences.",
    "Exploring project-based learning that enables young people to build useful solutions and demonstrate capability.",
    "Developing suitable routes for neurodivergent and otherwise underserved learners to participate.",
  ],
  deliveryAreas: [
    {
      title: "AI foundations and critical literacy",
      bullets: [
        "what AI is and how different systems produce output",
        "what AI can do, cannot do and may appear to do",
        "verification, sourcing and recognition of uncertainty",
        "bias, discrimination and misleading confidence",
        "privacy, security and personal information",
        "intellectual property and responsible use of other people's work",
      ],
    },
    {
      title: "Human capability alongside technology",
      paragraphs: [
        "The programme will emphasise capabilities that remain essential even when tools become more powerful: judgement, empathy, communication, curiosity, teamwork, creativity, accountability and the ability to understand a real person's need.",
      ],
    },
    {
      title: "Project-based learning",
      bullets: [
        "researching a real public-benefit, community or business problem",
        "defining users and intended outcomes",
        "testing whether AI is appropriate at all",
        "building and evaluating a prototype or solution",
        "recording limitations, risks and human responsibilities",
        "presenting work clearly to professionals, employers or community partners",
      ],
    },
    {
      title: "Enterprise and employment",
      bullets: [
        "understanding changing roles and skill requirements",
        "professional communication and digital portfolios",
        "mentoring by employers and entrepreneurs",
        "work experience, internships and practical briefs",
        "responsible idea development and business basics",
        "routes into further education, training, employment or enterprise",
      ],
    },
    {
      title: "Accessible and inclusive participation",
      paragraphs: [
        "Programme design should accommodate different learning, communication and sensory needs. AI may support some neurodivergent learners, but it must not be presented as a substitute for appropriate teaching, relationships or specialist support.",
      ],
    },
    {
      title: "Teacher, family and youth-worker capability",
      bullets: [
        "shared language for discussing benefits and risks",
        "appropriate use in homework and assessment",
        "online safety and safeguarding",
        "recognition of over-reliance or harmful use",
        "supporting project-based learning without requiring every adult to be a technical specialist",
      ],
    },
  ],
  plan: [
    {
      stage: "Listening",
      title: "Understand learner and community need",
      description:
        "Identify age groups, current access, confidence, barriers, educational settings and the practical outcomes that matter to participants, families, schools and employers.",
      current: true,
    },
    {
      stage: "Scoping",
      title: "Define the responsible-AI framework",
      description:
        "Set standards for privacy, safety, human oversight, educational integrity, bias, accessibility, intellectual property, safeguarding and truthful representation.",
      current: true,
    },
    {
      stage: "Team Building",
      title: "Build the learning and opportunity network",
      description:
        "Engage educators, technologists, safeguarding specialists, employers, entrepreneurs, mentors, young people and community organisations.",
      current: true,
    },
    {
      stage: "Funding",
      title: "Secure pilot resources",
      description:
        "Match a defined programme with devices, software access, venues, teaching and mentoring time, project opportunities, evaluation and funding.",
    },
    {
      stage: "Delivery",
      title: "Run a controlled practical pilot",
      description:
        "Deliver a structured programme with clear objectives, responsibilities, safeguarding, entry and completion assessment and real-world project work.",
    },
    {
      stage: "Follow-Up",
      title: "Evaluate capability and progression",
      description:
        "Assess learning, confidence, responsible behaviour, project quality, inclusion, further education, work experience, employment and enterprise pathways.",
    },
    {
      stage: "Complete",
      title: "Improve and prepare for repetition",
      description:
        "Close the pilot after evidence, expenditure, risks and participant feedback have been reviewed and produce an improved repeatable model.",
    },
  ],
  outputs: [
    "a published responsible-AI and safeguarding framework",
    "age-appropriate learning pathways and facilitator materials",
    "entry and completion assessments",
    "practical learner projects and digital portfolios",
    "trained teachers, mentors or youth workers",
    "employer, entrepreneur and community project briefs",
    "work-experience, internship, education or enterprise pathways",
    "accessibility and neurodiversity adaptations",
    "participant feedback, outcome evidence and learning reports",
    "a programme model capable of responsible repetition",
  ],
  measures: [
    {
      title: "Knowledge and responsible use",
      items: [
        "completion of AI-literacy assessments",
        "improvement between entry and completion",
        "ability to verify information and identify uncertainty",
        "understanding of privacy, bias, safety and human oversight",
      ],
    },
    {
      title: "Practical capability",
      items: [
        "real-world projects completed",
        "quality of problem definition, testing and communication",
        "responsible and appropriate use of AI within project work",
        "portfolios, prototypes or community solutions developed",
      ],
    },
    {
      title: "Opportunity and progression",
      items: [
        "mentors and employers engaged",
        "work-experience and internship opportunities created",
        "participants continuing into education or training",
        "employment, enterprise or project opportunities entered",
      ],
    },
    {
      title: "Inclusion and programme quality",
      items: [
        "participation by disadvantaged and neurodivergent learners",
        "retention and completion",
        "teacher, youth-worker and participant confidence",
        "safeguarding, accessibility and unintended effects reviewed",
      ],
    },
  ],
  priorities: [
    "schools, youth organisations and community settings",
    "responsible-AI, privacy and online-safety expertise",
    "teachers, curriculum designers and project facilitators",
    "employers, entrepreneurs and professional mentors",
    "work experience, internships and real-world project briefs",
    "devices, connectivity and suitable software access",
    "neurodiversity and accessibility capability",
    "evaluation, evidence and defined pilot funding",
  ],
  participation: [
    {
      title: "Pledge resources for a defined pilot",
      description:
        "Offer funding, devices, software, venues, professional time, work-experience opportunities or educational support.",
      items: [
        "devices and appropriate software access",
        "venues and learning resources",
        "programme and evaluation funding",
        "work experience and project opportunities",
        "accessibility and inclusion support",
      ],
      action: "Pledge support",
      href: `/donate?workstream=${slug}#pledge-form`,
    },
    {
      title: "Contribute expertise or mentoring",
      description:
        "Educators, technologists, safeguarding professionals, employers, entrepreneurs and mentors may register an interest in an approved role.",
      items: [
        "education and curriculum design",
        "responsible AI, privacy and security",
        "mentoring and enterprise",
        "employability and workplace pathways",
        "neurodiversity and accessibility",
      ],
      action: "Apply to contribute",
      href: `/volunteer-apply?workstream=${slug}`,
    },
    {
      title: "Discuss an education or employer partnership",
      description:
        "Schools, youth organisations, universities, employers and funders may begin a project-specific conversation about a responsible pilot.",
      items: [
        "learner cohorts and programme settings",
        "real-world project briefs",
        "work experience and progression",
        "research and evaluation",
        "funding a defined programme phase",
      ],
      action: "Ask about this project",
      href: `/contact?workstream=${slug}`,
    },
  ],
  safeguards: [
    "safeguarding and online-safety requirements",
    "consent, privacy and minimisation of children's personal data",
    "human oversight and clear accountability",
    "truthful representation of system capability and limitations",
    "educational integrity and appropriate assessment practice",
    "bias, discrimination and accessibility review",
    "intellectual-property and licensing awareness",
    "no replacement of teachers, parents, professionals or human relationships",
    "declaration and management of connected commercial interests",
    "careful use of young people's work, images and stories",
  ],
  evidence: [
    "programme-design and responsible-AI standards",
    "confirmed education and employer relationships",
    "participant and contributor records",
    "entry, completion and follow-up assessment",
    "learner projects and portfolios with appropriate consent",
    "work-experience, education and enterprise progression",
    "safeguarding, accessibility and risk review",
    "lessons and programme improvements published after each phase",
  ],
  relatedExperience: [
    "This workstream builds upon experience across education, healthcare, technology, enterprise, neurodiversity and international project development.",
    "Relevant earlier voluntary and educational work will be connected through the historical archive where it genuinely informs the programme and can be described accurately.",
  ],
  globalSignificance: [
    "The question is not whether young people will encounter AI. It is whether they will be equipped to use it with judgement, independence and a realistic route into work and enterprise.",
    "Without deliberate intervention, the technology may widen inequality between young people who have devices, informed adults and strong networks and those who do not. A human-first programme seeks to turn access into capability and capability into opportunity.",
  ],
  sources: [
    {
      id: "imf-ai-work",
      organisation: "International Monetary Fund",
      title: "AI Will Transform the Global Economy. Let's Make Sure It Benefits Humanity",
      url: "https://www.imf.org/en/blogs/articles/2024/01/14/ai-will-transform-the-global-economy-lets-make-sure-it-benefits-humanity",
    },
    {
      id: "ilo-youth-2024",
      organisation: "International Labour Organization",
      title: "Global Employment Trends for Youth 2024",
      url: "https://www.ilo.org/publications/major-publications/global-employment-trends-youth-2024",
    },
    {
      id: "unesco-ai-curricula",
      organisation: "UNESCO",
      title: "K–12 AI curricula: mapping government-endorsed AI curricula",
      url: "https://www.unesco.org/en/articles/k-12-ai-curricula-mapping-government-endorsed-ai-curricula",
    },
  ],
};
