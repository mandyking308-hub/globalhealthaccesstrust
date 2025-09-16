import { Search, Calendar, User, Clock, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { blogPosts } from "@/data/fullBlogPosts";

export const BlogIndexPage = () => {
  // Show first 12 posts for initial load
  const displayedPosts = blogPosts.slice(0, 12);
  const featuredPosts = blogPosts.slice(0, 3);

  return (
    <div className="py-16">
      <div className="container-section">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            Impact & Insights
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Stories of healthcare justice, policy insights, and programme updates from the field.
          </p>
        </div>

        {/* Impact at a Glance */}
        <div className="mb-16 p-8 bg-gradient-to-r from-primary/5 to-gold/5 rounded-xl">
          <h2 className="text-3xl font-serif font-bold mb-6 text-center">Impact at a Glance</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-2xl font-bold text-primary mb-2">Principled Governance</div>
              <p className="text-muted-foreground">Unwavering commitment to ethical standards and institutional integrity</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary mb-2">Global Reach</div>
              <p className="text-muted-foreground">Healthcare justice initiatives across multiple regions and contexts</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary mb-2">Sustainable Impact</div>
              <p className="text-muted-foreground">Built to endure and create lasting change for generations</p>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input placeholder="Search articles..." className="pl-10" />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        {/* Featured Posts */}
        <div className="mb-16">
          <h2 className="text-3xl font-serif font-bold mb-8 text-center">Featured Stories</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {featuredPosts.map((post) => (
              <Card key={post.id} className="card-elevated">
                <CardContent className="p-0">
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-gold/10 rounded-t-xl"></div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      {post.categories.map((category) => (
                        <Badge key={category} variant="secondary" className="text-xs">
                          {category}
                        </Badge>
                      ))}
                    </div>
                    <Link to={`/blog/${post.slug}`}>
                      <h3 className="text-xl font-semibold mb-3 hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                    </Link>
                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {post.summary}
                    </p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>{new Date(post.publishDate).toLocaleDateString('en-GB', { 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        })}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* All Posts Grid */}
        <div className="mb-12">
          <h2 className="text-3xl font-serif font-bold mb-8 text-center">All Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedPosts.map((post) => (
              <Card key={post.id} className="card-elevated">
                <CardContent className="p-6">
                  <div className="aspect-video bg-muted rounded-lg mb-4"></div>
                  <div className="flex items-center gap-2 mb-3">
                    {post.categories.slice(0, 2).map((category) => (
                      <Badge key={category} variant="secondary" className="text-xs">
                        {category}
                      </Badge>
                    ))}
                  </div>
                  <Link to={`/blog/${post.slug}`}>
                    <h3 className="text-xl font-semibold mb-3 hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                  </Link>
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {post.summary}
                  </p>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      <span className="mr-4">{post.author}</span>
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{post.readingTime} min read</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{new Date(post.publishDate).toLocaleDateString('en-GB', { 
                        month: 'short', 
                        day: 'numeric' 
                      })}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Showing {displayedPosts.length} of {blogPosts.length} articles
          </p>
          <Button size="lg">Load More Articles</Button>
        </div>

        {/* RSS Feed */}
        <div className="text-center mt-8">
          <Link 
            to="/blog/rss.xml" 
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            Subscribe to RSS Feed
          </Link>
        </div>
      </div>
    </div>
  );
};