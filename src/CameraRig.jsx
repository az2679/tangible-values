import React, { useRef, useState, cloneElement, useEffect } from 'react';
import { PerspectiveCamera } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";

export default function CameraRig({ children }) {
  const cameraRef = useRef();

  const [spherePosition, setSpherePosition] = useState({ x: 0, y: 0, z: 0 });
  const [instructionState, setInstructionState] = useState(false);
  const [proximityState, setProximityState] = useState(false);

  const [cameraPosition, setCameraPosition] = useState({ x: 0, y: 0, z: 0 });
  const [lookAtPosition, setLookAtPosition] = useState({ x:0, y:0, z:0 });

  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0, z: 0 });
  const [dynamicTargetPosition, setDynamicTargetPosition] = useState({ x: 0, y: 0, z: 0 });
  const [lerpFactor, setLerpFactor] = useState(0.1);
  const [transitioning, setTransitioning] = useState(false);

  const cam2 = { x: spherePosition.x, y: 20, z: spherePosition.z + 60 };
  const cam1 = { x: spherePosition.x, y: 60, z: spherePosition.z + 80 };
  const cam0 = { x: spherePosition.x, y: 100, z: spherePosition.z + 150 };
  const [index, setIndex] = useState(0);

  const handleInstructionStateChange = (newInstructionState) => {
    setInstructionState(newInstructionState);
  };

  const handleProximity = (newProximityState) => {
    setProximityState(newProximityState);
  };

  const handleSpherePositionChange = (newPosition) => {
    setSpherePosition(newPosition);
  };

  useFrame(() => {
    if (index == 0){
        setDynamicTargetPosition(cam0);
        setLookAtPosition(spherePosition);
      } else if (index == 1) {
        setDynamicTargetPosition(cam1);
        // setLookAtPosition(spherePosition);
        setLookAtPosition((prevPosition) => ({
          x: prevPosition.x + (spherePosition.x - prevPosition.x) * lerpFactor,
          y: prevPosition.y + (spherePosition.y - prevPosition.y + 35) * lerpFactor ,
          z: prevPosition.z + (spherePosition.z - prevPosition.z) * lerpFactor,
        }));
      } else {
        setDynamicTargetPosition(cam2);
        setLookAtPosition((prevPosition) => ({
          x: prevPosition.x + (spherePosition.x - prevPosition.x) * lerpFactor,
          y: prevPosition.y + (spherePosition.y - prevPosition.y + 35) * lerpFactor ,
          z: prevPosition.z + (spherePosition.z - prevPosition.z) * lerpFactor,
        }));
      }

    if (transitioning) {
      setCameraPosition((prevPosition) => ({
        x: prevPosition.x + (dynamicTargetPosition.x - prevPosition.x) * lerpFactor,
        y: prevPosition.y + (dynamicTargetPosition.y - prevPosition.y) * lerpFactor,
        z: prevPosition.z + (dynamicTargetPosition.z - prevPosition.z) * lerpFactor,
      }));

      const distance = cameraRef.current.position.distanceTo(
        new Vector3(dynamicTargetPosition.x, dynamicTargetPosition.y, dynamicTargetPosition.z)
      );

      if (distance < 0.5) {
        setTransitioning(false);
        setCameraPosition(dynamicTargetPosition);
      }
    } else {
      setCameraPosition(dynamicTargetPosition);
    }

    cameraRef.current.lookAt(lookAtPosition.x, lookAtPosition.y, lookAtPosition.z);
    cameraRef.current.updateProjectionMatrix()

    // console.log(transitioning)
  });

  useEffect(() => {
    if (!transitioning) {
      setCameraPosition(dynamicTargetPosition
      //   (prevPosition) => ({
      //   x: prevPosition.x + (dynamicTargetPosition.x - prevPosition.x) * lerpFactor,
      //   y: prevPosition.y + (dynamicTargetPosition.y - prevPosition.y) * lerpFactor,
      //   z: prevPosition.z + (dynamicTargetPosition.z - prevPosition.z) * lerpFactor,
      // })
      );
    }
  }, [transitioning]);


  useEffect(() => {
    if (proximityState) {
      if (instructionState) {
        // setTargetPosition(cam2);
        // setLookAtPosition({ x: spherePosition.x, y: spherePosition.y + 35, z: spherePosition.z });
        setTransitioning(true);
        setIndex(2)
      } else {
        // setTargetPosition(cam1);
        // setLookAtPosition(spherePosition);
        setTransitioning(true);
        setIndex(1)
      }
    } else {
      // setTargetPosition(cam0);
      // setLookAtPosition(spherePosition);
      setTransitioning(true);
      setIndex(0)
    }
  }, [proximityState, instructionState]);


  return (
    <>
      <PerspectiveCamera
        ref={cameraRef}
        position={[cameraPosition.x, cameraPosition.y, cameraPosition.z]}
        args={[60, window.innerWidth / window.innerHeight, 0.1, 4000]}
        makeDefault
      />

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
