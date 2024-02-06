import React, { useRef, useState, cloneElement } from 'react';
import { Vector3 } from "three";
import { PerspectiveCamera } from "@react-three/drei";


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
