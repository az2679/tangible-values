import React, { useRef, useState, cloneElement } from 'react';
import { Vector3 } from "three";
import { useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from "@react-three/drei";

import Person from './Person';
import NPC from './NPC';


export default function CameraRig({children}){
  const cameraRef = useRef()

  const [cameraPosition, setCameraPosition] = useState({ x:0, y:0, z:0 });
  const [spherePosition, setSpherePosition] = useState({ x:0, y:0, z:0 });
  const [instructionState, setInstructionState] = useState(false);
  const [proximityState, setProximityState] = useState(false);

  const handleInstructionStateChange = (newInstructionState) => {
    setInstructionState(newInstructionState)
  }

  const handleProximity = (newProximityState) => {
    setProximityState(newProximityState) 
  }

  const handleSpherePositionChange = (newPosition) => {
    setSpherePosition(newPosition);

    if(proximityState == true){
      setCameraPosition({x:spherePosition.x, y:60, z: spherePosition.z + 80})
      if(instructionState == true){
        cameraRef.current.lookAt(spherePosition.x, spherePosition.y+50, spherePosition.z);
      } else {
        cameraRef.current.lookAt(spherePosition.x, spherePosition.y, spherePosition.z)
      }
    } else {
      setCameraPosition({x: spherePosition.x, y: 100, z: spherePosition.z + 150})
      cameraRef.current.lookAt(spherePosition.x, spherePosition.y, spherePosition.z)
    }
    // cameraRef.current.updateProjectionMatrix();
  };



  // const cameraOffset = new Vector3(0,0,0);
  // const cameraOffset1 = new Vector3();

  // useFrame(() => {
  //   cameraOffset.set(spherePosition.x, 100, spherePosition.z+150);
  //   cameraOffset1.set(spherePosition.x, 60, spherePosition.z+80);

  //   if(proximityState){
  //   // cameraRef.current.position.lerp(cameraOffset1, 0.8)
  //     cameraRef.current.position.copy(cameraOffset1);
  //     if(instructionState){
  //       cameraRef.current.lookAt(spherePosition.x, spherePosition.y+50, spherePosition.z);
  //     } else {
  //       cameraRef.current.lookAt(spherePosition.x, spherePosition.y, spherePosition.z);
  //     }
  //     cameraRef.current.updateProjectionMatrix();
  //   } else {
  //   // cameraRef.current.position.lerp(cameraOffset, 0.2)
  //     cameraRef.current.position.copy(cameraOffset);
  //     cameraRef.current.lookAt(spherePosition.x, spherePosition.y, spherePosition.z);
  //     cameraRef.current.updateProjectionMatrix();
  //   }
  // });


  return(
    <>
    <PerspectiveCamera ref={cameraRef} position={[cameraPosition.x, cameraPosition.y, cameraPosition.z]} args={[60, window.innerWidth / window.innerHeight, 0.1, 4000]} makeDefault />
    
    {React.Children.map(children, (child) =>
      cloneElement(child, {
        cameraPosition,
        spherePosition,
        onPositionChange: handleSpherePositionChange,
        instructionState,
        onInstructionStateChange: handleInstructionStateChange,
        proximityState,
        onProximity: handleProximity,
      })
    )}

    </>
  );
}
