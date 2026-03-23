import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NAVIGATION_ITEMS, SITE_CONFIG } from "@/lib/constants";
import { SearchModal } from "@/components/common/SearchModal";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <>
      <a
        href="#main-content"
        className="skip-link sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50"
      >
        Skip to content
      </a>
      
      <header className="sticky top-0 z-50 bg-background border-b border-border/30 h-16 md:h-18 lg:h-20">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12 h-full">
          <div className="flex h-full items-center justify-between gap-8">
            
            {/* Logo */}
            <Link 
              to="/" 
              className="text-foreground hover:opacity-80 transition-opacity duration-200 flex-shrink-0 text-[15px] font-semibold tracking-wide uppercase"
              aria-label="Global Health Access Trust - Home"
            >
              GHAT
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center justify-center flex-1 max-w-3xl mx-auto">
              <div className="flex items-center gap-0">
                {NAVIGATION_ITEMS.map((item) => (
                  <div
                    key={item.href}
                    className="relative"
                    onMouseEnter={() => 'submenu' in item && setActiveDropdown(item.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <Link
                      to={item.href}
                      className="flex items-center gap-1 px-4 py-2 text-[14px] font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 whitespace-nowrap"
                    >
                      {item.label}
                      {'submenu' in item && (
                        <ChevronDown className="w-3 h-3 text-muted-foreground/60" />
                      )}
                    </Link>
                    
                    {'submenu' in item && activeDropdown === item.label && (
                      <div className="absolute top-full left-0 mt-0 w-64 bg-background border border-border/60 shadow-sm py-2 z-50">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.href}
                            to={subItem.href}
                            className="block px-5 py-2.5 text-[13px] text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors duration-150"
                            onClick={() => setActiveDropdown(null)}
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSearchOpen(true)}
                aria-label="Search website"
                className="h-9 w-9 p-0 hover:bg-muted/50 transition-colors duration-200"
              >
                <Search className="w-[16px] h-[16px]" />
              </Button>

              <Link to="/auth" className="hidden md:inline-flex">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-9 px-4 text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  Login
                </Button>
              </Link>

              <Link to="/auth" className="hidden sm:inline-flex">
                <Button 
                  variant="default" 
                  size="sm" 
                  className="h-9 px-5 text-[13px] font-medium rounded-sm"
                >
                  Sign Up
                </Button>
              </Link>

              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden h-9 w-9 p-0"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden border-t border-border/30 bg-background">
              <div className="py-4 space-y-1">
                {NAVIGATION_ITEMS.map((item) => (
                  <div key={item.href}>
                    <Link
                      to={item.href}
                      className="flex items-center justify-between px-4 py-3 text-sm font-medium text-foreground hover:bg-muted/40 transition-colors"
                      onClick={(e) => {
                        if ('submenu' in item) {
                          e.preventDefault();
                          setActiveDropdown(activeDropdown === item.label ? null : item.label);
                        } else {
                          setIsMenuOpen(false);
                        }
                      }}
                    >
                      <span>{item.label}</span>
                      {'submenu' in item && (
                        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === item.label ? 'rotate-180' : ''}`} />
                      )}
                    </Link>
                    {'submenu' in item && activeDropdown === item.label && (
                      <div className="ml-4 border-l border-border/30 pl-4 py-1 space-y-1">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.href}
                            to={subItem.href}
                            className="block px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div className="px-4 pt-4 border-t border-border/30 mt-4 space-y-2">
                  <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" size="sm" className="w-full text-sm">
                      Login
                    </Button>
                  </Link>
                  <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="default" size="sm" className="w-full text-sm">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};
