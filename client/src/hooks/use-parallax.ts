import { useState, useEffect } from 'react';

export function useParallax(speed: number = 0.5) {
  const [transform, setTransform] = useState('translateY(0px)');

  useEffect(() => {
    let ticking = false;

    const updateTransform = () => {
      const scrolled = window.scrollY;
      const parallax = scrolled * speed;
      setTransform(`translateY(${parallax}px)`);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateTransform);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateTransform(); // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [speed]);

  return transform;
}

export function useScrollBasedAnimation() {
  const [scrollY, setScrollY] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setOpacity(1);
      setScale(1);
      return;
    }

    let ticking = false;

    const updateValues = () => {
      const scroll = window.scrollY;
      const windowHeight = window.innerHeight;
      
      setScrollY(scroll);
      
      // Fade out and scale down hero as user scrolls with minimum opacity
      const fadePoint = windowHeight * 0.8;
      const newOpacity = Math.max(0.6, 1 - (scroll / fadePoint));
      const newScale = Math.max(0.98, 1 - (scroll / fadePoint) * 0.02);
      
      setOpacity(newOpacity);
      setScale(newScale);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateValues);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateValues(); // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return { scrollY, opacity, scale };
}