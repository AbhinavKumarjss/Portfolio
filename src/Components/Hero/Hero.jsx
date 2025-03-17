import React, { useEffect, useRef } from 'react'
import './Hero.css'
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

export default function Hero() {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const nameRef = useRef(null);
  const developerRef = useRef(null);
  const webRef = useRef(null);
  const infoRef = useRef(null);
  
  gsap.registerPlugin(ScrollTrigger);
  
  useEffect(() => {
    // Device and performance detection - expanded beyond just mobile check
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isTablet = window.innerWidth <= 1024 && window.innerWidth > 768;
    const isLowPerfDevice = isMobile || navigator.hardwareConcurrency <= 4;
    
    // Set initial device profile
    let deviceProfile = {
      particleMultiplier: isLowPerfDevice ? 0.3 : (isTablet ? 0.6 : 1),
      particleSize: isMobile ? { min: 0.5, max: 2 } : (isTablet ? { min: 0.5, max: 2.5 } : { min: 0.5, max: 3 }),
      speedMultiplier: isLowPerfDevice ? 0.4 : (isTablet ? 0.6 : 1),
      connectionDistance: isMobile ? 80 : (isTablet ? 120 : 150),
      connectionSkip: isMobile ? 3 : (isTablet ? 2 : 1), // Skip connections for better performance
      clusterCount: isMobile ? 3 : (isTablet ? 4 : 5)
    };
    
    // Add CSS for the split text effect
    const splitTextStyle = document.createElement('style');
    splitTextStyle.textContent = `
      .char-animated {
        display: inline-block;
        opacity: 0;
        transform: translateY(20px);
      }
    `;
    document.head.appendChild(splitTextStyle);
    
    // Set up char elements for name
    const nameElement = nameRef.current;
    const nameText = nameElement.textContent.trim();
    nameElement.innerHTML = '';
    
    for (let i = 0; i < nameText.length; i++) {
      const char = document.createElement('span');
      char.className = 'char-animated';
      char.textContent = nameText[i] === ' ' ? '\u00A0' : nameText[i];
      nameElement.appendChild(char);
    }
    
    // Set up char elements for developer
    const devElement = developerRef.current;
    const devText = devElement.textContent.trim();
    devElement.innerHTML = '';
    
    for (let i = 0; i < devText.length; i++) {
      const char = document.createElement('span');
      char.className = 'char-animated';
      char.textContent = devText[i] === ' ' ? '\u00A0' : devText[i];
      devElement.appendChild(char);
    }
    
    // Set up char elements for web
    const webElement = webRef.current;
    const webText = webElement.textContent.trim();
    webElement.innerHTML = '';
    
    for (let i = 0; i < webText.length; i++) {
      const char = document.createElement('span');
      char.className = 'char-animated';
      char.textContent = webText[i] === ' ' ? '\u00A0' : webText[i];
      webElement.appendChild(char);
    }
    
    // Get all char elements
    const nameChars = nameElement.querySelectorAll('.char-animated');
    const devChars = devElement.querySelectorAll('.char-animated');
    const webChars = webElement.querySelectorAll('.char-animated');
    
    // Initial animations
    const tl = gsap.timeline();
    
    tl.to(nameChars, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "back.out(1.7)",
      stagger: 0.03
    })
    .to(devChars, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "back.out(1.7)",
      stagger: 0.03
    }, "-=0.5")
    .to(webChars, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "back.out(1.7)",
      stagger: 0.03
    }, "-=0.5");
    
    // Create a flag to track if initial animations completed
    let initialAnimationsCompleted = false;
    tl.eventCallback("onComplete", () => {
      initialAnimationsCompleted = true;
    });
    
    // Wait a bit longer on mobile devices to ensure Lenis is properly initialized
    const initDelay = isMobile ? 300 : 100;
    
    // Wait for Lenis to be initialized
    setTimeout(() => {
      // Scroll-based animations with Lenis integration
      ScrollTrigger.refresh();
      
      // Set initial states explicitly
      gsap.set([nameElement, devElement, webElement, '#Hero-section-connect-info', '#Hero-ui-section'], {
        opacity: 1,
        clearProps: "all"
      });
      
      const heroScrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: '#Hero-section',
          start: 'top top',
          end: '+=800',
          scrub: isMobile ? 0.5 : 1,
          invalidateOnRefresh: true,
          toggleActions: "play none none reverse",
          onLeaveBack: () => {
            // Reset to initial state when scrolling back to top
            gsap.to([nameElement, devElement, webElement, '#Hero-section-connect-info', '#Hero-ui-section'], {
              opacity: 1,
              xPercent: 0,
              yPercent: 0,
              y: 0,
              x: 0,
              scale: 1,
              rotateY: 0,
              rotation: 0,
              duration: 0.1,
              overwrite: true
            });
          }
        }
      });
      
      // Add animations to the timeline - simplified for mobile
      if (isMobile) {
        // Simpler animations for mobile
        heroScrollTl
          .to('#Hero-ui-section', {
            opacity: 0,
            duration: 0.5,
          }, 0)
          .to(nameElement, {
            xPercent: -50,
            opacity: 0,
            duration: 0.5
          }, 0)
          .to([devElement, webElement], {
            opacity: 0,
            y: 50,
            duration: 0.5
          }, 0)
          .to('#Hero-section-connect-info', {
            opacity: 0,
            duration: 0.5
          }, 0);
      } else {
        // Full animations for desktop
        heroScrollTl
          .fromTo('#Hero-ui-section', 
            { opacity: 1 },
            { opacity: 0, duration: 1 },
            0
          )
          .fromTo(nameElement, 
            { xPercent: 0, rotateY: 0, opacity: 1 },
            { 
              xPercent: -100, 
              rotateY: 80, 
              opacity: 0.1,
              transformOrigin: "left center",
              transformStyle: "preserve-3d",
              perspective: 1000,
              duration: 1,
              ease: "power2.inOut"
            },
            0
          )
          .fromTo(devChars, 
            { xPercent: 0, rotation: 0, opacity: 1 },
            {
              xPercent: (i) => 100 + (i * 10),
              rotation: (i) => i % 2 === 0 ? 45 : -45,
              opacity: 0,
              stagger: 0.05,
              duration: 1,
              ease: "power2.inOut"
            },
            0
          )
          .fromTo(webChars, 
            { y: 0, x: 0, rotation: 0, opacity: 1, scale: 1 },
            {
              y: (i) => Math.random() * 300 + 100,
              x: (i) => (Math.random() - 0.5) * 400,
              rotation: () => Math.random() * 360,
              opacity: 0,
              scale: () => Math.random() * 2 + 0.5,
              stagger: 0.02,
              duration: 1,
              ease: "power2.inOut"
            },
            0
          )
          .fromTo('#Hero-section-connect-info', 
            { scale: 1, opacity: 1, y: 0 },
            {
              scale: 0.5,
              opacity: 0,
              y: 100,
              duration: 1,
              ease: "power2.inOut"
            },
            0
          );
      }
    }, initDelay);

    // Particle background setup
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set initial canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    let animationFrameId;
    let particles = [];
    let isVortexActive = false;
    let vortexCenterX = canvas.width / 2;
    let vortexCenterY = canvas.height / 2;
    let vortexStrength = 0;
    let vortexDecay = 0.95;

    // Initialize particles immediately
    createParticles();
    
    function createParticles() {
      particles = [];
      
      // Adjust base count calculation for better density on small screens
      const minParticles = 50; // Minimum number of particles for small screens
      const baseCount = Math.max(
        minParticles,
        Math.floor((canvas.width * canvas.height) / 10000) // Adjust density based on area
      );
      const particleCount = Math.floor(baseCount * deviceProfile.particleMultiplier);
      
      // Create several cluster centers
      const clusterCount = deviceProfile.clusterCount;
      const clusters = [];
      
      // Adjust cluster radius based on screen size
      const maxRadius = Math.min(canvas.width, canvas.height) / 3;
      
      for (let i = 0; i < clusterCount; i++) {
        clusters.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * maxRadius + (maxRadius / 2)
        });
      }
      
      // Create a grid-like structure with some randomness
      const gridSize = Math.ceil(Math.sqrt(particleCount));
      const cellWidth = canvas.width / gridSize;
      const cellHeight = canvas.height / gridSize;
      
      for (let i = 0; i < particleCount; i++) {
        // Adjust placement strategy distribution for better density
        const placementType = Math.random() < 0.4 ? 0 : (Math.random() < 0.7 ? 1 : 2);
        
        let x, y;
        
        if (placementType === 0) {
          // Cluster-based placement - increased probability
          const cluster = clusters[Math.floor(Math.random() * clusters.length)];
          const angle = Math.random() * Math.PI * 2;
          const distance = Math.random() * cluster.radius;
          x = cluster.x + Math.cos(angle) * distance;
          y = cluster.y + Math.sin(angle) * distance;
        } 
        else if (placementType === 1) {
          // Grid-based placement with adjusted jitter
          const col = i % gridSize;
          const row = Math.floor(i / gridSize);
          x = col * cellWidth + cellWidth * (0.2 + Math.random() * 0.6); // More spread
          y = row * cellHeight + cellHeight * (0.2 + Math.random() * 0.6);
        }
        else {
          // Wave pattern with adjusted amplitude
          x = Math.random() * canvas.width;
          const amplitude = canvas.height / 3;
          y = canvas.height / 2 + Math.sin(x / (canvas.width / 8)) * amplitude;
          y += (Math.random() - 0.5) * (amplitude / 2);
        }
        
        // Ensure particles are within canvas bounds
        x = Math.max(0, Math.min(canvas.width, x));
        y = Math.max(0, Math.min(canvas.height, y));
        
        // Adjust particle properties for better visibility on mobile
        const { min, max } = deviceProfile.particleSize;
        const baseOpacity = isMobile ? 0.6 : 0.4; // Higher base opacity for mobile
        
        particles.push({
          x: x,
          y: y,
          size: Math.random() * (max - min) + min,
          speedX: (Math.random() - 0.5) * deviceProfile.speedMultiplier,
          speedY: (Math.random() - 0.5) * deviceProfile.speedMultiplier,
          opacity: Math.random() * 0.4 + baseOpacity, // Adjusted opacity range
          color: i % 5 === 0 
            ? `rgba(255, 255, 255, ${Math.random() * 0.4 + baseOpacity})` // Brighter white particles
            : `rgba(235, 89, 57, ${Math.random() * 0.6 + baseOpacity})`, // Brighter theme color
          pulseSpeed: Math.random() * 0.01 * deviceProfile.speedMultiplier + 0.005,
          pulseFactor: 0,
          pulseDirection: 1
        });
      }
      
      particlesRef.current = particles;
    }
    
    const resizeCanvas = () => {
      const oldWidth = canvas.width;
      const oldHeight = canvas.height;
      
      // Update canvas dimensions to match window size
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Update device profile on resize
      const newIsMobile = window.innerWidth <= 768;
      const newIsTablet = window.innerWidth <= 1024 && window.innerWidth > 768;
      const newIsLowPerfDevice = newIsMobile || navigator.hardwareConcurrency <= 4;
      
      // Update device profile
      deviceProfile = {
        particleMultiplier: newIsLowPerfDevice ? 0.5 : (newIsTablet ? 0.7 : 1), // Increased multipliers
        particleSize: newIsMobile ? { min: 1, max: 3 } : (newIsTablet ? { min: 0.8, max: 2.8 } : { min: 0.5, max: 3 }), // Larger particles on mobile
        speedMultiplier: newIsLowPerfDevice ? 0.4 : (newIsTablet ? 0.6 : 1),
        connectionDistance: newIsMobile ? 100 : (newIsTablet ? 140 : 150), // Increased connection distance
        connectionSkip: newIsMobile ? 2 : (newIsTablet ? 2 : 1), // Reduced skip for more connections
        clusterCount: newIsMobile ? 4 : (newIsTablet ? 5 : 6) // More clusters
      };

      // Always recreate particles on resize for better responsiveness
      createParticles();
    };
    
    // Use a more aggressive debounce for resize
    let resizeTimeout;
    const debouncedResize = () => {
      if (resizeTimeout) {
        clearTimeout(resizeTimeout);
      }
      // Update canvas size immediately for smooth resizing
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Debounce the full resize handler
      resizeTimeout = setTimeout(() => {
        resizeCanvas();
      }, 100); // Reduced timeout for better responsiveness
    };
    
    // Add resize observer for more reliable size updates
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === canvas.parentElement) {
          debouncedResize();
        }
      }
    });
    
    // Observe the canvas parent element
    resizeObserver.observe(canvas.parentElement);
    
    // Initial setup
    window.addEventListener('resize', debouncedResize);
    resizeCanvas();
    
    // Track mouse movement
    const handleMouseMove = (e) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY
      };
    };
    
    // Add click handler for vortex effect
    const handleClick = (e) => {
      isVortexActive = true;
      vortexCenterX = e.clientX;
      vortexCenterY = e.clientY;
      vortexStrength = 5;
      
      // Add visual pulse at click point
      ctx.beginPath();
      const pulseGradient = ctx.createRadialGradient(
        vortexCenterX, vortexCenterY, 0,
        vortexCenterX, vortexCenterY, 300
      );
      pulseGradient.addColorStop(0, 'rgba(235, 89, 57, 0.3)');
      pulseGradient.addColorStop(1, 'rgba(235, 89, 57, 0)');
      
      ctx.fillStyle = pulseGradient;
      ctx.arc(vortexCenterX, vortexCenterY, 300, 0, Math.PI * 2);
      ctx.fill();
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);
    
    // Animation loop with optimizations for different devices
    const animate = () => {
      if (!canvas || !ctx) return;  // Guard clause to prevent errors
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Add subtle background noise - amount based on device profile
      const noiseCount = Math.floor(20 * deviceProfile.particleMultiplier);
      const noiseOpacity = isLowPerfDevice ? 0.02 : 0.03;
      
      for (let i = 0; i < noiseCount; i++) {
        ctx.fillStyle = `rgba(255, 255, 255, ${noiseOpacity})`;
        ctx.fillRect(
          Math.random() * canvas.width, 
          Math.random() * canvas.height, 
          Math.random() * 2, 
          Math.random() * 2
        );
      }
      
      // Handle vortex effect decay
      if (isVortexActive) {
        vortexStrength *= vortexDecay;
        if (vortexStrength < 0.1) {
          isVortexActive = false;
        }
      }
      
      // Update and draw particles
      if (particles.length > 0) {  // Only process if we have particles
        particles.forEach((particle, index) => {
          // Add pulsing effect
          particle.pulseFactor += particle.pulseSpeed * particle.pulseDirection;
          if (particle.pulseFactor > 1) {
            particle.pulseDirection = -1;
          } else if (particle.pulseFactor < 0) {
            particle.pulseDirection = 1;
          }
          
          const pulseSize = particle.size * (1 + particle.pulseFactor * 0.3);
          
          // Move particles
          particle.x += particle.speedX;
          particle.y += particle.speedY;
          
          // Mouse interaction - particles more strongly attracted to mouse
          const dx = mouseRef.current.x - particle.x;
          const dy = mouseRef.current.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Interaction distance based on device profile
          const interactionDistance = deviceProfile.connectionDistance * 1.3;
          
          if (distance < interactionDistance) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (interactionDistance - distance) / interactionDistance;
            
            particle.speedX += forceDirectionX * force * 0.1 * deviceProfile.speedMultiplier;
            particle.speedY += forceDirectionY * force * 0.1 * deviceProfile.speedMultiplier;
          }
          
          // Friction to prevent extreme acceleration
          particle.speedX *= 0.98;
          particle.speedY *= 0.98;
          
          // Boundary check - wrap around edges
          if (particle.x < 0) particle.x = canvas.width;
          if (particle.x > canvas.width) particle.x = 0;
          if (particle.y < 0) particle.y = canvas.height;
          if (particle.y > canvas.height) particle.y = 0;
          
          // Apply vortex effect if active
          if (isVortexActive) {
            const dx = vortexCenterX - particle.x;
            const dy = vortexCenterY - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 500) {
              // Calculate angle to create circular motion
              const angle = Math.atan2(dy, dx);
              const force = (500 - distance) / 500 * vortexStrength;
              
              // Tangential force for circular motion
              particle.speedX += Math.cos(angle + Math.PI/2) * force * 0.2 * deviceProfile.speedMultiplier;
              particle.speedY += Math.sin(angle + Math.PI/2) * force * 0.2 * deviceProfile.speedMultiplier;
              
              // Slight pull toward center
              particle.speedX += dx / distance * force * 0.03 * deviceProfile.speedMultiplier;
              particle.speedY += dy / distance * force * 0.03 * deviceProfile.speedMultiplier;
            }
          }
          
          // Draw particle without glow, just simple dots
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, pulseSize, 0, Math.PI * 2);
          ctx.fillStyle = particle.color.replace(/[\d.]+\)$/, 
          `${particle.opacity * (1 + particle.pulseFactor * 0.3)})`);
          ctx.fill();
          
          // Connect particles within a certain distance
          const connDistance = deviceProfile.connectionDistance;
          const connectionSkip = deviceProfile.connectionSkip;
          
          // Skip connections based on device profile for better performance
          if (index % connectionSkip === 0) {
            particles.forEach((particle2, index2) => {
              if (index !== index2 && index2 % connectionSkip === 0) {
                const dx = particle.x - particle2.x;
                const dy = particle.y - particle2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < connDistance) {
                  ctx.beginPath();
                  ctx.moveTo(particle.x, particle.y);
                  ctx.lineTo(particle2.x, particle2.y);
                  const baseAlpha = isMobile ? 0.3 : 0.2; // Higher base alpha for mobile
                  const alpha = baseAlpha * (1 - distance / connDistance);
                  ctx.strokeStyle = particle.color.replace(/[\d.]+\)$/, `${alpha})`);
                  ctx.lineWidth = isLowPerfDevice ? 0.5 : (0.8 + (1 - distance / connDistance) * 1); // Thicker lines
                  ctx.stroke();
                }
              }
            });
          }
        });
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    // Start animation immediately
    animate();
    
    // Clean up
    return () => {
      // Remove the dynamically added style
      if (document.head.contains(splitTextStyle)) {
        document.head.removeChild(splitTextStyle);
      }
      
      window.removeEventListener('resize', debouncedResize);
      resizeObserver.disconnect(); // Cleanup resize observer
      clearTimeout(resizeTimeout);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationFrameId);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  function HeroAnimate(){
    
  }
  
  return (
    <div id='Hero-section'>
      <canvas ref={canvasRef} style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        pointerEvents: 'none',
        mixBlendMode: 'screen',
        background: 'transparent'
      }}></canvas>
      
      <div id='Hero-ui-section'>
        <div id="Hero-name" className='cursorzoom' cursorscale={7}>
          <h3 id='Hero-name-visible' ref={nameRef}>
          Abhinav Kumar
          </h3>
          <h1 id='Hero-name-developer' ref={developerRef}>
            Developer
          </h1>
          <div id='Hero-name-web'>
          <h3 ref={webRef}>
            web 2 | web 3 
          </h3>
          <div id='Hero-section-connect-info' ref={infoRef}>
          <h4 id='Hero-section-email'>Email: aviaryapanwar@gmail.com</h4>
          <h4 id='Hero-section-phone'>Phone: +91 7505206429</h4>
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}
