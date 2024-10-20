import React, { Suspense, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import './AboutMe.css'
import { gsap } from 'gsap'
import { PerspectiveCamera, OrbitControls, useGLTF, Preload, Loader } from '@react-three/drei';
export default function OverlayAboutMe() {
  const keyb = useRef()
  const keyboard = useGLTF('./Keyboard.glb')
  function onCreated() {
    keyb.current.traverse((obj) => {
      if (obj.isMesh) {
        obj.castShadow = true;
        obj.receiveShadow = true;
      }
    });
    console.log(keyb.current.rotation)
    gsap.to(keyb.current.rotation, {
      scrollTrigger: { trigger: '#overlay-aboutme', start: 'top 70%', end: '+=700', scrub: 1 },
      y: -Math.PI/7,
      z: Math.PI/7,
      x: Math.PI/2,

      duration: 1, ease: 'easeInOut'
    })
    gsap.to(keyb.current.position, {
      scrollTrigger: { trigger: '#overlay-aboutme', start: 'top bottom', end: '+=1500', scrub: 1 },
     
      y:'1.2',
      duration: 1, ease: 'easeInOut'
    })
  }
  return (
    <div id='overlay-aboutme'>

      <Canvas shadows onCreated={onCreated}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[-1, 1, 1]} intensity={0.5}  />
        <Suspense fallback={null}>
          <Preload all />
        <primitive ref={keyb} object={keyboard.scene} scale={1} position={[+0.3,-2, 0]} rotation={[Math.PI / 4, 0, 0]} />
        </Suspense>
        
      </Canvas>
    </div>
  )
}
useGLTF.preload('./Keyboard.glb')
