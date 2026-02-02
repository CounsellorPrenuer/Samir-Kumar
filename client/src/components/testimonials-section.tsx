import { STATIC_TESTIMONIALS } from "@/lib/static-data";
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Star, Play, Pause, Quote, Heart, Award } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useAutoScroll } from "@/hooks/use-auto-scroll";
import { useInView } from "@/hooks/use-in-view";
import { client, urlFor } from "@/lib/sanity";

interface SanityTestimonial {
  name: string;
  role: string;
  quote?: string; // Legacy
  testimonial?: string; // New schema
  image?: any; // Legacy
  photo?: any; // New schema
  initial?: string;
  gradient?: string;
  isActive?: boolean;
}

export default function TestimonialsSection() {
  const { ref: sectionRef, isInView } = useInView({ threshold: 0.3 });

  // Fetch from Sanity
  // Fetch from Sanity
  // Fetch from Sanity
  // Fetch from Sanity
  const { data: sanityTestimonials, isLoading } = useQuery({
    queryKey: ['sanity-testimonials'],
    queryFn: async () => {
      try {
        const data = await client.fetch<SanityTestimonial[]>(`*[_type == "successStory"]`);
        console.log("Sanity Success Stories:", data);
        return data;
      } catch (error) {
        console.warn("Sanity fetch failed, using fallback:", error);
        return [];
      }
    }
  });

  const testimonials = (!isLoading && sanityTestimonials && sanityTestimonials.length > 0)
    ? sanityTestimonials.map((t, idx) => ({
      id: idx + 1,
      name: t.name,
      role: t.role,
      quote: t.testimonial || t.quote, // Map 'testimonial' from schema to 'quote' in UI
      initial: t.name ? t.name[0] : "U",
      gradient: "bg-gradient-to-r from-blue-500 to-purple-600", // Default gradient
      imageUrl: t.photo ? urlFor(t.photo) : (t.image ? urlFor(t.image) : null), // Handle both 'photo' (new) and 'image' (old/fallback)
      isActive: true
    }))
    : STATIC_TESTIMONIALS;

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
    <section id="testimonials" ref={sectionRef} className="scroll-mt-20 py-12 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-green-500 via-teal-500 to-blue-500 bg-clip-text text-transparent">
              Success Stories
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-center">
            Hear from students and professionals who achieved success through the career counselling and guidance services of Careerskope
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
            <div className="flex justify-center items-center mb-8 space-x-4">
              {/* Indicator Dots */}
              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex
                      ? 'bg-gradient-to-r from-blue-500 to-red-500 scale-110'
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
                    className="w-full flex-shrink-0 p-4"
                    data-testid={`testimonial-${index}`}
                  >
                    <div className="bg-card p-6 rounded-xl h-full relative">
                      {/* Quote decoration */}
                      <div className="absolute top-2 right-2 opacity-10">
                        <Quote className="h-12 w-12 text-blue-500" />
                      </div>

                      <div className="relative z-10">
                        <div className="flex items-center mb-4">
                          {testimonial.imageUrl ? (
                            <div className="w-12 h-12 rounded-full overflow-hidden mr-3 ring-2 ring-blue-500/30">
                              <img
                                src={testimonial.imageUrl}
                                alt={testimonial.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ) : (
                            <div className={`w-12 h-12 bg-gradient-to-r ${testimonial.gradient} rounded-full flex items-center justify-center text-white font-bold mr-3 text-lg`}>
                              {testimonial.initial}
                            </div>
                          )}
                          <div>
                            <div className="font-bold text-lg">{testimonial.name}</div>
                            <div className="text-muted-foreground text-sm">{testimonial.role}</div>
                          </div>
                        </div>

                        <div className="mb-4">
                          <p className="text-muted-foreground leading-relaxed text-sm">
                            "{testimonial.quote}"
                          </p>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 fill-current" />
                            ))}
                          </div>
                          <div className={`w-8 h-8 bg-gradient-to-r ${testimonial.gradient} rounded-full flex items-center justify-center`}>
                            <Award className="h-4 w-4 text-white" />
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
              className="absolute -left-4 top-1/2 transform -translate-y-1/2 bg-card w-12 h-12 flex items-center justify-center transition-all duration-300 hover:scale-110 opacity-80 hover:opacity-100 rounded-full shadow-lg"
              data-testid="button-prev-testimonial"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute -right-4 top-1/2 transform -translate-y-1/2 bg-card w-12 h-12 flex items-center justify-center transition-all duration-300 hover:scale-110 opacity-80 hover:opacity-100 rounded-full shadow-lg"
              data-testid="button-next-testimonial"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
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
