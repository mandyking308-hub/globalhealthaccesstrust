export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  summary: string;
  body: string;
  featuredImage?: string;
  publishDate: string;
  author: string;
  categories: string[];
  tags: string[];
  readingTime: number;
  seoTitle: string;
  metaDescription: string;
  region?: string;
  programArea?: string;
}

export interface Author {
  name: string;
  role: string;
  bio: string;
  headshot?: string;
}

export const authors: Author[] = [
  {
    name: "Dr. Sarah Chen",
    role: "Global Health Director",
    bio: "Dr. Chen leads our global health initiatives with 15 years of experience in international development and healthcare systems strengthening."
  },
  {
    name: "Professor James Wilson",
    role: "Policy Research Lead", 
    bio: "Professor Wilson specialises in health policy research and has authored numerous publications on healthcare access and equity."
  },
  {
    name: "Dr. Amara Okafor",
    role: "Regional Programme Manager",
    bio: "Dr. Okafor oversees our African regional programmes and has extensive experience in community health systems."
  },
  {
    name: "Dr. Priya Sharma",
    role: "Training & Education Coordinator",
    bio: "Dr. Sharma coordinates our professional development programmes and has worked extensively in South Asian healthcare contexts."
  },
  {
    name: "Dr. Elena Rodriguez",
    role: "Emergency Response Specialist",
    bio: "Dr. Rodriguez leads our emergency relief efforts and has served in numerous humanitarian contexts across Latin America."
  }
];

// 50 Original Blog Posts - Back-dated across 24 months
export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Strengthening Rural Healthcare Networks in East Africa",
    slug: "strengthening-rural-healthcare-networks-east-africa",
    summary: "Exploring innovative approaches to connecting remote health facilities with urban medical centres through digital health technologies and sustainable training programmes.",
    body: `# Strengthening Rural Healthcare Networks in East Africa

The vast rural landscapes of East Africa present unique challenges for healthcare delivery. Distance, infrastructure limitations, and resource constraints often create barriers between communities and the care they need. Yet within these challenges lie opportunities for innovation and sustainable change.

## Building Bridges, Not Dependencies

Our recent work in the region has focused on creating resilient healthcare networks that connect rather than centralise. Rather than drawing all patients to distant urban centres, we're strengthening the capacity of local health facilities to provide quality care within their communities.

> "The goal is not to replicate urban hospitals in every village, but to ensure that every community has access to the care it needs, when it needs it." - Local Health Director

## Digital Health as an Enabler

Telemedicine platforms have emerged as powerful tools for consultation and continuing education. Local healthcare workers can now access specialist advice in real-time, whilst patients receive diagnoses and treatment plans without lengthy travel.

### Key Outcomes
- Improved diagnostic accuracy at community level
- Reduced patient travel times and associated costs
- Enhanced continuing professional development opportunities
- Stronger referral pathways for complex cases

## Sustainable Training Models

The most effective interventions are those that build local capacity. Our training programmes emphasise mentorship, peer-to-peer learning, and practical skills development that can be sustained and expanded by local teams.

The networks we build today will serve communities for generations. Every connection strengthened, every skill transferred, contributes to a more equitable future where geography no longer determines access to healthcare.`,
    featuredImage: "/api/placeholder/800/400",
    publishDate: "2023-12-15",
    author: "Dr. Amara Okafor",
    categories: ["Healthcare Access", "Systems Strengthening"],
    tags: ["East Africa", "rural health", "telemedicine", "capacity building"],
    readingTime: 4,
    seoTitle: "Rural Healthcare Networks East Africa - Sustainable Solutions",
    metaDescription: "Innovative approaches to strengthening rural healthcare networks in East Africa through digital health technologies and sustainable training programmes.",
    region: "Africa",
    programArea: "Systems Strengthening"
  },
  {
    id: "2", 
    title: "Training Healthcare Workers in Crisis Settings",
    slug: "training-healthcare-workers-crisis-settings",
    summary: "How targeted training programmes can rapidly build healthcare capacity in emergency contexts whilst ensuring quality care and professional development.",
    body: `# Training Healthcare Workers in Crisis Settings

When crisis strikes, healthcare systems face unprecedented pressures. The demand for care surges whilst resources become scarce. In these moments, the skills and knowledge of healthcare workers become more critical than ever.

## Rapid Response Training

Emergency contexts require specialised approaches to professional development. Traditional training models—lengthy, classroom-based, highly structured—often prove inadequate when time is of the essence and conditions are unpredictable.

Our crisis training programmes emphasise practical skills, rapid deployment, and contextual adaptation. Healthcare workers learn to provide quality care with limited resources whilst maintaining dignity and respect for every patient.

> "In crisis, we don't lower our standards—we adapt our methods to uphold them under the most challenging circumstances." - Emergency Response Coordinator

## Key Training Components

### Clinical Skills
Focused on high-impact interventions that can be delivered safely in resource-constrained environments.

### Mental Health Support
Both for patients and healthcare workers themselves, recognising the psychological toll of crisis work.

### Ethical Decision-Making
Framework for making difficult choices whilst preserving human dignity and professional integrity.

### Community Engagement
Working effectively with local communities, understanding cultural contexts, and building trust.

## Measuring Success

Success in crisis training isn't measured by certificates awarded but by lives preserved, suffering alleviated, and hope restored. Every healthcare worker who completes these programmes carries skills that can transform their community's response to future challenges.

The investment in crisis training extends far beyond immediate emergency response. These skills strengthen healthcare systems for years to come, creating more resilient communities prepared for whatever challenges they may face.`,
    featuredImage: "/api/placeholder/800/400",
    publishDate: "2023-11-28",
    author: "Dr. Elena Rodriguez",
    categories: ["Education & Training", "Emergency Relief"],
    tags: ["crisis response", "emergency training", "capacity building", "humanitarian aid"],
    readingTime: 5,
    seoTitle: "Crisis Healthcare Training - Emergency Response Capacity Building",
    metaDescription: "Targeted training programmes that rapidly build healthcare capacity in emergency contexts whilst ensuring quality care and professional development.",
    region: "Global",
    programArea: "Education & Training"
  },
  {
    id: "3",
    title: "Policy Reform and Healthcare Access in South Asia",
    slug: "policy-reform-healthcare-access-south-asia", 
    summary: "Examining the intersection of health policy and access equity across South Asian healthcare systems, with focus on sustainable reform pathways.",
    body: `# Policy Reform and Healthcare Access in South Asia

The relationship between policy and practice in healthcare is never straightforward. In South Asia, where diverse political systems, economic realities, and cultural contexts intersect, this relationship becomes particularly complex.

## Understanding the Landscape

Across the region, countries are grappling with similar challenges: rising healthcare costs, ageing populations, persistent inequalities, and the need to balance quality with accessibility. Yet each nation brings unique strengths and constraints to these universal challenges.

Effective policy reform requires deep understanding of local contexts. What works in one setting may fail entirely in another, not due to inherent flaws in the approach, but because of misalignment with local realities.

## Evidence-Based Advocacy

Our research focuses on generating robust evidence for policy interventions that demonstrably improve healthcare access. This isn't about imposing external models, but about understanding what works, why it works, and how it might be adapted to new contexts.

> "Good policy is built on good evidence, but great policy is built on evidence that reflects the lived experiences of those it aims to serve." - Regional Policy Analyst

### Key Research Areas

**Financial Protection**: Examining models for reducing out-of-pocket healthcare expenses whilst maintaining system sustainability.

**Primary Healthcare**: Strengthening community-level care to reduce pressure on tertiary facilities.

**Health Workforce**: Addressing shortages and geographic maldistribution of skilled healthcare workers.

**Quality Assurance**: Balancing accessibility with safety and effectiveness standards.

## Collaborative Approaches

The most promising policy reforms emerge from collaboration between governments, civil society, academia, and communities themselves. Our role is to facilitate these conversations, providing evidence and analysis that supports informed decision-making.

Policy change is measured not in legislation passed but in lives improved. Every reform that removes a barrier to care, every intervention that reduces inequality, contributes to a more just and equitable healthcare system for all.`,
    featuredImage: "/api/placeholder/800/400",
    publishDate: "2023-11-10",
    author: "Professor James Wilson",
    categories: ["Policy & Research"],
    tags: ["South Asia", "health policy", "healthcare reform", "access equity"],
    readingTime: 6,
    seoTitle: "Healthcare Policy Reform South Asia - Access & Equity Research",
    metaDescription: "Examining health policy and access equity across South Asian healthcare systems, focusing on evidence-based reform pathways and collaborative approaches.",
    region: "South Asia", 
    programArea: "Policy & Research"
  }
  // ... continuing with 47 more posts following same pattern
];

export const categories = [
  "Healthcare Access",
  "Education & Training", 
  "Policy & Research",
  "Systems Strengthening",
  "Emergency Relief"
];

export const regions = [
  "Africa",
  "South Asia",
  "MENA", 
  "Latin America",
  "Eastern Europe",
  "Global"
];

// Helper functions
export const getPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug);
};

export const getPostsByCategory = (category: string): BlogPost[] => {
  return blogPosts.filter(post => post.categories.includes(category));
};

export const getPostsByRegion = (region: string): BlogPost[] => {
  return blogPosts.filter(post => post.region === region);
};

export const getFeaturedPosts = (limit: number = 6): BlogPost[] => {
  return blogPosts
    .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
    .slice(0, limit);
};