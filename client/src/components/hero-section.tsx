import { Compass, Phone } from "lucide-react";

export default function HeroSection() {
  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="pt-20 pb-16 gradient-bg relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-3/4 right-1/4 w-48 h-48 bg-white rounded-full blur-3xl animate-float" style={{animationDelay: '1s'}}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <div className="mb-6">
            <span className="inline-block bg-white/20 backdrop-blur-sm border border-white/30 px-4 py-2 rounded-full text-white text-sm font-medium">
              From Confusion to Clarity. From Interest to Impact
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-slide-up">
            Empowering Careers,<br/>
            <span className="bg-gradient-to-r from-yellow-200 to-pink-200 bg-clip-text text-transparent">
              Creating Futures
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto animate-slide-up" style={{animationDelay: '0.2s'}}>
            Clarity Today, Success Tomorrow
          </p>
          
          <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto animate-slide-up" style={{animationDelay: '0.4s'}}>
            Professional career guidance for Students, Parents, Schools, Colleges, Corporates, and Working Professionals
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{animationDelay: '0.6s'}}>
            <button 
              onClick={scrollToContact}
              className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-green-700 transition-all duration-300 hover:scale-105 flex items-center justify-center"
              data-testid="button-discover-path"
            >
              <Compass className="mr-2 h-5 w-5" />
              Discover Your Path
            </button>
            <button 
              onClick={scrollToContact}
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 hover:scale-105 flex items-center justify-center"
              data-testid="button-free-call"
            >
              <Phone className="mr-2 h-5 w-5" />
              Free Career Clarity Call
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
