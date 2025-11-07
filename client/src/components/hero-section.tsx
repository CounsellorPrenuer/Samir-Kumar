import { Compass, Phone } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import careerCounseling from "@assets/stock_images/professional_career__5b346d1f.jpg";
import careerSuccess from "@assets/stock_images/young_professional_c_daf83086.jpg";
import studentPlanning from "@assets/stock_images/diverse_students_pla_376617c1.jpg";
import teamCollaboration from "@assets/stock_images/business_team_collab_a04ec0d9.jpg";

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Memoize particles to prevent re-randomization on every render
  const particles = useMemo(() => 
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 10 + Math.random() * 10
    })), 
  []);

  const slides = [
    {
      image: careerCounseling,
      title: "Professional Career Guidance",
      description: "Expert counselors to guide your career journey"
    },
    {
      image: careerSuccess,
      title: "Achieve Your Goals",
      description: "Transform your aspirations into reality"
    },
    {
      image: studentPlanning,
      title: "Plan Your Future",
      description: "Strategic career planning for students"
    },
    {
      image: teamCollaboration,
      title: "Expert Mentorship",
      description: "Learn from industry professionals"
    }
  ];

  // This effect handles the automatic sliding
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]); // Added slides.length to dependency array for safety

  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Memoize particles render to prevent re-creation
  const particlesLayer = useMemo(() => (
    <div className="absolute inset-0 z-[1] particles-bg">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="particle"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`
          }}
        />
      ))}
    </div>
  ), [particles]);

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden mt-16">
      {/* Background Image Carousel with Ken Burns Effect */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img  
              src={slide.image}  
              alt={slide.title}
              className="w-full h-full object-cover animate-ken-burns"
            />
            {/* Lighter Gradient Overlay for better readability */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/60 via-purple-900/50 to-pink-900/40"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/30"></div>
          </div>
        ))}
      </div>
      {/* Floating Particles - Memoized to prevent re-render */}
      {particlesLayer}
      {/* Content Overlay */}
      <div className="relative z-20 w-full pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-6 animate-fade-in">
              <span className="inline-block bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium border border-white/30">✨ Unlock Your Potential</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight animate-slide-up" data-testid="hero-title">
              Transform Your Future with Expert <span className="gradient-text font-extrabold">Career Guidance</span>
            </h1>

            <p className="text-xl text-white/95 mb-8 leading-relaxed animate-slide-up" style={{ animationDelay: '0.1s' }} data-testid="hero-description">
              Premier career counselling and guidance services in Faridabad and Delhi NCR. Personalized psychometric assessments, expert coaching, and proven strategies to help students, graduates, and professionals achieve their dream careers.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <button  
                onClick={scrollToContact}
                className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-8 py-4 rounded-lg font-semibold text-lg flex items-center justify-center hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 transform hover:scale-110 glow-effect"
                data-testid="button-discover-path"
              >
                <Compass className="mr-2 h-5 w-5" />
                Unlock Your Potential
              </button>
            </div>

            {/* Enhanced Stats with Glow */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 max-w-lg animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <div className="text-center bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-md rounded-lg p-4 border border-white/40 hover:bg-white/30 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/50">
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">76</div>
                <div className="text-xs sm:text-sm text-white/90 font-medium">Success Stories</div>
              </div>
              <div className="text-center bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-md rounded-lg p-4 border border-white/40 hover:bg-white/30 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/50">
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-pink-300 to-purple-400 bg-clip-text text-transparent">4.8★</div>
                <div className="text-xs sm:text-sm text-white/90 font-medium">Client Rating</div>
              </div>
              <div className="text-center bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-md rounded-lg p-4 border border-white/40 hover:bg-white/30 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-green-500/50">
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-green-300 to-cyan-400 bg-clip-text text-transparent">92%</div>
                <div className="text-xs sm:text-sm text-white/90 font-medium">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}