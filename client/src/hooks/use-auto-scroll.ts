import { useEffect, useRef, useState } from 'react';

interface UseAutoScrollOptions {
  interval?: number;
  pauseOnHover?: boolean;
  itemCount: number;
}

export function useAutoScroll({ 
  interval = 3000, 
  pauseOnHover = true, 
  itemCount 
}: UseAutoScrollOptions) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const goToNext = () => {
    setCurrentIndex(prev => (prev + 1) % itemCount);
  };

  const goToPrevious = () => {
    setCurrentIndex(prev => (prev - 1 + itemCount) % itemCount);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const pause = () => {
    setIsPaused(true);
  };

  const resume = () => {
    setIsPaused(false);
  };

  const toggle = () => {
    setIsPlaying(prev => !prev);
  };

  // Auto-scroll effect
  useEffect(() => {
    if (!isPlaying || isPaused || itemCount <= 1 || itemCount === 0) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return;
    }

    intervalRef.current = setInterval(goToNext, interval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isPlaying, isPaused, interval, itemCount]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    currentIndex,
    isPlaying,
    isPaused,
    goToNext,
    goToPrevious,
    goToSlide,
    pause,
    resume,
    toggle
  };
}