import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture, useCubeTexture, Text3D, ContactShadows } from "@react-three/drei";

import nunito from "../assets/fonts/Nunito_SemiBold_Regular.json"

import octaVert from "../shaders/octaVert.glsl";
import octaFrag from "../shaders/octaFrag.glsl";
import sphereVert from "../shaders/sphereVert.glsl";
import sphereFrag from "../shaders/sphereFrag.glsl";
import textVert from "../shaders/textVert.glsl";
import textFrag from "../shaders/textFrag.glsl";

import { useProgress, Html } from '@react-three/drei'
import { useEffect, useState } from 'react';

function map(inVal, inMin, inMax,  outMin, outMax) {
  return ((inVal - inMin) / (inMax - inMin) * (outMax - outMin) + outMin);
}

export default function LoadingScreen({ position }) {
  const matcap = useTexture("./matcaps/3B3C3F_DAD9D5_929290_ABACA8.png");
  const envmap = useCubeTexture(
    ["px.png", "nx.png", "py.png", "ny.png", "pz.png", "nz.png"],
    { path: "./envmap/" }
  );
  const matcaptext = useTexture("./matcaps/C7C7D7_4C4E5A_818393_6C6C74.png");

  const octahedronRef = useRef();
  const sphereRef = useRef();
  const textRef = useRef();

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
//   // console.log(map(overallProgress, 0, 1300,  0, 100))

  useFrame((state) => {
    const { clock } = state;
    octahedronRef.current.material.uniforms.uTime.value =
      clock.getElapsedTime();
    sphereRef.current.material.uniforms.uTime.value = clock.getElapsedTime();
    textRef.current.material.uniforms.uTime.value = clock.getElapsedTime();

  });

  return (
    <>
      <mesh
        ref={octahedronRef}
        position={position ? position : [0, 0, -150]}
        scale={[1, 1, 1]}
        rotation={[Math.PI * 0.15, 0, 0]}
        castShadow
      >
        <octahedronGeometry args={[10]} />
        <shaderMaterial
          attach="material"
          vertexShader={octaVert}
          fragmentShader={octaFrag}
          uniforms={{
            uTime: { value: 0.0 },
            uMatCap: { value: matcap },
            uBounceSpeed: { value: 1.0 },
            uBounceHeight: { value: 14.0 },
          }}
        />
      </mesh>

      <mesh
        ref={sphereRef}
        position={position ? position : [0, -10, -200]}
        scale={0.85}
        rotation={[0, 0, 0]}
      >
        <sphereGeometry args={[10]} />
        <shaderMaterial
          attach="material"
          vertexShader={sphereVert}
          fragmentShader={sphereFrag}
          uniforms={{
            uTime: { value: 0.0 },
            uEnvMap: { value: envmap },
            uMovementRadius: { value: 50.0 },
          }}
        />
      </mesh>

      <Text3D
        ref={textRef}
        font={nunito}
        position={[-40, 30, -150]}
        rotation={[0, 0, 0]}
        scale={[4, 4, 6]}
        letterSpacing={0.5}
        height={0.01}
        lineHeight={1}
        bevelEnabled
        bevelSize={0.1}
        bevelSegments={20}
        bevelThickness={0.25}
      >
        {`TANGIBLE VALUES`}
        <shaderMaterial
          attach="material"
          vertexShader={textVert}
          fragmentShader={textFrag}
          uniforms={{
            uTime: { value: 0.0 },
            uMatCapText: { value: matcaptext },
          }}
        />
      </Text3D>

      {/* <mesh position={[40, 5, -150 ]} scale={30} castShadow>
        <boxGeometry args={[1, 1, 1]}/>
        <meshStandardMaterial color={"black"}/>
      </mesh>

      <ContactShadows opacity={1} scale={100} blur={1} far={5} resolution={256} color="#000000" /> */}

      <Html center>{Math.round(overallProgress/11)} %</Html>

      {/* <mesh
        position={[0, 0, -150]}
        scale={[1, 1, 1]}
        rotation={[Math.PI * 0.15, 0, 0]}
      >
        <octahedronGeometry args={[10]} />
        <meshBasicMaterial color={"white"} />
      </mesh> */}



    </>
  );
}
