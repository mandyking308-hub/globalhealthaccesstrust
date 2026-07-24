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
    year: "2000",
    title: "Mozambique floods, child health and disability access",
    context:
      "Severe flooding in Mozambique displaced communities, damaged homes, crops, hospitals and transport routes, and increased the risks associated with hunger, unsafe water and infectious disease.",
    stats: [
      { value: "900,000", label: "People estimated to have been affected by the floods" },
      { value: "230,000", label: "People estimated to have been internally displaced" },
      { value: "180,000", label: "Affected children estimated to have been under five" },
      { value: "74 camps", label: "Temporary sites sheltering around 250,000 people" },
    ],
    impact:
      "The flooding disrupted shelter, healthcare, food production, clean water and sanitation. Young children and families living in poverty faced particularly serious risks from disease, malnutrition and prolonged displacement.",
    response: [
      "We raised money and collected essential goods for communities affected by the floods in Mozambique.",
      "Our support was provided through African charities, churches and community organisations already involved in relief activity. Sponsored events were an important part of the fundraising effort and helped bring other people into the response.",
      "During this period, our charitable work also placed a strong emphasis on child health, poverty, mental health and disability access.",
      "We supported work intended to improve the circumstances of children and families facing hardship and to reduce the barriers experienced by disabled people.",
      "These different activities were connected by the same concern: people facing poverty, illness or displacement should be able to obtain practical support and participate in their communities with dignity.",
    ],
    areas: "Mozambique, children, poverty, mental health and disability",
    contribution: "Fundraising, sponsored events, collections and community support",
    routes: "African charities, churches and community organisations",
    sources: [
      {
        label: "United Nations — Mozambique flood emergency",
        href: "https://press.un.org/en/2000/20000309.ecosoc5885.doc.html",
      },
    ],
  },
  {
    year: "2001",
    title: "The Gujarat earthquake and Afghanistan",
    context:
      "The Gujarat earthquake caused enormous loss of life, injury and destruction. Afghanistan was simultaneously facing conflict, severe deprivation and one of the world's largest and longest-running displacement crises.",
    stats: [
      { value: "20,000+", label: "People killed by the Gujarat earthquake" },
      { value: "166,836", label: "People reported injured" },
      { value: "Nearly 1 million", label: "Buildings destroyed or damaged" },
      { value: "3.5 million+", label: "Afghan refugees already living outside the country" },
    ],
    impact:
      "The Gujarat earthquake damaged homes, schools, hospitals, businesses, roads and essential infrastructure. In Afghanistan, conflict and drought had left millions dependent on humanitarian support and uncertain whether they could safely return home.",
    response: [
      "The Gujarat earthquake became one of the largest areas of our charitable work during 2001.",
      "We undertook substantial fundraising and supported collections in response to the widespread loss of life, injuries and destruction.",
      "We worked through charitable and community networks to help raise money and provide practical assistance for affected families.",
      "Afghanistan was the other principal focus of our support during this year. Conflict, poverty and displacement had left large numbers of people dependent upon humanitarian assistance.",
      "We sent money through established routes supporting Afghan families and people affected by the conflict.",
      "Our work during the year was concentrated on these two emergencies. We were not significantly involved in the HIV-related initiatives taking place at the same time, and the historical record does not suggest otherwise.",
    ],
    areas: "Gujarat and Afghanistan",
    contribution: "Substantial fundraising, collections and financial assistance",
    routes: "Charities and community organisations",
    sources: [
      {
        label: "USGS — 2001 Gujarat earthquake",
        href: "https://earthquake.usgs.gov/earthquakes/eventpage/usp000a8ds/executive",
      },
      {
        label: "UNHCR — Afghanistan refugee response",
        href: "https://www.unhcr.org/emergencies/afghanistan-emergency",
      },
    ],
  },
  {
    year: "2002",
    title: "Famine, drought and support for orphaned children",
    context:
      "Southern Africa faced a regional food emergency caused by drought, flooding, poor harvests, rising prices and exhausted household resources. Children and families already affected by poverty were especially vulnerable.",
    stats: [
      { value: "10.2 million", label: "People included in the World Food Programme regional appeal" },
      { value: "6.1 million", label: "People expected to require food aid in Zimbabwe" },
      { value: "3.3 million", label: "People requiring food assistance in Malawi" },
      { value: "Six countries", label: "Southern African countries at the centre of the emergency" },
    ],
    impact:
      "Families were selling livestock and household assets simply to obtain food. Repeated poor harvests weakened the usual ways communities coped, while children, older people and families caring for orphans faced the greatest insecurity.",
    response: [
      "We raised money in response to famine and drought across southern Africa.",
      "Our contribution included collections of food and clothing, together with practical and financial support directed through African community organisations and charities.",
      "We also supported orphanages and children who had lost parents or stable family care.",
      "The food emergency was closely connected with poverty, illness and the growing number of children being cared for by relatives, community organisations or orphanages.",
      "We worked with African community networks in the UK and supported sponsored events and collections intended to provide direct help.",
      "This was not simply a response to a shortage of food. Families were also losing livelihoods, homes and the ability to care safely for children and vulnerable relatives.",
    ],
    areas: "Famine, drought, orphanages and African communities",
    contribution: "Food, clothing, fundraising and practical support",
    routes: "African community organisations, charities and sponsored appeals",
    sources: [
      {
        label: "World Food Programme — Southern Africa food crisis",
        href: "https://one.wfp.org/Newsroom/in_depth/Africa/sa_zimbabwe020705.htm",
      },
      {
        label: "World Food Programme — Malawi food crisis",
        href: "https://one.wfp.org/Newsroom/in_depth/Africa/malawi_0209.htm",
      },
    ],
  },
  {
    year: "2003",
    title: "Iraq, Sudan and Darfur",
    context:
      "War in Iraq disrupted safety, healthcare and essential services, while violence in Darfur forced growing numbers of Sudanese families to flee their homes and cross into neighbouring Chad.",
    stats: [
      { value: "110,000+", label: "Refugees inside Iraq requiring continued assistance" },
      { value: "Up to 500,000", label: "Iraqi refugees included in early return planning" },
      { value: "91,000", label: "Sudanese refugees who had fled Darfur into Chad by December" },
      { value: "25,000", label: "People reported to have crossed into Chad during December alone" },
    ],
    impact:
      "Conflict left families without reliable access to shelter, medicines, hospitals and other essential services. In Darfur, attacks on villages and continued insecurity turned displacement into a rapidly growing regional emergency.",
    response: [
      "We supported Iraqi families affected by war, displacement and the disruption of essential services.",
      "A substantial part of our work involved refugee appeals and fundraising for medical-relief organisations assisting people affected by the conflict.",
      "We helped support the collection and provision of supplies for families and communities facing severe insecurity.",
      "We also raised money for Sudan and Darfur as reports of violence and displacement increased.",
      "Our work was delivered through humanitarian organisations and Christian charities with established relief programmes and contacts.",
      "Faith organisations played an important role in bringing communities together, collecting donations and directing assistance towards people who had lost homes, healthcare and other basic services.",
      "We continued to recognise that conflict created needs beyond immediate physical injuries. Displacement, fear, bereavement and the destruction of communities also produced long-term mental-health and social-care consequences.",
    ],
    areas: "Iraq, Sudan, Darfur, refugees and medical relief",
    contribution: "Fundraising, supplies and support for relief appeals",
    routes: "Medical-relief organisations, Christian charities and humanitarian networks",
    sources: [
      {
        label: "UNHCR — assistance operations in Iraq",
        href: "https://www.unhcr.org/news/news-releases/unhcr-appeals-funds-aid-returning-iraqis",
      },
      {
        label: "UNHCR — Darfur refugees entering Chad",
        href: "https://www.unhcr.org/us/news/unhcr-team-help-ease-invisible-emergency-eastern-chad",
      },
    ],
  },
  {
    year: "2004",
    title: "The Indian Ocean tsunami",
    context:
      "The Indian Ocean earthquake and tsunami devastated coastal communities across Indonesia, Sri Lanka, India, Thailand and other countries, becoming one of the deadliest natural disasters in modern history.",
    stats: [
      { value: "227,000+", label: "People killed across the affected region" },
      { value: "1.7 million", label: "People displaced from their homes" },
      { value: "Around 5 million", label: "People directly or indirectly affected" },
      { value: "Six countries", label: "WHO South-East Asia countries suffering major coastal devastation" },
    ],
    impact:
      "Entire communities were destroyed. Survivors faced injury, bereavement, homelessness and the loss of hospitals, schools, water systems, sanitation, roads and local livelihoods.",
    response: [
      "The Indian Ocean tsunami led to another major period of voluntary fundraising and collection activity.",
      "The scale of the loss was horrific. Entire families and communities had been swept away, while survivors were left without homes, food, clothing, healthcare or safe water.",
      "We raised money and helped collect clothing, food and other essential supplies for affected communities.",
      "Our work supported appeals relating particularly to Sri Lanka and Indonesia, alongside assistance intended for the wider region.",
      "We worked through charities, churches and community networks capable of directing support to organisations responding on the ground.",
      "Children who had lost parents or stable family care were a particular concern. We also supported charitable work connected with orphanages and children requiring longer-term protection.",
      "The emergency demonstrated why support could not end after the first weeks of public attention. Rebuilding communities, health services and family life would require sustained international assistance.",
    ],
    areas: "Sri Lanka, Indonesia, affected coastal communities and children",
    contribution: "Fundraising, food, clothing and essential supplies",
    routes: "Charities, churches and community networks",
    sources: [
      {
        label: "WHO — ten years after the 2004 tsunami",
        href: "https://www.who.int/publications/i/item/ten-years-after-the-tsunami-of-2004-impact-action-change-future",
      },
      {
        label: "WHO — environmental health relief after the tsunami",
        href: "https://www.who.int/publications/i/item/B0056",
      },
    ],
  },
  {
    year: "2005",
    title: "The Kashmir earthquake",
    context:
      "The earthquake across northern Pakistan and Pakistan-administered Kashmir caused catastrophic loss of life and widespread homelessness. Damaged roads, mountain terrain and approaching winter conditions complicated the relief effort.",
    stats: [
      { value: "73,000+", label: "People killed in Pakistan and the surrounding region" },
      { value: "3.5 million", label: "People rendered homeless" },
      { value: "128,309", label: "People sustaining serious injuries" },
      { value: "68%", label: "Healthcare infrastructure in the affected area damaged or destroyed" },
    ],
    impact:
      "Families faced winter without safe shelter, while hospitals and emergency services struggled with mass injuries, including spinal trauma, limb injuries and amputations. Isolated mountain communities were difficult to reach.",
    response: [
      "We supported substantial collections for communities affected by the Kashmir earthquake.",
      "This included blankets, warm clothing and other essential items required by families who had lost homes as winter approached.",
      "We raised money and sent financial assistance through trusted charitable and community routes serving Kashmir, Pakistan and the wider affected region.",
      "Children had been displaced, schools and homes had been destroyed, and many families had lost relatives and sources of income.",
      "We also wanted to support emergency workers and organisations operating on the ground under extremely difficult conditions.",
      "Relief teams were working in mountainous areas where damaged roads, severe weather and the scale of the destruction made it difficult to reach isolated communities.",
      "Our contribution focused on providing practical goods, raising money and supporting the organisations and workers attempting to reach those communities.",
    ],
    areas: "Kashmir, Pakistan, displaced children and emergency relief",
    contribution: "Blankets, clothing, fundraising and financial assistance",
    routes: "Muslim charities, community organisations and trusted relief networks",
    sources: [
      {
        label: "WHO — disability and the 2005 Pakistan earthquake",
        href: "https://www.emro.who.int/emhj-volume-16-2010/volume-16-supplement/article-13.html",
      },
      {
        label: "WHO — medicines and damaged health infrastructure",
        href: "https://www.emro.who.int/emhj-volume-16-2010/volume-16-supplement/article-14.html",
      },
    ],
  },
  {
    year: "2006",
    title: "Lebanon and the Yogyakarta earthquake",
    context:
      "Conflict in Lebanon displaced a substantial proportion of the population and damaged homes and essential infrastructure. An earthquake near Yogyakarta in Indonesia also left families requiring shelter and practical assistance.",
    stats: [
      { value: "About 1 million", label: "Lebanese people displaced during the conflict" },
      { value: "1,187", label: "People reported killed in Lebanon" },
      { value: "4,092", label: "People reported injured in Lebanon" },
      { value: "50,000 families", label: "Yogyakarta households still lacking adequate shelter" },
    ],
    impact:
      "Families lost homes and access to safe water, food, healthcare and transport. In Indonesia, tens of thousands remained without adequate shelter as the rainy season approached.",
    response: [
      "We organised and supported fundraising and collections for families displaced by the conflict in Lebanon.",
      "We worked through faith organisations and established charitable appeals helping families who had lost their homes or access to essential services.",
      "Food, blankets and housing supplies formed part of the practical support being requested.",
      "We also supported humanitarian appeals following the earthquake near Yogyakarta in Indonesia.",
      "Families required food, shelter materials, household supplies and assistance rebuilding homes damaged or destroyed by the earthquake.",
      "Our work again relied upon organisations that had delivery routes and people able to assess needs locally.",
      "The focus was on helping displaced families obtain basic necessities and supporting organisations providing practical assistance during the emergency and early recovery period.",
    ],
    areas: "Lebanon, displaced families and the Indonesian earthquake",
    contribution: "Food, blankets, housing supplies and fundraising",
    routes: "Faith organisations, charities and international appeals",
    sources: [
      {
        label: "United Nations — 2006 Lebanon displacement and casualties",
        href: "https://www.un.org/unispal/document/auto-insert-183291/",
      },
      {
        label: "United Nations — shelter following the Yogyakarta earthquake",
        href: "https://www.un.org/sg/en/content/highlight/2006-10-20.html",
      },
    ],
  },
  {
    year: "2007",
    title: "UK flooding, Cyclone Sidr and East African support",
    context:
      "Severe flooding affected communities across England, while Cyclone Sidr devastated parts of Bangladesh. Our wider charitable involvement also continued through Kenya and other East African community networks.",
    stats: [
      { value: "55,000+", label: "UK homes and businesses flooded" },
      { value: "Around 7,000", label: "People rescued during the UK floods" },
      { value: "13", label: "Lives lost during the UK flooding" },
      { value: "2.6 million", label: "People requiring immediate assistance after Cyclone Sidr" },
    ],
    impact:
      "Flooding caused displacement, financial loss, disruption to water, power and transport, and long-lasting distress. In Bangladesh, the cyclone destroyed homes and livelihoods and created urgent needs for food, shelter and healthcare.",
    response: [
      "In the UK, we helped support families affected by severe flooding.",
      "Our contribution included furniture, household goods and practical housing-related assistance for people whose homes and possessions had been damaged or destroyed.",
      "We worked through community and charitable routes helping families begin to rebuild their lives.",
      "We also responded to the devastation caused by Cyclone Sidr in Bangladesh.",
      "Having supported Bangladesh following previous disasters, we again became involved in fundraising and practical assistance for affected communities.",
      "We supported appeals relating to food, shelter, families and the rebuilding of damaged homes and services.",
      "During this period, we also undertook considerable charitable work connected with Kenya and other parts of East Africa.",
      "This included involvement in events, fundraising and community support. The precise local projects and locations will be added to the historical record as further details are recovered.",
    ],
    areas: "UK flood victims, Bangladesh, Kenya and East Africa",
    contribution: "Furniture, household goods, housing support, fundraising and events",
    routes: "Charities, community organisations and international appeals",
    sources: [
      {
        label: "Environment Agency — the summer 2007 floods",
        href: "https://environmentagency.blog.gov.uk/2022/06/24/15-years-of-technological-advances-since-the-2007-floods/",
      },
      {
        label: "WHO — disasters and mental health in South-East Asia",
        href: "https://www.who.int/bangladesh/news/detail/25-07-2016-disasters-and-mental-health",
      },
    ],
  },
  {
    year: "2008",
    title: "Myanmar, the Sichuan earthquake and families without shelter",
    context:
      "Cyclone Nargis in Myanmar and the Sichuan earthquake in China made 2008 one of the deadliest disaster years of the period, destroying homes, schools, health facilities and community infrastructure.",
    stats: [
      { value: "138,366", label: "People dead or missing following Cyclone Nargis" },
      { value: "87,476", label: "People killed by the Sichuan earthquake" },
      { value: "235,816", label: "Deaths from natural disasters worldwide during 2008" },
      { value: "11,000", label: "Hospitals damaged or destroyed in the Sichuan disaster" },
    ],
    impact:
      "Large numbers of people were displaced without adequate shelter, food, clean water or medical care. The destruction of hospitals and schools made recovery especially difficult for children and vulnerable families.",
    response: [
      "We supported humanitarian work following Cyclone Nargis in Myanmar and the Sichuan earthquake in China.",
      "People had been displaced on an enormous scale and many had nowhere safe to live. Homes, schools and local services had been destroyed, while access to shelter, food and medical assistance was severely restricted.",
      "We helped with fundraising, clothing and practical support through Chinese, Burmese and international humanitarian organisations.",
      "We also supported orphanages and projects working with children who had lost parents, homes or stable family care.",
      "The circumstances facing children were particularly distressing. Some had been separated from relatives, while others had lost schools and the wider community structures upon which they depended.",
      "At the same time, our concern with the quality of health and social care was continuing to develop.",
      "The needs of displaced and vulnerable people demonstrated the importance of clear standards, safe services and organisations that could be held responsible for the quality of care they provided.",
    ],
    areas: "Myanmar, China, displaced families, children and orphanages",
    contribution: "Fundraising, clothing and practical assistance",
    routes: "Chinese, Burmese and international humanitarian organisations",
    sources: [
      {
        label: "United Nations — global disaster impact in 2008",
        href: "https://www.un.org/unispal/document/auto-insert-210146/",
      },
      {
        label: "WHO — protecting hospitals and schools from disasters",
        href: "https://www.who.int/news/item/11-12-2010-call-to-protect-hospitals-schools-from-impact-of-disasters",
      },
    ],
  },
  {
    year: "2009",
    title: "H1N1, autism and regulated standards of care",
    context:
      "The H1N1 influenza pandemic spread across every continent. In England, the Autism Act and the launch of the Care Quality Commission also marked important changes in autism policy and the regulation of health, mental health and adult social care.",
    stats: [
      { value: "168 countries", label: "Countries and territories reporting H1N1 by July 2009" },
      { value: "12,220+", label: "Laboratory-confirmed deaths reported by December" },
      { value: "Up to 575,000", label: "Deaths later estimated worldwide" },
      { value: "1 April 2009", label: "Date the Care Quality Commission began operating" },
    ],
    impact:
      "The pandemic created widespread uncertainty and placed pressure on healthcare workers and vulnerable families. At the same time, regulation and autism policy were becoming more explicitly connected with safety, accountability and access to appropriate support.",
    response: [
      "During the H1N1 influenza pandemic, we provided information, advice and practical support.",
      "We supported healthcare workers and helped people and families understand the changing health guidance and the steps they could take to reduce risk.",
      "This was a period of widespread anxiety, particularly for people who were clinically vulnerable or responsible for caring for others.",
      "At the same time, support for autistic people and their families was becoming a much more significant part of our work.",
      "We assisted families seeking to understand autism, obtain appropriate support and navigate services that were not always designed around their needs.",
      "Mental health was also becoming more clearly connected with standards, regulation and the quality of services.",
      "The creation of the Care Quality Commission represented an important change in the way health, mental health and adult social care were regulated.",
      "Our work was increasingly shaped by the belief that compassionate intentions were not enough. Services also needed clear standards, responsible leadership, safe systems and proper accountability.",
      "This period helped lay the foundations for our later work across regulated mental health, autism, neurodevelopmental services and quality improvement.",
    ],
    areas: "H1N1, healthcare workers, autism, mental health and service quality",
    contribution: "Advice, family support, awareness and standards-focused work",
    routes: "Health, mental-health, autism and community networks",
    sources: [
      {
        label: "WHO — H1N1 affected countries in July 2009",
        href: "https://www.who.int/emergencies/disease-outbreak-news/item/2009_08_04-en",
      },
      {
        label: "WHO — H1N1 deaths reported by December 2009",
        href: "https://www.who.int/emergencies/disease-outbreak-news/item/2009_12_30-en",
      },
      {
        label: "WHO — estimated global H1N1 mortality",
        href: "https://www.who.int/europe/emergencies/emergency-cycle/prepare/pandemic-influenza",
      },
      {
        label: "Care Quality Commission — launch of the new regulator",
        href: "https://www.cqc.org.uk/news/releases/new-regulator-health-mental-health-adult-social-care",
      },
    ],
  },
];

const decadeThemes = [
  ["Disaster response", "Fundraising and practical help following floods, cyclones, earthquakes and the Indian Ocean tsunami."],
  ["Conflict and displacement", "Support for families affected by Afghanistan, Iraq, Darfur, Lebanon and other conflict-affected settings."],
  ["Food and poverty", "Collections and fundraising for communities affected by drought, famine and severe hardship."],
  ["Children and orphanages", "Support for children who had lost stable homes, family care or access to essential services."],
  ["Health and disability", "Growing work around child health, mental health, autism, disability access and the quality of care."],
];

export const CharitableHistory2000sPage = () => {
  return (
    <>
      <SEO
        title="2000–2009 Charitable History"
        description="A year-by-year record of voluntary disaster response, humanitarian relief, child health, autism support and community action from 2000 to 2009."
        canonical="/our-history/2000-2009"
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
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-primary">2000–2009</p>
          <h1 className="mb-5 max-w-4xl text-4xl font-serif font-bold leading-tight sm:text-5xl lg:text-6xl">
            Humanitarian relief, child health and stronger standards of care
          </h1>
          <div className="max-w-4xl space-y-4 text-lg leading-relaxed text-muted-foreground">
            <p>
              Throughout the first decade of the new millennium, our voluntary charitable work continued in response to natural disasters, conflict, displacement, famine and poverty.
            </p>
            <p>
              We raised money, collected food, clothing, blankets, furniture and essential goods, supported hospitals and emergency workers, and worked through churches, faith organisations, African community groups and established humanitarian charities.
            </p>
            <p>
              Alongside international appeals, child health, mental health, disability access and the quality of health and social care became increasingly important parts of our work. The decade also marked the beginning of a more defined focus on autism, regulated care and the standards people and families should be able to expect.
            </p>
          </div>
        </header>

        <section className="mt-10" aria-labelledby="decade-overview">
          <h2 id="decade-overview" className="mb-6 text-2xl font-serif font-bold">The decade at a glance</h2>
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
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-primary">What the 2000s taught us</p>
          <h2 className="mb-5 text-3xl font-serif font-bold sm:text-4xl">Compassion also needs standards and accountability</h2>
          <div className="max-w-4xl space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              Natural disasters could destroy entire communities in seconds. Conflict could displace families for years. Drought and famine could gradually remove every means by which people had previously supported themselves.
            </p>
            <p>
              Our contribution remained voluntary and practical. We raised money, collected goods, supported sponsored events and worked through churches, faith organisations, African community groups and established humanitarian charities. We helped with food, clothing, blankets, furniture, housing supplies and financial assistance.
            </p>
            <p>
              We also became increasingly concerned with what happened after the immediate emergency had passed. Children who had lost parents still needed stable care. People injured in earthquakes required rehabilitation. Families affected by conflict carried trauma and bereavement. Disabled people required access rather than exclusion.
            </p>
            <p>
              Within the UK, our focus on mental health, autism and the quality of health and social care became more defined. We began to see more clearly that good care required not only compassion but standards, accountability and services designed around the needs of the people using them.
            </p>
          </div>
        </section>

        <section className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link
            to="/our-history/1991-1999"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary no-underline hover:underline"
          >
            <ArrowLeft className="h-4 w-4" /> Previous: 1991–1999
          </Link>
          <div className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground">
            Next: 2010–2018 <ArrowRight className="h-4 w-4" />
            <span className="text-xs font-normal">(in preparation)</span>
          </div>
        </section>
      </ContentLayout>
    </>
  );
};