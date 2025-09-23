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
      
      <header className="sticky top-0 z-50 bg-background border-b border-border shadow-medium h-24 lg:h-36">
        <div className="w-full max-w-none px-4 lg:px-8">
          <div className="flex h-24 lg:h-36 items-center justify-between">
            {/* Logo */}
            <Link 
              to="/" 
              className="flex items-center text-foreground hover:opacity-90 transition-all duration-300 flex-shrink-0 py-4 px-3 group"
            >
              <img 
                src="/ghat-logo.png" 
                alt="Global Health Access Trust logo"
                className="h-20 w-auto sm:h-24 lg:h-32 transition-transform duration-300 group-hover:scale-105"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-2">
              {NAVIGATION_ITEMS.map((item) => (
                <div
                  key={item.href}
                  className="relative group"
                  onMouseEnter={() => 'submenu' in item && setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                  onClick={() => 'submenu' in item && setActiveDropdown(activeDropdown === item.label ? null : item.label)}
                >
                  <Link
                    to={item.href}
                    className="flex items-center px-4 py-3 text-sm font-medium text-foreground hover:text-primary hover:bg-accent/60 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 whitespace-nowrap relative overflow-hidden group"
                    tabIndex={0}
                  >
                    <span className="relative z-10">{item.label}</span>
                    {'submenu' in item && <ChevronDown className="w-3 h-3 ml-2 transition-transform duration-200 group-hover:rotate-180" />}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                  </Link>
                  
                   {/* Dropdown Menu */}
                  {'submenu' in item && activeDropdown === item.label && (
                    <div className="absolute top-full left-0 mt-3 w-80 bg-card border border-border rounded-2xl shadow-strong py-3 z-50 animate-in fade-in-0 slide-in-from-top-2 duration-300">
                      {item.submenu.map((subItem, index) => (
                        <Link
                          key={subItem.href}
                          to={subItem.href}
                          className="block px-6 py-4 text-sm text-foreground hover:text-primary hover:bg-gradient-to-r hover:from-primary/5 hover:to-primary/10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 focus:ring-offset-white group relative overflow-hidden"
                          onClick={() => setActiveDropdown(null)}
                          tabIndex={0}
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          <span className="relative z-10 font-medium">{subItem.label}</span>
                          <div className="absolute left-0 top-0 h-full w-1 bg-primary transform scale-y-0 group-hover:scale-y-100 transition-transform duration-200 origin-top" />
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-3">
              {/* Search */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSearchOpen(true)}
                aria-label="Search website"
                className="flex-shrink-0 h-10 w-10 rounded-xl hover:bg-accent/60 hover:scale-105 transition-all duration-200 group"
              >
                <Search className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
              </Button>

              {/* Partner With Us Button */}
              <Link to="/donate" className="flex-shrink-0">
                <Button variant="default" size="sm" className="hidden sm:inline-flex bg-primary hover:bg-primary-700 text-primary-foreground px-6 py-2.5 rounded-xl font-medium shadow-medium hover:shadow-strong transition-all duration-300 hover:scale-105 hover:-translate-y-0.5">
                  Partner With Us
                </Button>
              </Link>

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden flex-shrink-0 h-10 w-10 rounded-xl hover:bg-accent/60 transition-all duration-200 group"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                <div className="relative w-5 h-5">
                  <Menu className={`w-5 h-5 absolute transition-all duration-300 ${isMenuOpen ? 'opacity-0 rotate-180' : 'opacity-100 rotate-0'}`} />
                  <X className={`w-5 h-5 absolute transition-all duration-300 ${isMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-180'}`} />
                </div>
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
                <div className="px-6 pt-6 border-t border-muted/40 mt-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
                  <Link to="/donate">
                    <Button variant="default" size="lg" className="w-full min-h-[52px] bg-primary hover:bg-primary-700 text-primary-foreground rounded-2xl font-medium shadow-medium hover:shadow-strong transition-all duration-300 hover:scale-105 hover:-translate-y-0.5">
                      Partner With Us
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