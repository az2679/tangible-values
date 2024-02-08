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
  const [lookAtPosition, setLookAtPosition] = useState({ x: 0, y: 0, z: 0 });
  const [thoughtPosition, setThoughtPosition] = useState({ x: 0, y: 0, z: 0 });

  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0, z: 0 });
  const [lerpFactor, setLerpFactor] = useState(0.15);
  const [transitioning, setTransitioning] = useState(false);

  const { x: camX, y: camY, z: camZ } = cameraPosition;
  const { x: targetX, y: targetY, z: targetZ } = targetPosition;
  const { x: sphereX, y: sphereY, z: sphereZ } = spherePosition;

  const [index, setIndex] = useState(0);
  const cam0 = { x: spherePosition.x, y: 100, z: spherePosition.z + 150 };
  const cam1 = { x: spherePosition.x, y: 60, z: spherePosition.z + 80 };
  const cam2 = { x: spherePosition.x, y: 20, z: spherePosition.z + 40 };


  const handleInstructionStateChange = (newInstructionState) => {
    setInstructionState(newInstructionState);
  };

  const handleProximity = (newProximityState) => {
    setProximityState(newProximityState);
  };

  const handleSpherePositionChange = (newPosition) => {
    setSpherePosition(newPosition);
  };

  const handleThoughtPosition = (newThoughtPosition) => {
    setThoughtPosition(newThoughtPosition)
  }

  useFrame(() => {
    if (index === 0) {
      setTargetPosition(cam0);
    } else if (index === 1) {
      setTargetPosition(cam1);
    } else {
      setTargetPosition(cam2);
    }

    if (index === 2) {
      //set -40 to get the looking far back feeling and so it doesnt distort when u get really close
      setLookAtPosition({ x: thoughtPosition.x, y: thoughtPosition.y, z: thoughtPosition.z - 40 });
    } else {
      setLookAtPosition(spherePosition);
    }
    

    if (transitioning) {
      setCameraPosition((prevPosition) => ({
        ...prevPosition,
        x: camX + (targetX - camX) * lerpFactor,
        y: camY + (targetY - camY) * lerpFactor,
        z: camZ + (targetZ - camZ) * lerpFactor,
      }));

      const distance = cameraRef.current.position.distanceTo(
        new Vector3(targetX, targetY, targetZ)
      );

      if (distance < 0.5) {
        setTransitioning(false);
        setCameraPosition(targetPosition);
      }
    } else {
      setCameraPosition(targetPosition);
    }

    cameraRef.current.lookAt(lookAtPosition.x, lookAtPosition.y, lookAtPosition.z);
    cameraRef.current.updateProjectionMatrix();
  });

  useEffect(() => {
    if (proximityState) {
      setTransitioning(true);
      if (instructionState) {
        setIndex(2);
      } else {
        setIndex(1);
      }
    } else {
      setTransitioning(true);
      setIndex(0);
    }
  }, [proximityState, instructionState]);

  return (
    <>
      <PerspectiveCamera
        ref={cameraRef}
        position={[camX, camY, camZ]}
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
          thoughtPosition,
          onThoughtPosition: handleThoughtPosition,
        })
      )}
    </>
  );
}
