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
      
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-lg border-b border-border/50 shadow-sm h-20 md:h-22 lg:h-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 h-full">
          <div className="flex h-full items-center justify-between gap-8">
            
            {/* Logo */}
            <Link 
              to="/" 
              className="flex items-center gap-3 text-foreground hover:opacity-80 transition-opacity duration-200 flex-shrink-0 -ml-2"
              aria-label="Global Health Access Trust - Home"
            >
              {/* Structural Gateway Mark */}
              <svg viewBox="0 0 56 80" className="h-8 w-auto md:h-9 lg:h-10 flex-shrink-0" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="square">
                <line x1="11" y1="0" x2="11" y2="80"/>
                <line x1="45" y1="0" x2="45" y2="80"/>
                <line x1="11" y1="28" x2="45" y2="28"/>
              </svg>
              <span className="h-8 md:h-9 w-px bg-foreground/15 mx-0.5" />
              <span className="font-serif text-[14px] md:text-[16px] lg:text-[18px] tracking-[0.04em] uppercase text-foreground font-medium leading-tight">
                Global Health Access Trust
              </span>
            </Link>

            {/* Desktop Navigation - Centered & Professional */}
            <nav className="hidden lg:flex items-center justify-center flex-1 max-w-4xl mx-auto">
              <div className="flex items-center gap-1">
                {NAVIGATION_ITEMS.map((item) => (
                  <div
                    key={item.href}
                    className="relative"
                    onMouseEnter={() => 'submenu' in item && setActiveDropdown(item.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <Link
                      to={item.href}
                      className="flex items-center gap-1.5 px-4 py-2.5 text-[15px] font-medium text-foreground/80 hover:text-foreground hover:bg-accent/50 rounded-lg transition-all duration-200 whitespace-nowrap group"
                    >
                      {item.label}
                      {'submenu' in item && (
                        <ChevronDown className="w-3.5 h-3.5 text-muted-foreground transition-transform duration-200 group-hover:translate-y-0.5" />
                      )}
                    </Link>
                    
                    {/* Professional Dropdown Menu */}
                    {'submenu' in item && activeDropdown === item.label && (
                      <div className="absolute top-full left-0 mt-2 w-72 bg-background border border-border/80 rounded-xl shadow-xl py-2 z-50 animate-in fade-in-0 slide-in-from-top-1 duration-200">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.href}
                            to={subItem.href}
                            className="block px-4 py-3 text-[14px] text-foreground/75 hover:text-foreground hover:bg-accent/50 transition-colors duration-150"
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

            {/* Actions - Right Aligned */}
            <div className="flex items-center gap-3 flex-shrink-0">
              
              {/* Search Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSearchOpen(true)}
                aria-label="Search website"
                className="h-9 w-9 p-0 hover:bg-accent/50 rounded-lg transition-colors duration-200"
              >
                <Search className="w-[18px] h-[18px]" />
              </Button>

              {/* Login Button - Desktop */}
              <Link to="/auth" className="hidden md:inline-flex">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-10 px-5 text-[15px] font-medium border-border hover:bg-accent/50 rounded-lg transition-all duration-200"
                >
                  Login
                </Button>
              </Link>

              {/* Sign Up Button - Desktop */}
              <Link to="/auth" className="hidden sm:inline-flex">
                <Button 
                  variant="default" 
                  size="sm" 
                  className="h-10 px-6 text-[15px] font-medium bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
                >
                  Sign Up
                </Button>
              </Link>

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden h-9 w-9 p-0 hover:bg-accent/50 rounded-lg transition-colors duration-200"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden border-t border-border bg-background shadow-medium animate-in slide-in-from-top-4 duration-300">
              <div className="py-6 space-y-1 max-h-[70vh] overflow-y-auto">
                {NAVIGATION_ITEMS.map((item, index) => (
                  <div key={item.href} className="relative" style={{ animationDelay: `${index * 100}ms` }}>
                    <Link
                      to={item.href}
                      className="flex items-center justify-between px-6 py-4 text-base font-medium text-foreground hover:text-primary hover:bg-gradient-to-r hover:from-primary/5 hover:to-primary/10 rounded-2xl mx-4 transition-all duration-300 min-h-[52px] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 relative overflow-hidden group animate-in fade-in-0 slide-in-from-left-4"
                      onClick={(e) => {
                        if ('submenu' in item) {
                          e.preventDefault();
                          setActiveDropdown(activeDropdown === item.label ? null : item.label);
                        } else {
                          setIsMenuOpen(false);
                        }
                      }}
                    >
                      <span className="relative z-10">{item.label}</span>
                      {'submenu' in item && (
                        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === item.label ? 'rotate-180' : 'rotate-0'}`} />
                      )}
                      <div className="absolute left-0 top-0 h-full w-1 bg-primary transform scale-y-0 group-hover:scale-y-100 transition-transform duration-200 origin-center rounded-r-full" />
                    </Link>
                    {/* Mobile Submenu */}
                    {'submenu' in item && activeDropdown === item.label && (
                      <div className="ml-8 mt-2 space-y-1 border-l-2 border-primary/20 pl-6 animate-in fade-in-0 slide-in-from-left-2 duration-300">
                        {item.submenu.map((subItem, subIndex) => (
                          <Link
                            key={subItem.href}
                            to={subItem.href}
                            className="block px-4 py-4 text-sm text-muted-foreground hover:text-primary hover:bg-accent/40 rounded-xl transition-all duration-300 min-h-[48px] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 animate-in fade-in-0 slide-in-from-left-2 group relative overflow-hidden"
                            onClick={() => setIsMenuOpen(false)}
                            style={{ animationDelay: `${subIndex * 50}ms` }}
                          >
                            <span className="relative z-10 font-medium">{subItem.label}</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl" />
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div className="px-6 pt-6 border-t border-muted/40 mt-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-500 space-y-3">
                  <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" size="lg" className="w-full min-h-[52px] border-border hover:bg-accent/50 rounded-2xl font-medium transition-all duration-300">
                      Login
                    </Button>
                  </Link>
                  <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="default" size="lg" className="w-full min-h-[52px] bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl font-medium shadow-medium hover:shadow-strong transition-all duration-300">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};