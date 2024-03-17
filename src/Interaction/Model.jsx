import React, { Suspense, useEffect, useState } from 'react';
import { useLoader } from '@react-three/fiber';

function Model({ src, position, rotation, scale }) {
  const [model, setModel] = useState(null);

  useEffect(() => {
    const loadModel = async () => {
      const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader');
      const loader = new GLTFLoader();
      loader.load(src, (gltf) => {

        gltf.scene.traverse((child) => {
          if (child.isMesh) {
            if (child.material) {
              if(child.material.name == "coin"){
              // console.log(child.material)
              child.material.roughness = 1;
              child.material.metalness = 0.7
              }
            }
          }
        });
        setModel(gltf.scene);
      });
    };


    loadModel();

    return () => {
      if (model) {
        model.traverse((child) => {
          if (child.isMesh) {
            child.geometry.dispose();
            child.material.dispose();
          }
        });
      }
    };
  }, [src]);

  if (!model) return null;

  return <primitive object={model} position={position} rotation={rotation} scale={scale} />;
}

export default Model;
