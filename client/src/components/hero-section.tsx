import { Compass, Phone, ChevronLeft, ChevronRight } from "lucide-react";
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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="pt-20 pb-16 bg-gradient-to-r from-blue-600 via-purple-600 to-red-600 relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content Column */}
          <div className="text-center lg:text-left text-white">
            <div className="mb-6 animate-fade-in">
              <span className="inline-block bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium border border-white/30">
                ✨ Transform Your Career Journey
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-slide-up" data-testid="hero-title">
              Unlock Your <span className="text-yellow-300">Career Potential</span>
            </h1>
            
            <p className="text-xl text-white/90 mb-8 max-w-2xl leading-relaxed animate-slide-up" style={{ animationDelay: '0.1s' }} data-testid="hero-description">
              Expert career guidance, personalized coaching, and proven strategies to help students and professionals achieve their dream careers.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
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
                className="border-2 border-white/50 backdrop-blur-sm bg-white/10 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 flex items-center justify-center transform hover:scale-105"
                data-testid="button-free-call"
              >
                <Phone className="mr-2 h-5 w-5" />
                Free Career Clarity Call
              </button>
            </div>

            {/* Enhanced Stats */}
            <div className="grid grid-cols-3 gap-6 max-w-md mx-auto lg:mx-0 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 hover:bg-white/20 transition-all">
                <div className="text-3xl font-bold text-yellow-300">5K+</div>
                <div className="text-sm text-white/80">Success Stories</div>
              </div>
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 hover:bg-white/20 transition-all">
                <div className="text-3xl font-bold text-yellow-300">4.9★</div>
                <div className="text-sm text-white/80">Client Rating</div>
              </div>
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 hover:bg-white/20 transition-all">
                <div className="text-3xl font-bold text-yellow-300">98%</div>
                <div className="text-sm text-white/80">Satisfaction</div>
              </div>
            </div>
          </div>

          {/* Image Carousel */}
          <div className="relative group">
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-1000 ${
                    index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                  }`}
                >
                  <img 
                    src={slide.image} 
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end">
                    <div className="p-8 text-white">
                      <h3 className="text-2xl font-bold mb-2">{slide.title}</h3>
                      <p className="text-white/90">{slide.description}</p>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/40 text-white p-2 rounded-full transition-all opacity-0 group-hover:opacity-100"
                data-testid="carousel-prev"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/40 text-white p-2 rounded-full transition-all opacity-0 group-hover:opacity-100"
                data-testid="carousel-next"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
              
              {/* Dots Indicator */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
                    }`}
                    data-testid={`carousel-dot-${index}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
