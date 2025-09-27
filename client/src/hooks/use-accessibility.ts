import { useEffect, useState } from 'react';

interface AccessibilityPreferences {
  prefersReducedMotion: boolean;
  prefersHighContrast: boolean;
  prefersDarkMode: boolean;
}

export function useAccessibility(): AccessibilityPreferences {
  const [preferences, setPreferences] = useState<AccessibilityPreferences>({
    prefersReducedMotion: false,
    prefersHighContrast: false,
    prefersDarkMode: false,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const updatePreferences = () => {
      setPreferences({
        prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
        prefersHighContrast: window.matchMedia('(prefers-contrast: high)').matches,
        prefersDarkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
      });
    };

    // Initial check
    updatePreferences();

    // Listen for changes
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const highContrastQuery = window.matchMedia('(prefers-contrast: high)');
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');

    reducedMotionQuery.addEventListener('change', updatePreferences);
    highContrastQuery.addEventListener('change', updatePreferences);
    darkModeQuery.addEventListener('change', updatePreferences);

    return () => {
      reducedMotionQuery.removeEventListener('change', updatePreferences);
      highContrastQuery.removeEventListener('change', updatePreferences);
      darkModeQuery.removeEventListener('change', updatePreferences);
    };
  }, []);

  return preferences;
}

// Helper function to validate accessibility compliance
export function validateAccessibility() {
  const issues: string[] = [];

  // Check for images without alt text
  const images = document.querySelectorAll('img:not([alt])');
  if (images.length > 0) {
    issues.push(`Found ${images.length} images without alt text`);
  }

  // Check for buttons without accessible names
  const buttons = document.querySelectorAll('button:not([aria-label]):not([aria-labelledby])');
  const buttonsWithoutText = Array.from(buttons).filter(
    button => !button.textContent?.trim()
  );
  if (buttonsWithoutText.length > 0) {
    issues.push(`Found ${buttonsWithoutText.length} buttons without accessible names`);
  }

  // Check for form inputs without labels
  const inputs = document.querySelectorAll('input:not([aria-label]):not([aria-labelledby])');
  const inputsWithoutLabels = Array.from(inputs).filter(input => {
    const id = input.getAttribute('id');
    return !id || !document.querySelector(`label[for="${id}"]`);
  });
  if (inputsWithoutLabels.length > 0) {
    issues.push(`Found ${inputsWithoutLabels.length} inputs without proper labels`);
  }

  // Check for interactive elements with insufficient contrast
  const interactiveElements = document.querySelectorAll('button, a, input, select, textarea');
  // Note: Color contrast validation would require more complex implementation

  return {
    isCompliant: issues.length === 0,
    issues,
    elementsChecked: {
      images: document.querySelectorAll('img').length,
      buttons: document.querySelectorAll('button').length,
      inputs: document.querySelectorAll('input').length,
      interactiveElements: interactiveElements.length,
    }
  };
}