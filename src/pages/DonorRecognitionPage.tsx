import { Card, CardContent } from "@/components/ui/card";

export const DonorRecognitionPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container-section py-16">
        <Card>
          <CardContent className="prose prose-lg max-w-none p-8">
            <h1 className="text-4xl font-serif font-bold mb-8">Donor Recognition</h1>
            
            <p className="text-lg italic mb-8">"Those who give not only shape lives—they shape legacy."</p>

            <p>The Global Health Access Trust recognises that charitable giving is not merely an act of generosity, but a declaration of values. We are privileged to steward gifts from individuals, families, and institutions who understand that true legacy is built through service to others.</p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Founding Benefactors</h2>
            <p>Founding Benefactors are those who have made a capital contribution of significant scale during the Trust's founding years.</p>
            
            <p>By invitation of the Board of Trustees, Founding Benefactors may:</p>
            
            <ul>
              <li>Establish a named endowment or grant stream</li>
              <li>Be acknowledged (publicly or anonymously) in our Heritage Register</li>
              <li>Receive an annual Stewardship Report outlining impact and outcomes</li>
              <li>Be invited to private briefings, heritage events, or ceremonial occasions</li>
            </ul>

            <p>We are honoured to work with Founding Benefactors as partners in permanence. Their support strengthens the foundation upon which all future work is built.</p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Named Funds and Bursaries</h2>
            <p>Select benefactors may choose to direct their support toward a specific cause or create a named bursary. These funds may:</p>
            
            <ul>
              <li>Honour a loved one or commemorate a legacy</li>
              <li>Fund a particular field (e.g. maternal care, emergency relief, or mental health training)</li>
              <li>Be governed by a formal agreement with clear reporting and outcomes</li>
            </ul>

            <p>All named funds are subject to approval by the Board of Trustees and aligned to our charitable purposes. We honour them in accordance with the benefactor's wishes and the law.</p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">The Legacy Circle</h2>
            <p>Those who choose to include the Trust in their will are invited, if they wish, to join The Legacy Circle—a private and dignified community of those who give beyond their lifetime.</p>
            
            <p>Legacy Circle members may:</p>
            
            <ul>
              <li>Receive lifetime updates on the Trust's work</li>
              <li>Be acknowledged in perpetuity (or remain anonymous)</li>
              <li>Leave a named bequest in accordance with our legal framework</li>
            </ul>

            <p>Joining the Legacy Circle is an act of foresight, duty, and enduring generosity.</p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Recognition and Restraint</h2>
            <p>The Trust recognises benefactors with discretion and decorum. No benefactor shall ever receive preferential treatment, private benefit, or influence in exchange for support.</p>
            
            <p>All recognition is:</p>
            
            <ul>
              <li>Voluntary</li>
              <li>Subject to legal compliance</li>
              <li>Always subordinate to the Trust's fiduciary obligations</li>
            </ul>

            <p>Recognition is offered not to elevate individuals, but to honour the principle that great acts of giving deserve great responsibility in return.</p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Make a Private Enquiry</h2>
            <p>We warmly welcome confidential conversations with prospective benefactors, legacy advisers, and family offices.</p>
            
            <p>To schedule a private discussion with the Chair of Trustees or an authorised officer of the Trust, please email:</p>
            
            <p>Subject: Legacy or Endowment – Strictly Confidential</p>
            
            <p>You may use the secure contact form below.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};