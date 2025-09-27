import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import StatsSection from "@/components/stats-section";
import WhyCareerskope from "@/components/why-careerskope";
import CareerTransformation from "@/components/career-transformation";
import HowItWorks from "@/components/how-it-works";
import FourPillars from "@/components/four-pillars";
import PackagesSection from "@/components/packages-section";
import FounderSection from "@/components/founder-section";
import TestimonialsSection from "@/components/testimonials-section";
import WorkshopsSection from "@/components/workshops-section";
import BlogSection from "@/components/blog-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen scroll-smooth">
      <Navigation />
      <HeroSection />
      {/* <StatsSection /> */}
      <WhyCareerskope />
      <CareerTransformation />
      <HowItWorks />
      <FourPillars />
      <PackagesSection />
      <FounderSection />
      <TestimonialsSection />
      <WorkshopsSection />
      <BlogSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
