import * as THREE from 'three';
import { Canvas } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import { Stats, PerspectiveCamera, OrbitControls, MapControls } from "@react-three/drei";

import { Physics, Debug, useSphere } from "@react-three/cannon";

import Person from './Person';
import Ground from './Ground';

function Scene() {  
  return (
    <div id="canvas_wrapper">
      <Canvas shadows={true}>
        <color args={["#eeeeee"]} attach="background" />
        <fogExp2 attach="fog" args={["#eeeeee", 0.0003]} />
        
        <axesHelper args={[10]} />

        
        {/* Camera 🎥 */}
        <PerspectiveCamera position={[0, 100, -100]} args={[60, window.innerWidth / window.innerHeight, 0.1, 4000]} makeDefault />

        {/* Controls */}
        {/* <OrbitControls /> */}
        {/* <OrbitControls enableZoom={false} maxPolarAngle={Math.PI/2} /> */}
        <MapControls enableZoom={false} maxPolarAngle={Math.PI/2} listenToKeyEvents={Window} />

        {/* Lights 💡 */}
        <ambientLight intensity={0.75} />
        <directionalLight color="#cddafd" position={[-50, 50, 0]} intensity={0.8} />

        {/* Objects 📦 */}
        <Suspense fallback={null}>
        </Suspense>

        <Physics gravity={[0, -9.8, 0]} allowSleep={false}>
        {/* <Debug> */}
          <Person position={[0, 10, 0]} />
          <Ground position={[0, -1, 0]} />
        {/* </Debug> */}
        </Physics>
        <Stats />
      </Canvas>
    </div>
  );
}

export default Scene;
