import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Star, Play, Pause, Quote, Heart, Award } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { Testimonial } from "@shared/schema";
import { useAutoScroll } from "@/hooks/use-auto-scroll";
import { useInView } from "@/hooks/use-in-view";
import testimonialsImage from "@assets/stock_images/diverse_professional_a20be336.jpg";

export default function TestimonialsSection() {
  const { ref: sectionRef, isInView } = useInView({ threshold: 0.3 });

  // Fetch testimonials from database
  const { data: testimonials = [], isLoading } = useQuery<Testimonial[]>({
    queryKey: ['/api/testimonials'],
    queryFn: () => fetch('/api/testimonials').then(res => res.json())
  });

  // Enhanced auto-scroll with controls
  const {
    currentIndex,
    isPlaying,
    isPaused,
    goToNext,
    goToPrevious,
    goToSlide,
    pause,
    resume,
    toggle
  } = useAutoScroll({
    interval: 4000,
    pauseOnHover: true,
    itemCount: testimonials.length || 0
  });

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isInView) return;

      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          goToPrevious();
          break;
        case 'ArrowRight':
          event.preventDefault();
          goToNext();
          break;
        case ' ':
          event.preventDefault();
          toggle();
          break;
        case 'Home':
          event.preventDefault();
          goToSlide(0);
          break;
        case 'End':
          event.preventDefault();
          goToSlide(testimonials.length - 1);
          break;
      }
    };

    if (isInView) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isInView, testimonials.length, goToNext, goToPrevious, goToSlide, toggle]);

  const nextTestimonial = () => {
    goToNext();
  };

  const prevTestimonial = () => {
    goToPrevious();
  };

  return (
    <section id="testimonials" ref={sectionRef} className="scroll-mt-20 py-24 bg-gradient-to-b from-white to-purple-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 right-10 w-80 h-80 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-6">
            Success Stories
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
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
          <div className="relative max-w-6xl mx-auto">
            {/* Control Panel */}
            <div className="flex justify-center items-center mb-12 space-x-4">
              {/* Indicator Dots */}
              <div className="flex space-x-3">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-4 h-4 rounded-full transition-all duration-300 transform hover:scale-125 ${
                      index === currentIndex
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg scale-125'
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    data-testid={`indicator-${index}`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  >
                  </button>
                ))}
              </div>
            </div>

            <div 
              className="overflow-hidden rounded-xl"
              onMouseEnter={pause}
              onMouseLeave={resume}
            >
              <div 
                className="flex transition-transform duration-700 ease-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div 
                    key={testimonial.id} 
                    className="w-full flex-shrink-0 p-6"
                    data-testid={`testimonial-${index}`}
                  >
                    <div className="enhanced-card p-8 rounded-2xl h-full relative overflow-hidden">
                      {/* Quote decoration */}
                      <div className="absolute top-4 right-4 opacity-10">
                        <Quote className="h-16 w-16 text-purple-500" />
                      </div>
                      
                      <div className="relative z-10">
                        <div className="flex items-center mb-8">
                          <div className={`w-16 h-16 bg-gradient-to-r ${testimonial.gradient} rounded-full flex items-center justify-center text-white font-bold mr-4 text-2xl shadow-lg`}>
                            {testimonial.initial}
                          </div>
                          <div>
                            <div className="font-bold text-xl text-gray-800">{testimonial.name}</div>
                            <div className="text-gray-600 font-medium">{testimonial.role}</div>
                          </div>
                        </div>
                        
                        <div className="mb-8">
                          <p className="text-gray-700 text-lg leading-relaxed font-medium">
                            "{testimonial.quote}"
                          </p>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="h-6 w-6 fill-current drop-shadow-sm" />
                            ))}
                          </div>
                          <div className="service-icon p-2">
                            <Award className="h-5 w-5 text-white" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <button 
              onClick={prevTestimonial}
              className="absolute -left-6 top-1/2 transform -translate-y-1/2 modern-card w-16 h-16 flex items-center justify-center transition-all duration-300 hover:scale-110 opacity-80 hover:opacity-100 min-h-[44px] min-w-[44px] backdrop-blur-lg"
              data-testid="button-prev-testimonial"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-6 w-6 text-gray-700" />
            </button>
            <button 
              onClick={nextTestimonial}
              className="absolute -right-6 top-1/2 transform -translate-y-1/2 modern-card w-16 h-16 flex items-center justify-center transition-all duration-300 hover:scale-110 opacity-80 hover:opacity-100 min-h-[44px] min-w-[44px] backdrop-blur-lg"
              data-testid="button-next-testimonial"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-6 w-6 text-gray-700" />
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
