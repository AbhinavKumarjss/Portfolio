import React, { useEffect, useRef } from 'react';
import './Hero.css';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls, useGLTF } from '@react-three/drei';
import { ScrollControls } from '@react-three/drei';
import { MeshTransmissionMaterial } from '@react-three/drei';
import gsap from 'gsap';
import * as THREE from 'three';
import { Environment } from '@react-three/drei';
import { lerp } from 'three/src/math/MathUtils.js';
import { div } from 'three/webgpu';

export default function Hero() {
  const ref = useRef();

  // Preload GLTF model using useGLTF
  const model = useGLTF('/crown.glb');  // Replace with the path to your model
  const model2 = useGLTF('/Rock3.glb');  // Replace with the path to your model
  const model3 = useGLTF('/Rock7.glb');  // Replace with the path to your model

  function onCreated() {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#Hero-area-block',
        start: 'top top',
        end:'+=1000',
       
        pin: true,
        scrub: true,
      },
    });
    console.log(ref.current);
    tl.to(ref.current.position, {
      z:-3,
       duration: 0.3,
     })
      tl.to(ref.current.rotation, {
       x:Math.PI*2,
       y:Math.PI*2,
        duration: 1,
      })
      
  
     
     
   
  }

  return (
  

    
    <div id="Hero-area-block" >
      <div id="Hero-ui-area" >
        <h2>Hi, I am Abhinav Kumar</h2>
      </div>
      <div id="Hero-section" >
        <Canvas shadows style={{ background: 'transparent' }} onCreated={onCreated} antialias={true}>
        
            <ambientLight intensity={0.5} />
            <directionalLight position={[0, 5, 0]} intensity={1} castShadow />
            <directionalLight position={[5, 0, 0]} intensity={0.5} castShadow />
            <PerspectiveCamera  makeDefault position={[0,0.5,2]} />
            <OrbitControls target={[0,0,0]} enableDamping enableZoom={false}/>
     
            <primitive ref={ref} object={model.scene} scale={[0.5, 0.5, 0.5]} position={[0, 0, -2]} />
            <pointLight position={[0, 0,2]} intensity={10} />
            <pointLight position={[0, 0,-1]} intensity={1} />
            <spotLight position={[0, 0, 2]} intensity={1} target={ref.current}/>
            <pointLight position={[-2, 0,-2]} intensity={1} />
            <pointLight position={[2, 0,-2]} intensity={1} />
            <pointLight position={[0, 0,4]} intensity={10} />
            <pointLight position={[4, 0,0]} intensity={10} />
            <pointLight position={[-4, 0,0]} intensity={10} />
        </Canvas>
      </div>
  
    </div>
  );
}

// Ensure to preload the model
useGLTF.preload('/crown.glb');
useGLTF.preload('/Rock3.glb');
useGLTF.preload('/Rock7.glb');
