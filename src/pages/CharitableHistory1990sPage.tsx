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
    year: "1991",
    title: "Kurdish refugee support and the Bangladesh cyclone",
    context:
      "The displacement of Iraqi Kurdish communities following the Gulf War and the devastating cyclone in Bangladesh created simultaneous emergencies involving shelter, food, medical care and basic survival.",
    stats: [
      { value: "1.8 million", label: "Iraqis fled into Iran and Türkiye within weeks" },
      { value: "138,866", label: "Estimated deaths caused by the Bangladesh cyclone" },
      { value: "2–3 million", label: "People evacuated from the Bangladesh coast" },
      { value: "US$1.7bn", label: "Estimated cyclone damage in 1991 values" },
    ],
    impact:
      "The Kurdish exodus became one of the fastest refugee movements UNHCR had faced. In Bangladesh, a powerful storm surge overwhelmed coastal communities, destroying homes, livelihoods and essential infrastructure.",
    response: [
      "We organised and supported substantial collections for people affected by both emergencies. Working through hospitals, charities and community networks, we helped raise funds and collect clothing, food and other essential items.",
      "Our support extended to appeals connected with hospitals and families who had lost access to shelter, healthcare and basic necessities.",
      "The scale of both emergencies was enormous, but we believed practical action still mattered. Raising money, gathering supplies and encouraging others to contribute allowed us to add meaningful support to organisations already working with affected communities.",
      "This became the beginning of a long-standing commitment to respond whenever war, disaster or displacement left people without the essentials needed to live safely and with dignity.",
    ],
    areas: "Refugees, disaster relief, hospitals and affected families",
    contribution: "Fundraising, collections and practical assistance",
    routes: "Hospitals, charities and community networks",
    sources: [
      {
        label: "UNHCR — 1991 Iraqi refugee emergency",
        href: "https://www.unhcr.org/asia/publications/report-united-nations-high-commissioner-refugees-1992",
      },
      {
        label: "WMO — 1991 Bangladesh cyclone",
        href: "https://public.wmo.int/media/magazine-article/stepping-support-un-and-humanitarian-partners-anticipatory-action",
      },
    ],
  },
  {
    year: "1992",
    title: "Bosnia, Somalia, children and mental health",
    context:
      "The war in Bosnia and Herzegovina and the humanitarian emergency in Somalia created widespread killing, hunger, displacement and long-term trauma, with children and separated families among those most vulnerable.",
    stats: [
      { value: "100,000+", label: "Lives lost during the Bosnian war" },
      { value: "2 million+", label: "People displaced by the Bosnian conflict" },
      { value: "300,000", label: "Estimated deaths during the Somali crisis" },
      { value: "1.5 million", label: "People whose lives were reported to be in immediate danger in Somalia" },
    ],
    impact:
      "These were not isolated military events. They became humanitarian emergencies affecting entire populations, destroying homes and food systems and leaving adults and children to live with bereavement, fear and displacement.",
    response: [
      "We organised and participated in sponsored events to raise money for humanitarian appeals connected with both crises. We worked through charities and community networks, encouraging others to take part and contribute.",
      "Children were a particular concern. We were deeply affected by the impact that war, famine, displacement and separation from family could have upon their lives.",
      "Our involvement was also shaped by a growing awareness of mental health. We understood that the damage caused by conflict was not limited to physical injury. Children and adults were also living with trauma, grief, fear and uncertainty.",
      "We wanted mental health to become a stronger part of the response to humanitarian crises rather than something considered only after immediate physical needs had been addressed.",
    ],
    areas: "Bosnia, Somalia, children and mental health",
    contribution: "Sponsored events, fundraising and awareness",
    routes: "Charities and community networks",
    sources: [
      {
        label: "United Nations — Bosnia and Herzegovina",
        href: "https://www.un.org/en/observances/srebrenica-genocide-commemoration-day",
      },
      {
        label: "United Nations Peacekeeping — Somalia background",
        href: "https://peacekeeping.un.org/sites/default/files/past/unosom1backgr2.html",
      },
    ],
  },
  {
    year: "1993",
    title: "Continuing support for Bosnia and voluntary social-care work",
    context:
      "The conflict in Bosnia continued and the need for food, shelter and protection did not diminish when the first public appeals ended. In the UK, mental health and social-care needs were also becoming more visible.",
    stats: [
      { value: "2 million", label: "Bosnians forced from their homes during the war" },
      { value: "About 1 million", label: "People displaced within Bosnia and Herzegovina" },
      { value: "About 1 million", label: "Refugees elsewhere in the region and Europe" },
    ],
    impact:
      "The continuing displacement meant that humanitarian organisations needed repeated supplies rather than a single response. Families faced prolonged uncertainty, disrupted healthcare and education, and the psychological effects of war.",
    response: [
      "As the conflict in Bosnia continued, we remained involved in supporting refugee families and communities affected by the war.",
      "We helped collect food, blankets, clothing and other essential goods through churches, charities and community organisations. This was not a one-off appeal. As the crisis continued and further assistance was requested, we continued to support collections and fundraising activities.",
      "At the same time, we were becoming more involved in voluntary work connected with mental health and social care in the UK.",
      "We provided time, practical assistance and support around people experiencing difficulties within health and social-care systems. We worked alongside organisations and individuals trying to improve the support available to vulnerable people and their families.",
      "This work strengthened our understanding that mental health, physical health, social care and family circumstances could not be treated as separate issues.",
    ],
    areas: "Refugees, social care and mental health",
    contribution: "Collections, voluntary assistance and community support",
    routes: "Churches, charities and social-care networks",
    sources: [
      {
        label: "United Nations — Bosnia displacement and repatriation",
        href: "https://press.un.org/en/1996/19960117.ref1131.html",
      },
    ],
  },
  {
    year: "1994",
    title: "Rwanda, medical relief and public fundraising",
    context:
      "The genocide against the Tutsi in Rwanda and the resulting regional refugee emergency represented one of the most horrific humanitarian catastrophes of the twentieth century.",
    stats: [
      { value: "800,000+", label: "People murdered in approximately 100 days" },
      { value: "2 million+", label: "Refugees hosted by neighbouring countries" },
      { value: "2.4 million+", label: "People who fled to neighbouring countries during the wider crisis" },
      { value: "Half", label: "Approximate share of Rwanda's population uprooted in 1994" },
    ],
    impact:
      "The killings shattered families and communities, while the sudden movement of millions of people placed immense pressure on camps, hospitals, water supplies, sanitation and food distribution across the Great Lakes region.",
    response: [
      "We supported appeals focused on medical care, displaced families and communities affected by violence.",
      "A major part of our response was fundraising. We worked with charities coordinating humanitarian assistance and also took fundraising directly into the community.",
      "We went out onto the streets to speak to people, raise awareness of what was happening and ask for donations.",
      "The scale of the emergency could easily have made people feel powerless. We wanted to show that individual contributions still mattered and that collectively, communities could provide meaningful support to organisations delivering medical and humanitarian relief.",
      "We also supported awareness around donor registration and encouraged people to take practical steps that could help preserve life.",
    ],
    areas: "Rwanda, medical care and displaced families",
    contribution: "Street fundraising, public awareness and donor-registration support",
    routes: "Humanitarian charities and community appeals",
    sources: [
      {
        label: "United Nations — commemoration of the genocide in Rwanda",
        href: "https://www.un.org/sg/en/content/sg/statement/2014-04-16/secretary-generals-remarks-the-20th-commemoration-of-the-genocide-rwanda",
      },
      {
        label: "UNHCR — Rwanda refugee emergency",
        href: "https://www.unhcr.org/us/publications/statement-mrs-sadako-ogata-united-nations-high-commissioner-refugees-united-nations-1",
      },
      {
        label: "UNHCR — Rwanda historical background",
        href: "https://www.unhcr.org/us/publications/unhcr-global-appeal-1999-rwanda",
      },
    ],
  },
  {
    year: "1995",
    title: "Bosnia, Srebrenica, disability and access",
    context:
      "The genocide at Srebrenica became the worst atrocity on European soil since the Second World War and intensified the need for refugee support, practical assistance and long-term recovery.",
    stats: [
      { value: "Up to 8,000", label: "Bosnian Muslim men and boys killed or missing" },
      { value: "About 30,000", label: "Women, children and older people forcibly transferred" },
      { value: "100,000+", label: "Lives lost across the Bosnian war" },
      { value: "2 million+", label: "People displaced across the conflict" },
    ],
    impact:
      "The consequences extended far beyond the immediate killings. Families endured bereavement, trauma, destroyed communities, disability and prolonged displacement, while survivors faced the challenge of rebuilding their lives.",
    response: [
      "We continued our humanitarian support for Bosnia and for people affected by the atrocities at Srebrenica.",
      "We remained involved in fundraising, donations and the collection of equipment and essential goods for refugee families and affected communities. This support was provided through charitable, church and community networks already coordinating assistance.",
      "During the same period, we became increasingly involved in disability projects and access campaigns in the UK.",
      "We supported initiatives aimed at reducing the barriers faced by disabled people and improving their access to equipment, services and community life. This included raising awareness, helping with donations and supporting projects seeking to improve inclusion.",
      "For us, these different areas of work were connected by the same principle: people should not lose their dignity or their ability to participate in society because they had been affected by war, illness, disability or the failure of existing systems.",
    ],
    areas: "Bosnia, refugees, disability and access",
    contribution: "Fundraising, equipment, donations and campaigning",
    routes: "Churches, charities and community organisations",
    sources: [
      {
        label: "United Nations — the 1995 genocide in Srebrenica",
        href: "https://www.un.org/en/observances/srebrenica-genocide-commemoration-day/about",
      },
    ],
  },
  {
    year: "1996",
    title: "HIV charities and the Democratic Republic of the Congo",
    context:
      "New HIV treatments were beginning to offer hope, but stigma and loss remained widespread. At the same time, fighting in eastern Zaire—now the Democratic Republic of the Congo—dispersed enormous refugee populations.",
    stats: [
      { value: "3.4 million", label: "Estimated new HIV infections worldwide in 1996" },
      { value: "1.2 million", label: "Refugees receiving UNHCR care in eastern Zaire before the fighting" },
      { value: "500,000+", label: "Rwandan refugees who returned over five days" },
      { value: "250,000", label: "Zairians estimated to have been displaced by the fighting" },
    ],
    impact:
      "The year reflected two very different but connected forms of vulnerability: a global health epidemic accompanied by serious stigma, and a regional refugee emergency in which hundreds of thousands of people repeatedly lost access to shelter and humanitarian assistance.",
    response: [
      "We met and worked with people involved in HIV charities and learned more about the realities facing individuals and families affected by the condition.",
      "We supported fundraising activities for these organisations and helped raise awareness of the need for understanding, compassion and non-judgemental support.",
      "This was especially important at a time when stigma remained widespread and many people felt unable to speak openly about HIV or seek the help they needed.",
      "Internationally, conflict and displacement in the Democratic Republic of the Congo created further humanitarian need. We supported charities working with affected communities by sending money and essential goods through trusted charitable routes.",
      "Our work during this period reflected our belief that healthcare support must always be accompanied by dignity and that people affected by illness should never be defined by stigma.",
    ],
    areas: "HIV, affected families and the Democratic Republic of the Congo",
    contribution: "Fundraising, awareness, financial support and essential goods",
    routes: "HIV charities and established humanitarian organisations",
    sources: [
      {
        label: "UNAIDS — global HIV statistics",
        href: "https://www.unaids.org/en/resources/fact-sheet",
      },
      {
        label: "UNHCR — refugees in eastern Zaire",
        href: "https://www.unhcr.org/uk/news/press-releases/unhcr-worries-over-fate-refugees-zaire",
      },
      {
        label: "UNHCR — the 1996 return to Rwanda",
        href: "https://www.unhcr.org/us/publications/refugees-magazine-issue-106-focus-1996-review-rwanda-finding-way-home",
      },
    ],
  },
  {
    year: "1997",
    title: "Landmine injuries and cross-border humanitarian support",
    context:
      "Landmines continued to kill and disable civilians after fighting had ended, restricting the safe return of families and obstructing farming, rebuilding, education and ordinary community life.",
    stats: [
      { value: "About 3 million", label: "Landmines estimated to remain across Bosnia and Herzegovina" },
      { value: "17,000", label: "Minefields estimated across the country" },
      { value: "One quarter", label: "Approximate share of the country considered contaminated" },
      { value: "20%", label: "Approximate share of reported victims who were children" },
    ],
    impact:
      "Surviving a landmine explosion was often only the beginning. Survivors faced surgery, rehabilitation, disability and long-term barriers to education, employment, mobility and participation in their communities.",
    response: [
      "We raised funds for people affected by landmine injuries and participated in sponsored events designed to increase both financial support and public awareness.",
      "We also worked through overseas and cross-border charitable contacts to help support affected communities.",
      "This work was closely connected with our continuing involvement in disability and access.",
      "We understood that surviving the initial injury was only the beginning. Many people then faced barriers to education, employment, mobility and participation in their own communities.",
      "Our support was therefore not only about emergency treatment. It was also about helping people rebuild their lives.",
    ],
    areas: "Landmine survivors, rehabilitation and disability access",
    contribution: "Fundraising, sponsored events and awareness",
    routes: "Overseas and cross-border charitable contacts",
    sources: [
      {
        label: "United Nations — landmines in Bosnia and Herzegovina",
        href: "https://press.un.org/en/1997/19971218.mines18.dec.html",
      },
    ],
  },
  {
    year: "1998",
    title: "Kosovo, the Congo, Hurricane Mitch and orphanage support",
    context:
      "Conflict in Kosovo and the Congo, together with the devastation caused by Hurricane Mitch, created overlapping crises involving displacement, loss of life, damaged infrastructure and serious public-health risks.",
    stats: [
      { value: "460,000", label: "People displaced during the developing Kosovo crisis" },
      { value: "260,000", label: "People who remained internally displaced inside Kosovo" },
      { value: "2,362", label: "Confirmed deaths in Nicaragua following Hurricane Mitch" },
      { value: "55,000+", label: "People displaced in Nicaragua following the hurricane" },
    ],
    impact:
      "Hurricane Mitch damaged roads, bridges, water and sanitation systems and agricultural production, increasing the risk of cholera and other disease. War and displacement left many children without stable family or institutional protection.",
    response: [
      "We supported refugee and disaster-relief efforts through fundraising, donations and established charitable networks.",
      "Money and essential support were sent through trusted organisations helping displaced families and communities whose homes, livelihoods and local services had been destroyed.",
      "We also supported orphanages and projects working with children who did not have stable family or institutional protection. This included sending funds and practical assistance through people and organisations able to reach the children directly.",
      "Children remained central to much of our charitable work. They were often the least able to protect themselves from the consequences of war, poverty and disaster, yet they could be left living with those consequences for the rest of their lives.",
      "We believed it was important to continue supporting these projects after the immediate emergency had moved away from public attention.",
    ],
    areas: "Kosovo, the Congo, disaster relief and orphanages",
    contribution: "Fundraising, donations and practical assistance",
    routes: "Established charities and trusted international contacts",
    sources: [
      {
        label: "UNHCR — displacement during the Kosovo crisis",
        href: "https://www.unhcr.org/uk/news/kosovo-crisis-update-41",
      },
      {
        label: "WHO — Hurricane Mitch in Nicaragua",
        href: "https://www.who.int/emergencies/disease-outbreak-news/item/1998_11_23-en",
      },
    ],
  },
  {
    year: "1999",
    title: "Refugee support, earthquake relief and mental-health campaigning",
    context:
      "The Kosovo emergency continued while the İzmit earthquake in Türkiye caused catastrophic loss. In the UK, mental-health reform and the introduction of meningococcal C vaccination brought major health issues into sharper public focus.",
    stats: [
      { value: "750,000", label: "People outside Kosovo and seeking to return by June 1999" },
      { value: "500,000–600,000", label: "People believed to be in desperate conditions inside Kosovo" },
      { value: "17,127", label: "Deaths caused by the İzmit earthquake" },
      { value: "250,000+", label: "People displaced from their homes by the earthquake" },
    ],
    impact:
      "The earthquake also injured 43,953 people. In England and Wales, research informing the 1999 meningococcal C vaccination programme estimated 5,052 cases between 1993 and 1998, including 398 deaths and 1,767 intensive-care admissions.",
    response: [
      "We continued to support refugee appeals relating to Kosovo and humanitarian relief following major international earthquakes.",
      "We remained involved in fundraising, practical support and efforts to assist displaced families and communities affected by disaster.",
      "Within the UK, mental health was becoming an increasingly important part of our voluntary and professional contribution. We participated in consultation, discussion and campaigning connected with the growing national focus on mental-health services.",
      "We strongly believed that mental health needed to be brought to the forefront of healthcare and social care. It should not be hidden, minimised or treated as less important than physical health.",
      "We supported greater awareness, improved access to assistance and stronger recognition of the relationship between mental wellbeing, trauma, disability, family circumstances and social exclusion.",
      "We were also involved in work and campaigning connected with meningitis, including awareness and support for affected families.",
      "By the end of the decade, our charitable work had developed from responding to individual appeals into a broader and sustained commitment to humanitarian support, mental-health advocacy, disability access and stronger services for vulnerable people.",
    ],
    areas: "Refugees, earthquake relief, mental health and meningitis",
    contribution: "Fundraising, practical support, consultation and campaigning",
    routes: "Charities, community networks and health and social-care discussions",
    sources: [
      {
        label: "UNHCR — humanitarian conditions in Kosovo",
        href: "https://www.unhcr.org/news/kosovo-crisis-update-22",
      },
      {
        label: "USGS — the 1999 Kocaeli earthquake",
        href: "https://www.usgs.gov/publications/implications-earthquake-risk-reduction-united-states-kocaeli-turkey-earthquake-august",
      },
      {
        label: "UKHSA — burden of meningococcal C disease",
        href: "https://researchportal.ukhsa.gov.uk/en/publications/estimating-the-burden-of-serogroup-c-meningococcal-disease-in-eng/",
      },
    ],
  },
];

const decadeThemes = [
  ["Humanitarian relief", "Fundraising and practical support following wars, displacement, cyclones, hurricanes and earthquakes."],
  ["Refugees and affected families", "Food, clothing, blankets, equipment and financial contributions provided through charitable networks."],
  ["Children and vulnerable communities", "Support for children affected by war, poverty, disaster and the loss of stable family care."],
  ["Mental health", "Campaigning, consultation, awareness and voluntary involvement in mental-health and social-care issues."],
  ["Disability and access", "Support for work seeking to reduce exclusion and improve access to equipment, services and community life."],
];

export const CharitableHistory1990sPage = () => {
  return (
    <>
      <SEO
        title="1991–1999 Charitable History"
        description="A year-by-year record of voluntary humanitarian support, refugee assistance, health advocacy and community action from 1991 to 1999."
        canonical="/our-history/1991-1999"
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
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-primary">1991–1999</p>
          <h1 className="mb-5 max-w-4xl text-4xl font-serif font-bold leading-tight sm:text-5xl lg:text-6xl">
            Humanitarian support, community action and mental-health advocacy
          </h1>
          <div className="max-w-4xl space-y-4 text-lg leading-relaxed text-muted-foreground">
            <p>
              Throughout the 1990s, we responded to humanitarian emergencies, supported refugees and affected families, raised money for medical and relief organisations, contributed to disability and access initiatives, and campaigned for greater recognition of mental health.
            </p>
            <p>
              Much of this work was carried out voluntarily and quietly through churches, hospitals, charities, community organisations and trusted contacts already helping people directly. Our priority was not to document every activity. It was to respond, raise what we could, provide practical help and add value wherever a difficult situation required support.
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
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-primary">What the 1990s taught us</p>
          <h2 className="mb-5 text-3xl font-serif font-bold sm:text-4xl">Voluntary action can add real value</h2>
          <div className="max-w-4xl space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              We were not attempting to create an institution or build a public profile. We were trying to help. Sometimes that meant standing in the street and asking people to donate. Sometimes it meant collecting food, blankets, clothing or equipment. At other times it meant supporting hospitals, charities, churches, affected families or people trying to improve mental-health and social-care services.
            </p>
            <p>
              The decade taught us that humanitarian emergencies require continued support after public attention has moved elsewhere. It showed us that mental health cannot be separated from physical health, trauma or social circumstances, and reinforced our belief that children, refugees, disabled people and families facing illness should never be forgotten or excluded.
            </p>
            <p>
              A collection, a sponsored event, a public appeal, professional support or a connection to the right organisation can all become part of a much larger response. These experiences shaped the values that continued through our later charitable work and ultimately informed the establishment of the Global Health Access Trust.
            </p>
          </div>
        </section>

        <section className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link
            to="/our-history"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary no-underline hover:underline"
          >
            <ArrowLeft className="h-4 w-4" /> Return to our history
          </Link>
          <div className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground">
            Next: 2000–2009 <ArrowRight className="h-4 w-4" />
            <span className="text-xs font-normal">(in preparation)</span>
          </div>
        </section>
      </ContentLayout>
    </>
  );
};
