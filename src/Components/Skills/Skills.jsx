import React, { useEffect, useRef, useState } from 'react';
import './Skills.css';
// Import icons for the skills section
import { FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaFigma, FaGitAlt, FaAws, FaDocker } from 'react-icons/fa';
import { SiJavascript, SiReact, SiNodedotjs, SiNextdotjs, SiTypescript, SiExpress, SiMongodb, SiPostgresql, SiEthereum, SiSolidity, SiThreedotjs, SiWebgl, SiAdobephotoshop, SiAdobeillustrator, SiWebpack, SiGithub, SiGithubactions, SiVercel, SiFirebase } from 'react-icons/si';
import { TbBrandThreejs } from 'react-icons/tb';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  // Refs for component elements
  const skillsRef = useRef(null);
  const skillsTimelineRef = useRef(null);
  
  // State for active category
  const [activeCategory, setActiveCategory] = useState('Frontend');

  // Define skills data with categories, proficiency levels, and colors
  const skillsData = [
    {
      category: 'Frontend',
      skills: [
        { name: 'JavaScript', icon: SiJavascript, proficiency: 92, color: '#F7DF1E', rgb: '247, 223, 30' },
        { name: 'React', icon: SiReact, proficiency: 90, color: '#61DAFB', rgb: '97, 218, 251' },
        { name: 'TypeScript', icon: SiTypescript, proficiency: 85, color: '#3178C6', rgb: '49, 120, 198' },
        { name: 'HTML5', icon: FaHtml5, proficiency: 95, color: '#E34F26', rgb: '227, 79, 38' },
        { name: 'CSS3', icon: FaCss3Alt, proficiency: 90, color: '#1572B6', rgb: '21, 114, 182' },
        { name: 'Next.js', icon: SiNextdotjs, proficiency: 82, color: '#000000', rgb: '0, 0, 0' },
        { name: 'Three.js', icon: TbBrandThreejs, proficiency: 78, color: '#000000', rgb: '0, 0, 0' }
      ]
    },
    {
      category: 'Backend',
      skills: [
        { name: 'Node.js', icon: SiNodedotjs, proficiency: 85, color: '#339933', rgb: '51, 153, 51' },
        { name: 'Express', icon: SiExpress, proficiency: 87, color: '#000000', rgb: '0, 0, 0' },
        { name: 'MongoDB', icon: SiMongodb, proficiency: 80, color: '#47A248', rgb: '71, 162, 72' },
        { name: 'PostgreSQL', icon: SiPostgresql, proficiency: 75, color: '#336791', rgb: '51, 103, 145' },
        { name: 'Firebase', icon: SiFirebase, proficiency: 83, color: '#FFCA28', rgb: '255, 202, 40' }
      ]
    },
    {
      category: 'Web3',
      skills: [
        { name: 'Ethereum', icon: SiEthereum, proficiency: 72, color: '#627EEA', rgb: '98, 126, 234' },
        { name: 'Solidity', icon: SiSolidity, proficiency: 68, color: '#363636', rgb: '54, 54, 54' }
      ]
    },
    {
      category: 'Creative',
      skills: [
        { name: 'WebGL', icon: SiWebgl, proficiency: 70, color: '#990000', rgb: '153, 0, 0' },
        { name: 'Three.js', icon: TbBrandThreejs, proficiency: 78, color: '#000000', rgb: '0, 0, 0' },
        { name: 'Photoshop', icon: SiAdobephotoshop, proficiency: 75, color: '#31A8FF', rgb: '49, 168, 255' },
        { name: 'Illustrator', icon: SiAdobeillustrator, proficiency: 65, color: '#FF9A00', rgb: '255, 154, 0' },
        { name: 'Figma', icon: FaFigma, proficiency: 85, color: '#F24E1E', rgb: '242, 78, 30' }
      ]
    },
    {
      category: 'Tools',
      skills: [
        { name: 'Git', icon: FaGitAlt, proficiency: 88, color: '#F05032', rgb: '240, 80, 50' },
        { name: 'GitHub', icon: SiGithub, proficiency: 90, color: '#181717', rgb: '24, 23, 23' },
        { name: 'Docker', icon: FaDocker, proficiency: 72, color: '#2496ED', rgb: '36, 150, 237' },
        { name: 'AWS', icon: FaAws, proficiency: 65, color: '#FF9900', rgb: '255, 153, 0' },
        { name: 'Webpack', icon: SiWebpack, proficiency: 75, color: '#8DD6F9', rgb: '141, 214, 249' },
        { name: 'CI/CD', icon: SiGithubactions, proficiency: 80, color: '#2088FF', rgb: '32, 136, 255' },
        { name: 'Vercel', icon: SiVercel, proficiency: 85, color: '#000000', rgb: '0, 0, 0' }
      ]
    }
  ];

  // Initialize skill cards hover effect and animations
  useEffect(() => {
    const skillContainer = skillsRef.current;
    if (!skillContainer) return;

    // Initialize the animation timeline for skills
    const skillsTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: skillContainer,
        start: 'top 70%',
        toggleActions: 'play reverse play reverse'
      }
    });
    
    skillsTimelineRef.current = skillsTimeline;

    // Save reference to the timeline
    const categoryButtons = skillContainer.querySelectorAll('.skill-category-btn');
    skillsTimeline.fromTo(categoryButtons, 
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: 'power2.out' }
    );

    // Add a small delay before animating the cards
    skillsTimeline.add(() => {
      // Set up card animations after buttons animate
      const cards = document.querySelectorAll('.skill-card');
      cards.forEach((card, index) => {
        gsap.set(card, { 
          '--delay': `${index * 0.08}s`
        });
      });
    });

    // Apply mouse move effect to all skill cards
    const applySkillCardEffects = () => {
      const cards = skillContainer.querySelectorAll('.skill-card');
      
      cards.forEach(card => {
        const shine = card.querySelector('.skill-card-shine');
        
        // Progress fill animation
        const progressFill = card.querySelector('.skill-progress-fill');
        const proficiency = parseInt(progressFill.getAttribute('data-proficiency'), 10);
        
        // Set initial state to width 0
        gsap.set(progressFill, { width: 0 });
        
        gsap.to(progressFill, {
          width: `${proficiency}%`,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play reverse play reverse',
            scrub: 0.5 // Add smooth scrubbing effect tied to scroll position
          }
        });
        
        // Mouse movement effect
        const handleMouseMove = (e) => {
          const rect = card.getBoundingClientRect();
          const xPos = (e.clientX - rect.left) / rect.width - 0.5;
          const yPos = (e.clientY - rect.top) / rect.height - 0.5;
          
          // Move the card with 3D effect
          gsap.to(card, {
            rotateY: xPos * 15,
            rotateX: -yPos * 15,
            transformPerspective: 900,
            ease: 'power2.out',
            duration: 0.3
          });
          
          // Move the elements inside the card for parallax effect
          const icon = card.querySelector('.skill-icon');
          const name = card.querySelector('.skill-name');
          const progress = card.querySelector('.skill-progress');
          
          gsap.to(icon, {
            x: xPos * 15,
            y: yPos * 15,
            ease: 'power2.out',
            duration: 0.3
          });
          
          gsap.to(name, {
            x: xPos * 10,
            y: yPos * 10,
            ease: 'power2.out',
            duration: 0.3
          });
          
          gsap.to(progress, {
            x: xPos * 5,
            y: yPos * 5,
            ease: 'power2.out',
            duration: 0.3
          });
          
          // Move the shine effect
          if (shine) {
            gsap.to(shine, {
              opacity: 0,
              x: e.clientX - rect.left,
              y: e.clientY - rect.top,
              ease: 'power2.out',
              duration: 0.3
            });
          }
        };
        
        const handleMouseLeave = () => {
          // Reset the card position
          gsap.to(card, {
            rotateY: 0,
            rotateX: 0,
            ease: 'power2.out',
            duration: 0.5
          });
          
          // Reset inner elements
          const innerElements = card.querySelectorAll('.skill-icon, .skill-name, .skill-progress');
          gsap.to(innerElements, {
            x: 0,
            y: 0,
            ease: 'power2.out',
            duration: 0.5
          });
          
          // Hide shine
          if (shine) {
            gsap.to(shine, {
              opacity: 0,
              duration: 0.5
            });
          }
        };
        
        card.addEventListener('mousemove', handleMouseMove);
        card.addEventListener('mouseleave', handleMouseLeave);
        
        // Clean up on component unmount
        return () => {
          card.removeEventListener('mousemove', handleMouseMove);
          card.removeEventListener('mouseleave', handleMouseLeave);
        };
      });
    };

    // Initial application of effects
    applySkillCardEffects();

    // Animation for scan line effect
    const scanLine = skillContainer.querySelector('.scan-line');
    if (scanLine) {
      gsap.to(scanLine, {
        top: '100%',
        duration: 3,
        ease: 'power1.inOut',
        repeat: -1,
        delay: 2
      });
    }

    // Floating orbs animation
    const orbs = skillContainer.querySelectorAll('.skill-orb');
    orbs.forEach((orb, index) => {
      orb.style.setProperty('--orb-delay', `${index * 2}s`);
    });

    // For component cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      if (skillsTimelineRef.current) skillsTimelineRef.current.kill();
    };
  }, [activeCategory]);

  // Handle category change
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  // Get the current skills based on active category
  const getCurrentSkills = () => {
    const categoryData = skillsData.find(item => item.category === activeCategory);
    return categoryData ? categoryData.skills : [];
  };
 
  return (
    <section id="Skills-section">
      <div className="skills-container">
        <div className="skills-heading">
          <h2 className="skills-title">Skills & Expertise</h2>
          <div className="skills-line"></div>
        </div>

        {/* 3D Skills Section */}
        <div className="skills-3d" ref={skillsRef}>
          <div className="skills-container-3d">
            {/* Skill Categories Navigation */}
            <div className="skills-categories">
              {skillsData.map(category => (
                <button 
                  key={category.category}
                  className={`skill-category-btn ${activeCategory === category.category ? 'active' : ''}`}
                  onClick={() => handleCategoryChange(category.category)}
                >
                  {category.category}
                </button>
              ))}
            </div>

            {/* Skills Grid */}
            <div className="skills-grid">
              {getCurrentSkills().map((skill, index) => (
                <div 
                  className="skill-card" 
                  key={skill.name}
                  style={{ 
                    '--skill-color': skill.color,
                    '--skill-color-rgb': skill.rgb,
                    '--delay': `${index * 0.05}s`
                  }}
                >
                  <div className="skill-card-shine"></div>
                  <div className="skill-icon">
                    <skill.icon size={32} color={skill.color} />
          </div>
                  <h3 className="skill-name">{skill.name}</h3>
                  <div className="skill-progress">
                    <div 
                      className="skill-progress-fill" 
                      style={{ background: skill.color }}
                      data-proficiency={skill.proficiency}
                    ></div>
        </div>
                  <div className="skill-level">{skill.proficiency}%</div>
              </div>
              ))}
            </div>

            {/* Background Elements */}
            <div className="skills-background">
              <div className="skills-grid-lines"></div>
              <div className="skill-orb"></div>
              <div className="skill-orb"></div>
              <div className="skill-orb"></div>
              <div className="scan-line"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
