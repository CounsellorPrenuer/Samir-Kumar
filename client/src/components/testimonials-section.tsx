import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Star, Play, Pause } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { Testimonial } from "@shared/schema";
import { useAutoScroll } from "@/hooks/use-auto-scroll";
import { useInView } from "@/hooks/use-in-view";

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
    <section ref={sectionRef} className="py-20 bg-card">
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
            {/* Control Panel */}
            <div className="flex justify-center items-center mb-6 space-x-4">
              <button
                onClick={toggle}
                className="flex items-center space-x-2 bg-white shadow-md rounded-full px-4 py-2 hover:bg-gray-50 transition-all duration-200 transform hover:scale-105"
                data-testid="button-play-pause"
                aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
              >
                {isPlaying ? (
                  <Pause className="h-4 w-4 text-gray-600" />
                ) : (
                  <Play className="h-4 w-4 text-gray-600" />
                )}
                <span className="text-sm text-gray-600">
                  {isPlaying ? 'Pause' : 'Play'}
                </span>
              </button>
              
              {/* Indicator Dots */}
              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 transform hover:scale-125 ${
                      index === currentIndex
                        ? 'bg-blue-600 shadow-lg'
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    data-testid={`indicator-${index}`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
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
                    className="w-full flex-shrink-0 p-4"
                    data-testid={`testimonial-${index}`}
                  >
                    <div className="testimonial-card bg-muted p-8 rounded-xl h-full transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
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
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full w-12 h-12 flex items-center justify-center hover:bg-gray-50 transition-all duration-200 transform hover:scale-110 hover:shadow-xl opacity-80 hover:opacity-100"
              data-testid="button-prev-testimonial"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-6 w-6 text-gray-600" />
            </button>
            <button 
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full w-12 h-12 flex items-center justify-center hover:bg-gray-50 transition-all duration-200 transform hover:scale-110 hover:shadow-xl opacity-80 hover:opacity-100"
              data-testid="button-next-testimonial"
              aria-label="Next testimonial"
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
