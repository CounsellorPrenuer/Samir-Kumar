import { useState } from "react";
import { Menu, X, User, LogOut } from "lucide-react";
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
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMobileMenuOpen(false);
    // Update URL hash for better accessibility and navigation
    window.history.replaceState(null, '', href);
  };

  return (
    <>
      <ScrollProgressBar />
      <nav className="fixed top-0 w-full z-50 bg-card/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 lg:h-18">
          {/* Logo */}
          <div className="flex items-center space-x-2 flex-shrink-0">
            <ResponsiveImage 
              src={careerSkopeLogoPath} 
              alt="Careerskope Logo" 
              className="h-8 sm:h-9 md:h-10 lg:h-11 w-auto transition-all duration-200"
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
                className={`nav-link transition-all duration-300 text-sm lg:text-base font-medium whitespace-nowrap hover:scale-105 ${
                  activeSection === link.href
                    ? 'text-blue-600 font-semibold'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                aria-current={activeSection === link.href ? 'page' : undefined}
                data-testid={`nav-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {link.label}
              </a>
            ))}
            <button 
              onClick={() => scrollToSection("#contact")}
              className="btn-interactive bg-gradient-to-r from-blue-600 to-red-600 text-white px-4 lg:px-6 py-2 lg:py-3 rounded-lg hover:from-blue-700 hover:to-red-700 transition-all duration-300 font-medium hover-lift min-h-[44px] text-sm lg:text-base whitespace-nowrap"
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
                className={`nav-link transition-all duration-300 text-sm font-medium whitespace-nowrap hover:scale-105 ${
                  activeSection === link.href
                    ? 'text-blue-600 font-semibold'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                aria-current={activeSection === link.href ? 'page' : undefined}
                data-testid={`nav-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {link.label}
              </a>
            ))}
            <DropdownMenu>
              <DropdownMenuTrigger className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">
                More
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {navLinks.slice(4).map((link) => (
                  <DropdownMenuItem 
                    key={link.href}
                    onClick={() => scrollToSection(link.href)}
                    className="cursor-pointer"
                  >
                    {link.label}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={() => scrollToSection("#contact")}
                  className="cursor-pointer font-medium text-blue-600"
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
              className="text-foreground hover:text-muted-foreground hover:bg-muted p-2 sm:p-3 rounded-md min-h-[44px] min-w-[44px] flex items-center justify-center transition-all duration-200"
              data-testid="button-mobile-menu"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-card border-b border-border animate-slide-up shadow-lg">
          <div className="px-3 sm:px-4 pt-2 pb-4 space-y-1 max-h-[calc(100vh-4rem)] overflow-y-auto">
            {navLinks.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className={`block w-full text-left px-3 sm:px-4 py-3 sm:py-3 rounded-lg transition-all duration-300 animate-fade-in min-h-[44px] flex items-center font-medium ${
                  activeSection === link.href
                    ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20 font-semibold'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
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
                className="w-full bg-gradient-to-r from-blue-600 to-red-600 text-white px-4 sm:px-6 py-3 sm:py-3 rounded-lg btn-interactive hover-lift animate-scale-in min-h-[44px] font-medium text-sm sm:text-base"
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
