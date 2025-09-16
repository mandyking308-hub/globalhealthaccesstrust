import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { SearchResult } from "@/types";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Mock search function - in a real app this would call an API
  const performSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setIsSearching(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    // Mock results
    const mockResults: SearchResult[] = [
      {
        type: "page" as const,
        title: "About Us",
        url: "/about",
        excerpt: "The Global Health Access Trust was established to uphold one of the most sacred obligations of civil society..."
      },
      {
        type: "page" as const,
        title: "What We Do",
        url: "/what-we-do",
        excerpt: "Our funding mandate encompasses five areas of lawful, equitable intervention..."
      },
      {
        type: "blog" as const,
        title: "Healthcare Access in Crisis Zones",
        url: "/blog/healthcare-access-crisis-zones",
        excerpt: "Examining the challenges and opportunities for delivering dignified healthcare in conflict-affected regions...",
        date: "2024-03-15"
      },
      {
        type: "document" as const,
        title: "Annual Report 2024",
        url: "/publications/annual-report-2024",
        excerpt: "Our comprehensive review of programmes, impact, and financial stewardship for 2024...",
        date: "2024-12-01"
      }
    ].filter(result =>
      result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setResults(mockResults);
    setIsSearching(false);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      performSearch(query);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query]);

  useEffect(() => {
    if (!isOpen) {
      setQuery("");
      setResults([]);
    }
  }, [isOpen]);

  const handleResultClick = () => {
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="sr-only">Search GHAT Website</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="text"
              placeholder="Search pages, articles, and documents..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 pr-10"
              autoFocus
            />
            {query && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setQuery("")}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
              >
                <X className="w-3 h-3" />
              </Button>
            )}
          </div>

          {/* Search Results */}
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {isSearching && (
              <div className="text-center py-8 text-muted-foreground">
                Searching...
              </div>
            )}
            
            {!isSearching && query && results.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No results found for "{query}"
              </div>
            )}
            
            {!isSearching && results.length > 0 && (
              <>
                <div className="text-sm text-muted-foreground mb-4">
                  {results.length} result{results.length !== 1 ? 's' : ''} found
                </div>
                {results.map((result, index) => (
                  <a
                    key={index}
                    href={result.url}
                    onClick={handleResultClick}
                    className="block p-4 rounded-lg border border-border hover:bg-accent transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium text-foreground">{result.title}</h3>
                      <span className="text-xs text-muted-foreground capitalize bg-muted px-2 py-1 rounded">
                        {result.type}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {result.excerpt}
                    </p>
                    {result.date && (
                      <p className="text-xs text-muted-foreground mt-2">
                        {new Date(result.date).toLocaleDateString()}
                      </p>
                    )}
                  </a>
                ))}
              </>
            )}
            
            {!query && (
              <div className="text-center py-8 text-muted-foreground">
                Start typing to search pages, articles, and documents
              </div>
            )}
          </div>

          {/* Search Tips */}
          <div className="text-xs text-muted-foreground border-t pt-4">
            <p><strong>Search tips:</strong> Use specific keywords for better results. Search covers all pages, blog posts, and document titles.</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};