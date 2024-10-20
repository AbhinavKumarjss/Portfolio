import { useFrame, useLoader } from '@react-three/fiber';
import React from 'react';
import * as THREE from 'three'; // Import THREE for TextureLoader and texture properties

export default function Ground() {
    const texture = useLoader(THREE.TextureLoader, '/sand.png');
    // useFrame(()=>{
    //     texture.offset.y -= 0.04; // Move the texture along
    // })
    // Set the texture to repeat
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping; // Repeat in both directions
    texture.repeat.set(20, 20); // Repeat 10 times along both the X and Y axes (adjust this value as needed)
  
    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
            <planeGeometry args={[100, 100]} />
            <meshStandardMaterial map={texture} /> {/* Apply the texture to the map */}
        </mesh>
    );
}
