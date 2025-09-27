import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { Testimonial } from "@shared/schema";

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch testimonials from database
  const { data: testimonials = [], isLoading } = useQuery<Testimonial[]>({
    queryKey: ['/api/testimonials'],
    queryFn: () => fetch('/api/testimonials').then(res => res.json())
  });

  const nextTestimonial = () => {
    if (testimonials.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }
  };

  const prevTestimonial = () => {
    if (testimonials.length > 0) {
      setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    }
  };

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (testimonials.length === 0 || isLoading) return;
    
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
  }, [testimonials.length, isLoading]);

  return (
    <section className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">Success Stories</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Hear from professionals who transformed their careers with Careerskope
          </p>
        </div>
        
        {isLoading ? (
          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden rounded-xl">
              <div className="w-full p-4">
                <div className="bg-muted p-8 rounded-xl animate-pulse">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                    <div>
                      <div className="bg-gray-200 rounded h-5 w-32 mb-2"></div>
                      <div className="bg-gray-200 rounded h-4 w-48"></div>
                    </div>
                  </div>
                  <div className="space-y-2 mb-6">
                    <div className="bg-gray-200 rounded h-4 w-full"></div>
                    <div className="bg-gray-200 rounded h-4 w-full"></div>
                    <div className="bg-gray-200 rounded h-4 w-3/4"></div>
                  </div>
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="bg-gray-200 rounded h-5 w-5"></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : testimonials.length > 0 ? (
          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden rounded-xl">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div 
                    key={testimonial.id} 
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
        ) : (
          <div className="relative max-w-4xl mx-auto">
            <div className="text-center p-8">
              <p className="text-muted-foreground">No testimonials available at the moment.</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
