import { useRef, useEffect, useMemo, useState } from "react";
import gsap from 'gsap';
import { TextureLoader } from 'three';

import Text from '../Text/Text';

export default function Paper({paperPosition, paperRotation, textPosition, textRotation, text, confedState, flipState}){
  const paper = useRef()
  // const [texturesLoaded, setTexturesLoaded] = useState(false)

  // const texturePath = '../src/assets/materials/paper/';
  // const textureFiles = useMemo(() => ({
  //   baseColor: 'paper_color.jpg',
  //   roughness: 'paper_roughness.jpg',
  //   normal: 'paper_normal.png',
  //   ambientOcclusion: 'paper_ao.jpg',
  //   height: 'paper_height.png',
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


  useEffect(() => {
    if (flipState == true){
    gsap.from(paper.current.rotation, {
        z: 0, 
        duration: 0.1, 
      }, ">");
    gsap.to(paper.current.position, {
      y: 5,
      duration: 0.5, 
    });
    gsap.to(paper.current.rotation, {
      z: Math.PI, 
      duration: 1, 
    }, ">");
    gsap.to(paper.current.position, {
      y: 0,
      duration: 0.5, 
    }, ">");
  } 
  },[flipState])

  return(
      <mesh ref={paper} position={paperPosition} rotation={paperRotation}>
        <boxGeometry args={[10, 0.5, 12]} />
        <meshStandardMaterial color="#eeeeee" roughness={0.8} metalness={0.2} />
        <Text text={`${text}`} state={confedState} position={textPosition} rotation={textRotation}/>
      </mesh>

    // <mesh ref={paper} position={paperPosition} rotation={paperRotation} >
    //   <boxGeometry args={[10, 0.05, 12]} />
    //   <meshStandardMaterial
    //     map={textures.baseColor}
    //     roughnessMap={textures.roughness}
    //     normalMap={textures.normal}
    //     aoMap={textures.ambientOcclusion}
    //     displacementMap={textures.height}
    //   />
    //   <Text text={`${text}`} state={confedState} position={textPosition} rotation={textRotation}/>
    // </mesh>
  );
}

