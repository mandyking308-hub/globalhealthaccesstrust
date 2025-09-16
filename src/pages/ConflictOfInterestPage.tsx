import { Card, CardContent } from "@/components/ui/card";

export const ConflictOfInterestPage = () => (
  <div className="py-16">
    <div className="container-content">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            Global Health Access Trust – Conflict of Interest Policy
          </h1>
          <div className="text-sm text-muted-foreground mb-6">
            <p><strong>Last Updated:</strong> September 16, 2025</p>
            <p><strong>Effective Date:</strong> 08/05/2025</p>
            <p><strong>Review Date:</strong> 08/05/2026</p>
            <p><strong>Approved by:</strong> Board of Trustees</p>
          </div>
        </div>

        <div className="space-y-8">
          <Card className="card-professional">
            <CardContent className="p-8">
              <h2 className="text-2xl font-serif font-bold mb-4">1. Policy Statement</h2>
              <p className="text-muted-foreground mb-4">
                The Global Health Access Trust ("the Trust") is committed to ensuring that all decisions and activities are made solely in the best interests of its charitable mission. Trustees, staff, and volunteers must avoid situations where personal or professional interests could conflict, or appear to conflict, with their duties to the Trust.
              </p>
              <p className="text-muted-foreground">
                This policy is designed to protect the integrity of the Trust's decision-making, maintain public trust, and ensure compliance with charity law and the Charity Commission's guidance on managing conflicts.
              </p>
            </CardContent>
          </Card>

          <Card className="card-professional">
            <CardContent className="p-8">
              <h2 className="text-2xl font-serif font-bold mb-4">2. Scope</h2>
              <p className="text-muted-foreground mb-4">This policy applies to:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>All Trustees</li>
                <li>Employees, contractors, and volunteers</li>
                <li>Advisory committee members or associated third parties involved in Trust activity or decision-making</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="card-professional">
            <CardContent className="p-8">
              <h2 className="text-2xl font-serif font-bold mb-4">3. What is a Conflict of Interest?</h2>
              <p className="text-muted-foreground mb-4">
                A conflict of interest may arise where a trustee or staff member's personal, professional, or financial interests interfere—or appear to interfere—with their duty to act in the best interests of the Trust.
              </p>
              <p className="text-muted-foreground mb-4">Examples include (but are not limited to):</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Financial benefit to a trustee (directly or via a connected person or organisation)</li>
                <li>Decisions involving family members or business partners</li>
                <li>Involvement in organisations applying for funding from the Trust</li>
                <li>Receiving gifts or hospitality that could influence judgement</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="card-professional">
            <CardContent className="p-8">
              <h2 className="text-2xl font-serif font-bold mb-4">4. Legal Duties of Trustees</h2>
              <p className="text-muted-foreground mb-4">Trustees have a legal duty to:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Act only in the best interests of the charity</li>
                <li>Avoid situations where personal interests conflict with their responsibilities</li>
                <li>Declare any actual or potential conflict of interest as soon as it arises</li>
                <li>Not receive any financial benefit unless it is explicitly authorised in the governing document or by the Charity Commission</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="card-professional">
            <CardContent className="p-8">
              <h2 className="text-2xl font-serif font-bold mb-4">5. Declaration of Interests</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Trustees must complete an annual Declaration of Interests form listing any relevant interests (financial or non-financial)</li>
                <li>Interests must include those of close family members and any organisations to which the trustee is connected</li>
                <li>A register of interests will be maintained and updated regularly by the Governance Lead or Secretary</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="card-professional">
            <CardContent className="p-8">
              <h2 className="text-2xl font-serif font-bold mb-4">6. Managing Conflicts</h2>
              <p className="text-muted-foreground mb-4">If a conflict arises:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li><strong>Declaration:</strong> The individual must declare the nature of the conflict to the Board immediately</li>
                <li><strong>Record:</strong> The conflict will be recorded in the minutes and the Conflict Register</li>
                <li><strong>Action:</strong> The conflicted person must not take part in any related decision, discussion, or vote</li>
                <li><strong>Withdrawal:</strong> Where appropriate, the individual will be asked to leave the room during discussion</li>
                <li><strong>Independent Review:</strong> The remaining trustees will determine whether the conflict is manageable or requires further action</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="card-professional">
            <CardContent className="p-8">
              <h2 className="text-2xl font-serif font-bold mb-4">7. Trustee Benefits and Authorised Payments</h2>
              <p className="text-muted-foreground mb-4">No trustee may receive a financial benefit from the Trust unless it is:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Permitted in the Trust's governing document</li>
                <li>In the best interests of the charity</li>
                <li>Properly documented and approved by unconflicted trustees</li>
                <li>Compliant with Charity Commission requirements</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="card-professional">
            <CardContent className="p-8">
              <h2 className="text-2xl font-serif font-bold mb-4">8. Breaches of Policy</h2>
              <p className="text-muted-foreground mb-4">Failure to disclose a conflict of interest may result in:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Disciplinary action</li>
                <li>Removal from the Board</li>
                <li>Reporting to the Charity Commission</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="card-professional">
            <CardContent className="p-8">
              <h2 className="text-2xl font-serif font-bold mb-4">9. Review</h2>
              <p className="text-muted-foreground mb-6">
                This policy will be reviewed annually by the Board of Trustees and updated in line with Charity Commission guidance.
              </p>
              
              <div className="border-t pt-6">
                <h3 className="font-semibold mb-2">Contact for Governance & Compliance Enquiries:</h3>
                <p className="text-muted-foreground">
                  <strong>Richard Banyard</strong><br/>
                  Subject Line: Conflict of Interest – Private
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  </div>
);