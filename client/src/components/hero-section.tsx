import { Compass, Phone, Sparkles, Star, TrendingUp, Users } from "lucide-react";
import { useParallax, useScrollBasedAnimation } from "@/hooks/use-parallax";
import { useInView } from "@/hooks/use-in-view";
import { ResponsiveImage } from "./responsive-image";
import heroImage from "@assets/stock_images/professional_career__d7965c84.jpg";

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
      className="pt-20 pb-24 gradient-bg relative overflow-hidden min-h-[90vh] flex items-center"
      style={{ 
        opacity,
        transform: `scale(${scale})`
      }}
    >
      {/* Enhanced animated background elements with parallax */}
      <div className="absolute inset-0 opacity-30">
        <div style={{ transform: parallaxSlow }}>
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full blur-3xl animate-float"></div>
        </div>
        <div style={{ transform: parallaxFast }}>
          <div className="absolute top-3/4 right-1/4 w-56 h-56 bg-gradient-to-r from-pink-400 to-orange-400 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        </div>
        <div style={{ transform: parallaxSlow }}>
          <div className="absolute top-1/2 left-3/4 w-40 h-40 bg-gradient-to-r from-green-400 to-teal-400 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }}></div>
        </div>
        <div style={{ transform: parallaxFast }}>
          <div className="absolute top-1/3 right-1/3 w-28 h-28 bg-gradient-to-r from-yellow-400 to-pink-400 rounded-full blur-xl animate-float" style={{ animationDelay: '1.5s' }}></div>
        </div>
      </div>

      {/* Hero Image */}
      <div className="absolute right-0 top-0 w-1/2 h-full opacity-20 hidden lg:block">
        <ResponsiveImage 
          src={heroImage}
          alt="Professional career guidance and development"
          className="w-full h-full object-cover object-center"
          loading="eager"
          priority={true}
          sizes="(min-width: 1024px) 50vw, 100vw"
          width={960}
          height={800}
          data-testid="hero-background-image"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-white/20 to-white/60"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content Column */}
          <div className="text-center lg:text-left">
            <div className={`mb-8 transition-all duration-1000 ${isInView ? 'animate-fade-in' : 'opacity-0'}`}>
              <span className="inline-flex items-center modern-card px-6 py-3 rounded-full text-white text-sm font-medium hover:scale-105 transition-all duration-300 backdrop-blur-lg">
                <Sparkles className="mr-2 h-4 w-4 animate-pulse text-yellow-300" />
                From Confusion to Clarity. From Interest to Impact
              </span>
            </div>
            
            <h1 className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-8 transition-all duration-1000 ${isInView ? 'animate-slide-up' : 'opacity-0 translate-y-8'}`}>
              <span className="block text-white mb-4">Empowering Careers,</span>
              <span className="block bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent hover:from-yellow-200 hover:via-pink-200 hover:to-purple-200 transition-all duration-500">
                Creating Futures
              </span>
            </h1>

            <p className={`text-xl md:text-2xl text-white/90 mb-6 max-w-2xl lg:max-w-none transition-all duration-1000 ${isInView ? 'animate-slide-up' : 'opacity-0 translate-y-8'}`} style={{ animationDelay: '200ms' }}>
              <span className="font-semibold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                Clarity Today, Success Tomorrow
              </span>
            </p>

            <p className={`text-lg text-white/80 mb-10 max-w-xl lg:max-w-none transition-all duration-1000 ${isInView ? 'animate-slide-up' : 'opacity-0 translate-y-8'}`} style={{ animationDelay: '400ms' }}>
              Professional career guidance for Students, Parents, Schools, Colleges, Corporates, and Working Professionals
            </p>

            {/* Stats Row */}
            <div className={`grid grid-cols-3 gap-4 mb-10 transition-all duration-1000 ${isInView ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '500ms' }}>
              <div className="modern-card p-4 rounded-xl text-center">
                <Users className="h-6 w-6 text-blue-300 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">500+</div>
                <div className="text-xs text-white/80">Success Stories</div>
              </div>
              <div className="modern-card p-4 rounded-xl text-center">
                <Star className="h-6 w-6 text-yellow-300 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">4.9★</div>
                <div className="text-xs text-white/80">Client Rating</div>
              </div>
              <div className="modern-card p-4 rounded-xl text-center">
                <TrendingUp className="h-6 w-6 text-green-300 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">98%</div>
                <div className="text-xs text-white/80">Satisfaction</div>
              </div>
            </div>
            
            <div className={`flex flex-col sm:flex-row gap-4 justify-center lg:justify-start transition-all duration-1000 ${isInView ? 'animate-slide-up' : 'opacity-0 translate-y-8'}`} style={{ animationDelay: '600ms' }}>
              <button 
                onClick={handleButtonClick}
                className="vibrant-button btn-interactive text-white px-8 py-4 rounded-xl font-semibold text-lg flex items-center justify-center group"
                data-testid="button-discover-path"
              >
                <Compass className="mr-2 h-5 w-5 group-hover:rotate-180 transition-transform duration-500" />
                Discover Your Path
              </button>
              <button 
                onClick={handleButtonClick}
                className="modern-card border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 transition-all duration-300 hover:scale-105 flex items-center justify-center group backdrop-blur-lg"
                data-testid="button-free-call"
              >
                <Phone className="mr-2 h-5 w-5 group-hover:animate-pulse" />
                Free Career Clarity Call
              </button>
            </div>
          </div>

          {/* Image Column - Visible on larger screens */}
          <div className="hidden lg:block relative">
            <div className="modern-card rounded-2xl overflow-hidden transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <ResponsiveImage 
                src={heroImage}
                alt="Professional career guidance team"
                className="w-full h-96 object-cover"
                loading="lazy"
                sizes="(min-width: 1024px) 400px, 0px"
                width={400}
                height={384}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full blur-xl animate-float"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>
      </div>
    </section>
  );
}
