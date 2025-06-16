import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Icon from "../AppIcon";
import SearchBar from "./SearchBar";
import CartIndicator from "./CartIndicator";
import AuthenticationToggle from "./AuthenticationToggle";
import NavigationMenu from "./NavigationMenu";
import { useTheme } from "../ThemeProvider";

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigationItems = [
    // Removed Catalog and Categories as per user request
  ];

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-header bg-background dark:bg-background border-b transition-all duration-150 ${
          isScrolled
            ? "border-border dark:border-border shadow-subtle"
            : "border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 rounded-md text-text-secondary dark:text-text-secondary hover:text-primary dark:hover:text-primary hover:bg-surface dark:hover:bg-surface transition-colors duration-150 min-w-touch min-h-touch flex items-center justify-center"
              aria-label="Toggle mobile menu"
            >
              <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
            </button>

            {/* Logo */}
            <Link
              to="/product-catalog-browse"
              className="flex items-center space-x-2 min-w-[120px]"
            >
              <img
                src="/Sawa Logo.svg"
                alt="Sawa Logo"
                className="h-8 w-auto sm:h-10"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <Link
                  key={`nav-${item.name}`}
                  to={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
                    isActivePath(item.href)
                      ? "text-primary dark:text-primary bg-primary-50 dark:bg-primary-50"
                      : "text-text-secondary dark:text-text-secondary hover:text-primary dark:hover:text-primary hover:bg-surface dark:hover:bg-surface"
                  }`}
                >
                  <Icon name={item.icon} size={18} />
                  <span>{item.name}</span>
                </Link>
              ))}
            </nav>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <SearchBar />
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-2 lg:space-x-4">
              {/* Search Button - Mobile */}
              <button className="md:hidden p-2 rounded-md text-text-secondary dark:text-text-secondary hover:text-primary dark:hover:text-primary hover:bg-surface dark:hover:bg-surface transition-colors duration-150 min-w-touch min-h-touch flex items-center justify-center">
                <Icon name="Search" size={20} />
              </button>

              <CartIndicator />
              <Link
                to="/favorites"
                className="p-2 rounded-md text-text-secondary dark:text-text-secondary hover:text-primary dark:hover:text-primary hover:bg-surface dark:hover:bg-surface transition-colors duration-150 min-w-touch min-h-touch flex items-center justify-center"
                aria-label="Favorites"
              >
                <Icon name="Heart" size={20} />
              </Link>
              <AuthenticationToggle />
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className="md:hidden pb-4">
            <SearchBar />
          </div>
        </div>
      </header>

      {/* Mobile Navigation Menu */}
      <NavigationMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navigationItems={navigationItems}
      />
    </>
  );
}

export default Header;
