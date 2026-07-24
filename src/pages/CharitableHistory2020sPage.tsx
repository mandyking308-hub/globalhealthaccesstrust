import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { ContentLayout } from "@/components/layout/ContentLayout";
import { SEO } from "@/components/SEO";

type Stat = {
  value: string;
  label: string;
};

type Source = {
  label: string;
  href: string;
};

type YearRecord = {
  year: string;
  title: string;
  context: string;
  stats: Stat[];
  impact: string;
  response: string[];
  areas: string;
  contribution: string;
  routes: string;
  sources: Source[];
};

const earlyRecords: YearRecord[] = [
  {
    year: "2020",
    title: "Frontline community action during COVID-19",
    context:
      "COVID-19 placed extraordinary pressure on healthcare workers, elderly and isolated people, families, schools, specialist services and local communities. Our response became intensely practical and UK-focused.",
    stats: [
      { value: "79 million+", label: "Reported COVID-19 cases worldwide by the end of 2020" },
      { value: "1.7 million+", label: "Reported deaths worldwide by the end of 2020" },
      { value: "At least 3 million", label: "Excess deaths later estimated for 2020" },
    ],
    impact:
      "Beyond infection and mortality, the pandemic interrupted healthcare, education and specialist support, increased isolation and food insecurity, and placed a heavy emotional burden on frontline workers and families.",
    response: [
      "With members of our family working on the healthcare front line, the pandemic was immediate and personal.",
      "Our work during 2020 was predominantly focused on the United Kingdom and became more hands-on than at almost any previous time. We helped organise and manage community food preparation, worked in kitchens, cooked meals and supported the distribution of food to elderly, vulnerable and isolated people.",
      "We drove around local communities delivering food packages directly to people who could not safely leave their homes. We worked through food banks, churches, charities and community organisations to identify people who required practical assistance.",
      "The work frequently continued from early in the day until late at night. It involved preparing food, loading vehicles, making deliveries and speaking directly with people who were frightened or alone.",
      "We also spent substantial time telephoning people to provide reassurance, practical information and human contact.",
      "Children who would normally have received help through specialist centres had suddenly lost access to familiar routines and professional support. We worked with autistic children, children with ADHD, children with special educational needs and their families as they attempted to manage school closures, isolation and the interruption of specialist services.",
      "We also supported frontline healthcare workers through food, practical assistance and community mobilisation. This was one of the most intensive periods of voluntary work in our history.",
    ],
    areas: "Frontline workers, elderly people, isolated families, food poverty, autism, ADHD and SEND",
    contribution: "Cooking, kitchen coordination, food delivery, telephone support and practical assistance",
    routes: "Food banks, churches, charities, community organisations and direct local delivery",
    sources: [
      {
        label: "WHO — global COVID-19 update, December 2020",
        href: "https://www.who.int/publications/m/item/weekly-epidemiological-update---29-december-2020",
      },
      {
        label: "WHO — the true death toll of COVID-19",
        href: "https://www.who.int/data/stories/the-true-death-toll-of-covid-19-estimating-global-excess-mortality",
      },
    ],
  },
  {
    year: "2021",
    title: "Continuing COVID support, Afghanistan and Haiti",
    context:
      "The pandemic continued alongside vaccination programmes, severe pressure on mental-health services and widespread bereavement. Afghanistan and Haiti also faced major humanitarian emergencies.",
    stats: [
      { value: "14.9 million", label: "Estimated excess deaths associated with COVID-19 across 2020 and 2021" },
      { value: "820,000", label: "People newly displaced within Afghanistan during 2021" },
      { value: "2,200+", label: "People killed by the Haiti earthquake" },
      { value: "About 800,000", label: "People affected by the Haiti earthquake" },
    ],
    impact:
      "Families were attempting to cope with prolonged illness, disrupted support, sudden bereavement and displacement. The need for food, shelter and healthcare existed alongside a profound need for human contact and emotional support.",
    response: [
      "COVID-19 remained a central part of our work during 2021. We continued supporting healthcare workers and families affected by the pandemic.",
      "Many people were struggling with anxiety, isolation and deteriorating mental health. Others were grieving after losing parents, partners, relatives or friends.",
      "We continued providing telephone support and speaking with people who needed reassurance, practical guidance or simply someone willing to listen.",
      "Bereavement became an especially important part of the work. Families were attempting to process sudden deaths, disrupted funerals and the absence of normal community support.",
      "We also supported humanitarian activity concerning Afghanistan. We helped send food and supported appeals for Afghan refugees, children and families affected by conflict and displacement.",
      "Following the earthquake in Haiti, we supported work involving affected families, children, hospitals and orphanages.",
      "This period reinforced the importance of combining immediate physical assistance with mental-health and bereavement support.",
    ],
    areas: "COVID-19, healthcare workers, bereavement, Afghanistan, Haiti, refugees and orphanages",
    contribution: "Telephone support, food, fundraising, humanitarian assistance and family support",
    routes: "Community organisations, charities, refugee appeals, hospitals and orphanage-support networks",
    sources: [
      {
        label: "WHO — estimated excess deaths associated with COVID-19",
        href: "https://www.who.int/news/item/05-05-2022-14.9-million-excess-deaths-were-associated-with-the-covid-19-pandemic-in-2020-and-2021",
      },
      {
        label: "UNHCR — Afghanistan emergency",
        href: "https://www.unhcr.org/emergencies/afghanistan-emergency",
      },
      {
        label: "United Nations — Haiti earthquake response",
        href: "https://www.un.org/en/haiti-earthquake-response-2021",
      },
    ],
  },
  {
    year: "2022",
    title: "Ukraine, the Pakistan floods and support for displaced families",
    context:
      "Russia's full-scale invasion of Ukraine created one of Europe's fastest displacement emergencies, while catastrophic flooding across Pakistan affected tens of millions of people.",
    stats: [
      { value: "5.7 million", label: "People estimated to have fled Ukraine during 2022" },
      { value: "33 million", label: "People affected by flooding in Pakistan" },
      { value: "7.6 million", label: "People displaced by the Pakistan floods" },
      { value: "2 million+", label: "Homes damaged or destroyed in Pakistan" },
    ],
    impact:
      "War and flooding uprooted families, destroyed homes and infrastructure and left children and adults requiring shelter, financial support, healthcare and help rebuilding a sense of stability.",
    response: [
      "The full-scale war in Ukraine created an urgent need to support families who had fled their homes. We helped Ukrainian families and people arriving in the United Kingdom.",
      "Our assistance focused particularly on accommodation, clothing, blankets, food, financial contributions and helping people understand where they could obtain further support.",
      "Children arriving in the UK were an important concern. They had experienced displacement, separation, fear and the abrupt loss of familiar homes, schools and communities.",
      "We supported fundraising for hospitals, humanitarian organisations and communities affected by the conflict. We worked through Ukrainian and Christian organisations and other trusted community routes.",
      "Our support was focused less on sending medicines directly and more on accommodation, essential goods, financial assistance and helping displaced people establish some immediate stability.",
      "We also responded to the catastrophic floods in Pakistan. We raised money and supported appeals for tents, clean water, food, blankets, mosquito nets and essential household supplies.",
      "Mental-health, trauma and bereavement support continued alongside the practical assistance. People who had fled war or disaster required more than physical shelter; they also needed recognition of the fear, grief and uncertainty they were carrying.",
    ],
    areas: "Ukraine, Pakistan, displaced families, children, accommodation and trauma",
    contribution: "Housing assistance, food, blankets, tents, mosquito nets, fundraising and emotional support",
    routes: "Ukrainian organisations, Christian organisations, Pakistani community groups and humanitarian charities",
    sources: [
      {
        label: "UNHCR — Global Trends 2022",
        href: "https://www.unhcr.org/global-trends-report-2022",
      },
      {
        label: "UNHCR — Pakistan flood emergency",
        href: "https://www.unhcr.org/emergencies/pakistan-floods-emergency",
      },
    ],
  },
  {
    year: "2023",
    title: "The Türkiye–Syria earthquakes, Sudan and neurodiversity awareness",
    context:
      "The earthquakes across Türkiye and Syria caused immense loss of life and destruction. War in Sudan then became one of the world's fastest-growing displacement emergencies.",
    stats: [
      { value: "50,000+", label: "People killed by the Türkiye–Syria earthquakes" },
      { value: "850,000+", label: "Children displaced by the earthquakes" },
      { value: "5.6 million+", label: "People driven from their homes in Sudan within six months" },
      { value: "About 25 million", label: "People in Sudan requiring humanitarian assistance" },
    ],
    impact:
      "Families lost relatives, homes, schools and hospitals. In Sudan, conflict disrupted healthcare, food and water while millions were forced to seek safety elsewhere.",
    response: [
      "We supported earthquake-relief appeals concerning Türkiye and Syria. Our contribution included fundraising and support for tents, blankets, food, medical goods and other emergency supplies.",
      "We worked through Turkish, Syrian, Muslim, Christian and refugee-support organisations. We supported appeals involving hospitals, emergency workers, women's health, shelter and trauma.",
      "The scale of the destruction was horrific. Families had lost homes, relatives, schools, hospitals and every part of normal daily life.",
      "We also supported humanitarian concerns arising from the conflict in Sudan, including displaced families requiring food, water, shelter and health support.",
      "Within the UK, we continued strengthening our work concerning autism, ADHD and mental health.",
      "An important part of the message was that neurodivergent children and adults should not be judged as deliberately difficult, badly behaved or unwilling to cooperate. Autism and ADHD can affect the way people experience, process and respond to the world around them, and behaviour may communicate distress, sensory overload, communication difficulty or an unmet need.",
      "We campaigned for greater understanding, appropriate assessment and support, and services that looked beyond labels or punishment. Mental health and neurodiversity needed to remain at the forefront of health, education and social-care planning.",
    ],
    areas: "Türkiye, Syria, Sudan, hospitals, emergency workers, autism, ADHD and mental health",
    contribution: "Fundraising, tents, medical goods, shelter support, awareness and campaigning",
    routes: "Muslim, Christian, Turkish, Syrian, refugee and professional networks",
    sources: [
      {
        label: "United Nations — Türkiye and Syria earthquake response",
        href: "https://www.un.org/en/turkiye-syria-earthquake-response",
      },
      {
        label: "United Nations Türkiye — children displaced by the earthquakes",
        href: "https://turkiye.un.org/en/221920-one-month-more-850000-children-remain-displaced-deadly-earthquakes-southern-t%C3%BCrkiye-and",
      },
      {
        label: "UNHCR — Sudan emergency",
        href: "https://www.unhcr.org/emergencies/sudan-emergency",
      },
    ],
  },
];

const decadeThemes = [
  ["Frontline community support", "Preparing and delivering food, supporting elderly and isolated people and assisting frontline healthcare workers during COVID-19."],
  ["Mental health and bereavement", "Telephone support, human contact and practical help for people experiencing anxiety, isolation, trauma and loss."],
  ["Children and neurodiversity", "Support for autistic children, children with ADHD and families whose specialist services and education had been disrupted."],
  ["Humanitarian response", "Continued assistance for refugees, displaced families, hospitals, emergency workers and disaster-affected communities."],
  ["A permanent charitable structure", "The establishment of GHAT created a governed platform through which the work could develop responsibly and at greater scale."],
];

const StatPanel = ({ title, stats, impact }: { title: string; stats: Stat[]; impact?: string }) => (
  <section className="mb-9 border border-primary/20 bg-primary/[0.035] p-5 sm:p-7">
    <p className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-primary">{title}</p>
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <div key={`${stat.value}-${stat.label}`} className="border-l-2 border-primary/35 pl-4">
          <div className="text-2xl font-serif font-bold text-foreground sm:text-3xl">{stat.value}</div>
          <p className="mb-0 mt-2 text-xs leading-relaxed text-muted-foreground">{stat.label}</p>
        </div>
      ))}
    </div>
    {impact ? (
      <p className="mb-0 mt-6 border-t border-primary/15 pt-5 text-sm leading-relaxed text-muted-foreground">{impact}</p>
    ) : null}
  </section>
);

const SourceLinks = ({ sources }: { sources: Source[] }) => (
  <div className="mt-6">
    <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Authoritative sources for global figures</p>
    <div className="flex flex-wrap gap-x-5 gap-y-2">
      {sources.map((source) => (
        <a
          key={source.href}
          href={source.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-primary no-underline hover:underline"
        >
          {source.label} <ExternalLink className="h-3 w-3" />
        </a>
      ))}
    </div>
  </div>
);

const MetaGrid = ({ areas, contribution, routes }: { areas: string; contribution: string; routes: string }) => (
  <dl className="mt-8 grid gap-4 border-y border-foreground/10 py-6 sm:grid-cols-3">
    <div>
      <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">Areas of support</dt>
      <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{areas}</dd>
    </div>
    <div>
      <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">Type of contribution</dt>
      <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{contribution}</dd>
    </div>
    <div>
      <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">Delivery structure</dt>
      <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{routes}</dd>
    </div>
  </dl>
);

export const CharitableHistory2020sPage = () => {
  return (
    <>
      <SEO
        title="2020–2026 Charitable History"
        description="The final historical chapter: frontline community action during COVID-19, international humanitarian support, the establishment of the Global Health Access Trust and its present-day work."
        canonical="/our-history/2020-2026"
      />

      <ContentLayout className="max-w-none">
        <div className="mb-8">
          <Link
            to="/our-history"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary no-underline hover:underline"
          >
            <ArrowLeft className="h-4 w-4" /> Our history of charitable work
          </Link>
        </div>

        <header className="border-b border-foreground/10 pb-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-primary">2020–2026</p>
          <h1 className="mb-5 max-w-4xl text-4xl font-serif font-bold leading-tight sm:text-5xl lg:text-6xl">
            From frontline community action to the Global Health Access Trust
          </h1>
          <div className="max-w-4xl space-y-4 text-lg leading-relaxed text-muted-foreground">
            <p>
              The period from 2020 onward transformed the scale and structure of our work. During the COVID-19 pandemic, our activity became intensely local, practical and hands-on.
            </p>
            <p>
              As international humanitarian emergencies continued, the wider professional network also grew. Clinicians, healthcare organisations, community groups and international contacts increasingly wanted to contribute expertise, resources and practical support.
            </p>
            <p>
              The Global Health Access Trust was formally established under its Trust Deed with effect from <strong className="text-foreground">1 December 2024</strong>. Work before that date forms part of the voluntary history and international network that shaped the Trust. Formal GHAT activity begins from that date.
            </p>
          </div>
        </header>

        <section className="mt-10" aria-labelledby="period-overview">
          <h2 id="period-overview" className="mb-6 text-2xl font-serif font-bold">The period at a glance</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {decadeThemes.map(([title, text]) => (
              <div key={title} className="border border-foreground/10 bg-muted/20 p-5">
                <h3 className="mb-2 text-base font-serif font-bold">{title}</h3>
                <p className="mb-0 text-xs leading-relaxed text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <nav className="sticky top-[84px] z-30 -mx-2 mt-10 overflow-x-auto border-y border-foreground/10 bg-background/95 px-2 py-3 backdrop-blur" aria-label="Select a year">
          <div className="flex min-w-max gap-2">
            {["2020", "2021", "2022", "2023", "2024", "2025", "2026"].map((year) => (
              <a
                key={year}
                href={`#year-${year}`}
                className="inline-flex min-w-16 justify-center border border-foreground/15 px-3 py-2 text-xs font-semibold text-foreground no-underline transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
              >
                {year}
              </a>
            ))}
          </div>
        </nav>

        <div className="mt-12 space-y-20">
          {earlyRecords.map((record) => (
            <article key={record.year} id={`year-${record.year}`} className="scroll-mt-40 border-t border-foreground/10 pt-10">
              <div className="grid gap-8 lg:grid-cols-[150px_1fr] lg:gap-12">
                <div>
                  <div className="text-5xl font-serif font-bold text-primary">{record.year}</div>
                  <div className="mt-4 h-px w-16 bg-primary/30" />
                </div>
                <div>
                  <h2 className="mb-4 text-3xl font-serif font-bold leading-tight sm:text-4xl">{record.title}</h2>
                  <p className="mb-8 max-w-4xl text-lg leading-relaxed text-muted-foreground">{record.context}</p>
                  <StatPanel title="The scale of the emergency" stats={record.stats} impact={record.impact} />
                  <section aria-label={`How we responded in ${record.year}`}>
                    <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-primary">How we responded</p>
                    <div className="max-w-4xl space-y-4 text-base leading-relaxed text-foreground/85">
                      {record.response.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                    </div>
                  </section>
                  <MetaGrid areas={record.areas} contribution={record.contribution} routes={record.routes} />
                  <SourceLinks sources={record.sources} />
                </div>
              </div>
            </article>
          ))}

          <article id="year-2024" className="scroll-mt-40 border-t border-foreground/10 pt-10">
            <div className="grid gap-8 lg:grid-cols-[150px_1fr] lg:gap-12">
              <div>
                <div className="text-5xl font-serif font-bold text-primary">2024</div>
                <div className="mt-4 h-px w-16 bg-primary/30" />
              </div>
              <div>
                <h2 className="mb-4 text-3xl font-serif font-bold leading-tight sm:text-4xl">Humanitarian emergencies and the formal establishment of GHAT</h2>
                <p className="mb-8 max-w-4xl text-lg leading-relaxed text-muted-foreground">
                  This year is divided into two legally distinct periods: the voluntary international network operating before the Trust existed, and the formal history of GHAT beginning on 1 December 2024.
                </p>

                <section className="mb-10 border-l-4 border-primary/30 pl-5 sm:pl-7">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary">January–30 November 2024</p>
                  <h3 className="mb-6 text-2xl font-serif font-bold">The international network before GHAT</h3>
                  <StatPanel
                    title="The scale of the emergencies"
                    stats={[
                      { value: "About 1.9 million", label: "People displaced within Gaza" },
                      { value: "About 25 million", label: "People in Sudan requiring humanitarian assistance" },
                      { value: "8.6 million", label: "People displaced by the Sudan conflict by April" },
                      { value: "10 million+", label: "Ukrainian refugees and internally displaced people" },
                    ]}
                    impact="Humanitarian emergencies in Gaza, Sudan and Ukraine created immense needs involving healthcare, displacement, shelter, food, protection and longer-term recovery."
                  />
                  <div className="max-w-4xl space-y-4 text-base leading-relaxed text-foreground/85">
                    <p>Before GHAT was formally established, we continued operating through the voluntary international network that had grown from our earlier work.</p>
                    <p>We supported humanitarian concerns involving Gaza, Sudan and Ukraine and increasingly worked with partners, charities, community organisations, clinicians and professional contacts rather than relying only on individual fundraising appeals.</p>
                    <p>The work remained voluntary and was undertaken without payment.</p>
                    <p>The wider clinical network already included thousands of clinician registrations from around the world. This created a substantial potential pool of professional knowledge and people who could be invited to consider appropriate charitable projects.</p>
                    <p>These registrations represented the reach of the wider clinical network. They did not mean that every registered clinician was already an active GHAT volunteer.</p>
                    <p>The network gave us the ability to begin thinking beyond the movement of food, clothing or emergency goods. We began considering how longer-term assistance might address land, buildings, schools, healthcare facilities, professional training and the rebuilding of communities after emergencies.</p>
                    <p>There was also growing interest from people and organisations who wanted to contribute funding, land, professional knowledge, infrastructure or other resources.</p>
                    <p>It became clear that the work required a permanent structure with governance, evidence, safeguarding, financial controls and accountable decision-making. This led directly to the establishment of the Global Health Access Trust.</p>
                  </div>
                  <MetaGrid
                    areas="Gaza, Sudan, Ukraine, healthcare, displacement and post-emergency recovery"
                    contribution="Voluntary support, professional networking, humanitarian assistance and partnership development"
                    routes="Charities, clinicians, community organisations and international professional relationships"
                  />
                  <SourceLinks
                    sources={[
                      { label: "OCHA — humanitarian situation in Gaza", href: "https://www.ochaopt.org/content/humanitarian-situation-update-275-gaza-strip" },
                      { label: "OCHA — Sudan humanitarian update", href: "https://www.unocha.org/sudan" },
                      { label: "UNHCR — Ukraine emergency", href: "https://www.unhcr.org/emergencies/ukraine-emergency" },
                    ]}
                  />
                </section>

                <section className="border border-primary/25 bg-primary/[0.04] p-6 sm:p-8">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary">From 1 December 2024</p>
                  <h3 className="mb-5 text-3xl font-serif font-bold">The Global Health Access Trust is established</h3>
                  <div className="max-w-4xl space-y-4 text-base leading-relaxed text-foreground/85">
                    <p>The Global Health Access Trust was formally established under its Trust Deed with effect from <strong>1 December 2024</strong>.</p>
                    <p>The Trust was created to provide a permanent and accountable structure through which the values and experience developed over many years could continue.</p>
                    <p>The first trustees were Mandy King, Dr Jagdev Thukral and John O'Sullivan BA FCA.</p>
                    <p>The establishment of the Trust introduced a clear legal and governance boundary. The earlier voluntary work and wider professional network shaped GHAT, but they did not retrospectively become GHAT projects.</p>
                    <p>From this point forward, activity undertaken through the Trust would need to be considered within its charitable purposes, governance arrangements, safeguarding requirements and financial controls.</p>
                    <p>The objective was not simply to create another organisation. It was to build a platform capable of bringing together practical humanitarian action, healthcare expertise, community knowledge, responsible technology and longer-term systems work.</p>
                  </div>
                  <MetaGrid
                    areas="Formal charitable establishment and governance"
                    contribution="Trustee oversight, defined charitable purposes and organisational development"
                    routes="Trust Deed, trustees, safeguarding and financial accountability"
                  />
                </section>
              </div>
            </div>
          </article>

          <article id="year-2025" className="scroll-mt-40 border-t border-foreground/10 pt-10">
            <div className="grid gap-8 lg:grid-cols-[150px_1fr] lg:gap-12">
              <div>
                <div className="text-5xl font-serif font-bold text-primary">2025</div>
                <div className="mt-4 h-px w-16 bg-primary/30" />
              </div>
              <div>
                <h2 className="mb-4 text-3xl font-serif font-bold leading-tight sm:text-4xl">The first full year of the Trust</h2>
                <p className="mb-8 max-w-4xl text-lg leading-relaxed text-muted-foreground">
                  The first full year focused on turning the Trust Deed and long history of voluntary work into an operational charitable platform.
                </p>
                <StatPanel
                  title="The scale of the global challenge"
                  stats={[
                    { value: "117.8 million", label: "People forcibly displaced at the end of 2025" },
                    { value: "1 in 70", label: "People worldwide living in forced displacement" },
                    { value: "266 million", label: "People experiencing high acute food insecurity during 2025" },
                    { value: "1 billion+", label: "People living with a mental-health condition" },
                  ]}
                  impact="Conflict, climate shocks, hunger, displacement and unmet mental-health needs continued to demonstrate the need for practical humanitarian response alongside longer-term systems work."
                />
                <section>
                  <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-primary">How the Trust developed</p>
                  <div className="max-w-4xl space-y-4 text-base leading-relaxed text-foreground/85">
                    <p>The trustees began formally considering and approving the Trust's initial projects and areas of work.</p>
                    <p>We established the principal workstreams through which activity could be organised.</p>
                    <p>We built the website, but the work extended far beyond presenting information publicly. We also developed the underlying infrastructure required to operate responsibly, including governance documentation, safeguarding, evidence management, financial controls, project oversight and ways for professional contributors to participate.</p>
                    <p>We informed existing contacts and potential partners about the establishment of the Trust and continued developing relationships connected with healthcare, humanitarian response, mental health, neurodiversity, agriculture, technology and international development.</p>
                    <p>The workstreams were designed as continuing programmes rather than isolated one-off appeals.</p>
                    <p>This marked an important change. The Trust could continue responding compassionately to immediate needs while also examining the systems that repeatedly left communities without healthcare, food security, appropriate education or effective recovery support.</p>
                    <p>The contribution during this period remained primarily professional time, infrastructure, coordination and voluntary expertise rather than the distribution of large grants.</p>
                  </div>
                </section>
                <MetaGrid
                  areas="Governance, project design, humanitarian response, health systems and international collaboration"
                  contribution="Trustee oversight, voluntary professional time, infrastructure and partnership development"
                  routes="Formal Trust workstreams, governance controls and defined project processes"
                />
                <SourceLinks
                  sources={[
                    { label: "UNHCR — Global Trends 2025", href: "https://www.unhcr.org/global-trends" },
                    { label: "WFP — Global Report on Food Crises 2026", href: "https://www.wfp.org/publications/global-report-food-crises-grfc" },
                    { label: "WHO — global mental-health facts", href: "https://www.who.int/news-room/fact-sheets/detail/mental-health-strengthening-our-response" },
                  ]}
                />
              </div>
            </div>
          </article>

          <article id="year-2026" className="scroll-mt-40 border-t border-foreground/10 pt-10">
            <div className="grid gap-8 lg:grid-cols-[150px_1fr] lg:gap-12">
              <div>
                <div className="text-5xl font-serif font-bold text-primary">2026</div>
                <div className="mt-4 h-px w-16 bg-primary/30" />
              </div>
              <div>
                <h2 className="mb-4 text-3xl font-serif font-bold leading-tight sm:text-4xl">Building the platform for larger global work</h2>
                <p className="mb-8 max-w-4xl text-lg leading-relaxed text-muted-foreground">
                  GHAT is now developing a global charitable network that people can support through volunteering, professional expertise, donations, restricted project funding and longer-term partnerships.
                </p>

                <StatPanel
                  title="Our present-day reach"
                  stats={[
                    { value: "Five", label: "Principal public workstreams" },
                    { value: "12 countries", label: "International reach across the wider network" },
                    { value: "40+", label: "Organisational or professional relationships" },
                    { value: "Thousands", label: "Clinician registrations within the wider clinical network" },
                  ]}
                  impact="The clinician registrations demonstrate potential professional reach rather than a claim that every registered clinician is already an active GHAT volunteer."
                />

                <section className="mb-10">
                  <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-primary">How the Trust is developing</p>
                  <div className="max-w-4xl space-y-4 text-base leading-relaxed text-foreground/85">
                    <p>The Trust continues to contribute substantial professional time without payment. However, voluntary effort alone cannot fund the scale of organisation required to address complex international challenges responsibly.</p>
                    <p>GHAT is therefore developing the governance, fundraising capacity, project infrastructure and partnerships needed to support larger programmes.</p>
                  </div>
                </section>

                <div className="grid gap-5 md:grid-cols-2">
                  <section className="border border-foreground/10 bg-muted/15 p-6">
                    <h3 className="mb-3 text-xl font-serif font-bold">Africa: food, agriculture and resilient systems</h3>
                    <p className="mb-0 text-sm leading-relaxed text-muted-foreground">We are engaging around agriculture, food security, post-harvest loss, storage, transport, market access and resilient supply chains. The work includes examining how responsible AI and accessible information could help farmers make better-informed decisions about planting, harvesting, weather, climate risk and crop management, including for farmers with different literacy levels and access to technology.</p>
                  </section>
                  <section className="border border-foreground/10 bg-muted/15 p-6">
                    <h3 className="mb-3 text-xl font-serif font-bold">Children without stable family care</h3>
                    <p className="mb-0 text-sm leading-relaxed text-muted-foreground">The Trust is developing work concerning orphanages and children who do not have reliable family care. The objective includes education, safeguarding, health access, skills, stable support and stronger routes into adult life.</p>
                  </section>
                  <section className="border border-foreground/10 bg-muted/15 p-6">
                    <h3 className="mb-3 text-xl font-serif font-bold">Conflict and post-disaster recovery</h3>
                    <p className="mb-0 text-sm leading-relaxed text-muted-foreground">GHAT is engaging around larger recovery projects following conflict and disaster. This includes active consultation concerning earthquake-aftermath and post-disaster planning relating to Venezuela.</p>
                  </section>
                  <section className="border border-foreground/10 bg-muted/15 p-6">
                    <h3 className="mb-3 text-xl font-serif font-bold">Responsible AI, education and opportunity</h3>
                    <p className="mb-0 text-sm leading-relaxed text-muted-foreground">The Trust is examining how AI can improve education, enterprise and employment without excluding people who lack money, infrastructure, literacy or technical experience. This includes potential work involving AI in schools and helping young people prepare for a changing employment environment.</p>
                  </section>
                  <section className="border border-foreground/10 bg-muted/15 p-6 md:col-span-2">
                    <h3 className="mb-3 text-xl font-serif font-bold">Mental health, autism, ADHD and neurodiversity</h3>
                    <p className="mb-3 text-sm leading-relaxed text-muted-foreground">Mental health and neurodiversity remain central to the work. We are examining how autism and ADHD are understood, assessed and supported across different countries and health systems.</p>
                    <p className="mb-0 text-sm leading-relaxed text-muted-foreground">This includes responsible discussion about access to assessment, underdiagnosis, misdiagnosis and whether medication is sometimes prescribed without sufficient wider support. The objective is not to oppose appropriate medication, but to encourage balanced, evidence-informed care in which diagnosis, medication, psychological support, education, family circumstances and the individual's own experience are considered together.</p>
                  </section>
                </div>

                <section className="mt-10 border-l-4 border-primary/30 pl-5 sm:pl-7">
                  <h3 className="mb-4 text-2xl font-serif font-bold">A platform built through natural growth</h3>
                  <div className="max-w-4xl space-y-4 text-base leading-relaxed text-foreground/85">
                    <p>GHAT was not created because we woke up one morning and decided to establish a charity. It developed naturally from more than three decades of voluntary work.</p>
                    <p>The progression moved from fundraising and collections, to direct community support, to professional and clinical networks, and finally to a formal charitable structure capable of supporting larger and more sustained projects.</p>
                    <p>The next stage is to convert that history, goodwill and professional reach into responsibly governed programmes with clear objectives, evidence and measurable outcomes.</p>
                  </div>
                </section>

                <MetaGrid
                  areas="Agriculture, food security, children, conflict recovery, responsible AI, mental health and neurodiversity"
                  contribution="Professional consultation, project design, partnership building, voluntary expertise and developing fundraising capacity"
                  routes="Five workstreams, trustee oversight, international relationships and project-specific governance"
                />
                <SourceLinks
                  sources={[
                    { label: "UNHCR — current forced-displacement figures", href: "https://www.unhcr.org/about-unhcr/overview/figures-glance" },
                    { label: "WFP — 2026 global hunger outlook", href: "https://www.wfp.org/publications/wfp-global-outlook" },
                    { label: "WHO — global mental-health facts", href: "https://www.who.int/news-room/fact-sheets/detail/mental-health-strengthening-our-response" },
                  ]}
                />
              </div>
            </div>
          </article>
        </div>

        <section className="mt-20 border-y border-foreground/10 bg-muted/20 px-6 py-10 sm:px-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-primary">What this period taught us</p>
          <h2 className="mb-5 text-3xl font-serif font-bold sm:text-4xl">Direct service and long-term systems work belong together</h2>
          <div className="max-w-4xl space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>During COVID-19, we returned to the most direct form of service: cooking food, making telephone calls, driving through local streets and placing packages into the hands of people who needed them.</p>
            <p>International emergencies continued to show the devastating effects of war, displacement, disaster, hunger and the destruction of healthcare. Our work around autism, ADHD, SEND and mental health reinforced the importance of listening to people rather than judging them.</p>
            <p>The growth of the clinical and international network demonstrated how many professionals wanted to contribute to meaningful work when there was a credible and practical way for them to participate.</p>
            <p>The establishment of GHAT created the structure needed to bring these different strands together. Behind every statistic is a person who has lost a home, a parent, a child, a livelihood, access to healthcare or confidence that anyone is listening.</p>
          </div>
        </section>

        <section className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link
            to="/our-history/2010-2019"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary no-underline hover:underline"
          >
            <ArrowLeft className="h-4 w-4" /> Previous: 2010–2019
          </Link>
          <Link
            to="/current-workstreams"
            className="inline-flex items-center gap-2 bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground no-underline transition-colors hover:bg-primary/90"
          >
            Explore our current workstreams <ArrowRight className="h-4 w-4" />
          </Link>
        </section>
      </ContentLayout>
    </>
  );
};
