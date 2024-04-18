import { useProgress, Html, useTexture } from '@react-three/drei'
import { useEffect, useState } from 'react';

import vertexShader from "../shaders/vertexShader.glsl";
import fragmentShader from "../shaders/fragmentShader.glsl";


function map(inVal, inMin, inMax,  outMin, outMax) {
  return ((inVal - inMin) / (inMax - inMin) * (outMax - outMin) + outMin);
}

export default function LoadingScreen ({position}) {
  const matcap = useTexture('./matcaps/3B3C3F_DAD9D5_929290_ABACA8.png')

  const { active, progress, errors, item, loaded, total } = useProgress()
  const [individualProgress, setIndividualProgress] = useState({});


  useEffect(() => {
    if (total) {
      setIndividualProgress(prevState => ({
        ...prevState,
        [item]: progress
      }));
    }
  }, [progress, item, total]);

  let overallProgress = 0;
  for (const key in individualProgress) {
    overallProgress += individualProgress[key];
  }

  // console.log(individualProgress, overallProgress, Object.keys(individualProgress).length, total)
  // console.log(map(overallProgress, 0, 1300,  0, 100))

  return (
    <>
      
    <mesh position={position ? position : [0, 0, -100]} scale={[1, 1, 1]} rotation={[Math.PI*0.15, 0, 0]}>
      <octahedronGeometry args={[10]} />
      {/* <meshMatcapMaterial color={"white"} matcap={matcap} /> */}
      <shaderMaterial
        attach="material"
        uniforms={{ time: {value:0} }}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>

    {/* <Html center>{Math.round(overallProgress/11)} %</Html> */}
    </>

  );
}
