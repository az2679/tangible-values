import { RigidBody } from '@react-three/rapier'
import { useRef, useEffect, useMemo, useState } from "react";
import { TextureLoader } from 'three';
import { MeshTransmissionMaterial } from '@react-three/drei';

export default function Wall({position, rotation}){
  // const [texturesLoaded, setTexturesLoaded] = useState(false)
  // const [loadingError, setLoadingError] = useState(null);

  // const texturePath = '../src/assets/materials/stone/';
  // const textureFiles = useMemo(() => ({
  //   baseColor: 'stone_albedo.jpeg',
  //   roughness: 'stone_roughness.jpeg',
  //   normal: 'stone_normal.png',
  //   ambientOcclusion: 'stone_ao.jpeg',
  //   height: 'stone_height.png',
  // }), []);

  // const textures = useMemo(() => {
  //   const textureLoader = new TextureLoader();

  //   const loadedTextures = {};

  //   const loadTexture = (key, value) => {
  //     textureLoader.load(
  //       `${texturePath}${value}`,
  //       (texture) => {
  //         loadedTextures[key] = texture;
  //       }
  //     );
  //   };
  //   let loadedTextureCount = 0;
  //   for (const [key, value] of Object.entries(textureFiles)) {
  //     loadTexture(key, value);
  //     loadedTextureCount++;
  //   }
  //   return loadedTextures;
  // }, [textureFiles]);

  // useEffect(() => {
  //   const loadedTextureCount = Object.keys(textures).length;
  //   if (loadedTextureCount === Object.keys(textureFiles).length) {
  //     setTexturesLoaded(true);
  //   }
  // }, [textures, textureFiles]);

  // if (loadingError) {
  //   console.log(loadingError)
  // }

  return (
    <RigidBody name="wall" mass={1} type="fixed" colliders="cuboid" position={position} rotation={rotation}>
      <mesh>
        <boxGeometry args={[40, 30, 2]} />
        {/* <meshStandardMaterial color="#eeeeee" roughness={0.8} metalness={0.2} /> */}
        <MeshTransmissionMaterial resolution={1024} distortion={0.25} color="#A9A9A9" thickness={10} anisotropy={1} />

        {/* <meshStandardMaterial
          // map={textures.baseColor}
          roughnessMap={textures.roughness}
          normalMap={textures.normal}
          aoMap={textures.ambientOcclusion}
          displacementMap={textures.height}
        /> */}

      </mesh>
    </RigidBody>
  );
}
