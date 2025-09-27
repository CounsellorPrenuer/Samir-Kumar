import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: "Ananya Sharma",
      role: "Software Engineer → Product Manager",
      quote: "Careerskope helped me transition from engineering to product management seamlessly. The career mapping and mentorship were invaluable in my journey.",
      initial: "A",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      name: "Rahul Patel", 
      role: "Recent Graduate → Data Analyst",
      quote: "The psychometric assessment and career coaching sessions gave me clarity about my strengths and helped me land my dream job in data analytics.",
      initial: "R",
      gradient: "from-green-500 to-green-600"
    },
    {
      name: "Priya Gupta",
      role: "Marketing Manager → Brand Strategist", 
      quote: "The comprehensive career guidance and industry insights helped me make a strategic career move that tripled my impact and satisfaction.",
      initial: "P",
      gradient: "from-red-500 to-red-600"
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Delay the start of auto-advance to ensure proper initialization
    const timer = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }, 5000);
    }, 5000);
    
    return () => {
      clearTimeout(timer);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [testimonials.length]);

  return (
    <section className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">Success Stories</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Hear from professionals who transformed their careers with Careerskope
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden rounded-xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index} 
                  className="w-full flex-shrink-0 p-4"
                  data-testid={`testimonial-${index}`}
                >
                  <div className="testimonial-card bg-muted p-8 rounded-xl h-full">
                    <div className="flex items-center mb-6">
                      <div className={`w-12 h-12 bg-gradient-to-r ${testimonial.gradient} rounded-full flex items-center justify-center text-white font-bold mr-4 text-xl`}>
                        {testimonial.initial}
                      </div>
                      <div>
                        <div className="font-semibold text-lg">{testimonial.name}</div>
                        <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                      </div>
                    </div>
                    <p className="text-muted-foreground italic text-lg mb-6">
                      "{testimonial.quote}"
                    </p>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <button 
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full w-12 h-12 flex items-center justify-center hover:bg-gray-50 transition-colors"
            data-testid="button-prev-testimonial"
          >
            <ChevronLeft className="h-6 w-6 text-gray-600" />
          </button>
          <button 
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full w-12 h-12 flex items-center justify-center hover:bg-gray-50 transition-colors"
            data-testid="button-next-testimonial"
          >
            <ChevronRight className="h-6 w-6 text-gray-600" />
          </button>
        </div>
      </div>
    </section>
  );
}
