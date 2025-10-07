import { Compass, Phone } from "lucide-react";
import { useState, useEffect } from "react";
import careerCounseling from "@assets/stock_images/professional_career__5b346d1f.jpg";
import careerSuccess from "@assets/stock_images/young_professional_c_daf83086.jpg";
import studentPlanning from "@assets/stock_images/diverse_students_pla_376617c1.jpg";
import teamCollaboration from "@assets/stock_images/business_team_collab_a04ec0d9.jpg";

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

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

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden mt-16">
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
            {/* Dark Overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
          </div>
        ))}
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
              Unlock Your <span className="text-yellow-300">Career Potential</span>
            </h1>

            <p className="text-xl text-white/95 mb-8 leading-relaxed animate-slide-up" style={{ animationDelay: '0.1s' }} data-testid="hero-description">
              Expert career guidance, personalized coaching, and proven strategies to help students and professionals achieve their dream careers.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <button  
                onClick={scrollToContact}
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg flex items-center justify-center hover:bg-yellow-300 hover:text-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
                data-testid="button-discover-path"
              >
                <Compass className="mr-2 h-5 w-5" />
                Discover Your Path
              </button>
              <button  
                onClick={scrollToContact}
                className="border-2 border-white/80 backdrop-blur-sm bg-white/10 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 flex items-center justify-center transform hover:scale-105"
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