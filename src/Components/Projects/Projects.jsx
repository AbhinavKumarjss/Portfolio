import React, { useEffect, useState, useRef } from 'react';
import './Projects.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaGithub, FaExternalLinkAlt, FaReact, FaNodeJs, FaJsSquare, FaHtml5, FaCss3Alt, FaBootstrap, FaSass, FaFigma, FaCode } from 'react-icons/fa';
import { SiTypescript, SiMongodb, SiExpress, SiTailwindcss, SiRedux, SiNextdotjs, SiFirebase, SiGooglecloud, SiAwsamplify } from 'react-icons/si';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const projectsSectionRef = useRef(null);
  const experienceSectionRef = useRef(null);
  const headingRef = useRef(null);
  const filtersRef = useRef(null);
  const projectCardsRef = useRef([]);
  const projectsGridRef = useRef(null);
  const projectsGridContainerRef = useRef(null);

  // Define projects data
  const projectsData = [
    {
      id: 1,
      title: "Portfolio Website",
      description: "A personal portfolio website showcasing my projects and skills with smooth animations and interactive elements. Built with React, GSAP, and modern CSS techniques.",
      image: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      link: "https://portfolio-zjv0.onrender.com/",
      github: "https://github.com/AbhinavKumarjss/Portfolio",
      category: "web",
      featured: true,
      technologies: [
        { name: "React", icon: <FaReact style={{ color: "#61DAFB" }} /> },
        { name: "GSAP", icon: <FaCode style={{ color: "#88CE02" }} /> },
        { name: "JavaScript", icon: <FaJsSquare style={{ color: "#F7DF1E" }} /> },
        { name: "CSS3", icon: <FaCss3Alt style={{ color: "#264de4" }} /> }
      ]
    },
    {
      id: 2,
      title: "Watch2Gether - Video Streaming",
      description: "A collaborative video streaming platform where users can watch videos together in real-time, chat with friends, and watch video using download links. Built with React, Socket.IO, and Express.",
      image: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      link: "https://watch2gether-az7v.onrender.com/",
      github: "https://github.com/AbhinavKumarjss/Watch-TogetherV2",
      category: "web",
      featured: true,
      technologies: [
        { name: "React", icon: <FaReact style={{ color: "#61DAFB" }} /> },
        { name: "Node.js", icon: <FaNodeJs style={{ color: "#339933" }} /> },
        { name: "Socket.IO", icon: <FaCode style={{ color: "#010101" }} /> },
        { name: "TypeScript", icon: <SiTypescript style={{ color: "#3178C6" }} /> }
      ]
    },
    {
      id: 3,
      title: "Conferenz - Video Chat App",
      description: "A real-time peer-to-peer video chat application enabling seamless video calls with features like room creation, audio/video controls, and easy room sharing. Built using WebRTC, Socket.IO, and Express.",
      image: "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      link: "https://conferenz.onrender.com/",
      github: "https://github.com/AbhinavKumarjss/Conferenz",
      category: "web",
      featured: true,
      technologies: [
        { name: "WebRTC", icon: <FaCode style={{ color: "#333333" }} /> },
        { name: "Node.js", icon: <FaNodeJs style={{ color: "#339933" }} /> },
        { name: "JavaScript", icon: <FaJsSquare style={{ color: "#F7DF1E" }} /> },
        { name: "Socket.IO", icon: <FaCode style={{ color: "#010101" }} /> }
      ]
    },
    {
      id: 4,
      title: "VoiceNote - Voice Recording App",
      description: "A modern voice recording application with speech-to-text and text-to-speech capabilities. Features high-quality audio capture, smart transcription, and an organized library for recordings.",
      image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      link: "https://voice-note-app-rho.vercel.app/",
      github: "https://github.com/AbhinavKumarjss/VoiceNoteApp",
      category: "web",
      featured: true,
      technologies: [
        { name: "Next.js", icon: <SiNextdotjs style={{ color: "#000000" }} /> },
        { name: "TypeScript", icon: <SiTypescript style={{ color: "#3178C6" }} /> },
        { name: "Tailwind", icon: <SiTailwindcss style={{ color: "#38B2AC" }} /> },
        { name: "JavaScript", icon: <FaJsSquare style={{ color: "#F7DF1E" }} /> }
      ]
    }
  ];

  // Filter projects based on active filter
  const filteredProjects = activeFilter === 'all' 
    ? projectsData 
    : projectsData.filter(project => project.category === activeFilter);

  // Experience data
  const experienceData = [
  
    {
      id: 3,
      position: "Freelance Web Developer",
      company: "Self-employed",
      period: "2021 - Present",
      description: "Building portfolio by creating websites for small local businesses and student organizations. Developing skills in client communication, project management, and delivering solutions that meet client needs."
    }
  ];

  // Experience section animations - enhanced with better responsive loading
  useEffect(() => {
    if (!experienceSectionRef.current) return;
    
    // Store ScrollTrigger instances for cleanup
    const triggers = [];
    
    // Check device type and screen dimensions
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const viewportWidth = window.innerWidth;
    const isSmallMobile = viewportWidth <= 576;
    const isLandscape = window.innerHeight < window.innerWidth;
    
    // Animate section title with adaptive animations based on device
    const titleEl = experienceSectionRef.current.querySelector('.experience-title');
    const lineEl = experienceSectionRef.current.querySelector('.experience-line');
    
    if (titleEl && lineEl) {
      const titleTl = gsap.timeline({
        scrollTrigger: {
          trigger: experienceSectionRef.current,
          start: isSmallMobile ? "top 90%" : "top 80%", // Trigger earlier on smaller devices
          toggleActions: "play none none reverse"
        }
      });
      
      // Store the ScrollTrigger directly
      if (titleTl.scrollTrigger) {
        triggers.push(titleTl.scrollTrigger);
      }
      
      titleTl
        .fromTo(titleEl, 
          { y: isSmallMobile ? 20 : 30, opacity: 0 }, // Smaller distance on mobile
          { y: 0, opacity: 1, duration: isMobile ? 0.5 : 0.8, ease: "power3.out" }
        )
        .fromTo(lineEl, 
          { scaleX: 0 }, 
          { scaleX: 1, duration: isMobile ? 0.3 : 0.6, ease: "power3.out" }, 
          "-=0.3"
        );
    }
    
    // Animate timeline items with enhanced staggering on different devices
    const items = experienceSectionRef.current.querySelectorAll('.timeline-item');
    if (items.length) {
      // Create timeline animation with responsive parameters
      const timelineAnim = gsap.fromTo(items, 
        { 
          y: isSmallMobile ? 20 : (isMobile ? 30 : 50),
          opacity: 0,
          scale: isMobile ? 0.95 : 0.9
        }, 
        { 
          y: 0, 
          opacity: 1,
          scale: 1,
          stagger: isSmallMobile ? 0.1 : (isMobile ? 0.15 : 0.2), // Quicker stagger on smaller screens
          duration: isMobile ? 0.5 : 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: experienceSectionRef.current.querySelector('.timeline-container'),
            start: isSmallMobile ? "top 90%" : "top 85%",
            toggleActions: "play none none none"
          }
        }
      );
      
      // Store the ScrollTrigger if it exists
      if (timelineAnim.scrollTrigger) {
        triggers.push(timelineAnim.scrollTrigger);
      }
      
      // Add individual animations for timeline components
      items.forEach((item, index) => {
        // Animate timeline dots with delay based on item index
        const dot = item.querySelector('.timeline-dot');
        if (dot) {
          const dotAnim = gsap.fromTo(dot,
            { scale: 0, opacity: 0 },
            { 
              scale: 1, 
              opacity: 1, 
              duration: 0.5,
              delay: isMobile ? 0.1 * index : 0.2 * index,
              ease: "back.out(1.7)"
            }
          );
        }
        
        // Animate timeline date with separate animation
        const date = item.querySelector('.timeline-date');
        if (date) {
          const dateAnim = gsap.fromTo(date,
            { 
              x: isSmallMobile ? -10 : (viewportWidth <= 992 ? -20 : 0), 
              opacity: 0 
            },
            { 
              x: 0, 
              opacity: 1, 
              duration: 0.6,
              delay: 0.1 + (isMobile ? 0.1 * index : 0.15 * index),
              ease: "power2.out"
            }
          );
        }
      });
    }
    
    // Add touch interaction for timeline items on mobile devices
    if (isMobile && items.length) {
      items.forEach(item => {
        // Add light hover effect for touch devices
        const content = item.querySelector('.timeline-content');
        const dot = item.querySelector('.timeline-dot');
        
        if (content) {
          // Touch start event
          const handleTouchStart = () => {
            gsap.to(content, {
              scale: 1.02,
              boxShadow: "0 15px 35px rgba(0, 0, 0, 0.3)",
              duration: 0.3
            });
            
            if (dot) {
              gsap.to(dot, {
                scale: 1.2,
                boxShadow: "0 0 15px rgba(235, 89, 57, 0.6)",
                duration: 0.3
              });
            }
          };
          
          // Touch end event
          const handleTouchEnd = () => {
            gsap.to(content, {
              scale: 1,
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
              duration: 0.5,
              ease: "power2.out"
            });
            
            if (dot) {
              gsap.to(dot, {
                scale: 1,
                boxShadow: "none",
                duration: 0.5
              });
            }
          };
          
          // Add event listeners
          content.addEventListener('touchstart', handleTouchStart, { passive: true });
          content.addEventListener('touchend', handleTouchEnd, { passive: true });
          
          // Clean up on component unmount
          const cleanup = () => {
            content.removeEventListener('touchstart', handleTouchStart);
            content.removeEventListener('touchend', handleTouchEnd);
          };
          
          // Store cleanup in triggers for later execution
          triggers.push({ kill: cleanup });
        }
      });
    }
    
    // Add special handling for landscape mode
    if (isLandscape && isMobile) {
      // Add scroll hint for landscape mode
      const container = experienceSectionRef.current.querySelector('.timeline-container');
      if (container) {
        const descriptions = container.querySelectorAll('.timeline-description');
        descriptions.forEach(desc => {
          // Check if content is scrollable
          if (desc.scrollHeight > desc.clientHeight) {
            // Add subtle animation to indicate scrollability
            gsap.to(desc, {
              y: 5,
              repeat: 2,
              yoyo: true,
              duration: 0.5,
              delay: 1,
              ease: "power2.inOut"
            });
          }
        });
      }
    }
    
    return () => {
      // Clean up ScrollTrigger instances and event listeners
      triggers.forEach(trigger => {
        if (trigger) {
          if (typeof trigger.kill === 'function') {
            trigger.kill();
          } else if (trigger.scrollTrigger) {
            trigger.scrollTrigger.kill();
          }
        }
      });
    };
  }, []);

  // Project section animations
  useEffect(() => {
    if (!projectsSectionRef.current) return;
    
    // Store ScrollTrigger instances for cleanup
    const triggers = [];
    
    // Check if device is mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const viewportWidth = window.innerWidth;
    const isSmallMobile = viewportWidth <= 480;
    const isTablet = viewportWidth <= 992 && viewportWidth > 576;
    const isLandscape = window.innerHeight < window.innerWidth;
    
    // Get elements for horizontal scrolling
    const projectsGrid = projectsSectionRef.current.querySelector('.projects-grid');
    const projectsGridContainer = projectsSectionRef.current.querySelector('.projects-grid-container');
    
    if (projectsGrid && projectsGridContainer) {
      // Modify the calculateDistance function to ensure all cards are visible
      const calculateDistance = () => {
        // Get the full width of the grid and the container width
        const gridWidth = projectsGrid.offsetWidth;
        const containerWidth = projectsGridContainer.offsetWidth;
        
        // Ensure we can see the full first card by adding buffer space at the beginning
        const startBuffer = isSmallMobile ? 20 : 40;
        
        // Add extra distance to ensure we reach the end of the last card
        const endBuffer = containerWidth * 0.1; // 10% of container width as buffer
        
        // Calculate the total scroll distance needed, ensuring we show all cards
        return -(gridWidth - containerWidth + startBuffer + endBuffer);
      };
      
      // Modify the ScrollTrigger configuration
      const horizontalScroll = gsap.to(projectsGrid, {
        x: calculateDistance,
        ease: isSmallMobile ? "power1.out" : "none",
        scrollTrigger: {
          trigger: projectsSectionRef.current,
          start: isMobile ? (isLandscape ? "bottom 90%" : "bottom 85%") : "bottom 100%",
          end: () => {
            // Ensure elements exist before accessing their properties
            if (!projectsGrid || !projectsGridContainer || !projectsGrid.firstElementChild) {
              return "+=100%"; // Fallback value if elements don't exist
            }

            // Calculate the end point to ensure the card is centered
            const containerWidth = projectsGridContainer.offsetWidth || window.innerWidth;
            const cardWidth = projectsGrid.firstElementChild.offsetWidth || containerWidth * 0.8;
            
            // Calculate the position that centers the card
            const centerPosition = Math.max((containerWidth - cardWidth) / 2, 100);
            
            // Return the distance needed to center the card
            return `+=${centerPosition}`;
          },
          pin: true,
          pinSpacing: true,
          scrub: isMobile ? (isSmallMobile ? 0.3 : 0.5) : 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          fastScrollEnd: true,
          preventOverlaps: true,
          onEnter: () => {
            if (!projectsGrid) return;
            
            // Position the grid at the beginning to ensure first card is visible
            gsap.set(projectsGrid, { x: 0 });
            gsap.to(projectsGrid, {
              opacity: 1,
              duration: 0.5,
              ease: "power2.out"
            });
          },
          onRefresh: self => {
            if (isMobile && projectsGrid) {
              self.scroll(self.start);
              // Reset to beginning on refresh
              gsap.set(projectsGrid, { x: 0 });
            }
          },
          onUpdate: self => {
            if (!projectsGridContainer) return;
            
            // Update progress bar
            const progressBar = projectsGridContainer.querySelector('.scroll-progress-bar');
            if (progressBar) {
              gsap.to(progressBar, {
                width: `${self.progress * 100}%`,
                duration: 0.5,
                ease: "power2.out"
              });
            }
            
            // Handle scroll instruction visibility
            const instruction = projectsGridContainer.querySelector('.scroll-instruction');
            if (instruction && self.progress > 0.05) {
              gsap.to(instruction, {
                opacity: 0,
                duration: 0.5,
                onComplete: () => {
                  instruction.style.display = 'none';
                }
              });
            }
          }
        }
      });
      
      // Store the ScrollTrigger
      if (horizontalScroll.scrollTrigger) {
        triggers.push(horizontalScroll.scrollTrigger);
      }
      
      // Add progress indicator
      const createProgressIndicator = () => {
        // Check if indicator already exists
        if (projectsGridContainer.querySelector('.scroll-progress-indicator')) {
          return; // Don't create duplicate if it already exists
        }
        
        // Create a progress bar container
        const indicator = document.createElement('div');
        indicator.className = 'scroll-progress-indicator';
        
        // Create the progress bar
        const bar = document.createElement('div');
        bar.className = 'scroll-progress-bar';
        
        // Add to DOM
        indicator.appendChild(bar);
        projectsGridContainer.appendChild(indicator);
        
        // The progress bar will be updated by the onUpdate callback above
      };
      
      // Add progress indicator
      createProgressIndicator();

      // Add a scroll instruction element that fades out when scrolling starts
      const addScrollInstruction = () => {
        // Check if instruction already exists
        if (projectsGridContainer.querySelector('.scroll-instruction')) {
          return; // Don't create duplicate if it already exists
        }
        
        const instruction = document.createElement('div');
        instruction.className = 'scroll-instruction';
        
        // Customized instructions based on device
        const instructionText = isLandscape ? 
          'Scroll to view' : 
          (isMobile ? 'Scroll to view projects' : 'Scroll to explore projects');
        
        instruction.innerHTML = `<span>${instructionText}</span>`;
        projectsGridContainer.appendChild(instruction);
      };
      
      // Add scroll instruction
      addScrollInstruction();

      // Once horizontal scrolling is set up, add parallax effects for cards
      if (horizontalScroll && horizontalScroll.scrollTrigger) {
        // Get all cards
        const cards = projectsGrid.querySelectorAll('.project-card');
        
        // Add parallax effects to each card (skip on small mobile for performance)
        if (!isSmallMobile) {
          // Use a reduced set of cards on mobile for better performance
          const cardSubset = isMobile ? 
            [...cards].filter((_, index) => index % 2 === 0 || index === 0 || index === cards.length - 1) : 
            cards;
          
          cardSubset.forEach((card, index) => {
            // Different parallax speed for each card (alternating)
            const direction = index % 2 === 0 ? 1 : -1;
            // Use a more subtle parallax on mobile
            const parallaxSpeed = isMobile ? 0.05 * direction : 0.1 * direction;
            
            // Parallax for this card's image - conditional based on device
            const cardImage = card.querySelector('.project-card-image');
            if (cardImage && (!isMobile || index < 3)) { // Limit animations on mobile to first few cards
              const imageParallax = gsap.to(cardImage, {
                x: `${parallaxSpeed * 100}px`,
                ease: "none",
                scrollTrigger: {
                  trigger: projectsSectionRef.current,
                  start: isMobile ? (isLandscape ? "bottom 90%" : "bottom 85%") : "bottom 100%",
                  end: () => {
                    if (isSmallMobile) return `+=${projectsGrid.offsetWidth * 0.5}`;
                    if (isMobile) return `+=${projectsGrid.offsetWidth * 0.6}`;
                    if (isTablet) return `+=${projectsGrid.offsetWidth * 0.7}`;
                    return `+=${projectsGrid.offsetWidth * 0.8}`;
                  },
                  scrub: isMobile ? 0.7 : 1.5,
                  containerAnimation: horizontalScroll
                }
              });
              
              if (imageParallax.scrollTrigger) {
                triggers.push(imageParallax.scrollTrigger);
              }
            }
            
            // Slight rotation for card inner (disable on mobile for performance)
            if (!isMobile) {
              const cardInner = card.querySelector('.project-card-inner');
              if (cardInner) {
                const innerRotation = gsap.to(cardInner, {
                  rotateY: `${direction * 5}deg`,
                  ease: "none",
                  scrollTrigger: {
                    trigger: projectsSectionRef.current,
                    start: "bottom 100%",
                    end: () => `+=${projectsGrid.offsetWidth * 0.8}`,
                    scrub: 2,
                    containerAnimation: horizontalScroll
                  }
                });
                
                if (innerRotation.scrollTrigger) {
                  triggers.push(innerRotation.scrollTrigger);
                }
              }
            }
          });
        }
      }

      // Add specific handling for mobile touch interactions
      if (isMobile) {
        // Detect swipe direction for better mobile UX
        let touchStartX = 0;
        let touchStartY = 0;
        let isSwiping = false;
        
        const handleTouchStart = (e) => {
          touchStartX = e.touches[0].clientX;
          touchStartY = e.touches[0].clientY;
          isSwiping = false;
        };
        
        const handleTouchMove = (e) => {
          if (!isSwiping) {
            const touchX = e.touches[0].clientX;
            const touchY = e.touches[0].clientY;
            const diffX = touchStartX - touchX;
            const diffY = touchStartY - touchY;
            
            // If horizontal swipe is stronger than vertical
            if (Math.abs(diffX) > Math.abs(diffY)) {
              isSwiping = true;
              // Assist horizontal swipe by adding a small animation boost
              const progress = horizontalScroll.scrollTrigger.progress;
              const direction = diffX > 0 ? 1 : -1; // 1 for right-to-left, -1 for left-to-right
              
              // Small boost to the scroll based on swipe direction
              if ((direction > 0 && progress < 0.95) || (direction < 0 && progress > 0.05)) {
                const newProgress = progress + (direction * 0.02); // Small increment
                horizontalScroll.scrollTrigger.scroll(horizontalScroll.scrollTrigger.start + 
                  (horizontalScroll.scrollTrigger.end - horizontalScroll.scrollTrigger.start) * newProgress);
              }
            }
          }
        };
        
        projectsGridContainer.addEventListener('touchstart', handleTouchStart, { passive: true });
        projectsGridContainer.addEventListener('touchmove', handleTouchMove, { passive: true });
        
        // Add to cleanup
        const cleanup = () => {
          projectsGridContainer.removeEventListener('touchstart', handleTouchStart);
          projectsGridContainer.removeEventListener('touchmove', handleTouchMove);
        };
        
        // Store cleanup function
        triggers.push({ kill: cleanup });
      }
    }
    
    // Handle window resize
    const handleResize = () => {
      // Force refresh all ScrollTriggers
      ScrollTrigger.refresh(true);
    };
    
    // Optimize resize handler with debounce for better performance
    let resizeTimeout;
    const debouncedResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(handleResize, 200);
    };
    
    // Add resize listener
    window.addEventListener('resize', debouncedResize);
    
    // Also listen for orientation changes on mobile
    if (isMobile) {
      window.addEventListener('orientationchange', () => {
        // Small delay for orientation to complete
        setTimeout(handleResize, 300);
      });
    }
    
    return () => {
      // Remove resize listeners
      window.removeEventListener('resize', debouncedResize);
      if (isMobile) {
        window.removeEventListener('orientationchange', handleResize);
      }
      
      // Clear any pending timeouts
      clearTimeout(resizeTimeout);
      
      // Remove any created indicators to prevent duplicates on remount
      const progressIndicator = projectsGridContainer.querySelector('.scroll-progress-indicator');
      if (progressIndicator) {
        progressIndicator.remove();
      }
      
      const scrollInstruction = projectsGridContainer.querySelector('.scroll-instruction');
      if (scrollInstruction) {
        scrollInstruction.remove();
      }
      
      // Kill ScrollTrigger instances
      triggers.forEach(trigger => {
        if (trigger && typeof trigger.kill === 'function') {
          trigger.kill();
        }
      });
    };
  }, []);

  // Update horizontal scroll when filter changes
  useEffect(() => {
    if (!projectsSectionRef.current || !filteredProjects.length) return;
    
    // Refresh ScrollTrigger to ensure proper functioning with new filtered projects
    ScrollTrigger.refresh();
  }, [filteredProjects]);

  // Ensure ScrollTrigger is properly initialized and refreshed
  useEffect(() => {
    // Force a recalculation of ScrollTrigger positions and dimensions
    const initTimeout = setTimeout(() => {
      if (ScrollTrigger) {
        ScrollTrigger.refresh(true);
      }
    }, 500);
    
    // Handle window resize for better responsiveness
    const handleResize = () => {
      // Force refresh ScrollTrigger when window size changes
      if (ScrollTrigger) {
        ScrollTrigger.refresh(true);
      }
    };
    
    // Add resize event listener
    window.addEventListener("resize", handleResize);
    
    // Clean up
    return () => {
      clearTimeout(initTimeout);
      window.removeEventListener("resize", handleResize);
      
      // Make sure to kill all ScrollTrigger instances
      if (ScrollTrigger) {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      }
    };
  }, []);

  // Handle mouse movement for 3D effect
  const handleMouseMove = (e, index) => {
    const card = projectCardsRef.current[index];
    if (!card) return;
    
    const cardRect = card.getBoundingClientRect();
    const cardCenterX = cardRect.left + cardRect.width / 2;
    const cardCenterY = cardRect.top + cardRect.height / 2;
    
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    const rotateY = ((mouseX - cardCenterX) / (cardRect.width / 2)) * 5;
    const rotateX = ((cardCenterY - mouseY) / (cardRect.height / 2)) * 5;
    
    gsap.to(card.querySelector('.project-card-inner'), {
      rotateY: rotateY,
      rotateX: rotateX,
      duration: 0.5,
      ease: "power2.out"
    });

    gsap.to(card.querySelector('.project-card-image'), {
      x: rotateY * 1.5,
      y: rotateX * 1.5,
      duration: 0.5,
      ease: "power2.out"
    });
    
    gsap.to(card.querySelector('.project-card-info'), {
      x: rotateY * -0.5,
      y: rotateX * -0.5,
      z: 30,
      duration: 0.5,
      ease: "power2.out"
    });
  };

  // Reset transforms on mouse leave
  const handleMouseLeave = (index) => {
    const card = projectCardsRef.current[index];
    if (!card) return;
    
    gsap.to(card.querySelector('.project-card-inner'), {
      rotateY: 0,
      rotateX: 0,
      duration: 0.7,
      ease: "elastic.out(1, 0.5)"
    });
    
    gsap.to(card.querySelector('.project-card-image'), {
      x: 0,
      y: 0,
      duration: 0.7,
      ease: "elastic.out(1, 0.5)"
    });
    
    gsap.to(card.querySelector('.project-card-info'), {
      x: 0,
      y: 0,
      z: 0,
      duration: 0.7,
      ease: "elastic.out(1, 0.5)"
    });
  };

  return (
    <div className="sections-wrapper">
      {/* Experience Section */}
      <section id="Experience-section" ref={experienceSectionRef}>
        <div className="section-header">
          <h2 className="experience-title">Education & Experience</h2>
          <div className="experience-line"></div>
                    </div>
        
        <div className="timeline-container">
          <div className="timeline-track"></div>
          
          {experienceData.map((exp, index) => (
            <div key={exp.id} className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-date">{exp.period}</div>
              <div className="timeline-content">
                <h3 className="timeline-position">{exp.position}</h3>
                <p className="timeline-company">{exp.company}</p>
                <p className="timeline-description">{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* Projects Section */}
      <section id="Projects-section" ref={projectsSectionRef}>
        <div className="projects-header" ref={headingRef}>
          <h2 className="projects-title">My Projects</h2>
          <div className="projects-line"></div>
        </div>
        
        <div className="project-filters" ref={filtersRef}>
          <button 
            className={`project-filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            All Projects
          </button>
          <button 
            className={`project-filter-btn ${activeFilter === 'web' ? 'active' : ''}`}
            onClick={() => setActiveFilter('web')}
          >
            Web Development
          </button>
          <button 
            className={`project-filter-btn ${activeFilter === 'mobile' ? 'active' : ''}`}
            onClick={() => setActiveFilter('mobile')}
          >
            Mobile Apps
          </button>
          <button 
            className={`project-filter-btn ${activeFilter === 'ai' ? 'active' : ''}`}
            onClick={() => setActiveFilter('ai')}
          >
            AI Projects
          </button>
        </div>

        <div className="projects-grid-container" ref={projectsGridContainerRef}>
          <div className="projects-grid" ref={projectsGridRef}>
            {filteredProjects.map((project, index) => (
              <div 
                key={project.id}
                className={`project-card ${project.featured ? 'featured' : ''}`}
                ref={el => projectCardsRef.current[index] = el}
                onMouseMove={(e) => handleMouseMove(e, index)}
                onMouseLeave={() => handleMouseLeave(index)}
              >
                <div className="project-card-inner">
                  <div className="project-card-background">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="project-card-image"
                    />
                    <div className="project-card-overlay"></div>
                            </div>

                  <div className="project-card-info">
                    <span className="project-card-category">{project.category}</span>
                    <h3 className="project-card-title">{project.title}</h3>
                    <p className="project-card-description">{project.description}</p>
                    
                    <div className="project-card-tech">
                      {project.technologies.map((tech, i) => (
                        <div 
                          key={i} 
                          className="project-tech-icon"
                          title={tech.name}
                          data-tech={tech.name}
                        >
                          {tech.icon}
                        </div>
                      ))}
                    </div>
                    
                    <div className="project-card-links">
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="project-card-link github"
                        aria-label="GitHub repository"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (!project.github) {
                            e.preventDefault();
                            alert('GitHub repository link is not available.');
                          }
                        }}
                      >
                        <FaGithub />
                      </a>
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="project-card-link demo"
                        aria-label="Live demo"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (!project.link) {
                            e.preventDefault();
                            alert('Live demo link is not available.');
                          }
                        }}
                      >
                        <FaExternalLinkAlt />
                      </a>
                    </div>
                  </div>
                  
                  {project.featured && (
                    <div className="project-card-featured">Featured</div>
                  )}
                </div>
            </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;
