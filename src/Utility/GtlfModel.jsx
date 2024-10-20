import { useLoader } from '@react-three/fiber'
import React, { useEffect } from 'react'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
const GLTFModel = React.forwardRef((props,ref)=> {
    
    const gltf = useLoader(GLTFLoader, props.src);
    useEffect(() => {
 
            gltf.scene.position.set(...props.pos)
            gltf.scene.scale.set(...props.scale);
          
            gltf.scene.traverse((child) => {
                if (child.isMesh) {
                    
                    
                    child.castShadow = true;
                    child.receiveShadow = true;
                    child.material.envMapIntensity = 20; // Set envMapIntensity
                }
            });
     
           
    }, [gltf]);

    return (
        <primitive  object={gltf.scene} />
    )
})

export default GLTFModel;