import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, User, Clock, Share2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { all50BlogPosts } from "@/data/complete50BlogPosts";

const getPostBySlug = (slug: string) => {
  return all50BlogPosts.find(post => post.slug === slug);
};

export const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : null;

  if (!post) {
    return (
      <div className="py-16">
        <div className="container-content text-center">
          <h1 className="text-4xl font-serif font-bold mb-6">Article Not Found</h1>
          <p className="text-muted-foreground mb-8">The article you're looking for doesn't exist or has been moved.</p>
          <Link to="/blog">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Articles
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className="py-16">
      <div className="container-content">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link 
            to="/blog" 
            className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Articles
          </Link>
        </nav>

        {/* Article Header */}
        <header className="mb-12">
          <div className="flex flex-wrap gap-2 mb-4">
            {post.categories.map((category) => (
              <Badge key={category} variant="secondary">
                {category}
              </Badge>
            ))}
          </div>
          
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 leading-tight">
            {post.title}
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            {post.summary}
          </p>

          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-8">
            <div className="flex items-center">
              <User className="w-4 h-4 mr-2" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              <span>{new Date(post.publishDate).toLocaleDateString('en-GB', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              <span>{post.readingTime} min read</span>
            </div>
          </div>

          {/* Featured Image */}
          <div className="aspect-video bg-gradient-to-br from-primary/20 to-gold/10 rounded-xl mb-12"></div>
        </header>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none mb-12">
          <div 
            className="prose-headings:font-serif prose-headings:font-bold prose-p:text-muted-foreground prose-p:leading-relaxed prose-blockquote:border-l-primary prose-blockquote:bg-primary/5 prose-blockquote:p-4 prose-blockquote:rounded-r-lg prose-strong:text-foreground prose-ul:text-muted-foreground prose-ol:text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: post.body.replace(/\n/g, '<br>').replace(/^# (.*)$/gm, '<h1>$1</h1>').replace(/^## (.*)$/gm, '<h2>$1</h2>').replace(/^### (.*)$/gm, '<h3>$1</h3>').replace(/^> (.*)$/gm, '<blockquote>$1</blockquote>').replace(/^\* (.*)$/gm, '<li>$1</li>').replace(/^- (.*)$/gm, '<li>$1</li>') }}
          />
        </div>

        {/* Article Footer */}
        <footer className="border-t pt-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  #{tag}
                </Badge>
              ))}
            </div>
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Share Article
            </Button>
          </div>

          {/* Author Info */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-gold rounded-full flex items-center justify-center text-white text-xl font-semibold">
                  {post.author.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">{post.author}</h3>
                  <p className="text-muted-foreground text-sm">
                    Contributing to healthcare justice through research, practice, and advocacy.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="text-center">
            <Link to="/blog">
              <Button size="lg">
                View All Articles
              </Button>
            </Link>
          </div>
        </footer>
      </div>
    </article>
  );
};