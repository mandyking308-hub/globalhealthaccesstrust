import { Heart, Gift, CreditCard, PiggyBank, Shield, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

export const DonatePage = () => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [isMonthly, setIsMonthly] = useState(false);
  const [giftAid, setGiftAid] = useState(false);

  const suggestedAmounts = [25, 50, 100, 250, 500, 1000];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-gold/10 to-primary/5">
        <div className="container-section">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">
              Support Healthcare Justice
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
              Your donation enables us to uphold healthcare as a matter of justice, 
              not generosity. Every contribution directly supports our mission to 
              protect human dignity through healthcare access.
            </p>
          </div>
        </div>
      </section>

      <div className="py-16">
        <div className="container-section">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              
              {/* Donation Form */}
              <div className="lg:col-span-2">
                <Card className="card-elevated">
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-serif font-bold mb-6">Make a Donation</h2>
                    
                    {/* Integration Placeholder */}
                    <Alert className="mb-8">
                      <Info className="w-4 h-4" />
                      <AlertDescription>
                        <strong>Integration Placeholder:</strong> Secure payment processing 
                        will be integrated with Stripe, Charities Aid Foundation, or JustGiving. 
                        All donations processed with full PCI compliance and audit trails.
                      </AlertDescription>
                    </Alert>

                    <div className="space-y-8">
                      {/* Donation Type */}
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Donation Type</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <Button
                            variant={!isMonthly ? "default" : "outline"}
                            onClick={() => setIsMonthly(false)}
                            className="h-auto p-4"
                          >
                            <div className="text-center">
                              <Gift className="w-6 h-6 mx-auto mb-2" />
                              <div className="font-semibold">One-time</div>
                              <div className="text-sm opacity-80">Single donation</div>
                            </div>
                          </Button>
                          
                          <Button
                            variant={isMonthly ? "default" : "outline"}
                            onClick={() => setIsMonthly(true)}
                            className="h-auto p-4"
                          >
                            <div className="text-center">
                              <Heart className="w-6 h-6 mx-auto mb-2" />
                              <div className="font-semibold">Monthly</div>
                              <div className="text-sm opacity-80">Recurring support</div>
                            </div>
                          </Button>
                        </div>
                      </div>

                      {/* Amount Selection */}
                      <div>
                        <h3 className="text-lg font-semibold mb-4">
                          Select Amount {isMonthly && <Badge variant="secondary">Monthly</Badge>}
                        </h3>
                        
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                          {suggestedAmounts.map((amount) => (
                            <Button
                              key={amount}
                              variant={selectedAmount === amount ? "default" : "outline"}
                              onClick={() => {
                                setSelectedAmount(amount);
                                setCustomAmount("");
                              }}
                              className="h-12"
                            >
                              £{amount}
                            </Button>
                          ))}
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium">Custom Amount</label>
                          <div className="flex">
                            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground">
                              £
                            </span>
                            <input
                              type="number"
                              min="1"
                              step="1"
                              value={customAmount}
                              onChange={(e) => {
                                setCustomAmount(e.target.value);
                                setSelectedAmount(null);
                              }}
                              placeholder="Enter amount"
                              className="flex-1 px-3 py-2 border border-input rounded-r-md focus:outline-none focus:ring-2 focus:ring-ring"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Gift Aid */}
                      <div>
                        <div className="flex items-start space-x-3">
                          <Checkbox
                            id="gift-aid"
                            checked={giftAid}
                            onCheckedChange={(checked) => setGiftAid(checked as boolean)}
                            className="mt-1"
                          />
                          <div>
                            <label htmlFor="gift-aid" className="text-sm font-medium cursor-pointer">
                              Yes, I would like to add Gift Aid to this donation
                            </label>
                            <p className="text-xs text-muted-foreground mt-1">
                              I confirm that I am a UK taxpayer and understand that if I pay less 
                              Income Tax and/or Capital Gains Tax in the current tax year than the 
                              amount of Gift Aid claimed on all my donations, it is my responsibility 
                              to pay any difference.
                            </p>
                          </div>
                        </div>
                        
                        {giftAid && (
                          <div className="mt-3 p-3 bg-gold/10 border border-gold/20 rounded-lg">
                            <p className="text-sm text-gold-dark">
                              <strong>Gift Aid Benefit:</strong> Your donation will be increased by 25% 
                              at no extra cost to you. For example, a £100 donation becomes £125.
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Donation Summary */}
                      <div className="bg-muted/30 border border-border rounded-lg p-6">
                        <h3 className="font-semibold mb-4">Donation Summary</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Your donation:</span>
                            <span>£{selectedAmount || customAmount || "0"}</span>
                          </div>
                          {giftAid && (
                            <div className="flex justify-between text-gold-dark">
                              <span>Gift Aid (25%):</span>
                              <span>£{Math.round((Number(selectedAmount || customAmount || 0) * 0.25) * 100) / 100}</span>
                            </div>
                          )}
                          <div className="border-t pt-2 flex justify-between font-semibold">
                            <span>Total impact:</span>
                            <span>
                              £{giftAid 
                                ? Math.round((Number(selectedAmount || customAmount || 0) * 1.25) * 100) / 100
                                : selectedAmount || customAmount || "0"}
                            </span>
                          </div>
                          {isMonthly && (
                            <div className="text-xs text-muted-foreground">
                              Charged monthly • Cancel anytime
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Proceed Button */}
                      <Button 
                        size="lg" 
                        disabled 
                        className="w-full"
                      >
                        <CreditCard className="mr-2 w-5 h-5" />
                        Proceed to Secure Payment (Coming Soon)
                      </Button>
                      
                      <p className="text-xs text-center text-muted-foreground">
                        Secure payment processing via Stripe. Your card details are never stored 
                        and all transactions are encrypted and PCI compliant.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Information Sidebar */}
              <div className="space-y-8">
                <Card className="card-professional">
                  <CardContent className="p-6">
                    <Shield className="w-12 h-12 text-primary mb-4" />
                    <h3 className="text-lg font-semibold mb-3">Secure & Trusted</h3>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li>• PCI DSS Level 1 compliant</li>
                      <li>• 256-bit SSL encryption</li>
                      <li>• No card details stored</li>
                      <li>• Instant donation receipt</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="card-professional">
                  <CardContent className="p-6">
                    <PiggyBank className="w-12 h-12 text-gold mb-4" />
                    <h3 className="text-lg font-semibold mb-3">Your Impact</h3>
                    <div className="space-y-3 text-sm">
                      <div>
                        <strong>£25:</strong> Provides essential medical supplies for 5 patients
                      </div>
                      <div>
                        <strong>£100:</strong> Funds a healthcare training session for 15 professionals
                      </div>
                      <div>
                        <strong>£250:</strong> Supports emergency healthcare for 50 displaced persons
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="card-professional">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-3">Legacy Giving</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Consider including the Global Health Access Trust in your will 
                      for a lasting impact on healthcare justice.
                    </p>
                    <Button variant="outline" size="sm" className="w-full">
                      Learn About Legacy Giving
                    </Button>
                  </CardContent>
                </Card>

                <div className="text-center">
                  <p className="text-xs text-muted-foreground">
                    For large donations or partnership enquiries:
                  </p>
                  <a 
                    href="mailto:operations@globalhealthaccesstrust.org"
                    className="text-sm text-primary hover:underline"
                  >
                    operations@globalhealthaccesstrust.org
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};