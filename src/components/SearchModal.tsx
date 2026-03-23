import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { all50BlogPosts } from "@/data/complete50BlogPosts";
import { documents } from "@/data/documents";
import { Link } from "react-router-dom";

interface SearchResult {
  id: string;
  title: string;
  description: string;
  url: string;
  type: 'page' | 'blog' | 'document';
}

const pages = [
  { id: '1', title: 'About Us', description: 'Learn about our mission, values, and leadership', url: '/about', type: 'page' as const },
  { id: '2', title: 'What We Do', description: 'Five areas of healthcare intervention and support', url: '/what-we-do', type: 'page' as const },
  { id: '3', title: 'Get Involved', description: 'Support our mission through donations and partnerships', url: '/get-involved', type: 'page' as const },
  { id: '4', title: 'Contact', description: 'Get in touch with our team', url: '/contact', type: 'page' as const },
  { id: '5', title: 'Constitution', description: 'Our governing document and legal framework', url: '/constitution', type: 'page' as const }
];

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const searchQuery = query.toLowerCase();
    
    // Search pages
    const pageResults = pages
      .filter(page => 
        page.title.toLowerCase().includes(searchQuery) ||
        page.description.toLowerCase().includes(searchQuery)
      )
      .map(page => ({
        id: page.id,
        title: page.title,
        description: page.description,
        url: page.url,
        type: page.type
      }));

    // Search blog posts
    const blogResults = all50BlogPosts
      .filter(post => 
        post.title.toLowerCase().includes(searchQuery) ||
        post.summary.toLowerCase().includes(searchQuery) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery)) ||
        post.categories.some(cat => cat.toLowerCase().includes(searchQuery))
      )
      .slice(0, 5)
      .map(post => ({
        id: post.id,
        title: post.title,
        description: post.summary,
        url: `/blog/${post.slug}`,
        type: 'blog' as const
      }));

    // Search documents
    const docResults = documents
      .filter(doc => 
        doc.title.toLowerCase().includes(searchQuery) ||
        doc.description.toLowerCase().includes(searchQuery) ||
        doc.tags.some(tag => tag.toLowerCase().includes(searchQuery))
      )
      .map(doc => ({
        id: doc.id,
        title: doc.title,
        description: doc.description,
        url: doc.id === 'constitution-signed' ? '/constitution' : `/publications#${doc.id}`,
        type: 'document' as const
      }));

    setResults([...pageResults, ...blogResults, ...docResults].slice(0, 8));
  }, [query]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'blog': return ;
      case 'document': return ;
      default: return ;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'blog': return 'bg-blue-100 text-blue-800';
      case 'document': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Search className="w-5 h-5 mr-2" />
              Search GHAT
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search pages, articles, and documents..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10"
              autoFocus
            />
          </div>

          {query.trim() && (
            <div className="max-h-96 overflow-y-auto space-y-2">
              {results.length > 0 ? (
                results.map((result) => (
                  <Link
                    key={result.id}
                    to={result.url}
                    onClick={onClose}
                    className="block p-3 hover:bg-accent rounded-lg transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        <div className="mt-1">{getIcon(result.type)}</div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-sm line-clamp-1">{result.title}</h3>
                          <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                            {result.description}
                          </p>
                        </div>
                      </div>
                      <Badge variant="secondary" className={`text-xs ml-2 ${getTypeColor(result.type)}`}>
                        {result.type}
                      </Badge>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>No results found for "{query}"</p>
                  <p className="text-sm mt-1">Try searching with different keywords</p>
                </div>
              )}
            </div>
          )}

          {!query.trim() && (
            <div className="text-center py-8 text-muted-foreground">
              <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>Start typing to search our content</p>
              <p className="text-sm mt-1">Search pages, blog articles, and documents</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};