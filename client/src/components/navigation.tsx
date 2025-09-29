import { useState } from "react";
import { Menu, X, User, LogOut, Sparkles } from "lucide-react";
import careerSkopeLogoPath from "@assets/Screenshot 2025-09-27 114759_1758954653506.png";
import { ResponsiveImage } from "./responsive-image";
import { useAuth } from "@/hooks/use-auth";
import { useScrollspy } from "@/hooks/use-scrollspy";
import { AuthDialog } from "./auth-dialog";
import ScrollProgressBar from "./scroll-progress-bar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const { user, logout, isLoading } = useAuth();

  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#why-careerskope", label: "Why Careerskope" },
    { href: "#founder", label: "Our Founder" },
    { href: "#blog", label: "Resources" },
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
      <nav className="fixed top-0 w-full z-50 modern-card border-b border-white/20 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18 lg:h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3 flex-shrink-0">
            <div className="service-icon p-2 rounded-xl">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <ResponsiveImage 
              src={careerSkopeLogoPath} 
              alt="Careerskope Logo" 
              className="h-10 sm:h-11 md:h-12 lg:h-14 w-auto transition-all duration-300 hover:scale-105"
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
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className={`nav-link transition-all duration-300 text-sm lg:text-base font-semibold whitespace-nowrap hover:scale-105 px-3 py-2 rounded-lg ${
                  activeSection === link.href
                    ? 'text-white bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-white/50'
                }`}
                aria-current={activeSection === link.href ? 'page' : undefined}
                data-testid={`nav-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {link.label}
              </a>
            ))}
            <button 
              onClick={() => scrollToSection("#contact")}
              className="vibrant-button btn-interactive text-white px-6 lg:px-8 py-3 lg:py-4 rounded-xl font-bold min-h-[44px] text-sm lg:text-base whitespace-nowrap shadow-lg"
              data-testid="button-book-free-call"
            >
              Book a Free Call
            </button>
          </div>

          {/* Tablet Navigation */}
          <div className="hidden md:flex lg:hidden items-center space-x-4">
            {navLinks.slice(0, 4).map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className={`nav-link transition-all duration-300 text-sm font-semibold whitespace-nowrap hover:scale-105 px-3 py-2 rounded-lg ${
                  activeSection === link.href
                    ? 'text-white bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-white/50'
                }`}
                aria-current={activeSection === link.href ? 'page' : undefined}
                data-testid={`nav-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {link.label}
              </a>
            ))}
            <DropdownMenu>
              <DropdownMenuTrigger className="text-gray-700 hover:text-gray-900 hover:bg-white/50 transition-all duration-300 text-sm font-semibold px-3 py-2 rounded-lg">
                More
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 modern-card border-white/20">
                {navLinks.slice(4).map((link) => (
                  <DropdownMenuItem 
                    key={link.href}
                    onClick={() => scrollToSection(link.href)}
                    className="cursor-pointer hover:bg-white/50 font-medium"
                  >
                    {link.label}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={() => scrollToSection("#contact")}
                  className="cursor-pointer font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600"
                >
                  Book a Free Call
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-gray-900 hover:bg-white/50 p-3 rounded-xl min-h-[44px] min-w-[44px] flex items-center justify-center transition-all duration-300 backdrop-blur-sm"
              data-testid="button-mobile-menu"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden modern-card border-b border-white/20 animate-slide-up shadow-xl backdrop-blur-lg">
          <div className="px-4 sm:px-6 pt-4 pb-6 space-y-2 max-h-[calc(100vh-4rem)] overflow-y-auto">
            {navLinks.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className={`block w-full text-left px-4 py-4 rounded-xl transition-all duration-300 animate-fade-in min-h-[44px] flex items-center font-bold ${
                  activeSection === link.href
                    ? 'text-white bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-white/50'
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
                onClick={() => scrollToSection("#contact")}
                className="w-full vibrant-button btn-interactive text-white px-6 py-4 rounded-xl animate-scale-in min-h-[44px] font-bold text-base shadow-lg"
                style={{ animationDelay: `${navLinks.length * 50}ms` }}
                data-testid="mobile-button-book-free-call"
              >
                Book a Free Call
              </button>
            </div>
          </div>
        </div>
      )}
      </nav>
    </>
  );
}
