import { Compass, Phone, Sparkles, TrendingUp, Target } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import careerCounseling from "@assets/stock_images/professional_career__5b346d1f.jpg";
import careerSuccess from "@assets/stock_images/young_professional_c_daf83086.jpg";
import studentPlanning from "@assets/stock_images/diverse_students_pla_376617c1.jpg";
import teamCollaboration from "@assets/stock_images/business_team_collab_a04ec0d9.jpg";

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

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
  }, [slides.length]);

  // Mouse tracking effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };

    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.addEventListener('mousemove', handleMouseMove);
      return () => heroElement.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section ref={heroRef} className="relative min-h-[90vh] flex items-center overflow-hidden mt-16">
      {/* Background Image Carousel */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ${
              index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
          >
            <img  
              src={slide.image}  
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            {/* Enhanced Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-purple-900/70 to-black/60"></div>
          </div>
        ))}
      </div>

      {/* Mouse Follow Glow Effect */}
      <div 
        className="absolute z-10 w-96 h-96 rounded-full pointer-events-none transition-all duration-300 ease-out"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Floating Shapes */}
      <div className="absolute inset-0 z-5 pointer-events-none">
        <Sparkles className="absolute top-20 left-10 text-yellow-400/30 w-8 h-8 animate-float" style={{ animationDelay: '0s' }} />
        <Target className="absolute top-40 right-20 text-blue-400/30 w-12 h-12 animate-float" style={{ animationDelay: '1s' }} />
        <TrendingUp className="absolute bottom-32 left-1/4 text-purple-400/30 w-10 h-10 animate-float" style={{ animationDelay: '2s' }} />
        <Sparkles className="absolute bottom-20 right-1/3 text-pink-400/30 w-6 h-6 animate-float" style={{ animationDelay: '1.5s' }} />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 w-full pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-6 animate-fade-in">
              <span className="inline-block bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium border border-white/30">
                ✨ Transform Your Career Journey
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight animate-slide-up" data-testid="hero-title">
              Unlock Your <span className="gradient-text">Career Potential</span>
            </h1>

            <p className="text-xl text-white/95 mb-8 leading-relaxed animate-slide-up max-w-2xl" style={{ animationDelay: '0.1s' }} data-testid="hero-description">
              Expert career guidance, personalized coaching, and proven strategies to help students and professionals achieve their dream careers.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <button  
                onClick={scrollToContact}
                className="gradient-button px-8 py-4 rounded-xl font-semibold text-lg flex items-center justify-center transition-all duration-300 transform hover:scale-105 hover:shadow-2xl group"
                data-testid="button-discover-path"
              >
                <Compass className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                Discover Your Path
              </button>
              <button  
                onClick={scrollToContact}
                className="glass-button border-2 border-white/60 backdrop-blur-md bg-white/10 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 flex items-center justify-center transform hover:scale-105 hover:shadow-xl"
                data-testid="button-free-call"
              >
                <Phone className="mr-2 h-5 w-5" />
                Career Clarity Call
              </button>
            </div>

            {/* Enhanced Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 max-w-lg animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <div className="text-center bg-white/15 backdrop-blur-md rounded-lg p-4 border border-white/30 hover:bg-white/25 transition-all">
                <div className="text-2xl sm:text-3xl font-bold text-yellow-300">76</div>
                <div className="text-xs sm:text-sm text-white/90">Success Stories</div>
              </div>
              <div className="text-center bg-white/15 backdrop-blur-md rounded-lg p-4 border border-white/30 hover:bg-white/25 transition-all">
                <div className="text-2xl sm:text-3xl font-bold text-yellow-300">4.8★</div>
                <div className="text-xs sm:text-sm text-white/90">Client Rating</div>
              </div>
              <div className="text-center bg-white/15 backdrop-blur-md rounded-lg p-4 border border-white/30 hover:bg-white/25 transition-all">
                <div className="text-2xl sm:text-3xl font-bold text-yellow-300">92%</div>
                <div className="text-xs sm:text-sm text-white/90">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}