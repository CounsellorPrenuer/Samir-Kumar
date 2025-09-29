import { Compass, Phone, Star, Sparkles, Target, TrendingUp } from "lucide-react";

export default function HeroSection() {

  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };


  return (
    <section className="pt-20 pb-16 bg-gradient-to-b from-blue-50 to-white min-h-[80vh] flex items-center relative overflow-hidden">
      {/* Sparkle Background Effect */}
      <div className="absolute inset-0 sparkle-container">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="sparkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          >
            ✨
          </div>
        ))}
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content Column */}
          <div className="text-center lg:text-left">
            <div className="mb-6">
              <span className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
                ✨ Transform Your Career Journey
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight" data-testid="hero-title">
              Unlock Your <span className="text-blue-600">Career Potential</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl leading-relaxed" data-testid="hero-description">
              Expert career guidance, personalized coaching, and proven strategies to help students and professionals achieve their dream careers.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <button 
                onClick={scrollToContact}
                className="vibrant-button text-white px-8 py-4 rounded-lg font-semibold text-lg flex items-center justify-center"
                data-testid="button-discover-path"
              >
                <Compass className="mr-2 h-5 w-5" />
                Discover Your Path
              </button>
              <button 
                onClick={scrollToContact}
                className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-600 hover:text-white transition-all duration-300 flex items-center justify-center"
                data-testid="button-free-call"
              >
                <Phone className="mr-2 h-5 w-5" />
                Free Career Clarity Call
              </button>
            </div>

            {/* Simplified Stats */}
            <div className="grid grid-cols-3 gap-6 max-w-md mx-auto lg:mx-0">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">5K+</div>
                <div className="text-sm text-gray-600">Success Stories</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">4.9★</div>
                <div className="text-sm text-gray-600">Client Rating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">98%</div>
                <div className="text-sm text-gray-600">Satisfaction</div>
              </div>
            </div>
          </div>

          {/* Graphical Animation Column */}
          <div className="hidden lg:block relative">
            <div className="relative w-full h-96 flex items-center justify-center">
              {/* Floating Icons Animation */}
              <div className="absolute inset-0">
                <div className="floating-icon absolute top-10 left-10 text-blue-500">
                  <Target className="h-8 w-8 animate-bounce" style={{ animationDelay: '0s' }} />
                </div>
                <div className="floating-icon absolute top-20 right-16 text-purple-500">
                  <TrendingUp className="h-10 w-10 animate-bounce" style={{ animationDelay: '0.5s' }} />
                </div>
                <div className="floating-icon absolute bottom-20 left-20 text-green-500">
                  <Star className="h-6 w-6 animate-bounce" style={{ animationDelay: '1s' }} />
                </div>
                <div className="floating-icon absolute bottom-32 right-8 text-orange-500">
                  <Sparkles className="h-8 w-8 animate-bounce" style={{ animationDelay: '1.5s' }} />
                </div>
                <div className="floating-icon absolute top-32 left-32 text-pink-500">
                  <Star className="h-7 w-7 animate-bounce" style={{ animationDelay: '2s' }} />
                </div>
              </div>
              
              {/* Central Animated Circle */}
              <div className="relative">
                <div className="w-48 h-48 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 opacity-20 animate-pulse"></div>
                <div className="absolute inset-4 w-40 h-40 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 opacity-30 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute inset-8 w-32 h-32 rounded-full bg-gradient-to-r from-pink-400 to-blue-400 opacity-40 animate-pulse" style={{ animationDelay: '1s' }}></div>
                
                {/* Center Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center animate-spin-slow">
                    <Compass className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
              </div>
              
              {/* Orbital Dots */}
              <div className="absolute inset-0 animate-spin-reverse">
                <div className="absolute top-0 left-1/2 w-3 h-3 bg-blue-500 rounded-full transform -translate-x-1/2"></div>
                <div className="absolute bottom-0 left-1/2 w-3 h-3 bg-purple-500 rounded-full transform -translate-x-1/2"></div>
                <div className="absolute top-1/2 left-0 w-3 h-3 bg-green-500 rounded-full transform -translate-y-1/2"></div>
                <div className="absolute top-1/2 right-0 w-3 h-3 bg-pink-500 rounded-full transform -translate-y-1/2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
