import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SEO } from "@/components/SEO";
import { all50BlogPosts } from "@/data/complete50BlogPosts";

export const BlogIndexPage = () => {
  const displayedPosts = all50BlogPosts.slice(0, 12);
  const featuredPosts = all50BlogPosts.slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <div className="container-section">
        <div className="py-8 lg:py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              Impact & Insights
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Stories of healthcare justice, policy insights, and programme updates from the field.
            </p>
          </div>

          {/* Impact at a Glance */}
          <div className="mb-16 p-6 lg:p-8 bg-gradient-to-r from-primary/5 to-gold/5 rounded-xl">
            <h2 className="text-2xl lg:text-3xl font-serif font-bold mb-6 text-center">Impact at a Glance</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 text-center">
              <div>
                <div className="text-xl lg:text-2xl font-bold text-primary mb-2">Principled Governance</div>
                <p className="text-muted-foreground text-sm lg:text-base">Unwavering commitment to ethical standards and institutional integrity</p>
              </div>
              <div>
                <div className="text-xl lg:text-2xl font-bold text-primary mb-2">Global Reach</div>
                <p className="text-muted-foreground text-sm lg:text-base">Healthcare justice initiatives across multiple regions and contexts</p>
              </div>
              <div>
                <div className="text-xl lg:text-2xl font-bold text-primary mb-2">Sustainable Impact</div>
                <p className="text-muted-foreground text-sm lg:text-base">Built to endure and create lasting change for generations</p>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="mb-12">
            <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input placeholder="Search articles..." className="pl-10 h-12" />
              </div>
              <Button variant="outline" className="h-12 px-6">
                
                Filter
              </Button>
            </div>
          </div>

          {/* Featured Posts */}
          <div className="mb-16">
            <h2 className="text-2xl lg:text-3xl font-serif font-bold mb-8 text-center">Featured Stories</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
              {featuredPosts.map((post) => (
                <Card key={post.id} className="card-elevated hover:shadow-lg transition-shadow duration-200">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      {post.categories.map((category) => (
                        <Badge key={category} variant="secondary" className="text-xs">
                          {category}
                        </Badge>
                      ))}
                    </div>
                    <Link to={`/blog/${post.slug}`}>
                      <h3 className="card-title text-xl font-serif font-semibold mb-3 hover:text-primary transition-colors leading-snug">
                        {post.title}
                      </h3>
                    </Link>
                    <div className="card-summary text-muted-foreground mb-4 leading-relaxed text-sm">
                      {post.summary}
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center">
                        
                        <span>{post.author}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* All Posts Grid */}
          <div className="mb-12">
            <h2 className="text-2xl lg:text-3xl font-serif font-bold mb-8 text-center">All Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {displayedPosts.map((post) => (
                <Card key={post.id} className="card-elevated hover:shadow-lg transition-shadow duration-200">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      {post.categories.slice(0, 2).map((category) => (
                        <Badge key={category} variant="secondary" className="text-xs">
                          {category}
                        </Badge>
                      ))}
                    </div>
                    <Link to={`/blog/${post.slug}`}>
                      <h3 className="card-title text-xl font-serif font-semibold mb-3 hover:text-primary transition-colors leading-snug">
                        {post.title}
                      </h3>
                    </Link>
                    <div className="card-summary text-muted-foreground mb-4 leading-relaxed text-sm">
                      {post.summary}
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center">
                        
                        <span className="mr-3">{post.author}</span>
                        
                        <span>{post.readingTime} min read</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Showing {displayedPosts.length} of {all50BlogPosts.length} articles
            </p>
            <Button size="lg" className="min-h-[44px] px-8">Load More Articles</Button>
          </div>

        </div>
      </div>
    </div>
  );
};