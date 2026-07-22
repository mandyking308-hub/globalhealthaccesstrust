import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ContentLayout } from "@/components/layout/ContentLayout";
import { SEO } from "@/components/SEO";

const areas = [
  {
    title: "Access to healthcare and relief of illness",
    description: "Potential trustee-approved work to improve lawful, ethical and appropriate access to healthcare for people facing barriers to care.",
    activities: ["healthcare services or access support", "medical supplies and diagnostics", "public-health outreach", "appropriate healthcare infrastructure"],
  },
  {
    title: "Education and professional capacity",
    description: "Potential work that strengthens sustainable knowledge and skills in medicine, public health, mental health, care and healthcare delivery.",
    activities: ["training and professional development", "bursaries or educational support", "institutional capacity building", "lawful academic collaboration"],
  },
  {
    title: "Health systems and infrastructure",
    description: "Potential work that improves the systems, logistics, records, coordination and infrastructure required for safe and continuous care.",
    activities: ["supply and logistics systems", "records and coordination", "service continuity", "transparent operational controls"],
  },
  {
    title: "Research and public-benefit policy",
    description: "Potential research, analysis and knowledge-sharing that advances health, relieves illness or improves lawful access to care.",
    activities: ["public-health research", "systems analysis", "ethical and legal scholarship", "evidence for non-party-political reform"],
  },
  {
    title: "Emergency and exceptional relief",
    description: "Potential time-sensitive support where conflict, disaster, displacement, disease or system failure creates a serious healthcare-access need.",
    activities: ["urgent medical access", "supplies or logistics", "support through lawful delivery partners", "proportionate response to identified need"],
  },
];

export const WhatWeDoPage = () => (
  <ContentLayout>
    <SEO
      title="What We Do"
      description="The charitable scope within which the Trustees of Global Health Access Trust may approve public-benefit work."
      canonical="/what-we-do"
    />
    <h1>What We Do</h1>
    <p className="featured-text">The Trust's charitable scope, subject to trustee approval and available resources.</p>

    <p>
      Global Health Access Trust is established for charitable purposes including the advancement of health, the relief of illness and the preservation of life. It may also advance education and capacity where doing so supports those purposes and the public benefit.
    </p>
    <p>
      The areas below describe lawful activities that the Trustees may approve. They are not claims that every activity is currently funded, active or completed.
    </p>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
      {areas.map((area) => (
        <section key={area.title} className="section-container">
          <h2 className="text-2xl">{area.title}</h2>
          <p>{area.description}</p>
          <h3 className="mt-5 text-base">Illustrative activities within the mandate</h3>
          <ul>
            {area.activities.map((activity) => <li key={activity}>{activity}</li>)}
          </ul>
        </section>
      ))}
    </div>

    <div className="section-container">
      <h2>Conditions before work proceeds</h2>
      <ul>
        <li>The purpose must fall within the Trust Deed and serve the public benefit.</li>
        <li>The Trustees must approve the project, budget, restrictions and responsibilities.</li>
        <li>Legal, partner, sanctions, financial-crime and safeguarding risks must be assessed.</li>
        <li>Delivery, evidence, reporting and financial controls must be documented.</li>
        <li>No donor, adviser or delivery partner may displace trustee authority.</li>
      </ul>
    </div>

    <div className="flex flex-wrap gap-4 mt-8">
      <Button asChild><Link to="/our-work">Current and historical work</Link></Button>
      <Button asChild variant="outline"><Link to="/contact-the-trust">Contact the Trust</Link></Button>
    </div>
  </ContentLayout>
);
