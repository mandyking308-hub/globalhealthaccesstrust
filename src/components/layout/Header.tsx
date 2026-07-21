import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Menu, Search, X } from "lucide-react";
import { NAVIGATION_ITEMS } from "@/lib/constants";
import { SearchModal } from "@/components/common/SearchModal";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const closeMenu = () => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  };

  return (
    <>
      <a
        href="#main-content"
        className="ghat-skip-link sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        Skip to content
      </a>

      <header className="ghat-header">
        <div className="ghat-shell ghat-header__inner">
          <Link to="/" className="ghat-brand" aria-label="Global Health Access Trust - Home">
            <span className="ghat-brand__mark" aria-hidden="true">
              <span /><span /><span /><span />
            </span>
            <span className="ghat-brand__name">
              Global Health<br />Access Trust
            </span>
          </Link>

          <nav className="ghat-nav" aria-label="Primary navigation">
            {NAVIGATION_ITEMS.map((item) => (
              <div
                key={item.href}
                className="ghat-nav__item"
                onMouseEnter={() => "submenu" in item && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link to={item.href} className="ghat-nav__link">
                  {item.label}
                  {"submenu" in item && <ChevronDown aria-hidden="true" />}
                </Link>

                {"submenu" in item && activeDropdown === item.label && (
                  <div className="ghat-nav__dropdown">
                    {item.submenu.map((subItem) => (
                      <Link
                        key={subItem.href}
                        to={subItem.href}
                        onClick={() => setActiveDropdown(null)}
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="ghat-header__actions">
            <button
              type="button"
              className="ghat-icon-button"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search website"
            >
              <Search aria-hidden="true" />
            </button>
            <Link to="/auth" className="ghat-header__portal">
              Donor portal
            </Link>
            <button
              type="button"
              className="ghat-menu-button"
              onClick={() => setIsMenuOpen((current) => !current)}
              aria-expanded={isMenuOpen}
              aria-controls="ghat-mobile-navigation"
              aria-label="Toggle menu"
            >
              <span>Menu</span>
              {isMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <nav id="ghat-mobile-navigation" className="ghat-mobile-nav" aria-label="Mobile navigation">
            <div className="ghat-shell">
              {NAVIGATION_ITEMS.map((item) => (
                <div key={item.href} className="ghat-mobile-nav__group">
                  <Link
                    to={item.href}
                    className="ghat-mobile-nav__link"
                    onClick={(event) => {
                      if ("submenu" in item) {
                        event.preventDefault();
                        setActiveDropdown(activeDropdown === item.label ? null : item.label);
                      } else {
                        closeMenu();
                      }
                    }}
                  >
                    <span>{item.label}</span>
                    {"submenu" in item && (
                      <ChevronDown
                        aria-hidden="true"
                        className={activeDropdown === item.label ? "is-open" : ""}
                      />
                    )}
                  </Link>
                  {"submenu" in item && activeDropdown === item.label && (
                    <div className="ghat-mobile-nav__submenu">
                      {item.submenu.map((subItem) => (
                        <Link key={subItem.href} to={subItem.href} onClick={closeMenu}>
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Link to="/auth" className="ghat-mobile-nav__portal" onClick={closeMenu}>
                Open donor portal
              </Link>
            </div>
          </nav>
        )}
      </header>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};
