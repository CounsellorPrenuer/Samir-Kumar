// src/components/layout/navigation.tsx

import { useState } from "react";
import { Menu, X, Search } from "lucide-react";
import careerSkopeLogoPath from "@assets/logo.png";
import { ResponsiveImage } from "./responsive-image";
import { useScrollspy } from "@/hooks/use-scrollspy";
import ScrollProgressBar from "./scroll-progress-bar";
import { Button } from "@/components/ui/button";
import SearchDialog from "./search-dialog";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const navLinks = [
    { href: "#why-cs", label: "Why CS" },
    { href: "#packages", label: "Solutions" },
    { href: "#leadership", label: "Leadership" },
    { href: "#gallery", label: "Gallery" },
    { href: "#contact", label: "Contact" },
  ];

  // Track active section with scrollspy
  const sectionIds = navLinks.map(link => link.href);
  const activeSection = useScrollspy(sectionIds, 100);

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <ResponsiveImage 
              src={careerSkopeLogoPath} 
              alt="Careerskope Logo" 
              className="h-10 sm:h-12 md:h-14 w-auto object-contain"
              loading="eager"
              priority={true}
              sizes="(max-width: 640px) 150px, (max-width: 768px) 180px, 220px"
              width={220}
              height={56}
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
          </div>
        </div>
      )}
      </nav>
      
      {/* Search Dialog */}
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}