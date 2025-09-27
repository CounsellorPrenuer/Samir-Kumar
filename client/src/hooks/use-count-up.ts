import { useState, useEffect } from 'react';

interface UseCountUpOptions {
  end: number;
  start?: number;
  duration?: number;
  delay?: number;
  easing?: (t: number) => number;
}

export function useCountUp({ 
  end, 
  start = 0, 
  duration = 2000, 
  delay = 0,
  easing = (t: number) => t * (2 - t) // ease-out
}: UseCountUpOptions) {
  const [count, setCount] = useState(start);
  const [isAnimating, setIsAnimating] = useState(false);

  const startAnimation = () => {
    if (isAnimating) return;
    
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setCount(end);
      return;
    }

    setIsAnimating(true);
    const startTime = performance.now();
    const range = end - start;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      
      if (elapsed < delay) {
        requestAnimationFrame(animate);
        return;
      }

      const progress = Math.min((elapsed - delay) / duration, 1);
      const easedProgress = easing(progress);
      const currentCount = start + (range * easedProgress);
      
      setCount(Math.round(currentCount));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
      }
    };

    requestAnimationFrame(animate);
  };

  const reset = () => {
    setCount(start);
    setIsAnimating(false);
  };

  return { count, startAnimation, reset, isAnimating };
}

export function useCountUpOnView(
  options: UseCountUpOptions,
  threshold: number = 0.5
) {
  const { count, startAnimation, reset, isAnimating } = useCountUp(options);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggered) {
          setHasTriggered(true);
          startAnimation();
        }
      },
      { threshold }
    );

    // We'll add the ref later when used in components
    return () => observer.disconnect();
  }, [startAnimation, hasTriggered, threshold]);

  return { count, isAnimating, hasTriggered, reset };
}