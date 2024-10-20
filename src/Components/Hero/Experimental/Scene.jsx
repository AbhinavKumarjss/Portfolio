import React, { Suspense } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { gsap } from 'gsap';
import { Environment, OrbitControls, PerspectiveCamera, useGLTF } from '@react-three/drei';
import './Scene.css';
import Ground from './Ground';

export default function Scene() {

  const car = useGLTF('/Bmw2.glb');
  const police = useGLTF('/police.glb');
  const main_cam = React.useRef();
  const police_car = React.useRef();

  // Dodging animation
  function animateScene() {
    // Animate police car dodging in x-axis and moving forward on z-axis

    gsap.to(main_cam.current.position, {
    
      x:0,y:1,z:3,ease: 'ease.inOut',duration:4
    })
  }

  return (
    <div id='Scene-container'>
      <Canvas onCreated={animateScene} style={{ background: 'black' }}>
     
   
        <OrbitControls enableZoom={false} />
        <ambientLight
          intensity={2}
          />
        <PerspectiveCamera ref={main_cam}  makeDefault position={[36, 30, 27]} fov={75}  >
        <spotLight
          position={[0,0,0]}
          angle={1}
          penumbra={0.5}
          intensity={5}
          distance={100}
        />
        </PerspectiveCamera>
        
        <spotLight
          position={[0,10,0]}
          angle={1}
          penumbra={0.5}
          intensity={5}
          distance={100}
        />
       
        <Suspense fallback={null}>
        <Ground/>
      <Environment files={'/hdr.hdr'} background />
        <primitive object={car.scene} scale={1} />
      </Suspense>
        <primitive ref={police_car} object={police.scene} scale={1} position={[0, 0, -10]} />
      </Canvas>
    </div>
  );
}

useGLTF.preload('/Bmw2.glb');
useGLTF.preload('/police.glb');
