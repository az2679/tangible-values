import * as THREE from 'three';
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";

import { Environment, PerspectiveCamera } from "@react-three/drei";
import { Stats, OrbitControls } from "@react-three/drei";

function Scene() {
  return (
    <div id="canvas_wrapper">
      <Canvas shadows={true}>
        <axesHelper args={[1]} />
        <Stats />

        <color args={["grey"]} attach="background" />

        {/* Camera 🎥 */}
        <PerspectiveCamera position={[0, 7, 15]} makeDefault />

        {/* Controls */}
        <OrbitControls />

        {/* Lights 💡 */}
        <ambientLight intensity={0.5} />
        <directionalLight color="#cddafd" position={[50, 50, 0]} intensity={0.8} />

        {/* Objects 📦 */}
        <mesh position={[0, 2.5, 0]}>
          <sphereGeometry />
          <meshPhysicalMaterial roughness={0.3} metalness={0.6} />
        </mesh>

        {/* Objects 📦 */}
        <Suspense fallback={null}>
        </Suspense>

      </Canvas>
    </div>
  );
}

export default Scene;
