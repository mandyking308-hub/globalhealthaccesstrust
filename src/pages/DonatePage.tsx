import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ContentLayout } from "@/components/layout/ContentLayout";
import { SEO } from "@/components/SEO";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const contributionRoutes = [
  {
    title: "Financial Support",
    description:
      "Pledge a one-time, recurring, project-specific, restricted or general financial contribution. The Trust will contact you and complete the appropriate donor-verification process before accepting funds or issuing payment instructions.",
    action: "Pledge Financial Support",
  },
  {
    title: "Time and Professional Expertise",
    description:
      "Offer professional, technical or practical time in health systems, technology, responsible AI, research, education, engineering, construction, agriculture, housing, finance, law, logistics, communications, safeguarding, operations or project delivery.",
    action: "Pledge Time or Expertise",
  },
  {
    title: "Equipment and Essential Supplies",
    description:
      "Offer suitable equipment, materials, technology, communications tools, educational resources, infrastructure components, agricultural resources, storage systems, humanitarian supplies or appropriately sourced healthcare equipment.",
    action: "Offer Equipment or Supplies",
  },
  {
    title: "Premises, Land and Facilities",
    description:
      "Offer temporary or longer-term access to premises, land, workspace, storage, accommodation, training facilities or other suitable locations through a donated, licensed, leased or reduced-cost arrangement.",
    action: "Offer Premises or Land",
  },
  {
    title: "Technology, Data and Digital Capability",
    description:
      "Contribute software, systems, infrastructure, responsible AI capability, data expertise, communications tools or technical development that can improve research, coordination, evidence, logistics and accountable delivery.",
    action: "Offer Technology or Digital Support",
  },
  {
    title: "Services, Logistics and Operational Support",
    description:
      "Offer transport, warehousing, construction, procurement, manufacturing, professional services, communications, translation, design, administration or other practical delivery capability.",
    action: "Offer Services or Operational Support",
  },
  {
    title: "Relationships and Access",
    description:
      "Introduce the Trust to communities, professional contributors, funders, public bodies, educational institutions, suppliers or responsible delivery partners who may help an approved project progress.",
    action: "Offer an Introduction or Relationship",
  },
  {
    title: "Project Sponsorship and Restricted Support",
    description:
      "Pledge support for a defined project, location, workstream or charitable purpose through funding, resources or a combination of contributions, subject to Trustee review and formal acceptance.",
    action: "Discuss Project Sponsorship",
  },
];

const pledgeTypes = [
  "Financial contribution",
  "Time or professional expertise",
  "Equipment or supplies",
  "Premises, land or facilities",
  "Technology or digital capability",
  "Professional or operational services",
  "Transport, logistics or storage",
  "Research or educational support",
  "Introductions, relationships or local access",
  "Project sponsorship",
  "Legacy or estate contribution",
  "Combination of contributions",
  "Other proposed support",
] as const;

const initialPledge = {
  name: "",
  email: "",
  phone: "",
  organisation: "",
  position: "",
  location: "",
  contributionType: "",
  description: "",
  scaleOrValue: "",
  availability: "",
  preferredPurpose: "",
  restrictions: "",
  recognition: "No preference at this stage",
  consent: false,
  honeypot: "",
};

export const DonatePage = () => {
  const [pledge, setPledge] = useState(initialPledge);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [reference, setReference] = useState<string | null>(null);

  const updateField = (name: keyof typeof initialPledge, value: string | boolean) => {
    setPledge((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (pledge.honeypot) return;
    if (!pledge.consent) {
      toast.error("Please provide consent so the Trust can review and respond to your pledge.");
      return;
    }
    if (!pledge.contributionType) {
      toast.error("Please select the type of contribution you wish to pledge.");
      return;
    }

    setIsSubmitting(true);
    try {
      const message = [
        `Contribution type: ${pledge.contributionType}`,
        `Offer: ${pledge.description.trim()}`,
        pledge.scaleOrValue.trim() ? `Quantity, scale or estimated value: ${pledge.scaleOrValue.trim()}` : "",
        pledge.location.trim() ? `Location of contribution: ${pledge.location.trim()}` : "",
        pledge.availability.trim() ? `Availability or proposed timing: ${pledge.availability.trim()}` : "",
        pledge.preferredPurpose.trim() ? `Preferred purpose, project or geography: ${pledge.preferredPurpose.trim()}` : "",
        pledge.restrictions.trim() ? `Proposed restrictions or conditions: ${pledge.restrictions.trim()}` : "",
        `Recognition preference: ${pledge.recognition}`,
      ]
        .filter(Boolean)
        .join("\n");

      const { data, error } = await supabase.functions.invoke("contact-notification", {
        body: {
          name: pledge.name.trim(),
          email: pledge.email.trim(),
          phone: pledge.phone.trim(),
          organisation: pledge.organisation.trim(),
          position: pledge.position.trim(),
          nature_of_enquiry: "Donation or Active Project Support",
          message,
          additional_context:
            "Submitted through the contribution-pledge page. This is an expression of interest only. No contribution has been accepted and no payment instructions should be issued until donor verification, due diligence and formal acceptance are complete.",
          consent: pledge.consent,
          honeypot: pledge.honeypot,
        },
      });

      if (error) throw error;
      if (!data?.success) throw new Error(data?.message || "The pledge could not be submitted.");

      setReference(typeof data.reference === "string" ? data.reference : null);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Contribution pledge submission failed", error);
      toast.error("There was a problem submitting your pledge. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetPledge = () => {
    setPledge(initialPledge);
    setReference(null);
    setIsSubmitted(false);
  };

  return (
    <ContentLayout>
      <SEO
        title="Pledge a Contribution"
        description="Pledge funding, time, expertise, equipment, premises, technology, services, logistics, relationships or other practical support to the Global Health Access Trust."
        canonical="/donate"
      />

      <h1>Pledge a Contribution</h1>
      <p className="featured-text">Support can take many forms.</p>
      <p>
        The Global Health Access Trust welcomes pledges of funding, time, expertise, equipment,
        premises, technology, professional services, relationships and practical resources that
        may strengthen approved charitable work.
      </p>
      <p>
        Submitting a pledge does not require you to transfer money or resources. The Trust will
        review the proposed contribution and, where appropriate, contact you to begin the donor,
        contributor or organisational verification process and agree the next steps.
      </p>

      <div className="flex flex-wrap gap-3 my-8">
        <Button asChild><a href="#pledge-form">Pledge a Contribution</a></Button>
        <Button asChild variant="outline"><Link to="/commission-projects">Commission a Public-Benefit Project</Link></Button>
        <Button asChild variant="outline"><Link to="/contact-the-trust">Discuss Major or Institutional Support</Link></Button>
      </div>

      <div className="section-container">
        <h2>More Than Money</h2>
        <p>
          Some projects need funding. Others need specialist knowledge, suitable premises,
          equipment, technology, transport, storage, local relationships or people willing to
          contribute their time.
        </p>
        <p>
          The Trust considers the contribution that will best help a defined project or
          public-benefit purpose rather than assuming that every supporter must contribute in the
          same way.
        </p>
      </div>

      <h2 className="mt-12">Ways to Contribute</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
        {contributionRoutes.map((route) => (
          <div key={route.title} className="section-container">
            <h3>{route.title}</h3>
            <p>{route.description}</p>
            <Button asChild variant="outline" className="mt-4">
              <a href="#pledge-form">{route.action}</a>
            </Button>
          </div>
        ))}
      </div>

      <div className="section-container">
        <h2>How Financial Pledges Work</h2>
        <ol className="space-y-3 list-decimal pl-5">
          <li>You submit an initial pledge and indicate the proposed amount, purpose and any restrictions.</li>
          <li>The Trust reviews the proposed relationship and decides what level of donor verification and due diligence is appropriate.</li>
          <li>The Trust may request identity, organisation, authority, source-of-funds, sanctions, purpose or other supporting information.</li>
          <li>Where the contribution can be accepted, the Trust confirms the terms, recognition arrangements and approved payment or transfer route.</li>
          <li>No financial contribution is treated as accepted or received until the required review is complete and the Trust has confirmed the next step.</li>
        </ol>
      </div>

      <div id="pledge-form" className="section-container scroll-mt-32">
        <h2>Pledge a Contribution</h2>
        <p>
          Use this secure form to tell the Trust what you may be able to contribute. A pledge is
          an expression of interest. It does not oblige you to transfer money or resources, and
          it does not require the Trust to accept the contribution.
        </p>

        {isSubmitted ? (
          <div className="mt-8 border border-foreground/15 p-6 md:p-8 bg-muted/20">
            <h3>Contribution Pledge Received</h3>
            <p>
              Thank you. The Trust will review the proposed contribution and contact you where
              clarification, verification or a suitable next step is available.
            </p>
            <p className="text-sm text-muted-foreground">
              No money or resource has been accepted or transferred. Payment or transfer details
              will only be provided after the appropriate review and formal acceptance process.
            </p>
            {reference && (
              <p className="text-sm text-muted-foreground">
                Reference: <span className="font-mono">{reference}</span>
              </p>
            )}
            <div className="flex flex-wrap gap-3 mt-5">
              <Button onClick={resetPledge}>Pledge Another Contribution</Button>
              <Button asChild variant="outline"><Link to="/our-work">Explore Our Work</Link></Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="pledge-name">Name *</Label>
                <Input id="pledge-name" value={pledge.name} onChange={(event) => updateField("name", event.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pledge-email">Email *</Label>
                <Input id="pledge-email" type="email" value={pledge.email} onChange={(event) => updateField("email", event.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pledge-phone">Telephone</Label>
                <Input id="pledge-phone" type="tel" value={pledge.phone} onChange={(event) => updateField("phone", event.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pledge-location">Country or Location</Label>
                <Input id="pledge-location" value={pledge.location} onChange={(event) => updateField("location", event.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pledge-organisation">Organisation</Label>
                <Input id="pledge-organisation" value={pledge.organisation} onChange={(event) => updateField("organisation", event.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pledge-position">Role or Authority to Make the Offer</Label>
                <Input id="pledge-position" value={pledge.position} onChange={(event) => updateField("position", event.target.value)} />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Type of Contribution *</Label>
              <Select value={pledge.contributionType} onValueChange={(value) => updateField("contributionType", value)}>
                <SelectTrigger><SelectValue placeholder="Select the closest contribution type" /></SelectTrigger>
                <SelectContent>
                  {pledgeTypes.map((type) => <SelectItem key={type} value={type}>{type}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="pledge-description">Describe What You Are Offering *</Label>
              <Textarea
                id="pledge-description"
                value={pledge.description}
                onChange={(event) => updateField("description", event.target.value)}
                rows={6}
                placeholder="Explain the funding, time, expertise, equipment, premises, technology, service, relationship or other resource you may be able to contribute."
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="pledge-scale">Amount, Quantity, Scale or Estimated Value</Label>
                <Input id="pledge-scale" value={pledge.scaleOrValue} onChange={(event) => updateField("scaleOrValue", event.target.value)} placeholder="Where known" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pledge-availability">Availability or Proposed Timing</Label>
                <Input id="pledge-availability" value={pledge.availability} onChange={(event) => updateField("availability", event.target.value)} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="pledge-purpose">Preferred Purpose, Project or Geography</Label>
              <Textarea id="pledge-purpose" value={pledge.preferredPurpose} onChange={(event) => updateField("preferredPurpose", event.target.value)} rows={3} placeholder="Leave blank where the Trust may match the contribution to the most suitable work." />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pledge-restrictions">Proposed Restrictions or Conditions</Label>
              <Textarea id="pledge-restrictions" value={pledge.restrictions} onChange={(event) => updateField("restrictions", event.target.value)} rows={3} placeholder="Any proposed restriction remains subject to review and formal Trustee acceptance." />
            </div>

            <div className="space-y-2">
              <Label>Recognition and Privacy Preference</Label>
              <Select value={pledge.recognition} onValueChange={(value) => updateField("recognition", value)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Public recognition">Public recognition</SelectItem>
                  <SelectItem value="Private recognition">Private recognition</SelectItem>
                  <SelectItem value="Anonymous">Anonymous</SelectItem>
                  <SelectItem value="Personal dedication">Personal dedication</SelectItem>
                  <SelectItem value="No recognition">No recognition</SelectItem>
                  <SelectItem value="No preference at this stage">No preference at this stage</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="hidden" aria-hidden="true">
              <Label htmlFor="pledge-company-website">Company website</Label>
              <Input id="pledge-company-website" tabIndex={-1} autoComplete="off" value={pledge.honeypot} onChange={(event) => updateField("honeypot", event.target.value)} />
            </div>

            <div className="flex items-start gap-3">
              <Checkbox id="pledge-consent" checked={pledge.consent} onCheckedChange={(checked) => updateField("consent", checked === true)} className="mt-1" />
              <Label htmlFor="pledge-consent" className="text-sm leading-relaxed cursor-pointer">
                I consent to the Trust processing the information provided to review this pledge,
                carry out appropriate verification and contact me about the next steps. I understand
                that submitting a pledge does not create a donation, contract, appointment or
                acceptance of the proposed contribution. *
              </Label>
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed">
              Please do not upload or send identity, banking, source-of-funds or other sensitive
              documents through this initial form. The Trust will request any required information
              through an appropriate secure route after the initial review.
            </p>

            <Button type="submit" size="lg" disabled={isSubmitting || !pledge.consent} className="w-full">
              {isSubmitting ? "Submitting Pledge…" : "Submit Contribution Pledge"}
            </Button>
          </form>
        )}
      </div>

      <div className="section-container">
        <h2>What Happens After a Pledge</h2>
        <ol className="space-y-4 list-decimal pl-5">
          <li><strong>Initial review:</strong> the Trust considers the offer, its relevance and whether it can be considered within the Trust's charitable purposes.</li>
          <li><strong>Clarification:</strong> the Trust may ask about ownership, authority, condition, value, availability, location, restrictions, intended use or delivery requirements.</li>
          <li><strong>Verification and due diligence:</strong> checks are proportionate to the contribution and may concern identity, organisation, source of funds or assets, sanctions, conflicts, safeguarding, safety and total cost of acceptance.</li>
          <li><strong>Formal acceptance:</strong> where suitable, the Trust confirms the approved purpose, terms, responsibilities, recognition arrangements and transfer process.</li>
          <li><strong>Contribution and acknowledgement:</strong> the contribution is recorded only after it has been formally accepted and, where applicable, received, transferred or made available.</li>
        </ol>
      </div>

      <div className="section-container">
        <h2>Charitable Independence</h2>
        <p>
          A contribution does not confer ownership of charitable work, governance authority,
          access to beneficiaries or control over Trustee decisions. Every accepted contribution
          remains subject to the Trust's charitable purposes, governance and Trustee oversight.
        </p>
      </div>

      <div className="section-container">
        <p className="featured-text">A meaningful contribution is not defined only by its monetary value.</p>
        <p>
          The right expertise, equipment, premises, relationship or practical resource can unlock
          work that funding alone cannot deliver.
        </p>
        <div className="flex flex-wrap gap-3 mt-5">
          <Button asChild><a href="#pledge-form">Pledge a Contribution</a></Button>
          <Button asChild variant="outline"><Link to="/commission-projects">Commission a Public-Benefit Project</Link></Button>
          <Button asChild variant="outline"><Link to="/contact-the-trust">Contact the Trust</Link></Button>
        </div>
      </div>
    </ContentLayout>
  );
};
