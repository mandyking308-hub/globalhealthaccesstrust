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

const records: YearRecord[] = [
  {
    year: "2010",
    title: "Haiti, the Pakistan floods and voluntary social-care work",
    context:
      "The Haiti earthquake and the catastrophic floods across Pakistan left millions of people without secure homes, healthcare, food, safe water or basic infrastructure.",
    stats: [
      { value: "200,000+", label: "People estimated to have been killed in Haiti" },
      { value: "2.3 million", label: "People displaced by the Haiti earthquake" },
      { value: "20 million+", label: "People affected by flooding across Pakistan" },
      { value: "1.8 million+", label: "Homes damaged or destroyed in Pakistan" },
    ],
    impact:
      "Both emergencies overwhelmed local systems. In Haiti, hospitals, homes and public services were destroyed around Port-au-Prince. In Pakistan, floods affected every region and displaced millions of people.",
    response: [
      "We collected goods and raised money for people affected by the earthquake in Haiti.",
      "Our support included tents, blankets and other essential items for families who had lost their homes. We also supported appeals connected with orphanages, hospitals and children who had been left without stable family care or access to essential services.",
      "Later that year, we responded to the severe flooding in Pakistan. We again helped collect practical goods and supported fundraising for displaced families and communities facing extensive damage to homes, healthcare facilities and local infrastructure.",
      "Alongside these international appeals, we continued volunteering with social-care and mental-health charities in the UK. This reinforced our belief that people facing disaster, illness or social exclusion should be able to obtain practical help and dignified support.",
    ],
    areas: "Haiti, Pakistan, orphanages, hospitals, mental health and social care",
    contribution: "Fundraising, tents, blankets, goods and voluntary support",
    routes: "Charities, hospitals, orphanages and social-care organisations",
    sources: [
      {
        label: "United Nations — Haiti earthquake anniversary statement",
        href: "https://www.un.org/sg/en/content/former-secretary-general/statements/2011-01-11/statement-attributable-the-spokesperson-for-the-secretary-general-theoccasion-of-the-anniversary-of-the-12-january-2010-earthquake-haiti",
      },
      {
        label: "United Nations — Pakistan floods",
        href: "https://www.un.org/press/en/2010/ga11002.doc.htm",
      },
    ],
  },
  {
    year: "2011",
    title: "Japan, Syria and campaigning for mental health",
    context:
      "The earthquake, tsunami and nuclear emergency in Japan caused immense loss and disruption. Conflict began in Syria, while famine and displacement continued to affect families across the Horn of Africa.",
    stats: [
      { value: "15,891", label: "Deaths recorded following the Japan earthquake and tsunami" },
      { value: "2,579", label: "People recorded as missing in Japan" },
      { value: "850,000", label: "Somali refugees estimated to be in neighbouring countries" },
      { value: "320,000", label: "Somalis estimated to have fled during 2011" },
    ],
    impact:
      "The year showed how natural disaster, conflict and famine could simultaneously displace families and place hospitals, food systems and community support under extraordinary pressure.",
    response: [
      "We supported appeals following the earthquake, tsunami and nuclear emergency in Japan.",
      "We sent money and supported work connected with hospitals, people requiring medical assistance and families displaced by the disaster.",
      "As the conflict in Syria began, we also supported Syrian families and refugee organisations. Our assistance included food, blankets, children’s items and financial contributions directed through organisations supporting people forced from their homes.",
      "At the same time, we campaigned strongly for mental health to become a more mainstream part of healthcare, social care and public discussion. Mental health should not remain hidden or be treated as less important than physical health.",
    ],
    areas: "Japan, Syria, refugees, hospitals, children and mental health",
    contribution: "Financial assistance, food, blankets, children’s goods and campaigning",
    routes: "Refugee organisations, hospitals, charities and community networks",
    sources: [
      {
        label: "WHO — health consequences of the Fukushima nuclear accident",
        href: "https://www.who.int/news-room/questions-and-answers/item/health-consequences-of-fukushima-nuclear-accident",
      },
      {
        label: "UNHCR — Somalia displacement in 2011",
        href: "https://www.unhcr.org/publications/global-report-2011-somalia",
      },
    ],
  },
  {
    year: "2012",
    title: "Syria, the Sahel and refugee mental health",
    context:
      "The Syrian humanitarian crisis worsened rapidly, while drought, food insecurity, displacement and child malnutrition affected communities across the Sahel.",
    stats: [
      { value: "5 million+", label: "People urgently needing assistance in Syria" },
      { value: "2 million+", label: "People displaced within Syria" },
      { value: "540,000", label: "People who had fled to neighbouring countries" },
      { value: "15 million", label: "People affected across the Sahel" },
    ],
    impact:
      "Conflict and drought removed access to food, healthcare, stable housing and family security. Children faced severe malnutrition, while refugees and bereaved families needed support beyond immediate shelter.",
    response: [
      "We continued fundraising and collecting goods for Syrian refugees.",
      "Our support included warm clothing, blankets, food and financial assistance for families displaced within Syria or seeking safety in Türkiye, Lebanon and Jordan.",
      "We also raised money for drought and food-relief appeals across Africa and the Sahel. Children affected by malnutrition and families who had lost crops, livestock or other means of supporting themselves were an important concern.",
      "We worked through African charities and UK-based community organisations. Mental health, bereavement and trauma were also becoming more prominent within our campaigning, because refugees and bereaved families needed continuing psychological and social support.",
    ],
    areas: "Syria, Türkiye, Lebanon, Jordan, the Sahel, children and mental health",
    contribution: "Fundraising, clothing, blankets, food and campaigning",
    routes: "Refugee organisations, African charities and UK community networks",
    sources: [
      {
        label: "United Nations — Syria humanitarian situation",
        href: "https://www.un.org/sg/en/content/highlight/2012-12-28.html",
      },
      {
        label: "United Nations — Sahel food and nutrition crisis",
        href: "https://news.un.org/en/story/2012/02/403212",
      },
    ],
  },
  {
    year: "2013",
    title: "Typhoon Haiyan, global mental-health priorities and standards of care",
    context:
      "Typhoon Haiyan devastated communities across the Philippines. International and UK developments also placed mental-health reform, patient safety, compassion and accountability under greater scrutiny.",
    stats: [
      { value: "14 million", label: "People estimated to have been affected by Typhoon Haiyan" },
      { value: "4 million", label: "People displaced by the disaster" },
      { value: "5.4 million", label: "Affected children estimated across the Philippines" },
      { value: "194 states", label: "WHO members adopting a global mental-health action plan" },
    ],
    impact:
      "The typhoon left families without safe housing, water, sanitation or functioning local services. The global mental-health plan called for stronger leadership, community-based services, human rights, prevention and evidence.",
    response: [
      "We supported humanitarian appeals following Typhoon Haiyan in the Philippines.",
      "Our contribution included fundraising and practical support for shelter, food, clean water, hygiene supplies, clothing and medical assistance.",
      "The WHO Comprehensive Mental Health Action Plan reflected many of the priorities for which we had been campaigning. We strongly supported its direction: better leadership, community-based care, prevention, human rights and the integration of mental health with health and social-care services.",
      "Within the UK, the Francis Inquiry intensified the focus on patient safety, compassion, openness and accountability. These developments aligned with our belief that care should be judged by whether people were treated safely, respectfully and with compassion.",
    ],
    areas: "The Philippines, shelter, clean water, mental health and patient safety",
    contribution: "Fundraising, supplies, advocacy and standards-focused campaigning",
    routes: "Humanitarian appeals, community organisations and health and social-care networks",
    sources: [
      {
        label: "United Nations — Typhoon Haiyan recovery",
        href: "https://www.un.org/development/desa/en/news/intergovernmental-coordination/un-renews-pledge-to-help-philippines-recover-from-deadly-typhoon.html",
      },
      {
        label: "WHO — Comprehensive Mental Health Action Plan",
        href: "https://www.who.int/publications/i/item/9789241506021",
      },
    ],
  },
  {
    year: "2014",
    title: "Ebola, autism and changes in care and family support",
    context:
      "The West African Ebola outbreak became the largest Ebola epidemic recorded, while major changes in England affected care, safeguarding, disability, families and special educational needs.",
    stats: [
      { value: "3,685", label: "Reported Ebola cases by the end of August 2014" },
      { value: "1,841", label: "Reported deaths by that point" },
      { value: "4 countries", label: "Countries at the centre of the early international response" },
      { value: "2 major Acts", label: "Care and family legislation changing UK responsibilities" },
    ],
    impact:
      "The outbreak placed extraordinary pressure on hospitals, healthcare workers and communities. In England, the Care Act and Children and Families Act changed expectations around safeguarding, support and SEND provision.",
    response: [
      "We supported appeals connected with the Ebola emergency in West Africa.",
      "We helped raise money and support the provision of protective equipment and other essential medical goods through West African charities and community organisations supporting affected families and healthcare services.",
      "In the UK, autism, education and the rights of children and families were becoming increasingly important parts of our campaigning. We advocated for better pathways for autistic children, adults and carers.",
      "We also engaged with issues addressed through the Care Act and the Children and Families Act, including safeguarding, family support, disability, SEND and access to appropriate care. We continued pressing for mental health and autism to be brought to the forefront.",
    ],
    areas: "West Africa, Ebola, healthcare workers, autism, children and families",
    contribution: "Fundraising, protective equipment, awareness and campaigning",
    routes: "West African charities, community organisations and UK care networks",
    sources: [
      {
        label: "WHO — Ebola situation report, September 2014",
        href: "https://www.who.int/emergencies/disease-outbreak-news/item/2014_09_04_ebola-en",
      },
      {
        label: "UK Government — Think Autism strategy",
        href: "https://www.gov.uk/government/publications/think-autism-an-update-to-the-government-adult-autism-strategy",
      },
    ],
  },
  {
    year: "2015",
    title: "Nepal, Yemen, refugees and SEND",
    context:
      "The Nepal earthquake destroyed homes, schools and health facilities. Conflict in Yemen disrupted essential services, while more than one million people reached Europe during the wider refugee crisis.",
    stats: [
      { value: "8,800+", label: "People killed following the Nepal earthquake" },
      { value: "800,000+", label: "Buildings and monuments damaged or destroyed" },
      { value: "1 million+", label: "People reaching Europe during the refugee crisis" },
      { value: "Nearly 4,000", label: "People feared drowned during Mediterranean crossings" },
    ],
    impact:
      "Families lost homes, healthcare, education and livelihoods. Refugees travelling by dangerous routes required housing, food, clothing, protection and access to appropriate healthcare.",
    response: [
      "We raised money and collected blankets, clothing and medical supplies following the Nepal earthquake.",
      "We supported affected communities through charitable and religious organisations, including work connected with children and orphanages.",
      "We also supported humanitarian appeals for Yemen as conflict displaced families and disrupted hospitals, food supplies, water and other essential services.",
      "Within the UK, we continued working around autism, special educational needs and disability in schools. We supported families trying to understand new legislation and guidance and campaigned for children with SEND to be recognised as part of the wider school community.",
    ],
    areas: "Nepal, Yemen, refugees, orphanages, autism and SEND",
    contribution: "Blankets, clothing, medical support, fundraising and campaigning",
    routes: "Religious communities, charities, refugee organisations and education networks",
    sources: [
      {
        label: "United Nations — humanitarian response to the Nepal earthquake",
        href: "https://www.un.org/en/chronicle/article/humanitarian-response-2015-nepal-earthquake",
      },
      {
        label: "UNHCR — one million refugees and migrants reached Europe",
        href: "https://www.unhcr.org/news/latest/2015/12/5683d0b56/million-refugees-migrants-flee-europe-2015.html",
      },
    ],
  },
  {
    year: "2016",
    title: "Zika, Syria and bringing SEND into the mainstream",
    context:
      "WHO declared the association between Zika infection, microcephaly and neurological disorders a public-health emergency, while the Syrian crisis and barriers facing autistic and SEND families continued.",
    stats: [
      { value: "55", label: "Countries and territories reporting continuing Zika transmission" },
      { value: "42", label: "Countries experiencing a first documented outbreak since 2015" },
      { value: "6", label: "Countries reporting potentially associated fetal abnormalities" },
      { value: "13", label: "Countries reporting increased or associated neurological illness" },
    ],
    impact:
      "The public-health emergency created particular concern for pregnant women, babies and families. In the UK, families still faced fragmented routes to autism, SEND and other neurodevelopmental support.",
    response: [
      "We supported work relating to pregnant women, babies and children affected by the Zika emergency, including sharing information and supporting awareness of the risks faced by families.",
      "We continued helping Syrian families and supporting appeals for people displaced by the conflict.",
      "Within the UK, we worked with autistic people and families attempting to obtain recognition, assessments and appropriate services.",
      "We continued campaigning for autism, disability and special educational needs to become part of mainstream education and health planning. Support should not depend upon a family repeatedly challenging fragmented systems.",
    ],
    areas: "Zika, pregnant women, children, Syria, autism and SEND",
    contribution: "Health information, family support, humanitarian assistance and campaigning",
    routes: "Health, refugee, autism, education and community networks",
    sources: [
      {
        label: "WHO — Zika situation report, April 2016",
        href: "https://www.who.int/publications/m/item/zika-situation-report-28-april-2016",
      },
      {
        label: "WHO — Zika public-health emergency",
        href: "https://www.who.int/emergencies/situations/zika-virus-outbreak",
      },
    ],
  },
  {
    year: "2017",
    title: "Rohingya refugees, Yemen and Grenfell",
    context:
      "Rohingya families fled Myanmar into Bangladesh, Yemen experienced the world’s largest cholera outbreak, and the Grenfell Tower fire created profound loss, displacement and trauma in London.",
    stats: [
      { value: "Nearly 500,000", label: "Rohingya refugees reaching Bangladesh within weeks" },
      { value: "983,484", label: "Suspected cholera cases reported in Yemen by December" },
      { value: "2,225", label: "Cholera-associated deaths reported in Yemen" },
      { value: "72", label: "People killed in the Grenfell Tower fire" },
    ],
    impact:
      "The emergencies left families without safe shelter, water, healthcare or stable community support. Grenfell also created long-term housing, bereavement and mental-health needs within London.",
    response: [
      "We supported Rohingya refugees who had fled Myanmar and crossed into Bangladesh.",
      "We helped collect clothing, blankets, food and financial contributions through Bangladeshi, Burmese, Muslim and humanitarian organisations.",
      "We also supported humanitarian work in Yemen, including appeals relating to food, clean water and medical assistance.",
      "The Grenfell Tower fire was one of the most distressing emergencies we encountered in the UK. We went to the Grenfell area to support community relief efforts, helping with goods, food and practical support for people who had lost homes, possessions and family members. The grief and trauma affected the wider community as a whole.",
    ],
    areas: "Rohingya refugees, Bangladesh, Yemen, Grenfell, housing and grief",
    contribution: "Food, clothing, blankets, clean-water support, goods and community assistance",
    routes: "Muslim charities, humanitarian organisations and local community relief efforts",
    sources: [
      {
        label: "UNHCR — Rohingya emergency in Bangladesh",
        href: "https://www.unhcr.org/uk/news/briefing-notes/unhcr-scales-delivery-aid-rohingya-refugees-bangladesh",
      },
      {
        label: "UK Government — Grenfell Tower memorial statement",
        href: "https://www.gov.uk/government/news/grenfell-tower-memorial-commission-remembers-the-72-people-who-lost-their-lives",
      },
    ],
  },
  {
    year: "2018",
    title: "Ebola in the Congo, the Sulawesi disaster and specialised neurodevelopmental care",
    context:
      "The Democratic Republic of the Congo faced Ebola amid conflict and insecurity, while an earthquake, tsunami and liquefaction devastated Central Sulawesi in Indonesia.",
    stats: [
      { value: "591", label: "Ebola cases reported in North Kivu and Ituri by year end" },
      { value: "357", label: "Deaths reported during the outbreak by that point" },
      { value: "2,000+", label: "People killed in the Sulawesi disaster" },
      { value: "220,000+", label: "People displaced in Central Sulawesi" },
    ],
    impact:
      "Conflict complicated disease control in the Congo. In Sulawesi, homes, hospitals, roads and community infrastructure were destroyed, leaving children and families without stable support.",
    response: [
      "We raised money for work connected with the Ebola outbreak in the Democratic Republic of the Congo, including appeals for healthcare workers, hospitals and affected communities.",
      "We also supported humanitarian appeals following the earthquake and tsunami in Central Sulawesi, Indonesia.",
      "We helped with fundraising and the provision of food, clothing, shelter-related assistance and support for children and orphanages.",
      "In the UK, our work around ADHD and other neurodevelopmental conditions was becoming increasingly specialised. We saw growing professional and NHS recognition of proper assessment, diagnosis and support, alongside a stronger focus on CQC standards and responsible clinical practice.",
    ],
    areas: "The Congo, Ebola, Indonesia, children, ADHD and neurodevelopment",
    contribution: "Fundraising, food, clothing, shelter support and standards-focused work",
    routes: "Humanitarian organisations, healthcare networks, orphanages and professional services",
    sources: [
      {
        label: "WHO — Ebola outbreak in the DRC, December 2018",
        href: "https://www.who.int/emergencies/disease-outbreak-news/item/28-december-2018-ebola-drc-en",
      },
      {
        label: "United Nations — Sulawesi earthquake and tsunami response",
        href: "https://news.un.org/en/story/2018/10/1022142",
      },
    ],
  },
  {
    year: "2019",
    title: "Cyclone Idai and the beginning of a wider international network",
    context:
      "Cyclone Idai damaged hospitals, homes, water and sanitation systems across Mozambique. The Congo was also facing severe Ebola and measles outbreaks.",
    stats: [
      { value: "91+", label: "Health centres damaged by Cyclones Idai and Kenneth" },
      { value: "6,768", label: "Cholera cases reported in Cyclone Idai-affected areas" },
      { value: "3,313", label: "Ebola cases reported in the DRC by December" },
      { value: "250,000+", label: "Suspected measles cases reported in the DRC" },
    ],
    impact:
      "Damaged health, water and sanitation systems increased the risk of cholera and malaria in Mozambique. In the Congo, multiple disease outbreaks placed communities and healthcare services under severe pressure.",
    response: [
      "We responded again to Mozambique following the devastation caused by Cyclone Idai.",
      "We supported appeals connected with damaged hospitals, displaced children and families, clean water, cholera prevention and other urgent health needs. We worked with African community organisations and supported fundraising for affected areas.",
      "This year also marked an important change in the way our wider work was developing. More clinicians and professional contributors were becoming connected with us, and relationships involving hospitals, mental health, ADHD and other areas of healthcare were beginning to develop across a wider international network.",
      "We started to speak more openly about the work we had undertaken over many years and to consider how other people could contribute. This was not yet the Global Health Access Trust. It was the beginning of the international network and way of working that would later help shape it.",
    ],
    areas: "Mozambique, hospitals, cholera, children, mental health and ADHD",
    contribution: "Fundraising, clean-water and health support, professional networking and coordination",
    routes: "African community organisations, clinicians, hospitals and international professional contacts",
    sources: [
      {
        label: "WHO Africa — Cyclones Idai and Kenneth situation report",
        href: "https://www.afro.who.int/publications/tropical-cyclones-idai-and-kenneth-mozambique-situation-report-5",
      },
      {
        label: "WHO — Ebola outbreak in the DRC, December 2019",
        href: "https://www.who.int/emergencies/disease-outbreak-news/item/19-december-2019-ebola-drc-en",
      },
    ],
  },
];

const decadeThemes = [
  ["Humanitarian emergencies", "Support following earthquakes, floods, cyclones, tsunamis, epidemics and major fires."],
  ["Refugees and displacement", "Food, clothing, blankets, shelter and financial support for people forced from their homes."],
  ["Children and families", "Support for orphanages, displaced children, pregnant women and families facing trauma or bereavement."],
  ["Mental health and disability", "Sustained campaigning to bring mental health, autism, disability and neurodevelopment into mainstream services."],
  ["SEND and education", "Support for children and families seeking appropriate recognition, provision and inclusion."],
  ["Professional networks", "An expansion from individual appeals towards relationships involving clinicians, hospitals and international contributors."],
];

export const CharitableHistory2010sPage = () => {
  return (
    <>
      <SEO
        title="2010–2019 Charitable History"
        description="A year-by-year record of voluntary humanitarian response, mental-health advocacy, autism and SEND campaigning, and the development of a wider international network from 2010 to 2019."
        canonical="/our-history/2010-2019"
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
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-primary">2010–2019</p>
          <h1 className="mb-5 max-w-4xl text-4xl font-serif font-bold leading-tight sm:text-5xl lg:text-6xl">
            Humanitarian response, mental-health reform and a growing international network
          </h1>
          <div className="max-w-4xl space-y-4 text-lg leading-relaxed text-muted-foreground">
            <p>
              Throughout the 2010s, our voluntary charitable work continued in response to earthquakes, floods, conflict, epidemics and mass displacement.
            </p>
            <p>
              We raised money, collected clothing, blankets, tents, food, hygiene supplies and medical goods, supported orphanages and hospitals, and worked through faith organisations, community groups, refugee organisations and established charities.
            </p>
            <p>
              Alongside this humanitarian work, we campaigned consistently for mental health, autism, disability and special educational needs to receive greater public, professional and institutional attention. By 2019, clinicians, hospitals and international contributors were beginning to connect around a wider shared purpose.
            </p>
          </div>
        </header>

        <section className="mt-10" aria-labelledby="decade-overview">
          <h2 id="decade-overview" className="mb-6 text-2xl font-serif font-bold">The decade at a glance</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
            {records.map((record) => (
              <a
                key={record.year}
                href={`#year-${record.year}`}
                className="inline-flex min-w-16 justify-center border border-foreground/15 px-3 py-2 text-xs font-semibold text-foreground no-underline transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
              >
                {record.year}
              </a>
            ))}
          </div>
        </nav>

        <div className="mt-12 space-y-20">
          {records.map((record) => (
            <article key={record.year} id={`year-${record.year}`} className="scroll-mt-40 border-t border-foreground/10 pt-10">
              <div className="grid gap-8 lg:grid-cols-[150px_1fr] lg:gap-12">
                <div>
                  <div className="text-5xl font-serif font-bold text-primary">{record.year}</div>
                  <div className="mt-4 h-px w-16 bg-primary/30" />
                </div>

                <div>
                  <h2 className="mb-4 text-3xl font-serif font-bold leading-tight sm:text-4xl">{record.title}</h2>
                  <p className="mb-8 max-w-4xl text-lg leading-relaxed text-muted-foreground">{record.context}</p>

                  <section className="mb-9 border border-primary/20 bg-primary/[0.035] p-5 sm:p-7" aria-label={`The scale of the emergency in ${record.year}`}>
                    <p className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-primary">The scale of the emergency</p>
                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                      {record.stats.map((stat) => (
                        <div key={`${stat.value}-${stat.label}`} className="border-l-2 border-primary/35 pl-4">
                          <div className="text-2xl font-serif font-bold text-foreground sm:text-3xl">{stat.value}</div>
                          <p className="mb-0 mt-2 text-xs leading-relaxed text-muted-foreground">{stat.label}</p>
                        </div>
                      ))}
                    </div>
                    <p className="mb-0 mt-6 border-t border-primary/15 pt-5 text-sm leading-relaxed text-muted-foreground">
                      {record.impact}
                    </p>
                  </section>

                  <section aria-label={`How we responded in ${record.year}`}>
                    <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-primary">How we responded</p>
                    <div className="max-w-4xl space-y-4 text-base leading-relaxed text-foreground/85">
                      {record.response.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  </section>

                  <dl className="mt-8 grid gap-4 border-y border-foreground/10 py-6 sm:grid-cols-3">
                    <div>
                      <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">Areas of support</dt>
                      <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{record.areas}</dd>
                    </div>
                    <div>
                      <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">Type of contribution</dt>
                      <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{record.contribution}</dd>
                    </div>
                    <div>
                      <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">Delivery routes</dt>
                      <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{record.routes}</dd>
                    </div>
                  </dl>

                  <div className="mt-6">
                    <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Authoritative sources for global figures</p>
                    <div className="flex flex-wrap gap-x-5 gap-y-2">
                      {record.sources.map((source) => (
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
                </div>
              </div>
            </article>
          ))}
        </div>

        <section className="mt-20 border-y border-foreground/10 bg-muted/20 px-6 py-10 sm:px-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-primary">What the 2010s taught us</p>
          <h2 className="mb-5 text-3xl font-serif font-bold sm:text-4xl">A wider network was beginning to take shape</h2>
          <div className="max-w-4xl space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              Earthquakes, floods, epidemics, conflict and unsafe housing could each leave people without healthcare, shelter, food, water or protection. Our contribution remained practical and voluntary: collecting goods, raising money and supporting hospitals, orphanages, refugees and emergency appeals.
            </p>
            <p>
              At the same time, our UK work became increasingly focused on the quality and accessibility of services. Mental health, autism, ADHD, disability and SEND needed to become part of mainstream health, education and social-care planning.
            </p>
            <p>
              By 2019, clinicians, hospitals, community organisations and international contributors were increasingly connected around the work. What had begun as repeated voluntary responses to individual emergencies was starting to develop into a broader international network.
            </p>
            <p>
              The values remained the same: compassion, dignity, practical action and a commitment to people who might otherwise be overlooked. The structure through which those values would eventually operate was beginning to take shape.
            </p>
          </div>
        </section>

        <section className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link
            to="/our-history/2000-2009"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary no-underline hover:underline"
          >
            <ArrowLeft className="h-4 w-4" /> Previous: 2000–2009
          </Link>
          <Link
  to="/our-history/2020-2026"
  className="inline-flex items-center gap-2 text-sm font-semibold text-primary no-underline hover:underline"
>
  Next: 2020–2026 <ArrowRight className="h-4 w-4" />
</Link>
        </section>
      </ContentLayout>
    </>
  );
};
