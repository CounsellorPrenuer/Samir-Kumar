import { Compass, Phone } from "lucide-react";
import { ResponsiveImage } from "./responsive-image";
import heroImage from "@assets/stock_images/professional_career__d7965c84.jpg";

export default function HeroSection() {

  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };


  return (
    <section className="pt-20 pb-16 bg-gradient-to-b from-blue-50 to-white min-h-[80vh] flex items-center">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

          {/* Image Column */}
          <div className="hidden lg:block">
            <ResponsiveImage 
              src={heroImage}
              alt="Professional career guidance team"
              className="w-full h-96 object-cover rounded-xl shadow-lg"
              loading="eager"
              priority={true}
              sizes="(min-width: 1024px) 400px, 0px"
              width={400}
              height={384}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
