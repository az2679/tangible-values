import React, { useRef, useState, cloneElement } from 'react';
import { PerspectiveCamera } from "@react-three/drei";
import { Vector3 } from "three";

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
      if(instructionState == true){
        setCameraPosition({x:spherePosition.x, y:20, z: spherePosition.z + 60})
        cameraRef.current.lookAt(spherePosition.x, spherePosition.y+35, spherePosition.z);
    // -10,60,10 >> but its child of npc
        // setCameraPosition({x:spherePosition.x, y:-5, z: spherePosition.z + 50})
        // cameraRef.current.lookAt(spherePosition.x, spherePosition.y+35, spherePosition.z);

        //kinda rough estimate right now, if needed pass in text box info
      } else {
        setCameraPosition({x:spherePosition.x, y:60, z: spherePosition.z + 80})
        cameraRef.current.lookAt(spherePosition.x, spherePosition.y, spherePosition.z)
      }
    } else {
      setCameraPosition({x: spherePosition.x, y: 100, z: spherePosition.z + 150})
      cameraRef.current.lookAt(spherePosition.x, spherePosition.y, spherePosition.z)
    }
    // cameraRef.current.updateProjectionMatrix();

    // console.log(cameraRef.current.position)
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
