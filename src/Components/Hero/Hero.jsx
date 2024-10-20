import React, { useEffect } from 'react'
import './Hero.css'
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
export default function Hero() {
  gsap.registerPlugin(ScrollTrigger);
  useEffect(()=>{
    gsap.to('#Hero-ui-section',{scrollTrigger:{
    
      trigger:'#Hero-section',
      start:'top top',
      end:'+=800',
      scrub:1,
      ease:'easeInOut'
    },
    opacity:0,duration:1,
    })
    gsap.to('#Hero-name-visible',{scrollTrigger:{
    
      trigger:'#Hero-section',
      start:'top top',
      end:'+=800',
      scrub:1,    ease:'easeInOut'
    },xPercent:-100})
    gsap.to('#Hero-name-developer',{scrollTrigger:{
    
      trigger:'#Hero-section',
      start:'top top',
      end:'+=800',
      scrub:1,     ease:'easeInOut'
    },xPercent:100})
    gsap.to('#Hero-name-web',{scrollTrigger:{
    
      trigger:'#Hero-section',
      start:'top top',
      end:'+=800',
      scrub:1,     ease:'easeInOut'
    },yPercent:100})
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  },[])

  function HeroAnimate(){
    
  }
  return (
    <div id='Hero-section'>
      <div id='Hero-ui-section'>
        <div id="Hero-name" className='cursorzoom' cursorscale={7}>
          <h3 id='Hero-name-visible'>
          Abhinav Kumar
          </h3>
          <h1 id='Hero-name-developer'>
            Developer
          </h1>
          <div id='Hero-name-web'>

          <h3>
            web 2 | web 3 
          </h3>
          <div id='Hero-section-connect-info'>
          <h4 id='Hero-section-email'>Email: aviaryapanwar@gmail.com</h4>
          <h4 id='Hero-section-phone'>Phone: +91 7505206429</h4>
          </div>
          </div>
        </div>
      </div>

  
    </div>
  )
}
