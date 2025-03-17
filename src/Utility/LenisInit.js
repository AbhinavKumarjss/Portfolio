import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let lenisInstance = null;
let handleTouchStart = null;
let handleTouchMove = null;
let handleTouchEnd = null;
let updateLenisOnResize = null;

export const initLenis = () => {
  if (lenisInstance) {
    // Lenis is already initialized
    return lenisInstance;
  }

  // Detect if device is mobile
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  // Detect if it's iOS specifically
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  
  // Get viewport width for more precise adjustments
  const viewportWidth = window.innerWidth;
  const isSmallMobile = viewportWidth <= 480;

  // Create new Lenis instance with optimized settings for mobile
  lenisInstance = new Lenis({
    duration: isSmallMobile ? 0.5 : (isMobile ? 0.8 : 1.2),  // Even shorter duration for small mobile devices
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Improved easing function (exponential ease-out)
    smooth: true,
    smoothWheel: true,
    touchMultiplier: isSmallMobile ? 2.2 : (isMobile ? 1.8 : 1), // Higher touch multiplier for better mobile response
    lerp: isSmallMobile ? 0.03 : (isMobile ? 0.05 : 0.1), // Lower lerp for smoother mobile scrolling
    wheelMultiplier: isMobile ? 0.7 : 1, // Adjusted wheel sensitivity
    gestureOrientation: 'vertical',
    normalizeWheel: true,
    syncTouch: true, // Better performance with touch events
    syncTouchLerp: isSmallMobile ? 0.04 : 0.1, // Faster touch response on small devices
    touchInertia: isIOS ? 0.7 : 0.8, // Reduced inertia for iOS to prevent overscrolling
    // Special handler for GSAP ScrollTrigger
    wheelEventsTarget: document.documentElement
  });

  // Define touch handling functions (in module scope to be used by destroyLenis)
  handleTouchStart = (e) => {
    // Check if we're in a horizontal scrolling section
    const horizontalSections = document.querySelectorAll('.projects-grid-container');
    if (horizontalSections.length === 0) return;
    
    // Get touch position
    const touch = e.touches[0];
    const touchX = touch.clientX;
    const touchY = touch.clientY;
    
    // Store initial touch position
    window.__lenisTouchStart = { x: touchX, y: touchY };
  };
  
  handleTouchMove = (e) => {
    if (!window.__lenisTouchStart) return;
    
    // Get current horizontal section
    const horizontalSections = document.querySelectorAll('.projects-grid-container');
    if (horizontalSections.length === 0) return;
    
    const touch = e.touches[0];
    const touchX = touch.clientX;
    const touchY = touch.clientY;
    
    // Calculate delta
    const deltaX = window.__lenisTouchStart.x - touchX;
    const deltaY = window.__lenisTouchStart.y - touchY;
    
    // If horizontal swipe is stronger than vertical in horizontal section
    if (Math.abs(deltaX) > Math.abs(deltaY) * 1.5) {
      // Prevent Lenis from handling this event
      if (lenisInstance) {
        lenisInstance.isLocked = true;
      }
    }
  };
  
  handleTouchEnd = () => {
    // Reset touch start position
    window.__lenisTouchStart = null;
    
    // Re-enable Lenis
    if (lenisInstance) {
      lenisInstance.isLocked = false;
    }
  };
  
  // Add event listeners for horizontal gesture detection
  if (isMobile) {
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });
  }

  // Connect Lenis and GSAP
  lenisInstance.on('scroll', ScrollTrigger.update);

  // Use gsap ticker to call raf
  gsap.ticker.add((time) => {
    if (lenisInstance && lenisInstance.raf) {
      lenisInstance.raf(time * 1000);
    }
  });

  // Prevent lag/jank
  gsap.ticker.lagSmoothing(0);

  // Debounce function
  const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  // Define resize handler (in module scope to be used by destroyLenis)
  updateLenisOnResize = debounce(() => {
    if (lenisInstance && typeof lenisInstance.update === 'function') {
      try {
        lenisInstance.update();
      } catch (error) {
        console.warn('Error updating Lenis instance:', error);
        // If update fails, try reinitializing Lenis
        destroyLenis();
        initLenis();
      }
    }
  }, 150); // 150ms debounce
  
  window.addEventListener('resize', updateLenisOnResize);

  // Make globally accessible
  window.lenisInstance = lenisInstance;

  return lenisInstance;
};

export const scrollTo = (target, options = {}) => {
  if (!lenisInstance) {
    return;
  }
  
  // Default options
  const defaultOptions = {
    offset: 0,
    duration: 1.2,
    immediate: false
  };
  
  // Merge options
  const scrollOptions = { ...defaultOptions, ...options };
  
  // Handle different target types
  if (typeof target === 'string') {
    const element = document.querySelector(target);
    if (element) {
      lenisInstance.scrollTo(element, scrollOptions);
    }
  } else if (target instanceof HTMLElement) {
    lenisInstance.scrollTo(target, scrollOptions);
  } else if (typeof target === 'number') {
    lenisInstance.scrollTo(target, scrollOptions);
  }
};

export const destroyLenis = () => {
  if (lenisInstance) {
    // Remove event listeners
    if (handleTouchStart) document.removeEventListener('touchstart', handleTouchStart);
    if (handleTouchMove) document.removeEventListener('touchmove', handleTouchMove);
    if (handleTouchEnd) document.removeEventListener('touchend', handleTouchEnd);
    
    // Remove resize listener
    if (updateLenisOnResize) window.removeEventListener('resize', updateLenisOnResize);
    
    // Destroy instance
    lenisInstance.destroy();
    lenisInstance = null;
    window.lenisInstance = null;
  }
};

export default {
  initLenis,
  scrollTo,
  destroyLenis
}; 