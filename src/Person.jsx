import { useRef } from "react";
import { Vector3 } from "three";
import { useFrame } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import { RigidBody, BallCollider } from '@react-three/rapier';

import { useLoader } from '@react-three/fiber';
import { RGBELoader } from 'three-stdlib'
import { useCubeTexture } from '@react-three/drei';

import { useState, useEffect } from 'react';

import About from './Components/About';

const SPEED = 100;
const frontVector = new Vector3();
const sideVector = new Vector3();
const direction = new Vector3();

export default function Person({ position, onPositionChange, onProximity, onThoughtPosition, submissions, sendProximityToThoughts }) {
  const texture = useCubeTexture(
    ["px.png", "nx.png", "py.png", "ny.png", "pz.png", "nz.png"],
    {path: "./envmap/"}
    )

  const ref = useRef();
  const [, get] = useKeyboardControls();
  const [distanceToThoughts, setDistanceToThoughts] = useState([0, 0, 0, 0]);
  const [aboutPosition, setAboutPosition] = useState([0, 0, 0]);

  const thoughts = [new Vector3(0, 0, -275), new Vector3(-510, 5, -730), new Vector3(0, 0, -1010), new Vector3(510, 5, -730)];



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


    const spherePosVec = new Vector3(ref.current.translation().x, ref.current.translation().y, ref.current.translation().z);

    const newDistance = thoughts.map(thought => spherePosVec.distanceTo(new Vector3(...thought)));
    setDistanceToThoughts(newDistance);
 
    const proximityToThoughts = distanceToThoughts.map(distance => distance < 250);
    sendProximityToThoughts(proximityToThoughts)

    // console.log(spherePosVec, distanceToThoughts, proximityToThoughts)

  });

  const handleThoughtPosition = (thoughtPosition) => {
    onThoughtPosition({
      x: thoughtPosition.x, 
      y: thoughtPosition.y + 30, 
      z: thoughtPosition.z + 20
    })
  }


  useEffect(()=>{
    // console.log(submissions, ref.current.translation(), aboutPosition)
    setAboutPosition([ref.current.translation().x, 0, ref.current.translation().z-50])
  },[submissions])

  //dictator: [position[0], position[1]-5 , position[2] + 445] + [0, 5, -470] -> [0, 0, -25]
  //vod: [position[0]+250, position[1]-5, position[2]+175] + [-550, 5, -800] -> [-300, 0, -625]
  //exchange: [position[0], position[1]-5, position[2]] + [0, 5, -1100] -> [0, 0, -1100]
  //trust: [position[0]-250, position[1]-5, position[2]+175] + [550, 5, -800] -> [300, 0, -625]

  // useEffect(() => {
  //   const thoughts = [new Vector3(0, 0, -25), new Vector3(-300, 0, -625), new Vector3(0, 0, -1100), new Vector3(300, 0, -625)];  //replace with useMemo later
  //   const spherePosition = new Vector3(ref.current.translation().x, ref.current.translation().y, ref.current.translation().z);
  //   const newDistance = thoughts.map(thought => spherePosition.distanceTo(new Vector3(...thought)));
  //  setDistanceToThoughts(newDistance);

  //   const proximityToThoughts = distanceToThoughts.map(distance => distance < 250);
  //   sendProximityToThoughts(proximityToThoughts)

  //   // console.log(spherePosition, distanceToThoughts, proximityToThoughts)
  //   // console.log(spherePosition, thoughts[0], spherePosition.distanceTo(thoughts[0]))
  // }, [ref.current]);

  //dictator: [0, 0, -275] w rad of 250

  return (
    <>
      <RigidBody ref={ref} mass={20} gravityScale={20} type="Dynamic" position={position ? position : [0, 100, 150]} scale={5} colliders="ball" canSleep={false} name="person">

        <mesh name="person">
          <sphereGeometry />
          {/* <meshStandardMaterial color={0xA9A9A9} 
          metalness={0.7} roughness={0.3} 
          /> */}
          <meshBasicMaterial color={"#b4b9bf"} envMap={texture} reflectivity={1}/>
        </mesh>

        <BallCollider args={[1.1, 1.1, 1.1]} sensor 
            onIntersectionEnter={(payload) => {
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


      {/* <mesh position={[510, 5, -730]} rotation={[-Math.PI/2, 0, 0]} >
        <ringGeometry args={[250, 251, 32, 1]} />
        <meshBasicMaterial color="red" />
      </mesh> */}

      {submissions && <About position={aboutPosition}/>}
    </>
  );
}
