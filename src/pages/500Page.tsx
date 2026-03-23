import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const ServerErrorPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-muted/30 to-background">
      <div className="container-section">
        <div className="max-w-2xl mx-auto text-center">
          <Card className="card-elevated">
            <CardContent className="p-12">
              <div className="w-20 h-20 bg-danger/10 rounded-full flex items-center justify-center mx-auto mb-8">
                
              </div>
              
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
                Server Error
              </h1>
              
              <div className="text-6xl font-mono text-muted-foreground mb-6">
                500
              </div>
              
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                We're experiencing a temporary server issue. Our technical team has been 
                notified and is working to resolve this as quickly as possible.
              </p>
              
              <div className="space-y-4 mb-8">
                <p className="text-sm text-muted-foreground">
                  Please try again in a few minutes. If the problem persists, you can:
                </p>
                
                <ul className="text-sm text-muted-foreground space-y-2 text-left max-w-md mx-auto">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0" />
                    Refresh the page
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0" />
                    Clear your browser cache
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0" />
                    Contact our support team
                  </li>
                </ul>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button onClick={() => window.location.reload()} size="lg">
                  Try Again
                </Button>
                
                <Link to="/">
                  <Button variant="outline" size="lg">
                    
                    Go Home
                  </Button>
                </Link>
                
                <Link to="/contact">
                  <Button variant="outline" size="lg">
                    Contact Support
                  </Button>
                </Link>
              </div>
              
              <div className="mt-8 pt-8 border-t text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  Need immediate assistance?
                </p>
                <Link 
                  to="/contact"
                  className="text-primary hover:underline text-sm"
                >
                  Please use the Contact Form
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};