import { useRef } from "react";
import { Vector3 } from "three";
import { useFrame } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import { RigidBody, BallCollider } from '@react-three/rapier';

const SPEED = 100;
const frontVector = new Vector3();
const sideVector = new Vector3();
const direction = new Vector3();

export default function Person({ position, onPositionChange, onProximity, onThoughtPosition }) {
    const ref = useRef();
    const [, get] = useKeyboardControls();

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

      const spherePosition = ref.current.translation();
      onPositionChange({
        x: spherePosition.x,
        y: spherePosition.y,
        z: spherePosition.z,
      })
    });

    const handleThoughtPosition = (thoughtPosition) => {
      onThoughtPosition({
        x: thoughtPosition.x, 
        y: thoughtPosition.y + 30, 
        z: thoughtPosition.z + 20
      })
    }

  return (
    <>
      <RigidBody ref={ref} mass={20} gravityScale={20} type="Dynamic" position={position ? position : [0, 30, 100]} scale={5} colliders="ball" canSleep={false} name="person">
        <mesh name="person">
          <sphereGeometry />
          <meshPhysicalMaterial
            color={0xffffff} // Set the color of the sphere
            transparent // Make the material transparent
            opacity={0.5} // Set the opacity level for transparency
            roughness={0.1} // Adjust roughness for reflection
            metalness={0.9} // Adjust metalness for reflection
            transmission={0.9} // Adjust transmission for light refraction
          />
        </mesh>
        <BallCollider args={[1.1, 1.1, 1.1]} sensor 
            onIntersectionEnter={(payload) => {
              // console.log(payload)
            if(payload.other.rigidBodyObject.name == "thought"){
            onProximity(true)
            handleThoughtPosition(payload.other.rigidBodyObject.position)
            }
          }} 
          onIntersectionExit={() => {
          }
          } 
        />
      </RigidBody>
    </>
  );
}
