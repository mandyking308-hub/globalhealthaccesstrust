import { useForm } from "react-hook-form";
import { ArrowDown, Users, Building, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

interface FormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export const DonatePage = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();

  const scrollToForm = () => {
    document.getElementById('enquiry-form')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start' 
    });
  };

  const onSubmit = (data: FormData) => {
    console.log('Form submitted:', data);
    toast({
      title: "Thank you",
      description: "Our team will be in touch within 48 hours.",
    });
    reset();
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-primary/5 to-accent/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-8 leading-tight">
              Partner with us to transform access to healthcare
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-12">
              We welcome conversations with individuals, families, and organisations who want to make meaningful gifts.
            </p>
            <Button 
              size="lg" 
              onClick={scrollToForm}
              className="px-8 py-4 text-lg rounded-full"
            >
              Start a Conversation
              <ArrowDown className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Giving Pathways */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              
              {/* Major Gifts & Families */}
              <Card className="h-full border-2 hover:border-primary/20 transition-colors">
                <CardContent className="p-8 h-full flex flex-col">
                  <div className="flex-1">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                      <Users className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-2xl font-serif font-bold mb-4">Major Gifts & Families</h3>
                    <p className="text-muted-foreground leading-relaxed mb-8">
                      Shape the future of healthcare with a personal or family gift.
                    </p>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={scrollToForm}
                    className="w-full rounded-full"
                  >
                    Talk to Us
                  </Button>
                </CardContent>
              </Card>

              {/* Corporate & Foundations */}
              <Card className="h-full border-2 hover:border-primary/20 transition-colors">
                <CardContent className="p-8 h-full flex flex-col">
                  <div className="flex-1">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                      <Building className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-2xl font-serif font-bold mb-4">Corporate & Foundations</h3>
                    <p className="text-muted-foreground leading-relaxed mb-8">
                      Collaborate with us to deliver large-scale impact.
                    </p>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={scrollToForm}
                    className="w-full rounded-full"
                  >
                    Talk to Us
                  </Button>
                </CardContent>
              </Card>

              {/* Legacy Giving */}
              <Card className="h-full border-2 hover:border-primary/20 transition-colors">
                <CardContent className="p-8 h-full flex flex-col">
                  <div className="flex-1">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                      <Heart className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-2xl font-serif font-bold mb-4">Legacy Giving</h3>
                    <p className="text-muted-foreground leading-relaxed mb-8">
                      Leave a lasting legacy by supporting global health access.
                    </p>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={scrollToForm}
                    className="w-full rounded-full"
                  >
                    Talk to Us
                  </Button>
                </CardContent>
              </Card>

            </div>
          </div>
        </div>
      </section>

      {/* Enquiry Form */}
      <section id="enquiry-form" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <Card className="border-2">
              <CardContent className="p-8 md:p-12">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-serif font-bold mb-4">Get in Touch</h2>
                  <p className="text-muted-foreground">
                    Share your interest and we'll start the conversation.
                  </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <Label htmlFor="name" className="text-base font-medium">Name *</Label>
                    <Input
                      id="name"
                      {...register("name", { required: "Name is required" })}
                      className="mt-2 h-12 text-base"
                      placeholder="Your full name"
                    />
                    {errors.name && (
                      <p className="text-destructive text-sm mt-1">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-base font-medium">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      {...register("email", { 
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Please enter a valid email address"
                        }
                      })}
                      className="mt-2 h-12 text-base"
                      placeholder="your@email.com"
                    />
                    {errors.email && (
                      <p className="text-destructive text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-base font-medium">Phone (optional)</Label>
                    <Input
                      id="phone"
                      {...register("phone")}
                      className="mt-2 h-12 text-base"
                      placeholder="Your phone number"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-base font-medium">Message *</Label>
                    <Textarea
                      id="message"
                      {...register("message", { required: "Message is required" })}
                      className="mt-2 min-h-[120px] text-base resize-none"
                      placeholder="Tell us about your interest in partnering with us..."
                    />
                    {errors.message && (
                      <p className="text-destructive text-sm mt-1">{errors.message.message}</p>
                    )}
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full h-14 text-lg font-medium rounded-full"
                  >
                    Send Enquiry
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};