import { useState, useEffect } from 'react';

export function useScrollspy(sectionIds: string[], offset: number = 100) {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY + offset;
      
      // Find the section that's currently in view
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const section = document.querySelector(sectionIds[i]);
        if (section) {
          const sectionTop = section.getBoundingClientRect().top + window.scrollY;
          if (scrollTop >= sectionTop) {
            setActiveSection(sectionIds[i]);
            break;
          }
        }
      }
    };

    // Throttle scroll events for better performance
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
    };
  }, [sectionIds, offset]);

  return activeSection;
}