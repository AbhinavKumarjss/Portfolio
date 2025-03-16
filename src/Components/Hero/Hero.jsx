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
    // Check if mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
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
    
    // Wait a bit longer on mobile devices to ensure Lenis is properly initialized
    const initDelay = isMobile ? 300 : 100;
    
    // Wait for Lenis to be initialized
    setTimeout(() => {
      // Scroll-based animations with Lenis integration
      ScrollTrigger.refresh();
      
      const heroScrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: '#Hero-section',
          start: 'top top',
          end: '+=800',
          scrub: isMobile ? 0.5 : 1, // Smoother scrub on mobile
          invalidateOnRefresh: true, // Ensures it works correctly after device orientation changes
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
          .to('#Hero-ui-section', {
            opacity: 0,
            duration: 1,
          }, 0)
          .to(nameElement, {
            xPercent: -100,
            rotateY: 80,
            transformOrigin: "left center",
            transformStyle: "preserve-3d",
            perspective: 1000
          }, 0)
          .to(devChars, {
            xPercent: (i) => 100 + (i * 10), // Each letter goes further
            rotation: (i) => i % 2 === 0 ? 45 : -45, // Alternating rotation
            opacity: 0,
            stagger: 0.05
          }, 0)
          .to(webChars, {
            y: (i) => Math.random() * 300 + 100, // Random y position
            x: (i) => (Math.random() - 0.5) * 400, // Random x position
            rotation: () => Math.random() * 360, // Random rotation
            opacity: 0,
            scale: () => Math.random() * 2 + 0.5, // Random scaling
            stagger: 0.02
          }, 0)
          .to('#Hero-section-connect-info', {
            scale: 0.5,
            opacity: 0,
            y: 100
          }, 0);
      }
    }, initDelay);

    // Particle background setup
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    let isVortexActive = false;
    let vortexCenterX = canvas.width / 2;
    let vortexCenterY = canvas.height / 2;
    let vortexStrength = 0;
    let vortexDecay = 0.95;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resizeCanvas);
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
    
    // Create particles in a more structured pattern - reduce count for mobile
    const createParticles = () => {
      particles = [];
      // Reduce particle count for mobile
      const particleCount = isMobile ? 
        Math.floor(window.innerWidth / 30) : // Fewer particles on mobile
        Math.floor(window.innerWidth / 15);  // More particles on desktop
      
      // Create several cluster centers - fewer on mobile
      const clusterCount = isMobile ? 3 : 5;
      const clusters = [];
      
      for (let i = 0; i < clusterCount; i++) {
        clusters.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 200 + 100
        });
      }
      
      // Create a grid-like structure with some randomness
      const gridSize = Math.ceil(Math.sqrt(particleCount));
      const cellWidth = canvas.width / gridSize;
      const cellHeight = canvas.height / gridSize;
      
      for (let i = 0; i < particleCount; i++) {
        // Decide on placement strategy for this particle (33% chance for each type)
        const placementType = Math.floor(Math.random() * 3);
        
        let x, y;
        
        if (placementType === 0) {
          // Cluster-based placement
          const cluster = clusters[Math.floor(Math.random() * clusters.length)];
          const angle = Math.random() * Math.PI * 2;
          const distance = Math.random() * cluster.radius;
          x = cluster.x + Math.cos(angle) * distance;
          y = cluster.y + Math.sin(angle) * distance;
        } 
        else if (placementType === 1) {
          // Grid-based placement with jitter
          const col = i % gridSize;
          const row = Math.floor(i / gridSize);
          x = col * cellWidth + cellWidth * (0.3 + Math.random() * 0.4); // 30%-70% of cell width
          y = row * cellHeight + cellHeight * (0.3 + Math.random() * 0.4); // 30%-70% of cell height
        }
        else {
          // Some particles along sine wave patterns
          x = Math.random() * canvas.width;
          y = canvas.height / 2 + Math.sin(x / 100) * (canvas.height / 4);
          // Add some randomness
          y += (Math.random() - 0.5) * 50;
        }
        
        // Ensure particles are within canvas bounds
        x = Math.max(0, Math.min(canvas.width, x));
        y = Math.max(0, Math.min(canvas.height, y));
        
        // Simplify particle properties on mobile
        particles.push({
          x: x,
          y: y,
          size: isMobile ? (Math.random() * 2 + 0.5) : (Math.random() * 3 + 0.5), // Smaller particles on mobile
          speedX: (Math.random() - 0.5) * (isMobile ? 0.4 : 0.8), // Slower speed on mobile
          speedY: (Math.random() - 0.5) * (isMobile ? 0.4 : 0.8), // Slower speed on mobile
          opacity: Math.random() * 0.7 + 0.3,
          color: i % 5 === 0 
            ? `rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1})` // White particles
            : `rgba(235, 89, 57, ${Math.random() * 0.5 + 0.1})`, // Theme color
          pulseSpeed: isMobile ? (Math.random() * 0.01 + 0.005) : (Math.random() * 0.02 + 0.01), // Slower pulse on mobile
          pulseFactor: 0,
          pulseDirection: 1
        });
      }
      
      particlesRef.current = particles;
    };
    
    createParticles();
    
    // Animation loop with optimizations for mobile
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Add subtle background noise - less noise on mobile
      const noiseCount = isMobile ? 10 : 20;
      const noiseOpacity = isMobile ? 0.02 : 0.03;
      
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
        
        // On mobile, reduce the interaction distance for better performance
        const interactionDistance = isMobile ? 100 : 200;
        
        if (distance < interactionDistance) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const force = (interactionDistance - distance) / interactionDistance;
          
          particle.speedX += forceDirectionX * force * 0.1;
          particle.speedY += forceDirectionY * force * 0.1;
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
            particle.speedX += Math.cos(angle + Math.PI/2) * force * 0.2;
            particle.speedY += Math.sin(angle + Math.PI/2) * force * 0.2;
            
            // Slight pull toward center
            particle.speedX += dx / distance * force * 0.03;
            particle.speedY += dy / distance * force * 0.03;
          }
        }
        
        // Draw particle without glow, just simple dots
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, pulseSize, 0, Math.PI * 2);
        ctx.fillStyle = particle.color.replace(/[\d.]+\)$/, 
        `${particle.opacity * (1 + particle.pulseFactor * 0.3)})`);
        ctx.fill();
        
        // On mobile, reduce the number of connections to improve performance
        const connectionDistance = isMobile ? 80 : 150; 
        
        // Connect particles within a certain distance - limit connections on mobile
        if (!isMobile || index % 2 === 0) { // Skip half the particles on mobile
          particles.forEach((particle2, index2) => {
            if (index !== index2) {
              const dx = particle.x - particle2.x;
              const dy = particle.y - particle2.y;
              const distance = Math.sqrt(dx * dx + dy * dy);
              
              if (distance < connectionDistance) {
                ctx.beginPath();
                ctx.moveTo(particle.x, particle.y);
                ctx.lineTo(particle2.x, particle2.y);
                const alpha = 0.2 * (1 - distance / connectionDistance);
                ctx.strokeStyle = particle.color.replace(/[\d.]+\)$/, `${alpha})`);
                ctx.lineWidth = isMobile ? 0.3 : (0.5 + (1 - distance / connectionDistance) * 1);
                ctx.stroke();
              }
            }
          });
        }
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Clean up
    return () => {
      // Remove the dynamically added style
      if (document.head.contains(splitTextStyle)) {
        document.head.removeChild(splitTextStyle);
      }
      
      window.removeEventListener('resize', resizeCanvas);
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
        mixBlendMode: 'screen'
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
