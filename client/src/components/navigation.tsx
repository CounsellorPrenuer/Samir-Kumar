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
    { href: "#services", label: "Career Guidance" },
    { href: "#founder", label: "Our Founder" },
    { href: "#workshops", label: "Workshops" },
    { href: "#how-it-works", label: "How it Works" },
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <ResponsiveImage 
              src={careerSkopeLogoPath} 
              alt="Careerskope Logo" 
              className="h-10 w-auto"
              loading="eager"
              priority={true}
              sizes="200px"
              width={200}
              height={40}
              fixed={true}
              data-testid="logo-image"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className={`nav-link transition-all duration-300 ${
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
              className="btn-interactive bg-gradient-to-r from-blue-600 to-red-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-red-700 transition-all duration-300 font-medium hover-lift min-h-[44px]"
              data-testid="button-book-free-call"
            >
              Book a Free Call
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-foreground hover:text-muted-foreground p-3 rounded-md min-h-[44px] min-w-[44px] flex items-center justify-center"
              data-testid="button-mobile-menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-card border-b border-border animate-slide-up">
          <div className="px-4 pt-2 pb-3 space-y-1">
            {navLinks.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className={`block w-full text-left px-3 py-3 rounded-lg transition-all duration-300 animate-fade-in min-h-[44px] flex items-center ${
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
            <button 
              onClick={() => scrollToSection("#contact")}
              className="w-full mt-4 bg-gradient-to-r from-blue-600 to-red-600 text-white px-6 py-3 rounded-lg btn-interactive hover-lift animate-scale-in min-h-[44px]"
              style={{ animationDelay: `${navLinks.length * 50}ms` }}
              data-testid="mobile-button-book-free-call"
            >
              Book a Free Call
            </button>
          </div>
        </div>
      )}
      </nav>
    </>
  );
}
