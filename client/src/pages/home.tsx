import Navigation from "@/components/navigation";
import AboutSection from "@/components/about-section";
import WhyCSSection from "@/components/why-cs-section";
import CareerTransformation from "@/components/career-transformation";
import PackagesSection from "@/components/packages-section";
import TestimonialsSection from "@/components/testimonials-section";
import BlogSection from "@/components/blog-section";
import FounderSection from "@/components/founder-section";
import PhotoGallerySection from "@/components/photo-gallery-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";
import HeroSection from "@/components/hero-section"

export default function Home() {
  return (
    <div className="min-h-screen scroll-smooth">
      <Navigation />
      <HeroSection />

      {/* Section 1: About CS */}
      <AboutSection />
      
      {/* Section 2: Why CS (with 5 subsections) */}
      <WhyCSSection />
      
      {/* Section 3: Ready to transform your career path? */}
      <CareerTransformation />
      
      {/* Section 4: Our Career Solutions / Packages */}
      <PackagesSection />
      
      {/* Section 5: Success Stories */}
      <TestimonialsSection />
      
      {/* Section 6: Resources */}
      <BlogSection />
      
      {/* Section 7: Leadership @ CS */}
      <FounderSection />
      
      {/* Section 8: Photo Gallery */}
      <PhotoGallerySection />
      
      {/* Section 9: Get in touch */}
      <ContactSection />
      
      <Footer />
    </div>
  );
}
