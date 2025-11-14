import { Shield, Heart, Users, TrendingUp, Award, MessageSquare } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const DonorGuidePage = () => {
  const recognitionTiers = [
    {
      tier: "Core Donor",
      amount: "£500 – £4,999",
      recognition: "Thank-you message, project updates"
    },
    {
      tier: "Founding Supporter",
      amount: "£5,000 – £24,999",
      recognition: "Impact reports, early access to events"
    },
    {
      tier: "Strategic Partner",
      amount: "£25,000 – £99,999",
      recognition: "Naming opportunities, private briefings"
    },
    {
      tier: "Legacy Builder",
      amount: "£100,000 – £999,999",
      recognition: "Direct updates, advisory participation opportunities"
    },
    {
      tier: "Visionary Donor",
      amount: "£1 million+",
      recognition: "Bespoke partnership, legacy recognition, co-designed impact programs"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <Shield className="w-16 h-16 text-primary mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">Welcome to the Donor Console</h1>
          <h2 className="text-2xl font-semibold text-muted-foreground mb-4">Global Health Access Trust</h2>
          <p className="text-lg max-w-3xl mx-auto leading-relaxed">
            Every donor begins their journey by creating a secure account. This is required for all donations.
          </p>
          <p className="text-muted-foreground max-w-3xl mx-auto mt-4">
            Our platform is encrypted, GDPR-compliant, and designed to handle high-value contributions with full discretion and accountability.
          </p>
        </div>

        {/* Dashboard Features */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
            <Heart className="w-8 h-8 text-primary" />
            Your Donor Dashboard Includes:
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Secure Login</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Private donor access with password protection.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Donation Portal</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  One-time or recurring donation entry with Stripe integration.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Donation Preferences</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-3">Choose where your funds are directed:</p>
                <ul className="space-y-1 text-sm">
                  <li>→ Healthcare Access</li>
                  <li>→ Humanitarian Crisis (e.g. Ukraine)</li>
                  <li>→ Research & Policy</li>
                  <li>→ Professional Education</li>
                  <li>→ Where Most Needed</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Donation History</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Review past contributions and download receipts instantly.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Messaging & Updates</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Receive personal notes, project updates, and event invitations.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recognition Tier</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Your profile displays your donor tier with tailored benefits.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Recognition Tiers */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
            <Award className="w-8 h-8 text-primary" />
            Donor Recognition Tiers
          </h2>

          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-bold">Tier Name</TableHead>
                    <TableHead className="font-bold">Amount</TableHead>
                    <TableHead className="font-bold">Recognition</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recognitionTiers.map((tier, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-semibold">{tier.tier}</TableCell>
                      <TableCell>{tier.amount}</TableCell>
                      <TableCell>{tier.recognition}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <div className="mt-6 p-4 bg-muted rounded-lg">
                <p className="text-sm">
                  If you&apos;d like to discuss major donations, our board will connect with you personally. We&apos;re here to build something meaningful, together.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Final Notes */}
        <section className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-6 h-6 text-primary" />
                Final Notes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                All donation records are stored securely. You can manage your preferences, receive updates, and track your impact.
              </p>
              <p>
                We honour our donors with full transparency and care. Thank you for being part of the future of global health access.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Questions Section */}
        <section className="mb-12">
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-6 h-6 text-primary" />
                Questions?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Please use the Messaging section of your dashboard or our Contact Form for any queries or requests.
              </p>
              <div className="flex gap-4">
                <Link to="/donor-dashboard">
                  <Button variant="default">Go to Dashboard</Button>
                </Link>
                <Link to="/contact-the-trust">
                  <Button variant="outline">Contact Form</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
      <Footer />
    </div>
  );
};
