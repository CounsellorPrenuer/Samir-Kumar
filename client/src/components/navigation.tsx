// src/components/layout/navigation.tsx

import { useState } from "react";
import { Menu, X, Search, ChevronDown } from "lucide-react";
import careerSkopeLogoPath from "@assets/logo.png";
import { ResponsiveImage } from "./responsive-image";
import { useScrollspy } from "@/hooks/use-scrollspy";
import ScrollProgressBar from "./scroll-progress-bar";
import { Button } from "@/components/ui/button";
import SearchDialog from "./search-dialog";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);

  const navLinks = [
    { href: "#why-cs", label: "Why CS" },
    { href: "#packages", label: "Solutions" },
    { href: "#leadership", label: "Leadership" },
    { href: "#gallery", label: "Gallery" },
    { href: "#contact", label: "Contact" },
  ];

  const moreLinks = [
    { href: "#about", label: "About CS" },
    { href: "#testimonials", label: "Success Stories" },
    { href: "#blog", label: "Resources" },
  ];

  // Track active section with scrollspy - include all sections
  const allSectionIds = [...navLinks.map(link => link.href), ...moreLinks.map(link => link.href)];
  const activeSection = useScrollspy(allSectionIds, 100);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      // Respect user's reduced motion preference
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      element.scrollIntoView({ 
        behavior: prefersReducedMotion ? 'auto' : 'smooth', 
        block: 'start' 
      });
    }
    setIsMobileMenuOpen(false);
    // Update URL hash for better accessibility and navigation
    window.history.replaceState(null, '', href);
  };

  return (
    <>
      <ScrollProgressBar />
      <nav className="fixed top-0 w-full z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-sm transition-all duration-300 hover:shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <ResponsiveImage 
              src={careerSkopeLogoPath} 
              alt="Careerskope Logo" 
              // --- FINAL CHANGES ARE HERE ---
              className="h-12 sm:h-14 md:h-16 w-auto object-contain"
              loading="eager"
              priority={true}
              sizes="(max-width: 640px) 150px, (max-width: 768px) 180px, 220px"
              width={220}
              height={56} // Note: This prop is for aspect ratio, the className controls display size.
              fixed={true}
              data-testid="logo-image"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className={`nav-link transition-all duration-200 text-sm font-medium whitespace-nowrap px-3 xl:px-4 py-2 rounded-lg relative ${
                  activeSection === link.href
                    ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/30 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
                aria-current={activeSection === link.href ? 'page' : undefined}
                data-testid={`nav-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {link.label}
              </a>
            ))}
            
            {/* More Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setMoreDropdownOpen(true)}
              onMouseLeave={() => setMoreDropdownOpen(false)}
            >
              <button
                onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setMoreDropdownOpen(!moreDropdownOpen);
                  }
                  if (e.key === 'Escape') {
                    setMoreDropdownOpen(false);
                  }
                }}
                onFocus={() => setMoreDropdownOpen(true)}
                onBlur={(e) => {
                  // Only close if focus is leaving the dropdown container
                  if (!e.currentTarget.parentElement?.contains(e.relatedTarget as Node)) {
                    setMoreDropdownOpen(false);
                  }
                }}
                className="nav-link transition-all duration-200 text-sm font-medium whitespace-nowrap px-3 xl:px-4 py-2 rounded-lg flex items-center gap-1 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                aria-expanded={moreDropdownOpen}
                aria-haspopup="true"
                data-testid="button-more"
              >
                More
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${moreDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {/* Dropdown Menu */}
              {moreDropdownOpen && (
                <div 
                  className="absolute top-full right-0 mt-1 w-48 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 animate-fade-in z-50"
                  role="menu"
                >
                  {moreLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(link.href);
                        setMoreDropdownOpen(false);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          scrollToSection(link.href);
                          setMoreDropdownOpen(false);
                        }
                      }}
                      className={`block px-4 py-2 text-sm transition-all duration-200 ${
                        activeSection === link.href
                          ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30'
                          : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                      role="menuitem"
                      tabIndex={0}
                      data-testid={`dropdown-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              )}
            </div>

            <button 
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2.5 ml-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-all duration-200"
              data-testid="button-search"
              aria-label="Search (⌘K)"
              title="Search (⌘K)"
            >
              <Search className="h-5 w-5" />
            </button>
          </div>

          {/* Tablet Navigation */}
          <div className="hidden md:flex lg:hidden items-center gap-2">
            <button 
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2.5 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-all duration-200"
              data-testid="button-search-tablet"
              aria-label="Search (⌘K)"
              title="Search (⌘K)"
            >
              <Search className="h-5 w-5" />
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-all duration-200"
              data-testid="button-tablet-menu"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden gap-2">
            <button 
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2.5 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-all duration-200 min-h-[44px] min-w-[44px] flex items-center justify-center"
              data-testid="button-search-mobile"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-all duration-200 min-h-[44px] min-w-[44px] flex items-center justify-center"
              data-testid="button-mobile-menu"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile & Tablet Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-lg animate-slide-up">
          <div className="px-4 pt-2 pb-4 space-y-1 max-h-[calc(100vh-5rem)] overflow-y-auto">
            {navLinks.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className={`block w-full text-left px-4 py-3 rounded-lg transition-all duration-200 animate-fade-in min-h-[44px] flex items-center font-medium ${
                  activeSection === link.href
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30'
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
                aria-current={activeSection === link.href ? 'page' : undefined}
                data-testid={`mobile-nav-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {link.label}
              </a>
            ))}
            
            {/* More Links in Mobile Menu */}
            <div className="pt-2 border-t border-gray-200 dark:border-gray-700 mt-2">
              <div className="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                More
              </div>
              {moreLinks.map((link, index) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className={`block w-full text-left px-4 py-3 rounded-lg transition-all duration-200 animate-fade-in min-h-[44px] flex items-center font-medium ${
                    activeSection === link.href
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30'
                      : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                  style={{ animationDelay: `${(navLinks.length + index) * 50}ms` }}
                  data-testid={`mobile-dropdown-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
      </nav>

      {/* Search Dialog */}
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}