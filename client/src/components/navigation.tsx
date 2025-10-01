import { useState } from "react";
import { Menu, X, Search } from "lucide-react";
import careerSkopeLogoPath from "@assets/logo.png";
import { ResponsiveImage } from "./responsive-image";
import { useScrollspy } from "@/hooks/use-scrollspy";
import ScrollProgressBar from "./scroll-progress-bar";
import { Button } from "@/components/ui/button";

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
      <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm transition-all duration-300 hover:shadow-md">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2 flex-shrink-0">
            <ResponsiveImage 
              src={careerSkopeLogoPath} 
              alt="Careerskope Logo" 
              className="h-8 sm:h-9 w-auto"
              loading="eager"
              priority={true}
              sizes="(max-width: 640px) 150px, (max-width: 768px) 180px, 200px"
              width={200}
              height={40}
              fixed={true}
              data-testid="logo-image"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-4 xl:space-x-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className={`nav-link transition-all duration-300 text-xs xl:text-sm font-medium whitespace-nowrap px-2 xl:px-3 py-2 relative ${
                  activeSection === link.href
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-700 hover:text-blue-600 hover:scale-105 hover:font-semibold'
                }`}
                aria-current={activeSection === link.href ? 'page' : undefined}
                data-testid={`nav-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {link.label}
              </a>
            ))}
            <button 
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-gray-700 hover:text-blue-600 transition-colors duration-200"
              data-testid="button-search"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>
          </div>

          {/* Tablet Navigation - show search button */}
          <div className="hidden md:flex lg:hidden items-center space-x-4">
            <button 
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-gray-700 hover:text-blue-600 transition-colors duration-200"
              data-testid="button-search-tablet"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-blue-600 p-2 rounded-md min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors duration-200"
              data-testid="button-mobile-menu"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 shadow-lg animate-slide-up">
          <div className="px-4 pt-2 pb-4 space-y-1 max-h-[calc(100vh-4rem)] overflow-y-auto">
            {navLinks.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className={`block w-full text-left px-3 py-3 rounded-lg transition-colors duration-200 animate-fade-in min-h-[44px] flex items-center font-medium ${
                  activeSection === link.href
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
                aria-current={activeSection === link.href ? 'page' : undefined}
                data-testid={`mobile-nav-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2">
              <button 
                onClick={() => {
                  setSearchOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg animate-scale-in min-h-[44px] font-semibold text-base transition-colors duration-200 flex items-center justify-center gap-2"
                style={{ animationDelay: `${navLinks.length * 50}ms` }}
                data-testid="mobile-button-search"
              >
                <Search className="h-5 w-5" />
                Search
              </button>
            </div>
          </div>
        </div>
      )}
      </nav>
    </>
  );
}
