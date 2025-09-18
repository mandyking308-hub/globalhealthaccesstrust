import { useState } from "react";
import { Heart, CheckCircle, Info, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { DONATION_TIERS } from "@/lib/constants";

export const DonatePage = () => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [isMonthly, setIsMonthly] = useState(false);
  const [giftAid, setGiftAid] = useState(false);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-gold/10 to-accent/20">
        <div className="container-section">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">
              Support Healthcare Justice
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
              Your donation enables the Global Health Access Trust to uphold healthcare 
              as a matter of justice, not charity. Every contribution supports principled, 
              sustainable interventions that create lasting change.
            </p>
          </div>
        </div>
      </section>

      <div className="py-16">
        <div className="container-section">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              
              {/* Donation Form */}
              <div className="lg:col-span-2">
                <Card className="card-elevated">
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-serif font-bold mb-6">Make a Donation</h2>
                    
                    {/* Amount Selection */}
                    <div className="space-y-6">
                      <div>
                        <Label className="text-lg font-semibold mb-4 block">Choose Amount</Label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
                          {DONATION_TIERS.map((tier) => (
                            <Button
                              key={tier.amount}
                              variant={selectedAmount === tier.amount ? "default" : "outline"}
                              onClick={() => {
                                setSelectedAmount(tier.amount);
                                setCustomAmount("");
                              }}
                              className="h-auto p-4 flex flex-col items-center"
                            >
                              <span className="text-lg font-semibold">£{tier.amount}</span>
                              <span className="text-xs text-muted-foreground mt-1 text-center">
                                {tier.description}
                              </span>
                            </Button>
                          ))}
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Label htmlFor="custom-amount">Custom Amount (£)</Label>
                          <Input
                            id="custom-amount"
                            type="number"
                            placeholder="Enter amount"
                            value={customAmount}
                            onChange={(e) => {
                              setCustomAmount(e.target.value);
                              setSelectedAmount(null);
                            }}
                            className="max-w-32"
                          />
                        </div>
                      </div>

                      {/* Frequency */}
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          id="monthly"
                          checked={isMonthly}
                          onCheckedChange={(checked) => setIsMonthly(checked as boolean)}
                        />
                        <Label htmlFor="monthly" className="cursor-pointer">
                          Make this a monthly donation
                        </Label>
                      </div>

                      {/* Gift Aid */}
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <Checkbox
                            id="gift-aid"
                            checked={giftAid}
                            onCheckedChange={(checked) => setGiftAid(checked as boolean)}
                          />
                          <Label htmlFor="gift-aid" className="cursor-pointer">
                            Add Gift Aid to my donation (UK taxpayers only)
                          </Label>
                        </div>
                        
                        {giftAid && (
                          <Alert>
                            <Info className="h-4 w-4" />
                            <AlertDescription className="text-sm">
                              <strong>Gift Aid Declaration:</strong> By selecting this option, you confirm that you are a UK taxpayer and understand that if you pay less Income Tax and/or Capital Gains Tax than the amount of Gift Aid claimed on all your donations in that tax year, it is your responsibility to pay any difference. The Trust will reclaim 25p on every £1 you donate.
                            </AlertDescription>
                          </Alert>
                        )}
                      </div>

                      {/* Integration Placeholder */}
                      <div className="pt-6 border-t">
                        <Alert className="mb-6">
                          <AlertDescription>
                            <strong>Payment Integration:</strong> This is a demonstration. In production, this would integrate with Stripe, CAF Donate, or JustGiving for secure payment processing.
                          </AlertDescription>
                        </Alert>
                        
                        <Button size="lg" disabled className="w-full">
                          <Heart className="mr-2 w-5 h-5" />
                          Donate {selectedAmount ? `£${selectedAmount}` : customAmount ? `£${customAmount}` : ''} 
                          {isMonthly ? ' Monthly' : ''}
                        </Button>
                        
                        <p className="text-xs text-muted-foreground text-center mt-3">
                          Secure payment processing via Stripe. Your donation will be processed securely and you will receive a confirmation email.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <Card className="card-professional">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4">Your Impact</h3>
                    <p className="text-sm text-muted-foreground">
                      Your donation directly supports the Trust's mission to uphold healthcare as a fundamental human right, creating lasting change through principled interventions.
                    </p>
                  </CardContent>
                </Card>


                <Card className="card-professional">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4">Other Ways to Give</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Legacy giving and bequests</li>
                      <li>• Corporate partnerships</li>
                      <li>• Professional fundraising</li>
                      <li>• In-kind donations and services</li>
                    </ul>
                    <p className="text-xs mt-3">
                      For enquiries about major gifts or legacy giving, please contact our operations team.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};