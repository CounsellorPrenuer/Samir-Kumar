import { Heart, Linkedin, Twitter, Facebook, Instagram } from "lucide-react";
import careerSkopeLogoPath from "@assets/Screenshot 2025-09-27 114759_1758954653506.png";

export default function Footer() {
  const quickLinks = [
    { label: "About", href: "#why-careerskope" },
    { label: "Packages", href: "#services" },
    { label: "Contact", href: "#contact" },
    { label: "Success Stories", href: "#testimonials" },
    { label: "Corporate Services", href: "#workshops" }
  ];

  const services = [
    "Career Guidance",
    "Psychometric Assessment", 
    "Workshops & Seminars",
    "Admission Guidance",
    "Corporate Mentorship"
  ];

  const mentoriaStats = [
    { number: "3,50,000+", label: "Students & Professionals Mentored", color: "text-blue-400" },
    { number: "240+", label: "Corporate Partners", color: "text-green-400" },
    { number: "350+", label: "Schools & College Partners", color: "text-red-400" },
    { number: "1000+", label: "Hours of Career Webinars", color: "text-purple-400" }
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className=" py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mentoria Partnership Section */}
        <div className="text-center mb-12 pb-8 border-b border-gray-700">
          <h3 className="text-2xl font-bold mb-4">Powered by Mentoria's Career Discovery Platform</h3>
          <p className="text-gray-300 max-w-4xl mx-auto mb-6">
            Every Careerskope plan includes lifetime access to Mentoria: India's most trusted platform 
            for career discovery, mentorship, and lifelong upskilling.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
            {mentoriaStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`text-2xl font-bold ${stat.color}`}>{stat.number}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
          
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300" data-testid="button-explore-mentoria">
            Explore Mentoria's Platform
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 bg-foreground text-white">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-xl font-bold">Careerskope</span>
            </div>
            <p className="text-gray-300 mb-4">
              Empowering careers and creating futures through expert guidance, strategic planning, 
              and personalized mentorship.
            </p>
            <div className="flex space-x-4">
              <button className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors" data-testid="social-linkedin">
                <Linkedin className="h-5 w-5" />
              </button>
              <button className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors" data-testid="social-twitter">
                <Twitter className="h-5 w-5" />
              </button>
              <button className="w-10 h-10 bg-blue-800 rounded-full flex items-center justify-center hover:bg-blue-900 transition-colors" data-testid="social-facebook">
               <a href="https://www.facebook.com/Careerskope" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-10 h-10 bg-blue-800 rounded-full flex items-center justify-center hover:bg-blue-900 transition-colors" data-testid="social-facebook">
              <Facebook className="h-5 w-5" />
              </a>              </button>
              <button className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors" data-testid="social-instagram">
                <Instagram className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button 
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-300 hover:text-white transition-colors"
                    data-testid={`footer-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <li key={index}>
                  <span className="text-gray-300">{service}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-8 text-center">
          <p className="text-gray-400 mb-2 flex items-center justify-center">
            Made with <Heart className="h-4 w-4 text-red-500 mx-1" /> by{" "}
            <span className="text-blue-400 ml-1">Mentoria</span> | In partnership with Mentoria 
            for enhanced career guidance services
          </p>
          <p className="text-sm text-gray-500">
            © 2024 Careerskope. All rights reserved. |{" "}
            <button className="hover:text-white transition-colors">Privacy Policy</button> |{" "}
            <button className="hover:text-white transition-colors">Terms of Service</button>
          </p>
        </div>
      </div>
    </footer>
  );
}
