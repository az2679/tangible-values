import { useRef } from "react";
import { Vector3 } from "three";
import { useFrame } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import { RigidBody, BallCollider } from '@react-three/rapier';

import { useLoader } from '@react-three/fiber';
import { RGBELoader } from 'three-stdlib'
import { MeshRefractionMaterial } from '@react-three/drei';
import { MeshTransmissionMaterial } from '@react-three/drei';

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


    const texture = useLoader(RGBELoader, 'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/aerodynamics_workshop_1k.hdr')

    const config = {
      bounces: 3,
      aberrationStrength: 0.01,
      ior: 2.75,
      fresnel: 1,
      color: 'white',
      fastChroma: true
    }


  return (
    <>
      <RigidBody ref={ref} mass={20} gravityScale={20} type="Dynamic" position={position ? position : [0, 100, 100]} scale={5} colliders="ball" canSleep={false} name="person">

      {/* {(texture) => (
        // <Caustics
        //   backfaces
        //   color={config.color}
        //   position={[0, -0.5, 0]}
        //   lightSource={[5, 5, -10]}
        //   worldRadius={0.1}
        //   ior={1.8}
        //   backfaceIor={1.1}
        //   intensity={0.1}> */}

        <mesh name="person">
          <sphereGeometry />
          <meshStandardMaterial color={0xA9A9A9} 
          metalness={0.7} roughness={0.3} 
          />
          
          {/* <meshPhysicalMaterial
            color={0xffffff} 
            transparent 
            opacity={0.5}
            // roughness={0.1}
            // metalness={0.9} 
            // transmission={0.9}

            roughness={0.8} 
          /> */}

            {/* <MeshRefractionMaterial envMap={texture} {...config} toneMapped={false} /> */}
            {/* <MeshTransmissionMaterial resolution={1024} distortion={0.25} color="#FF8F20" thickness={1} anisotropy={1} /> */}
        </mesh>
        {/* // </Caustics>
        )} */}

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
