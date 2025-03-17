import React, { useEffect, useRef, useState } from 'react';
import './AboutMe.css';
// Import icons for the skills section
import { AiOutlineMail, AiOutlinePhone, AiOutlineEnvironment, AiOutlineGithub } from 'react-icons/ai';
import { FaLinkedin, FaTwitter, FaInstagram, FaCode } from 'react-icons/fa';
import ProfilePic from '/ProfilePic.jpg';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AboutMe = () => {
  // Ref for components
  const titleRef = useRef(null);
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const detailsRef = useRef(null);
  const imgRef = useRef(null);
  const imgContainerRef = useRef(null);
  const particlesRef = useRef([]);
  
  // Interactive scroll effect for profile image
  useEffect(() => {
    const scrollWrapper = sectionRef.current;
    const imageContainer = imgContainerRef.current;
    
    if (!scrollWrapper || !imageContainer) return;

    const handleScroll = () => {
      const rect = scrollWrapper.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how far the element is in the viewport (0 to 1)
      let progress = 0;
      
      // Element is fully in the viewport
      if (rect.top <= windowHeight * 0.7 && rect.bottom >= windowHeight * 0.3) {
        // Calculate normalized scroll progress (0 to 1)
        progress = (windowHeight * 0.7 - rect.top) / (windowHeight * 0.4);
        progress = Math.max(0, Math.min(1, progress));
      } else if (rect.top < windowHeight * 0.3) {
        progress = 1;
      }
      
      scrollWrapper.style.setProperty('--scroll-progress', progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once to set initial state
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Mouse movement effect for the profile image
  useEffect(() => {
    const imageContainer = imgContainerRef.current;
    
    if (!imageContainer) return;
    
    const handleMouseMove = (e) => {
      const rect = imageContainer.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      
      gsap.to(imageContainer, {
        rotateY: x * 10,
        rotateX: -y * 10,
        transformPerspective: 1000,
        ease: 'power2.out',
        duration: 0.5
      });
    };
    
    const handleMouseLeave = () => {
      gsap.to(imageContainer, {
        rotateY: 5,
        rotateX: -3,
        transformPerspective: 1000,
        ease: 'power2.out',
        duration: 0.7
      });
    };
    
    imageContainer.addEventListener('mousemove', handleMouseMove);
    imageContainer.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      imageContainer.removeEventListener('mousemove', handleMouseMove);
      imageContainer.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Particle animation for click effect
  useEffect(() => {
    const imageContainer = imgContainerRef.current;
    const particles = particlesRef.current;
    
    if (!imageContainer || particles.length === 0) return;
    
    const handleClick = (e) => {
      const rect = imageContainer.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      particles.forEach((particle, index) => {
        if (!particle) return;
        
        // Position particle at click position
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        
        // Calculate random direction
        const angle = Math.random() * Math.PI * 2;
        const distance = 30 + Math.random() * 70;
        const xEnd = x + Math.cos(angle) * distance;
        const yEnd = y + Math.sin(angle) * distance;
        
        // Animate particle
        gsap.killTweensOf(particle);
        gsap.set(particle, { opacity: 0.8, scale: 0.8 + Math.random() * 0.5 });
        gsap.to(particle, {
          left: xEnd,
          top: yEnd,
          opacity: 0,
          scale: 0.3,
          duration: 0.6 + Math.random() * 0.8,
          ease: 'power2.out',
          delay: index * 0.02
        });
      });
      
      // Add click pulse effect
      gsap.to(imageContainer, {
        scale: 1.03,
        duration: 0.2,
        ease: 'power1.out',
        onComplete: () => {
          gsap.to(imageContainer, {
            scale: 1,
            duration: 0.5,
            ease: 'elastic.out(1, 0.5)'
          });
        }
      });
    };
    
    imageContainer.addEventListener('click', handleClick);
    
    return () => {
      imageContainer.removeEventListener('click', handleClick);
    };
  }, []);

  // GSAP animations for the bio content when scrolling into view
  useEffect(() => {
    const bioElement = textRef.current;
    const headingElement = titleRef.current;
    const contentElement = detailsRef.current;
    
    if (!bioElement || !headingElement || !contentElement) return;
    
    gsap.fromTo(headingElement.children, 
      { y: 50, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        stagger: 0.1, 
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: headingElement,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );
    
    gsap.fromTo(bioElement.children, 
      { y: 30, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        stagger: 0.1, 
        duration: 0.7,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: bioElement,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );
    
    const childElements = Array.from(contentElement.querySelectorAll('.details-item'));
    gsap.fromTo(childElements, 
      { y: 40, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        stagger: 0.1, 
        duration: 0.6,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: contentElement,
          start: 'top 75%',
          toggleActions: 'play none none none'
        }
      }
    );
  }, []);

  return (
    <section id="AboutMe-section">
      <div className="aboutme-container">
        <div className="aboutme-heading" ref={titleRef}>
          <h2 className="aboutme-title">About Me</h2>
          <div className="aboutme-line"></div>
        </div>
        
        <div className="aboutme-content">
          <div className="profile-scroll-wrapper" ref={sectionRef}>
            <div className="aboutme-image-container" ref={imgContainerRef}>
              <img src={ProfilePic} alt="Profile" className="aboutme-image" ref={imgRef} />
              <div className="aboutme-image-gradient"></div>
              <div className="image-frame"></div>
              
              {/* Add particles for click animation */}
              {[...Array(15)].map((_, index) => (
                <div 
                  key={index}
                  className="particle"
                  ref={el => {
                    if (el) particlesRef.current[index] = el;
                  }}
                />
              ))}
              
              {/* Image hover information */}
              <div className="image-hover-info">
                <h3 className="info-title">Abhinav Kumar</h3>
                <p className="info-subtitle">Computer Science Student</p>
                <a 
                  href="https://drive.google.com/file/d/1HnMsmQobru5CVpPqG7sYD9yBiShWlzHF/view" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="info-button"
                >
                  My Resume
                </a>
              </div>
              
              {/* Social links */}
              <div className="aboutme-social">
                <a href="https://github.com/AbhinavKumarJss" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <AiOutlineGithub />
                </a>
                <a href="https://www.linkedin.com/in/abhinav-kumar-071284256/" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <FaLinkedin />
                </a>
                <a href="https://twitter.com/avi_arya_panwar" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <FaTwitter />
                </a>
                <a href="https://instagram.com/aviaryapanwar" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <FaInstagram />
                </a>
              </div>
              
              {/* Visual effects overlays */}
              <div className="glitch-overlay"></div>
              <div className="profile-glow"></div>
              <div className="profile-reflection"></div>
            </div>
          </div>
          
          <div className="aboutme-text" ref={textRef}>
            <div className="aboutme-bio">
              <p>Hello! I'm <span className="highlight">Abhinav Kumar</span>, a passionate Computer Science student with a focus on backend and Ai development.</p>
              <p>Currently pursuing my Bachelor's degree in Computer Science, I've been developing my skills in JavaScript, Go , SpringBoot, React, and modern web technologies through coursework, personal projects. I'm particularly interested in back-end development and Ai development.</p>
              <p>I believe in continuous learning and am excited to apply my technical knowledge and creative problem-solving skills to real-world challenges as I begin my journey in the tech industry.</p>
            </div>
            
            <div className="aboutme-details" ref={detailsRef}>
              <div className="details-item">
                <div className="details-icon">
                  <AiOutlineEnvironment />
                </div>
                <div className="details-content">
                  <h3>Location</h3>
                  <p>Noida, Uttar Pradesh, India</p>
                </div>
              </div>
              
              <div className="details-item">
                <div className="details-icon">
                  <AiOutlineMail />
                </div>
                <div className="details-content">
                  <h3>Email</h3>
                  <p>aviaryapanwar@gmail.com</p>
                </div>
              </div>
              
              <div className="details-item">
                <div className="details-icon">
                  <AiOutlinePhone />
                </div>
                <div className="details-content">
                  <h3>Phone</h3>
                  <p>+91 7505206429</p>
                </div>
              </div>
              
              <div className="details-item">
                <div className="details-icon">
                  <FaCode />
                </div>
                <div className="details-content">
                  <h3>Education</h3>
                  <p>Computer Science - 3rd Year</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
