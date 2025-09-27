import { Compass, Phone, Sparkles } from "lucide-react";
import { useParallax, useScrollBasedAnimation } from "@/hooks/use-parallax";
import { useInView } from "@/hooks/use-in-view";

export default function HeroSection() {
  const parallaxSlow = useParallax(0.3);
  const parallaxFast = useParallax(0.6);
  const { opacity, scale } = useScrollBasedAnimation();
  const { ref: heroRef, isInView } = useInView({ threshold: 0.1 });

  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Create ripple effect
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    const ripple = document.createElement('span');
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 0.6s ease-out;
      pointer-events: none;
    `;
    
    button.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);

    scrollToContact();
  };

  return (
    <section 
      ref={heroRef}
      className="pt-20 pb-16 gradient-bg relative overflow-hidden"
      style={{ 
        opacity,
        transform: `scale(${scale})`
      }}
    >
      {/* Enhanced animated background elements with parallax (fixed transform conflicts) */}
      <div className="absolute inset-0 opacity-20">
        <div style={{ transform: parallaxSlow }}>
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl animate-float"></div>
        </div>
        <div style={{ transform: parallaxFast }}>
          <div className="absolute top-3/4 right-1/4 w-48 h-48 bg-white rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        </div>
        <div style={{ transform: parallaxSlow }}>
          <div className="absolute top-1/2 left-3/4 w-32 h-32 bg-gradient-to-r from-blue-300 to-green-300 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }}></div>
        </div>
        <div style={{ transform: parallaxFast }}>
          <div className="absolute top-1/3 right-1/3 w-20 h-20 bg-gradient-to-r from-yellow-300 to-pink-300 rounded-full blur-xl animate-float" style={{ animationDelay: '1.5s' }}></div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <div className={`mb-6 transition-all duration-1000 ${isInView ? 'animate-fade-in' : 'opacity-0'}`}>
            <span className="inline-flex items-center bg-white/20 backdrop-blur-sm border border-white/30 px-4 py-2 rounded-full text-white text-sm font-medium hover:bg-white/30 transition-all duration-300">
              <Sparkles className="mr-2 h-4 w-4 animate-pulse" />
              From Confusion to Clarity. From Interest to Impact
            </span>
          </div>
          
          <h1 className={`text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 transition-all duration-1000 ${isInView ? 'animate-slide-up' : 'opacity-0 translate-y-8'}`}>
            <span className="block">Empowering Careers,</span>
            <span className="block bg-gradient-to-r from-yellow-700 to-pink-600 bg-clip-text text-transparent hover:from-yellow-600 hover:to-pink-500 transition-all duration-300">
              Creating Futures
            </span>
          </h1>

          <p className={`text-xl md:text-2xl text-gray-800/90 mb-8 max-w-3xl mx-auto transition-all duration-1000 ${isInView ? 'animate-slide-up' : 'opacity-0 translate-y-8'}`} style={{ animationDelay: '200ms' }}>
            <span className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Clarity Today, Success Tomorrow
            </span>
          </p>

          <p className={`text-lg text-gray-700/80 mb-10 max-w-2xl mx-auto transition-all duration-1000 ${isInView ? 'animate-slide-up' : 'opacity-0 translate-y-8'}`} style={{ animationDelay: '400ms' }}>
            Professional career guidance for Students, Parents, Schools, Colleges, Corporates, and Working Professionals
          </p>
          
          <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 ${isInView ? 'animate-slide-up' : 'opacity-0 translate-y-8'}`} style={{ animationDelay: '600ms' }}>
            <button 
              onClick={handleButtonClick}
              className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-green-700 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 flex items-center justify-center group"
              data-testid="button-discover-path"
            >
              <Compass className="mr-2 h-5 w-5 group-hover:rotate-180 transition-transform duration-500" />
              Discover Your Path
            </button>
            <button 
              onClick={handleButtonClick}
              className="relative overflow-hidden border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-white/25 flex items-center justify-center group"
              data-testid="button-free-call"
            >
              <Phone className="mr-2 h-5 w-5 group-hover:animate-pulse" />
              Free Career Clarity Call
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
