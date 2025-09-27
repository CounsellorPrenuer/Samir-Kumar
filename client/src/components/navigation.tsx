import { useState } from "react";
import { Menu, X, User, LogOut } from "lucide-react";
import careerSkopeLogoPath from "@assets/Screenshot 2025-09-27 114759_1758954653506.png";
import { useAuth } from "@/hooks/use-auth";
import { AuthDialog } from "./auth-dialog";
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

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-card/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img 
              src={careerSkopeLogoPath} 
              alt="Careerskope Logo" 
              className="h-10 w-auto"
              data-testid="logo-image"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="nav-link text-muted-foreground hover:text-foreground"
                data-testid={`nav-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {link.label}
              </button>
            ))}
            <button 
              onClick={() => scrollToSection("#contact")}
              className="bg-gradient-to-r from-blue-600 to-red-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-red-700 transition-all duration-300 font-medium"
              data-testid="button-book-free-call"
            >
              Book a Free Call
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-foreground hover:text-muted-foreground"
              data-testid="button-mobile-menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-card border-b border-border">
          <div className="px-4 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="block w-full text-left px-3 py-2 text-muted-foreground hover:text-foreground"
                data-testid={`mobile-nav-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {link.label}
              </button>
            ))}
            <button 
              onClick={() => scrollToSection("#contact")}
              className="w-full mt-2 bg-gradient-to-r from-blue-600 to-red-600 text-white px-6 py-2 rounded-lg"
              data-testid="mobile-button-book-free-call"
            >
              Book a Free Call
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
