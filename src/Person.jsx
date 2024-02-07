import { useRef, useState } from "react";
import { Vector3 } from "three";
import { useFrame } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import { RigidBody, BallCollider } from '@react-three/rapier';

const SPEED = 100;
const frontVector = new Vector3();
const sideVector = new Vector3();
const direction = new Vector3();

export default function Person({ onPositionChange }) {
    const ref = useRef();
    const [, get] = useKeyboardControls();
    const ballRef = useRef()

    useFrame(() => {
      const { forward, backward, left, right } = get()
      // console.log("Forward:", forward, "Backward:", backward, "Left:", left, "Right:", right);
      const velocity = ref.current.linvel();
      

      frontVector.set(0, 0, Number(backward) - Number(forward))
      sideVector.set(Number(left) - Number(right), 0, 0)

      direction
          .subVectors(frontVector, sideVector)
          .normalize()
          .multiplyScalar(SPEED)
      ref.current.setLinvel({x:direction.x, y: velocity.y, z:direction.z})

      const spherePosition = new Vector3();
      spherePosition.set(ref.current.translation().x, ref.current.translation().y, ref.current.translation().z)

      // console.log(spherePosition)
      onPositionChange(spherePosition)
    });

    // console.log("Sphere Position:", ref.current.position);

    return (
        <>
          <RigidBody ref={ref} mass={1} type="Dynamic" position={[0, 0, 0]} scale={5} colliders="ball"canSleep={false}>
              <mesh>
                <sphereGeometry />
                <meshNormalMaterial />
              </mesh>
              <BallCollider ref={ballRef}args={[1.1, 1.1, 1.1]} sensor setCollisionGroups={0x0004}
                onIntersectionEnter={(payload) => {
                  if(payload.other.rigidBodyObject.name != "Ground"){
                  // setProximity(true)
                  }
                }} 
                // onIntersectionExit={() => {setProximity(false)}} 
              />
          </RigidBody>
        </>
    );
}
