import React, { Suspense, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import './AboutMe.css'
import { gsap } from 'gsap'
import { OrbitControls, useGLTF, Preload, Loader } from '@react-three/drei';

export default function OverlayAboutMe() {
  const keyb = useRef()
  const keyboard = useGLTF('./Keyboard.glb')
  
  function onCreated() {
    // Make sure keyboard model is properly lit
    keyb.current.traverse((obj) => {
      if (obj.isMesh) {
        obj.castShadow = true;
        obj.receiveShadow = true;
      }
    });
    
    // Smoother animations for the keyboard model
    gsap.to(keyb.current.rotation, {
      scrollTrigger: { 
        trigger: '#AboutMe-section', 
        start: 'top bottom', 
        end: 'bottom top', 
        scrub: 1 
      },
      y: -Math.PI/7,
      z: Math.PI/7,
      x: Math.PI/2,
      duration: 1, 
      ease: 'power2.inOut'
    });
    
    gsap.to(keyb.current.position, {
      scrollTrigger: { 
        trigger: '#AboutMe-section', 
        start: 'top bottom', 
        end: 'bottom top', 
        scrub: 1 
      },
      y: '1.2',
      x: '0.5',
      duration: 1, 
      ease: 'power2.inOut'
    });
    
    // Add subtle floating animation
    gsap.to(keyb.current.position, {
      y: '+=0.2',
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  }
  
  return (
    <div id='overlay-aboutme'>
      <div className="canvas-container">
        <Canvas shadows dpr={[1, 2]} onCreated={onCreated}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[-1, 1, 1]} intensity={0.4} castShadow />
          <directionalLight position={[1, 1, -1]} intensity={0.2} />
          
          <Suspense fallback={null}>
            <Preload all />
            <primitive 
              ref={keyb} 
              object={keyboard.scene} 
              scale={0.9} 
              position={[0, -2, 0]} 
              rotation={[Math.PI / 4, 0, 0]} 
            />
            <OrbitControls 
              enableZoom={false} 
              enablePan={false} 
              enableRotate={false} 
            />
          </Suspense>
        </Canvas>
        <Loader />
      </div>
    </div>
  )
}

useGLTF.preload('./Keyboard.glb')
