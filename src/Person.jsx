import { useRef } from "react";
import { Vector3 } from "three";
import { useFrame } from "@react-three/fiber";
import { PerspectiveCamera, useKeyboardControls } from "@react-three/drei";
import { RigidBody, BallCollider } from '@react-three/rapier';

import { useState } from 'react';

const SPEED = 100;
const frontVector = new Vector3();
const sideVector = new Vector3();
const direction = new Vector3();
const cameraOffset = new Vector3();
const cameraOffset1 = new Vector3();


export default function Person() {
    const cameraRef = useRef();
    const ref = useRef();
    const [, get] = useKeyboardControls();
    const ballref = useRef()

    const [isInteract, setInteract] = useState(false);

    useFrame(() => {
        const { forward, backward, left, right } = get()
        const velocity = ref.current.linvel();

        frontVector.set(0, 0, Number(backward) - Number(forward))
        sideVector.set(Number(left) - Number(right), 0, 0)
        direction
            .subVectors(frontVector, sideVector)
            .normalize()
            .multiplyScalar(SPEED)
        ref.current.setLinvel({x:direction.x, y: velocity.y, z:direction.z})
      
        // console.log(get(), direction, ref.current.linvel())

        cameraOffset1.set(ref.current.translation().x, 50, ref.current.translation().z+75);
        cameraOffset.set(ref.current.translation().x, 100, ref.current.translation().z+150);

        if(isInteract){
          // cameraOffset1.set(ref.current.translation().x, 50, ref.current.translation().z+75);
          cameraRef.current.position.copy(cameraOffset1);
          cameraRef.current.lookAt(ref.current.translation().x, ref.current.translation().y, ref.current.translation().z);
          cameraRef.current.updateProjectionMatrix();
        } else {
          // cameraOffset.set(ref.current.translation().x, 100, ref.current.translation().z+150);
          cameraRef.current.position.copy(cameraOffset);
          cameraRef.current.lookAt(ref.current.translation().x, ref.current.translation().y, ref.current.translation().z);
          cameraRef.current.updateProjectionMatrix();
        }
    });

    return (
        <>
          <RigidBody ref={ref} mass={1} type="Dynamic" position={[0, 0, 0]} scale={5} colliders="ball" >
              <mesh>
                <sphereGeometry />
                <meshNormalMaterial />
              </mesh>
              <BallCollider ref={ballref}args={[1.1, 1.1, 1.1]} sensor setCollisionGroups={0x0004}
                onIntersectionEnter={(payload) => {
                  if(payload.other.rigidBodyObject.name != "Ground"){
                    cameraRef.current.position.lerp(cameraOffset1, 0.2)
                  setInteract(true)
                  // console.log("intersecting", payload.other)

                  }
                }} 
                onIntersectionExit={() => {
                  setInteract(false)
                  cameraRef.current.position.lerp(cameraOffset, 0.2)
                  // console.log("not")
                }} 
              />
          </RigidBody>
          <PerspectiveCamera ref={cameraRef} position={[0, 100, 150]} args={[60, window.innerWidth / window.innerHeight, 0.1, 4000]} makeDefault />
        </>
      
    );
}