import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const sections = [
  ["1. Purpose", "This policy sets out how the Global Health Access Trust receives, investigates and responds to complaints. It is designed to be fair, accessible and proportionate."],
  ["2. Who may complain", "Anyone affected by the Trust's activities: donors, project teams, beneficiaries, delivery partners, members of the public and third parties acting on their behalf."],
  ["3. Accessibility", "Complaints can be submitted through the online form or in writing. The Trust will make reasonable adjustments for accessibility needs (large print, alternative formats, a nominated representative)."],
  ["4. Acknowledgement", "The Trust acknowledges every complaint within a small number of working days. The acknowledgement will confirm the reference number, the officer handling it and the expected next step. The Trust does not publish guaranteed resolution times unless formally approved."],
  ["5. Investigation", "The assigned complaints officer will investigate the matter fairly and objectively, gather information from those involved, and consider relevant records."],
  ["6. Fairness", "The Trust will apply the same standard to every complaint. Where a complaint concerns a member of staff, trustee or delivery partner, that person will be informed and given a reasonable opportunity to respond."],
  ["7. Conflicts of interest", "If the assigned officer has any conflict of interest, the complaint will be reassigned. Complainants may ask for reassignment at any time and give reasons."],
  ["8. Evidence", "Complainants may submit evidence. The Trust will only retain evidence necessary and proportionate for the investigation."],
  ["9. Response", "The Trust will provide a written response setting out the findings and any action taken. Where a complaint is upheld in whole or in part, appropriate remedy will be offered."],
  ["10. Review", "A complainant who is not satisfied may request a review by a different senior officer or trustee not previously involved. The review outcome will be recorded."],
  ["11. Escalation", "Unresolved complaints may be escalated to the relevant regulator (for example the Charity Commission for England and Wales, the Fundraising Regulator, the Information Commissioner's Office) where jurisdiction applies. The Trust will signpost the appropriate route in its response."],
  ["12. Records", "The Trust keeps a record of every complaint, decision and outcome for governance and learning. Retention follows the Trust's retention schedule."],
  ["13. Confidentiality", "Confidentiality is protected as far as safety and legal obligations allow. It cannot be absolute; the Trust may be required to share information with statutory bodies."],
  ["14. Non-retaliation", "The Trust prohibits retaliation against anyone who raises a complaint in good faith. Any suspected retaliation should be raised through the protected concerns pathway."],
  ["15. Vexatious or repeated complaints", "The Trust may close vexatious, abusive or repeated complaints. Where this happens, the reasons will be recorded and the complainant informed."],
  ["16. Signposting", "Safeguarding matters, protected concerns and security incidents have dedicated pathways. This policy does not replace them."],
  ["17. Contact", "The Trust does not publish a direct email address on the public website. Questions about this policy should be submitted through the secure contact form. Formal complaints should be submitted through the dedicated complaint form."],
];

export default function ComplaintsPolicyPage() {
  return (
    <>
      <Helmet>
        <title>Complaints Policy | Global Health Access Trust</title>
        <meta name="description" content="How the Global Health Access Trust receives, investigates and responds to complaints." />
        <link rel="canonical" href="https://globalhealthaccesstrust.com/legal/complaints-policy" />
      </Helmet>
      <div className="container-content py-16 max-w-3xl mx-auto">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">Policy</p>
        <h1 className="text-4xl md:text-5xl font-serif mb-4">Complaints Policy</h1>
        <p className="text-sm text-muted-foreground mb-8">Version 1.0 · Effective 22 July 2026</p>
        <Card>
          <CardContent className="pt-6 space-y-6">
            {sections.map(([h, b]) => (
              <section key={h}>
                <h2 className="font-serif text-xl mb-2">{h}</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">{b}</p>
              </section>
            ))}
          </CardContent>
        </Card>

        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Button asChild>
            <Link to="/complaints/new">Make a Complaint</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/contact">Ask a Policy Question</Link>
          </Button>
        </div>
      </div>
    </>
  );
}
