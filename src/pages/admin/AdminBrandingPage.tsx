import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

export const AdminBrandingPage = () => {
  const { toast } = useToast();
  const [logoFile, setLogoFile] = useState<File | null>(null);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      toast({
        title: "Logo uploaded",
        description: "Logo changes will be applied after save.",
      });
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-serif text-foreground mb-2">
          Branding Management
        </h1>
        <p className="text-muted-foreground">
          Customize the visual identity of the GHAT platform
        </p>
      </div>

      <Tabs defaultValue="logo" className="space-y-6">
        <TabsList>
          <TabsTrigger value="logo">Logo & Assets</TabsTrigger>
          <TabsTrigger value="colors">Colors</TabsTrigger>
          <TabsTrigger value="typography">Typography</TabsTrigger>
          <TabsTrigger value="images">Hero Images</TabsTrigger>
        </TabsList>

        <TabsContent value="logo" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                
                Upload Logo
              </CardTitle>
              <CardDescription>
                Upload your organization's logo. Recommended size: 200x60px (PNG or SVG)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="logo">Logo File</Label>
                <Input
                  id="logo"
                  type="file"
                  accept="image/png,image/svg+xml"
                  onChange={handleLogoUpload}
                  className="mt-2"
                />
              </div>
              {logoFile && (
                <p className="text-sm text-muted-foreground">
                  Selected: {logoFile.name}
                </p>
              )}
              <Button className="btn-gold-hover">
                Save Logo
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="colors" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                
                Brand Color Palette
              </CardTitle>
              <CardDescription>
                GHAT uses a refined luxury-humanitarian color scheme
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Primary (Deep Navy)</Label>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg border" style={{ backgroundColor: '#05152F' }} />
                    <code className="text-sm">#05152F</code>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Secondary (Royal Blue)</Label>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg border" style={{ backgroundColor: '#0B3C89' }} />
                    <code className="text-sm">#0B3C89</code>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Accent (Gold)</Label>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg border" style={{ backgroundColor: '#C2A878' }} />
                    <code className="text-sm">#C2A878</code>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Surface (Soft Grey)</Label>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg border" style={{ backgroundColor: '#E8ECEF' }} />
                    <code className="text-sm">#E8ECEF</code>
                  </div>
                </div>
              </div>

              <p className="text-sm text-muted-foreground">
                Color modifications are restricted to maintain brand consistency.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="typography" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                
                Typography Hierarchy
              </CardTitle>
              <CardDescription>
                GHAT uses a refined typographic system
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="pb-4 border-b">
                  <p className="text-5xl font-serif font-bold">H1 Heading</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Playfair Display, 40-52px, Bold
                  </p>
                </div>

                <div className="pb-4 border-b">
                  <p className="text-3xl font-serif font-medium">H2 Heading</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Playfair Display, 28-32px, Medium
                  </p>
                </div>

                <div className="pb-4 border-b">
                  <p className="text-xl font-semibold">H3 Heading</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Inter, 22-24px, Semibold
                  </p>
                </div>

                <div className="pb-4 border-b">
                  <p className="text-base">Body Text</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Inter, 15-16px, Regular
                  </p>
                </div>

                <div>
                  <p className="text-sm">Caption Text</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Inter, 13-14px, Light
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="images" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <"Img" className="w-5 h-5 text-[#C2A878]" />
                Hero Images
              </CardTitle>
              <CardDescription>
                Upload hero images for key pages (minimum 1920x1080px)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label>Homepage Hero</Label>
                  <Input type="file" accept="image/*" className="mt-2" />
                </div>

                <div>
                  <Label>Commissioned Projects Hero</Label>
                  <Input type="file" accept="image/*" className="mt-2" />
                </div>

                <div>
                  <Label>About Page Hero</Label>
                  <Input type="file" accept="image/*" className="mt-2" />
                </div>
              </div>

              <div className="pt-4">
                <h3 className="font-medium mb-2">Image Guidelines</h3>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>High resolution (minimum 1920x1080px)</li>
                  <li>Humanitarian + field-work oriented</li>
                  <li>Dignified, authentic, real</li>
                  <li>Diverse representation</li>
                  <li>Warm-toned with soft contrast</li>
                  <li>Professionally lit</li>
                </ul>
              </div>

              <Button className="btn-gold-hover">
                Save Images
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
