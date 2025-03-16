import './App.css'
import MouseFollower from './Utility/MouseFollower';
import Hero from './Components/Hero/Hero';
import Navbar from './Components/Navbar/Navbar';
import Skills from './Components/Skills/Skills';
import GsapTimeline from './Utility/GsapTimeline';
import AboutMe from './Components/Aboutme/AboutMe';
import Projects from './Components/Projects/Projects';
import { useMediaQuery } from 'react-responsive';
import { useEffect, useRef } from 'react';
import OverlayAboutMe from './Components/Aboutme/OverlayAboutMe';
import { initLenis, destroyLenis } from './Utility/LenisInit';

function App() {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const HeightGreater = useMediaQuery({ query: '(max-height: 400px)' });
  
  useEffect(() => {
    // Initialize Lenis smooth scrolling
    const lenis = initLenis();
    
    // Fix for touch devices - prevent default touchmove on document
    // but allow it on scrollable elements to ensure proper scrolling
    const preventDefaultTouchMove = (e) => {
      // Check if the touch started on a scrollable element
      const target = e.target;
      let isScrollable = false;
      let element = target;
      
      // Check if any parent element is scrollable
      while (element && !isScrollable) {
        const style = window.getComputedStyle(element);
        const overflow = style.getPropertyValue('overflow-y');
        
        if (overflow === 'scroll' || overflow === 'auto') {
          isScrollable = true;
        }
        
        element = element.parentElement;
      }
      
      // Only prevent default if not on a scrollable element
      if (!isScrollable) {
        e.preventDefault();
      }
    };
    
    // Add touch event listeners for mobile devices
    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobileDevice) {
      // Force ScrollTrigger refresh on orientation change
      window.addEventListener('orientationchange', () => {
        // Small delay to ensure the resize is complete
        setTimeout(() => {
          window.dispatchEvent(new Event('resize'));
          if (lenis) lenis.update();
        }, 200);
      });
    }
    
    // Clean up on unmount
    return () => {
      destroyLenis();
      if (isMobileDevice) {
        window.removeEventListener('orientationchange', () => {});
      }
    };
  }, []);
  
  return (
    <>
      {HeightGreater && 
        <h3>Aspect Ratio not Appropiate</h3>
      }
      {!HeightGreater && 
        <div style={{padding:'0px'}} id='app'>
          {!isMobile && 
            <MouseFollower>
              <div style={{ mixBlendMode: 'difference', pointerEvents:'none' }} id='circle-MouseFollower'></div>
            </MouseFollower>
          }
          
          <GsapTimeline></GsapTimeline>
          
          <div id='app-content'>
            <Navbar />
            <Hero />
            <OverlayAboutMe/>
            <AboutMe />
            <Skills />
            <Projects/>
          </div>
        </div>
      }
    </>
  )
}

export default App
