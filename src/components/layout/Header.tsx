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

      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-foreground/10">
        {/* Utility strip */}
        <div className="hidden md:block border-b border-foreground/5 bg-primary text-primary-foreground">
          <div className="max-w-[1400px] mx-auto px-8 h-8 flex items-center justify-between text-[10.5px] font-medium tracking-[0.18em] uppercase">
            <span className="opacity-80">Registered Charitable Trust — England & Wales</span>
            <div className="flex items-center gap-6 opacity-90">
              <Link to="/contact" className="hover:opacity-100 opacity-80 transition-opacity">Contact</Link>
              <Link to="/governance" className="hover:opacity-100 opacity-80 transition-opacity">Governance</Link>
              <Link to="/publications" className="hover:opacity-100 opacity-80 transition-opacity">Publications</Link>
            </div>
          </div>
        </div>

        {/* Main bar */}
        <div className="max-w-[1400px] mx-auto px-6 md:px-8 h-[76px]">
          <div className="flex h-full items-center justify-between gap-10">

            {/* Logo — OSF-style stacked heavy uppercase wordmark */}
            <Link
              to="/"
              className="flex items-center text-foreground hover:opacity-80 transition-opacity duration-200 flex-shrink-0"
              aria-label="Global Health Access Trust - Home"
            >
              <span className="font-serif text-[15px] font-black tracking-[0.02em] uppercase leading-[0.95]">
                Global Health<br/>Access Trust
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center flex-1 justify-end">
              <div className="flex items-center">
                {NAVIGATION_ITEMS.map((item) => (
                  <div
                    key={item.href}
                    className="relative"
                    onMouseEnter={() => 'submenu' in item && setActiveDropdown(item.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <Link
                      to={item.href}
                      className="flex items-center gap-1 px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-foreground/75 hover:text-foreground transition-colors duration-200 whitespace-nowrap"
                    >
                      {item.label}
                      {'submenu' in item && (
                        <ChevronDown className="w-3 h-3 text-foreground/50" />
                      )}
                    </Link>

                    {'submenu' in item && activeDropdown === item.label && (
                      <div className="absolute top-full left-0 mt-0 w-64 bg-background border border-foreground/10 shadow-medium py-2 z-50">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.href}
                            to={subItem.href}
                            className="block px-5 py-2.5 text-[12.5px] text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors duration-150"
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
            <div className="flex items-center gap-5 flex-shrink-0 pl-4 lg:border-l lg:border-foreground/10">
              <button
                onClick={() => setIsSearchOpen(true)}
                aria-label="Search website"
                className="h-9 w-9 flex items-center justify-center text-foreground/70 hover:text-foreground transition-colors"
              >
                <Search className="w-4 h-4" />
              </button>

              <Link
                to="/auth"
                className="hidden md:inline-flex items-center h-9 px-4 bg-primary text-primary-foreground text-[11px] font-bold uppercase tracking-[0.18em] hover:bg-primary/90 transition-colors"
              >
                Login
              </Link>

              <button
                className="lg:hidden h-9 w-9 flex items-center justify-center"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden border-t border-foreground/10 bg-background">
              <div className="py-4 space-y-1">
                {NAVIGATION_ITEMS.map((item) => (
                  <div key={item.href}>
                    <Link
                      to={item.href}
                      className="flex items-center justify-between px-4 py-3 text-sm font-medium uppercase tracking-wide text-foreground hover:bg-muted/40 transition-colors"
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
                      <div className="ml-4 border-l border-foreground/10 pl-4 py-1 space-y-1">
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
                <div className="px-4 pt-4 border-t border-foreground/10 mt-4 space-y-2">
                  <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" size="sm" className="w-full text-sm">
                      Login
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
