import { Canvas } from "@react-three/fiber";
import { Suspense, useState, useRef, useEffect } from "react";
import { Stats, PerspectiveCamera, OrbitControls, MapControls, KeyboardControls } from "@react-three/drei";

import { Physics, RigidBody } from '@react-three/rapier';

import Ground from './Ground';
import CameraRig from './CameraRig';
import Person from './Person';
import Thought from './Thought';

import Trust from './Trust';
import DragObj from './DragObj';

import { Vector3, Plane } from "three";

function Scene() { 

  return (
    <div id="canvas_wrapper">
      <KeyboardControls
      map={[
        { name: "forward", keys: ["ArrowUp", "w", "W"] },
        { name: "backward", keys: ["ArrowDown", "s", "S"] },
        { name: "left", keys: ["ArrowLeft", "a", "A"] },
        { name: "right", keys: ["ArrowRight", "d", "D"] },
      ]}>
      <Canvas shadows={true} tabIndex={0} >
        <color args={["#eeeeee"]} attach="background" />
        <fogExp2 attach="fog" args={["#eeeeee", 0.0003]} />
        <axesHelper args={[10]} />

        {/* Camera 🎥 */}
        {/* <PerspectiveCamera position={[0, 100, 150]} args={[60, window.innerWidth / window.innerHeight, 0.1, 4000]} makeDefault /> */}
 

        {/* Controls */}
        {/* <OrbitControls maxPolarAngle={Math.PI/2}/> */}
        {/* <OrbitControls enableZoom={false} minPolarAngle={Math.PI/4} maxPolarAngle={Math.PI/4} /> */}
        {/* <MapControls enableZoom={false} maxPolarAngle={Math.PI/2} listenToKeyEvents={Window} /> */}

        {/* Lights 💡 */}
        <ambientLight intensity={1} />
        <directionalLight color="#ffffff" position={[50, 50, 0]} intensity={1} />
        {/* Objects 📦 */}
        <Suspense fallback={null}>
          <Physics debug gravity={[0, -9.8,0]} colliders={false}>
            <Ground />
            <CameraRig>
              <Person />
              <Thought key={"trust"} position={[70, 5, -200]} label={"Trust Game"} labelPosition={[100, -8, 160]} dialogue={"Hello !"} instruction={`
            You have been given 10$ and have to decide how much of it you want to pass to another person.
            In the first stage, you keep the remaining amount not sent, while the receiver gains 3 times the amount sent.
            In the second stage, the receiver may pass nothing or any portion of the money they received back to you. 
            
            How much are you sending?`} > 
            <Trust position={[70, 5, -200]} />
            </Thought>

            {/* <Trust position={[0,0,0]} /> */}


              <Thought key={"prisoners"} position={[-200, 5, 10]} label= {"Prisoner's Dilemma"} labelPosition={[-100, -8, 160]} instruction={`
                Hello hello hello
                `}>
{/* <Trust position={[-200, 5, 10]} />  */}
                </Thought>





            </CameraRig>
          </Physics>
        </Suspense>
        <Stats />
      </Canvas>
      </KeyboardControls>
    </div>
  );
}

export default Scene;
