import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NAVIGATION_ITEMS, SITE_CONFIG } from "@/lib/constants";
import { SearchModal } from "@/components/common/SearchModal";

const GHATLogo = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 220 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Icon: global ring + access node */}
    <g transform="translate(8, 8)">
      {/* Outer globe ring — subtle */}
      <circle cx="24" cy="24" r="22" stroke="hsl(var(--primary))" strokeWidth="3" opacity="0.18" />
      {/* Active arc suggesting access / movement */}
      <path
        d="M24 2 A22 22 0 0 1 46 24"
        stroke="hsl(var(--accent))"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      {/* Horizontal equator */}
      <line x1="2" y1="24" x2="46" y2="24" stroke="hsl(var(--primary))" strokeWidth="1.5" opacity="0.35" />
      {/* Vertical meridian */}
      <line x1="24" y1="2" x2="24" y2="46" stroke="hsl(var(--primary))" strokeWidth="1.5" opacity="0.35" />
      {/* Access cross / node */}
      <rect x="14" y="22" width="20" height="4" rx="2" fill="hsl(var(--accent))" />
      <rect x="22" y="14" width="4" height="20" rx="2" fill="hsl(var(--accent))" />
      {/* Central hub */}
      <circle cx="24" cy="24" r="5" fill="hsl(var(--background))" stroke="hsl(var(--primary))" strokeWidth="2" />
    </g>

    {/* Wordmark */}
    <text
      x="64"
      y="28"
      fontFamily="Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif"
      fontSize="19.5"
      fontWeight="800"
      letterSpacing="-0.02em"
      fill="hsl(var(--foreground))"
      textTransform="uppercase"
    >
      Global Health
    </text>
    <line x1="64" y1="38" x2="212" y2="38" stroke="hsl(var(--accent))" strokeWidth="1" opacity="0.45" />
    <text
      x="138"
      y="52"
      fontFamily="Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif"
      fontSize="12"
      fontWeight="700"
      letterSpacing="0.18em"
      fill="hsl(var(--accent))"
      textTransform="uppercase"
      fontStyle="italic"
    >
      Access Trust
    </text>
  </svg>
);

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
          <div className="max-w-[1400px] mx-auto px-8 h-8 flex items-center justify-between text-[10.5px] font-sans font-bold tracking-[0.18em] uppercase">
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

            {/* Logo — GHAT institutional wordmark */}
            <Link
              to="/"
              className="flex items-center hover:opacity-85 transition-opacity duration-200 flex-shrink-0"
              aria-label="Global Health Access Trust - Home"
            >
              <GHATLogo className="h-14 w-auto" />
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
                      className="flex items-center gap-1 px-4 py-2 text-[13px] font-sans font-black uppercase tracking-[0.06em] text-foreground/85 hover:text-foreground transition-colors duration-200 whitespace-nowrap"
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
                className="hidden md:inline-flex items-center h-9 px-4 bg-primary text-primary-foreground text-[12px] font-sans font-black uppercase tracking-[0.14em] hover:bg-primary/90 transition-colors"
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
