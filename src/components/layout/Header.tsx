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
      
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border h-16 lg:h-20">
        <div className="w-full max-w-none px-4 lg:px-8">
          <div className="flex h-16 lg:h-20 items-center justify-between">
            {/* Logo */}
            <Link 
              to="/" 
              className="flex items-center space-x-3 text-foreground hover:opacity-80 transition-opacity flex-shrink-0"
            >
              <img 
                src="/ghat-logo.png" 
                alt="Global Health Access Trust logo"
                className="h-12 w-auto sm:h-14 lg:h-16"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-4">
              {NAVIGATION_ITEMS.map((item) => (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => 'submenu' in item && setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                  onClick={() => 'submenu' in item && setActiveDropdown(activeDropdown === item.label ? null : item.label)}
                >
                  <Link
                    to={item.href}
                    className="flex items-center px-3 py-2 text-sm font-medium text-foreground hover:text-primary hover:bg-accent/80 rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 whitespace-nowrap"
                    tabIndex={0}
                  >
                    {item.label}
                    {'submenu' in item && <ChevronDown className="w-3 h-3 ml-1" />}
                  </Link>
                  
                   {/* Dropdown Menu */}
                  {'submenu' in item && activeDropdown === item.label && (
                    <div className="absolute top-full left-0 mt-2 w-72 bg-background border border-border rounded-lg shadow-xl py-2 z-50 animate-in fade-in-0 zoom-in-95 duration-200">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.href}
                          to={subItem.href}
                          className="block px-4 py-3 text-sm text-foreground hover:text-primary hover:bg-accent/60 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
                          onClick={() => setActiveDropdown(null)}
                          tabIndex={0}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-2">
              {/* Search */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSearchOpen(true)}
                aria-label="Search website"
                className="flex-shrink-0"
              >
                <Search className="w-4 h-4" />
              </Button>


              {/* Partner With Us Button */}
              <Link to="/donate" className="flex-shrink-0">
                <Button variant="default" size="sm" className="hidden sm:inline-flex">
                  Partner With Us
                </Button>
              </Link>

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden flex-shrink-0"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden border-t border-border bg-background">
              <div className="py-4 space-y-2 max-h-96 overflow-y-auto">
                {NAVIGATION_ITEMS.map((item) => (
                  <div key={item.href}>
                    <Link
                      to={item.href}
                      className="flex items-center justify-between px-4 py-3 text-base font-medium text-foreground hover:text-primary hover:bg-accent/60 rounded-md transition-all duration-200 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                      onClick={(e) => {
                        if ('submenu' in item) {
                          e.preventDefault();
                          setActiveDropdown(activeDropdown === item.label ? null : item.label);
                        } else {
                          setIsMenuOpen(false);
                        }
                      }}
                    >
                      {item.label}
                      {'submenu' in item && <ChevronDown className="w-4 h-4" />}
                    </Link>
                    {/* Mobile Submenu */}
                    {'submenu' in item && activeDropdown === item.label && (
                      <div className="ml-4 mt-1 space-y-1 border-l-2 border-accent pl-4 animate-in fade-in-0 slide-in-from-left-2 duration-200">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.href}
                            to={subItem.href}
                            className="block px-4 py-3 text-sm text-muted-foreground hover:text-primary hover:bg-accent/40 rounded-md transition-all duration-200 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div className="px-4 pt-4 border-t border-border mt-4">
                  <Link to="/donate">
                    <Button variant="default" size="lg" className="w-full min-h-[44px]">
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