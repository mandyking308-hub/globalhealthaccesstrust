import { Shield, Users, AlertTriangle, Heart, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

export const SafeguardingPage = () => (
  <div className="py-16">
    <div className="container-content">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Safeguarding Policy</h1>
        <p className="text-xl text-muted-foreground">
          Committed to maintaining the highest standards of safeguarding to protect vulnerable individuals.
        </p>
        <div className="mt-6 text-sm text-muted-foreground">
          <p><strong>Last Updated:</strong> September 16, 2024</p>
        </div>
      </div>

      <Card className="card-professional mb-8">
        <CardContent className="p-8">
          <div className="flex items-center mb-6">
            <Shield className="w-8 h-8 text-primary mr-4" />
            <h2 className="text-2xl font-serif font-bold">Our Commitment</h2>
          </div>
          <Alert className="border-green-200 bg-green-50">
            <Shield className="w-4 h-4 text-green-600" />
            <AlertDescription className="text-green-800">
              <strong>Zero tolerance</strong> for any form of abuse, exploitation, or harassment. 
              The welfare of vulnerable individuals is paramount in all our decisions.
            </AlertDescription>
          </Alert>
          <div className="mt-6">
            <h3 className="font-semibold mb-3">Reporting Concerns</h3>
            <p className="text-sm">
              <strong>Safeguarding Lead:</strong> safeguarding@globalhealthaccesstrust.org<br/>
              <strong>Chair of Trustees:</strong> chair@globalhealthaccesstrust.org<br/>
              <strong>Emergency:</strong> Contact local emergency services immediately
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

export const AntiFraudPage = () => (
  <div className="py-16">
    <div className="container-content">
      <h1 className="text-4xl font-serif font-bold mb-6">Anti-Fraud & Anti-Corruption</h1>
      <p>Anti-fraud and anti-corruption policies will be available here.</p>
    </div>
  </div>
);

export const WhistleblowingPage = () => (
  <div className="py-16">
    <div className="container-content">
      <h1 className="text-4xl font-serif font-bold mb-6">Whistleblowing</h1>
      <p>Whistleblowing procedures will be available here.</p>
    </div>
  </div>
);

export const GovernancePage = () => (
  <div className="py-16">
    <div className="container-content">
      <h1 className="text-4xl font-serif font-bold mb-6">Governance & Oversight</h1>
      <p>Governance framework and oversight procedures will be available here.</p>
    </div>
  </div>
);