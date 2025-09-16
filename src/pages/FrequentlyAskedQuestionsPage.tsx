import { Card, CardContent } from "@/components/ui/card";

export const FrequentlyAskedQuestionsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container-section py-16">
        <Card>
          <CardContent className="prose prose-lg max-w-none p-8">
            <h1 className="text-4xl font-serif font-bold mb-8">Frequently Asked Questions</h1>
            
            <p className="text-lg italic mb-8">Formal. Transparent. Committed to the public good.</p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Can I view the Trust's Constitution?</h2>
            <p>Yes. Our signed Constitution outlines how the Trust is governed, including its purpose, structure, and trustee responsibilities. You can <a href="https://cdn.shopify.com/s/files/1/0910/2442/5308/files/GHAT_Constitution_2025_Refined_V1_Signed_final_18062025.pdf?v=1750240952" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">view or download it here.</a></p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">What is the legal status of the Trust?</h2>
            <p>The Global Health Access Trust is a charitable trust established under the laws of England and Wales, governed by a formal constitutional deed. Charity Commission registration is in progress and expected in 2025. All donations are held and applied exclusively for charitable purposes as defined under section 3 of the Charities Act 2011.</p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Are donations tax-deductible?</h2>
            <p>Yes. Donations made by UK taxpayers may be eligible for Gift Aid relief, allowing the Trust to reclaim an additional 25% of the donation's value at no extra cost to the donor, subject to HMRC rules.</p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">How are donations managed?</h2>
            <p>All funds are held in a secure, segregated charitable account. Disbursements are made only upon formal Trustee resolution and after completion of due diligence, in accordance with the Trust's governing document and fiduciary obligations.</p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Can I set up a named fund or bursary?</h2>
            <p>Yes. Major gifts may be directed toward the creation of a named fund, bursary, or grant stream—subject to approval by the Board of Trustees and alignment with our charitable purposes. All such gifts are governed by a formal agreement and subject to annual reporting.</p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Can the Trust fund advocacy or lobbying?</h2>
            <p>No. The Trust does not fund political campaigning, lobbying, or any activity inconsistent with Charity Commission guidance. All work must be apolitical, lawful, and exclusively charitable.</p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">How does the Trust select its partners?</h2>
            <p>Partners are selected through formal review based on legality, capability, local trust, and alignment with the Trust's objectives. Due diligence includes checks for financial probity, regulatory compliance, and impact readiness.</p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Will the Trust respond to emergencies?</h2>
            <p>Yes. In times of humanitarian collapse, public health disaster, or armed conflict, the Trust may act through pre-approved mechanisms for emergency health delivery, under the supervision of the Board of Trustees.</p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Can I volunteer or apply for funding?</h2>
            <p>The Trust does not run public volunteer programmes or open calls for funding. However, institutions may enquire about partnership eligibility. All projects must be lawful, impact-based, and professionally governed.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};