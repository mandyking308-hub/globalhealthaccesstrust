import agricultureImage from "@/assets/delivery-rural-landscape.jpg";
import type { Workstream } from "./types";

const slug = "africa-food-agriculture-resilient-systems";

export const africaAgriculture: Workstream = {
  slug,
  number: "01",
  title: "Africa: Food, Agriculture and Resilient Systems",
  shortTitle: "Food, Agriculture and Resilient Systems",
  region: "Africa",
  status: "Active",
  currentStage: "Delivery, with wider programme scoping",
  model: "Ongoing, phased and capable of expansion",
  role: "Strategic support, programme development, coordination and accountable delivery",
  lastReviewed: "July 2026",
  tagline: "Grow more. Lose less. Strengthen every stage from soil to sale.",
  summary:
    "Helping small-scale farmers and producer groups make better seasonal decisions, protect more of what they grow and connect production with storage, logistics, markets, finance and responsible technology.",
  image: agricultureImage,
  imageAlt:
    "A rural agricultural landscape representing farming communities, food production and resilient local systems",
  stats: [
    {
      value: "306m",
      label: "people undernourished",
      detail:
        "More than 306 million people in Africa were undernourished in 2024—approximately one in five people on the continent.",
      sourceIds: ["fao-africa-2026"],
    },
    {
      value: "892.7m",
      label: "people facing food insecurity",
      detail:
        "Almost 59% of Africa's population experienced moderate or severe food insecurity in 2024.",
      sourceIds: ["fao-africa-2026"],
    },
    {
      value: "37%",
      label: "of locally produced food lost or wasted",
      detail:
        "The World Bank reports that inadequate storage is a major cause of loss across African food systems.",
      sourceIds: ["world-bank-connectivity"],
    },
    {
      value: "4×",
      label: "longer supply chains",
      detail:
        "African food-supply chains are around four times longer than European chains and can account for up to 45% of the price of basic foods.",
      sourceIds: ["world-bank-connectivity"],
    },
  ],
  context: [
    {
      title: "The problem is larger than production",
      paragraphs: [
        "A farmer may have land, experience and a viable crop but still be forced to make high-risk decisions without reliable access to seasonal weather information, soil and water advice, disease warnings, storage, transport, buyers or prompt payment.",
        "Food can be lost before it reaches a household even after it has been successfully grown. A harvest may be picked too early or too late, mishandled, delayed in transport, rejected for inconsistent quality or sold below its value because the wider system is fragmented.",
      ],
      bullets: [
        "changing rainfall, extreme heat, drought and flooding",
        "limited access to timely agricultural and climate information",
        "pests and crop disease identified too late",
        "insufficient storage, cooling, processing and packaging",
        "fragmented transport and long delivery times",
        "difficulty meeting buyer, grading or certification requirements",
        "limited working capital, insurance and delayed payment",
        "weak coordination between otherwise valuable interventions",
      ],
    },
    {
      title: "Small farms carry global importance",
      paragraphs: [
        "FAO research finds that farms smaller than two hectares account for approximately 84% of farms worldwide. They operate about 12% of agricultural land and produce roughly 35% of the world's food.",
        "The challenge is not an absence of intelligence or knowledge among farmers. It is unequal access to extension services, agricultural, digital and financial literacy, infrastructure, technology, markets and information that arrives at the moment a decision must be made.",
      ],
    },
    {
      title: "Climate change makes timing more difficult",
      paragraphs: [
        "Traditional seasonal knowledge remains essential, but historic patterns are becoming less dependable in many places. Planting, irrigation, pest control and harvesting decisions increasingly need to combine local experience with current weather, soil, crop and market information.",
      ],
    },
  ],
  whyGhat: [
    "Food systems are health systems. When food is lost, delayed, unaffordable or unavailable, the consequences affect nutrition, childhood development, maternal health, family income, education, employment, migration and community stability.",
    "This workstream builds upon active unpaid strategic and operational support connected with agricultural supply chains and the movement of produce from farm to buyer.",
    "GHAT's role is not to replace local knowledge or impose a distant technical solution. It is to understand where the system is failing, connect the people and resources required and help locally appropriate improvements operate as one accountable programme.",
  ],
  purpose:
    "To help small-scale farmers make better decisions, preserve more of what they produce and receive greater value from their work.",
  objectives: [
    "Improve access to practical agricultural, climate, digital and financial knowledge.",
    "Support better land preparation, planting, crop-management and harvesting decisions.",
    "Increase resilience to changing weather, drought, heat, flooding, pests and disease.",
    "Reduce avoidable crop and post-harvest loss.",
    "Strengthen quality, storage, handling, processing and transport.",
    "Connect production more effectively with reliable buyers and markets.",
    "Improve production records, financial visibility and payment times.",
    "Create evidence that can support repetition and responsible expansion.",
  ],
  currentWork: [
    "Providing unpaid strategic and operational support around agricultural supply chains and the systems surrounding the harvest.",
    "Examining where loss, delay, cost and fragmentation arise between production and sale.",
    "Considering storage, logistics, quality assurance, buyer delivery and export readiness as connected parts of one system.",
    "Exploring how responsible AI and accessible digital services can support seasonal decisions, crop monitoring, logistics and market coordination.",
    "Developing a public-benefit framework through which suitable expertise, equipment, relationships and funding can support defined phases of work.",
  ],
  deliveryAreas: [
    {
      title: "Farmer capability and agricultural literacy",
      paragraphs: [
        "Practical support must follow the agricultural cycle rather than consist of occasional, disconnected training.",
      ],
      bullets: [
        "crop and seasonal calendars",
        "soil, seed, water and input understanding",
        "climate, pest and disease awareness",
        "harvest-readiness and post-harvest practices",
        "quality, buyer and market requirements",
        "record keeping, costs, invoices and payment",
        "digital confidence and assisted use of new tools",
      ],
    },
    {
      title: "AI-assisted seasonal decision support",
      paragraphs: [
        "Responsible AI can combine weather, satellite, soil, crop and market information and translate it into timely guidance. It may support local planting windows, rainfall and temperature analysis, crop-stress alerts, visible disease identification, irrigation planning, maturity assessment, yield forecasting and harvest coordination.",
        "AI will support—not replace—farmers, agricultural extension workers, agronomists and local judgement. Advice must use relevant local data, make uncertainty visible and allow people to challenge or correct it.",
      ],
    },
    {
      title: "Inclusive access for different literacy and connectivity levels",
      paragraphs: [
        "A service is not inclusive merely because it has a smartphone application. Delivery must reflect language, literacy, device access, electricity, data costs and connectivity.",
      ],
      bullets: [
        "local-language voice guidance and interactive voice response",
        "SMS and simple visual instructions",
        "offline or low-data access where possible",
        "shared community devices and assisted registration",
        "farmer groups, cooperatives and trained local facilitators",
        "extension workers, radio and trusted community communication",
      ],
    },
    {
      title: "Climate resilience",
      bullets: [
        "seasonal and short-term weather information",
        "drought, flooding and heat-risk planning",
        "soil and water management",
        "locally suitable resilient crops and practices",
        "early warning for new pest and disease patterns",
        "contingency planning for disrupted transport or markets",
      ],
    },
    {
      title: "Harvest and post-harvest protection",
      bullets: [
        "maturity assessment and harvest timing",
        "safe handling, sorting, grading and packaging",
        "cooling, drying, storage and processing",
        "spoilage monitoring and loss reduction",
        "alignment of harvest with labour, collection, storage and transport capacity",
      ],
    },
    {
      title: "Storage, logistics, buyers and payment",
      bullets: [
        "mapping storage and cold-chain capacity",
        "collection points, shared loads and route planning",
        "proof of delivery and traceability",
        "buyer requirements, pricing and expected demand",
        "quality evidence, certification and contract readiness",
        "production records, invoices and payment monitoring",
        "appropriate working-capital and risk tools",
      ],
    },
    {
      title: "Responsible farmer data",
      paragraphs: [
        "Agricultural data can have financial and commercial value. Farmers should know what is collected, why it is needed, who can access it, how it will be protected and whether it is used by an AI system.",
        "Technology should not transfer control of agricultural knowledge or value away from farmers.",
      ],
    },
  ],
  plan: [
    {
      stage: "Listening",
      title: "Understand the farming system",
      description:
        "Map farmers, crops, farm sizes, seasons, local knowledge, infrastructure, buyers, financial arrangements and the points where loss, cost or delay occur.",
      current: true,
    },
    {
      stage: "Scoping",
      title: "Define a measurable intervention",
      description:
        "Agree the public-benefit need, target participants, baseline, proposed intervention, budget, responsibilities, risks, outputs and evidence requirements.",
      current: true,
    },
    {
      stage: "Team Building",
      title: "Assemble local and specialist capability",
      description:
        "Bring together farmer representatives, coordinators, extension workers, agronomists, climate specialists, logisticians, technologists, buyers, finance expertise and evaluators as required.",
    },
    {
      stage: "Funding",
      title: "Secure resources for an approved phase",
      description:
        "Match defined needs with suitable funding, professional time, technology, equipment, storage, transport, training, market access or research support.",
    },
    {
      stage: "Delivery",
      title: "Run a controlled pilot or project phase",
      description:
        "Deliver agreed activity through clear responsibilities, milestones, financial controls, safeguards, evidence capture and regular review.",
      current: true,
    },
    {
      stage: "Follow-Up",
      title: "Measure use and change",
      description:
        "Assess participation, decisions, crop and quality outcomes, loss, income, payment, farmer experience, unintended effects and improvements required.",
    },
    {
      stage: "Complete",
      title: "Reconcile, learn and decide",
      description:
        "Close the approved phase when delivery, expenditure and evidence have been reviewed and decide whether to conclude, improve, repeat or expand.",
    },
  ],
  outputs: [
    "farmer and producer-group profiles",
    "mapped farms, crops and seasonal conditions",
    "baseline assessments of yield, loss, quality, income and payment",
    "local-language agricultural guidance and crop calendars",
    "planting, crop-management and harvest plans",
    "weather, climate, pest and crop alerts",
    "assisted farm, delivery and payment records",
    "trained local facilitators and digital-literacy support",
    "storage, collection, transport and buyer maps",
    "grading, quality and handling protocols",
    "pilot AI or digital-advisory services",
    "evidence and learning reports",
    "a model capable of repetition in another setting",
  ],
  measures: [
    {
      title: "Knowledge and participation",
      items: [
        "farmers and producer groups engaged",
        "women and young farmers participating",
        "advice received in an accessible language and format",
        "capability support completed",
        "seasonal plans and records adopted",
        "confidence in agricultural and digital decision-making",
      ],
    },
    {
      title: "Agricultural decisions",
      items: [
        "planting within an appropriate seasonal window",
        "response to weather, pest and disease warnings",
        "use of crop, soil and water information",
        "harvest timing and safe post-harvest practice",
      ],
    },
    {
      title: "Production and quality",
      items: [
        "yield per hectare",
        "marketable-quality produce",
        "crop rejection or downgrading",
        "post-harvest and transport loss",
      ],
    },
    {
      title: "Supply chain and income",
      items: [
        "time between harvest, collection and sale",
        "storage and transport reliability",
        "buyer delivery and traceability",
        "price achieved and farmer income",
        "time between delivery and payment",
      ],
    },
    {
      title: "Resilience",
      items: [
        "response to climate or operational disruption",
        "diversification of buyers and routes",
        "continuity following a shock",
        "local capability retained after the project phase",
      ],
    },
  ],
  priorities: [
    "agronomy and agricultural extension",
    "local-language communication and farmer training",
    "weather, climate, soil and crop data",
    "responsible AI and accessible digital services",
    "storage, cold chain, processing and packaging",
    "transport, logistics and proof of delivery",
    "quality control, certification and market readiness",
    "buyers, pricing and market relationships",
    "finance, insurance, invoicing and payment systems",
    "monitoring, evaluation and appropriately structured project funding",
  ],
  participation: [
    {
      title: "Pledge funding or practical support",
      description:
        "Support a defined phase through funding, equipment, technology, storage, logistics, facilities, market access or another useful resource.",
      items: [
        "financial support",
        "agricultural or storage equipment",
        "technology, devices or connectivity",
        "transport and logistics",
        "facilities, processing or packaging capability",
      ],
      action: "Pledge support",
      href: `/donate?workstream=${slug}#pledge-form`,
    },
    {
      title: "Contribute expertise",
      description:
        "Register professional, technical, local or operational capability relevant to an approved phase of work.",
      items: [
        "agriculture, climate and engineering",
        "data, technology and responsible AI",
        "storage, logistics and markets",
        "finance, research and evaluation",
        "local coordination and communication",
      ],
      action: "Apply to contribute",
      href: `/volunteer-apply?workstream=${slug}`,
    },
    {
      title: "Discuss a partnership",
      description:
        "Farmer organisations, public institutions, universities, agricultural enterprises, technology providers and funders may begin a project-specific conversation.",
      items: [
        "local delivery relationships",
        "institutional and research partnerships",
        "buyer or market access",
        "technology or infrastructure collaboration",
        "funding of a defined project phase",
      ],
      action: "Ask about this project",
      href: `/contact?workstream=${slug}`,
    },
  ],
  safeguards: [
    "charitable-purpose and public-benefit assessment",
    "trustee approval and conflicts-of-interest review",
    "delivery-partner and contributor due diligence",
    "financial-crime, sanctions and fraud controls",
    "local legal, regulatory and safety requirements",
    "responsible procurement and maintainability of equipment",
    "data protection, cybersecurity and farmer control of information",
    "human oversight and transparent limitations for AI-assisted advice",
    "defined budgets, milestones, expenditure controls and reporting",
    "clear separation from trustees' private or commercial interests",
  ],
  evidence: [
    "completion of listening and baseline assessment",
    "approval of a defined project scope",
    "confirmation of suitable contributors and resources",
    "farmer capability and advisory activity delivered",
    "storage, logistics, buyer or payment arrangements established",
    "measurable changes in decision-making, loss, quality, income or payment",
    "financial reconciliation and evidence review",
    "lessons, limitations and next steps published where safe and appropriate",
  ],
  relatedExperience: [
    "The workstream builds upon previous voluntary, self-funded and pro bono international work involving agriculture, food systems, essential supplies, technology, community support and operational problem-solving.",
    "Activity that predates the establishment of Global Health Access Trust will be identified as earlier service and experience on which the Trust now builds—not as work formally delivered by GHAT before it existed.",
  ],
  globalSignificance: [
    "GHAT will not claim that one project can solve Africa's food-security crisis. It can, however, demonstrate how farmer capability, responsible technology, infrastructure, finance and market coordination can work together rather than operate as disconnected interventions.",
    "Reducing loss and strengthening African food systems can improve nutrition and rural incomes, create opportunities for young people, reduce dependency on emergency assistance and increase resilience to climate and market shocks.",
    "FAO warns that Africa's share of the world's chronically undernourished population will continue to grow without decisive change. Progress in African agriculture is therefore indispensable to global food security.",
  ],
  sources: [
    {
      id: "fao-africa-2026",
      organisation: "Food and Agriculture Organization of the United Nations",
      title: "Africa Regional Overview of Food Security and Nutrition: latest findings",
      url: "https://www.fao.org/newsroom/detail/new-report-urges-urgent--coordinated-financing-to-reverse-rising-hunger-and-transform-agrifood-systems-across-africa/",
    },
    {
      id: "world-bank-connectivity",
      organisation: "World Bank",
      title: "Improving Transport Connectivity for Food Security in Africa",
      url: "https://www.worldbank.org/en/topic/transport/publication/improving-transport-connectivity-for-food-security-in-africa",
    },
    {
      id: "fao-small-farms",
      organisation: "Food and Agriculture Organization of the United Nations",
      title: "Small family farmers produce a third of the world's food",
      url: "https://www.fao.org/newsroom/detail/Small-family-farmers-produce-a-third-of-the-world-s-food/en",
    },
    {
      id: "world-bank-ai-agriculture",
      organisation: "World Bank",
      title: "Harnessing Artificial Intelligence for Agricultural Transformation",
      url: "https://www.worldbank.org/en/topic/agriculture/publication/harnessing-artificial-intelligence-for-agricultural-transformation",
    },
  ],
};
