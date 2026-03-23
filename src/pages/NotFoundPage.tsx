import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center py-16">
      <div className="container-content text-center">
        <div className="max-w-2xl mx-auto">
          {/* 404 Icon */}
          <div className="text-9xl font-bold text-gold mb-6">404</div>
          
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            Page Not Found
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            We're sorry, but the page you're looking for doesn't exist or has been moved. 
            Let us help you find what you're looking for.
          </p>

          {/* Quick Search */}
          <Card className="card-professional mb-8">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center justify-center">
                <Search className="w-5 h-5 mr-2" />
                Quick Search
              </h3>
              <div className="flex gap-2">
                <Input 
                  placeholder="Search for pages, documents, or content..."
                  className="flex-1"
                />
                <Button>
                  Search
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Navigation Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="card-professional hover:card-elevated transition-all cursor-pointer">
              <CardContent className="p-6 text-center">
                
                <h4 className="font-semibold mb-2">Home Page</h4>
                <p className="text-sm text-muted-foreground">Return to our homepage</p>
              </CardContent>
            </Card>

            <Card className="card-professional hover:card-elevated transition-all cursor-pointer">
              <CardContent className="p-6 text-center">
                <Search className="w-8 h-8 text-primary mx-auto mb-3" />
                <h4 className="font-semibold mb-2">Search Site</h4>
                <p className="text-sm text-muted-foreground">Find what you're looking for</p>
              </CardContent>
            </Card>

            <Card className="card-professional hover:card-elevated transition-all cursor-pointer">
              <CardContent className="p-6 text-center">
                
                <h4 className="font-semibold mb-2">Go Back</h4>
                <p className="text-sm text-muted-foreground">Return to previous page</p>
              </CardContent>
            </Card>
          </div>

          {/* Popular Links */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Popular Pages</h3>
            <div className="flex flex-wrap gap-2 justify-center">
              <Link to="/about">
                <Button variant="outline" size="sm">About Us</Button>
              </Link>
              <Link to="/what-we-do">
                <Button variant="outline" size="sm">What We Do</Button>
              </Link>
              <Link to="/blog">
                <Button variant="outline" size="sm">Impact & Blog</Button>
              </Link>
              <Link to="/get-involved">
                <Button variant="outline" size="sm">Get Involved</Button>
              </Link>
              <Link to="/publications">
                <Button variant="outline" size="sm">Publications</Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="sm">Contact</Button>
              </Link>
            </div>
          </div>

          {/* Primary Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                
                Go to Homepage
              </Button>
            </Link>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => window.history.back()}
            >
              
              Go Back
            </Button>
          </div>

          {/* Help Text */}
          <div className="mt-12 p-6 bg-muted/30 rounded-xl">
            <h4 className="font-semibold mb-2">Need Help?</h4>
            <p className="text-sm text-muted-foreground">
              If you believe this page should exist, please{" "}
              <Link to="/contact" className="text-primary hover:underline">
                contact us
              </Link>{" "}
              and let us know what you were looking for.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};