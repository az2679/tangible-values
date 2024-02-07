import React, { useRef, useState, cloneElement, useEffect } from 'react';
import { PerspectiveCamera } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";

export default function CameraRig({children}){
  const cameraRef = useRef()

  const [spherePosition, setSpherePosition] = useState({ x:0, y:0, z:0 });
  const [instructionState, setInstructionState] = useState(false);
  const [proximityState, setProximityState] = useState(false);

  const [cameraPosition, setCameraPosition] = useState({ x:0, y:0, z:0 });
  const [lookAtPosition, setLookAtPosition] = useState({ x:0, y:0, z:0 });

  const [targetPosition, setTargetPosition] = useState({ x:0, y:0, z:0 });
  const [lerpFactor, setLerpFactor] = useState(0.1);
  const [transitioning, setTransitioning] = useState(false);

  const [cam2, setCam2] = useState({ x:0, y:20, z:60 });
  const [cam1, setCam1] = useState({ x:0, y:60, z:80 });
  const [cam0, setCam0] = useState({ x:0, y:100, z:150 });

  const [index, setIndex] = useState(0);
  const [indexCamPos, setIndexCamPos] = useState({ x:0, y:0, z:0 });

  const handleInstructionStateChange = (newInstructionState) => {
    setInstructionState(newInstructionState)
  }

  const handleProximity = (newProximityState) => {
    setProximityState(newProximityState) 
  }

  const handleSpherePositionChange = (newPosition) => {
    setSpherePosition(newPosition);

    setCam2({ x: newPosition.x, y: 20, z: newPosition.z + 60 })
    setCam1({ x: newPosition.x, y: 60, z: newPosition.z + 80 })
    setCam0({ x: newPosition.x, y: 100, z: newPosition.z + 150 })

  };




  useFrame(() => {
    if (index == 0){
      setIndexCamPos(cam0);
    } else if (index == 1) {
      setIndexCamPos(cam1);
    } else {
      setIndexCamPos(cam2);
    }

    // lerp position from previous (cameraPosition) to target
    if (transitioning) {
      setCameraPosition((prevPosition) => ({
        x: prevPosition.x + (targetPosition.x - prevPosition.x) * lerpFactor,
        y: prevPosition.y + (targetPosition.y - prevPosition.y) * lerpFactor,
        z: prevPosition.z + (targetPosition.z - prevPosition.z) * lerpFactor,
      }));

      //then when it reaches less than 0.1 away, stop transition and set camera to
      const distance = cameraRef.current.position.distanceTo(new Vector3(targetPosition.x, targetPosition.y, targetPosition.z));
      if (distance < 0.1) {
        setTransitioning(false);
        setCameraPosition(targetPosition);
      } 
    } 
    else {
      setCameraPosition(indexCamPos);
      setLookAtPosition(spherePosition);
    }
    cameraRef.current.lookAt(lookAtPosition.x, lookAtPosition.y, lookAtPosition.z);
  });

  //checking that its just setting position when not transitioning
  useEffect(() => {
    if (!transitioning) {
      // setCameraPosition(targetPosition);
      setCameraPosition(indexCamPos);
      setLookAtPosition(spherePosition);
    }
  }, [transitioning]);

//initiate transition to specific position based on states
  useEffect(() => {
    if (proximityState) {
      if (instructionState) {
        setTargetPosition(cam2);
        setLookAtPosition({ x: spherePosition.x, y: spherePosition.y + 35, z: spherePosition.z });
        setTransitioning(true);
        setIndex(2)
      } else {
        setTargetPosition(cam1);
        setLookAtPosition(spherePosition);
        setTransitioning(true);
        setIndex(1)
      }
    } else {
      setTargetPosition(cam0);
      setLookAtPosition(spherePosition);
      setTransitioning(true);
      setIndex(0)
    }
  }, [proximityState, instructionState]);



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
