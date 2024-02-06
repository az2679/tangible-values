import { useRef, useState } from "react";
import { Vector3 } from "three";
import { useFrame } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import { RigidBody, BallCollider } from '@react-three/rapier';

import CameraRig from './CameraRig';


const SPEED = 100;
const frontVector = new Vector3();
const sideVector = new Vector3();
const direction = new Vector3();

export default function Person() {
    const ref = useRef();
    const [, get] = useKeyboardControls();
    const ballref = useRef()

    const [proximity, setProximity] = useState(false);
    const [playerPos, setPlayerPos] = useState([0,0,0]);

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

      setPlayerPos(ref.current.translation())
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
                  setProximity(true)
                  }
                }} 
                onIntersectionExit={() => {setProximity(false)}} 
              />
          </RigidBody>
          <CameraRig player = {playerPos} proximity = {proximity} />
        </>
    );
}
