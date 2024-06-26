// key control reference: Minecraft by drcmda
// https://codesandbox.io/p/sandbox/minecraft-vkgi6?file=%2Fsrc%2FPlayer.js%3A24%2C5-24%2C60

import { useRef, useState, useEffect } from "react";
import { Vector3 } from "three";
import { useFrame } from "@react-three/fiber";
import { useKeyboardControls, useCubeTexture } from "@react-three/drei";
import { RigidBody, BallCollider } from '@react-three/rapier';

import { PerspectiveCamera } from "@react-three/drei";

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
  const [aboutPosition, setAboutPosition] = useState([0, 0, 0]);

  //for camera grouped with sphere
  // const [pos, setPos] = useState([0, 100, 150]);
  // const groupRef = useRef();
  // const cameraRef = useRef();

  //for distance based rendering
  // const thoughts = [new Vector3(0, 0, -275), new Vector3(-510, 5, -730), new Vector3(0, 0, -1010), new Vector3(510, 5, -730)];
  // const [distanceToThoughts, setDistanceToThoughts] = useState([0, 0, 0, 0]);

  const smoothness = 0.5;

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

    //trying to use lerp to smooth camera 
    // const targetDirection = new Vector3();
    // targetDirection.subVectors(frontVector, sideVector).normalize()
    // const smoothedDirection = new Vector3();
    // smoothedDirection.lerp(targetDirection, smoothness);
    // smoothedDirection.multiplyScalar(SPEED);
    // ref.current.setLinvel({ x: smoothedDirection.x, y: velocity.y, z: smoothedDirection.z });

    //for adding camera into group with sphere
    // setPos([ref.current.translation().x, 100, ref.current.translation().z+150])
    // cameraRef.current.lookAt(ref.current.translation().x, ref.current.translation().y, ref.current.translation().z);


    const spherePosition = ref.current.translation();
    onPositionChange({
      x: spherePosition.x,
      y: spherePosition.y,
      z: spherePosition.z,
    })

  

    //distance based rendering
    //   const spherePosVec = new Vector3(ref.current.translation().x, ref.current.translation().y, ref.current.translation().z);
    //   const newDistance = thoughts.map(thought => spherePosVec.distanceTo(new Vector3(...thought)));
    //   setDistanceToThoughts(newDistance);
    //   const proximityToThoughts = distanceToThoughts.map(distance => distance < 250);
    //   sendProximityToThoughts(proximityToThoughts);
  });


  const handleThoughtPosition = (thoughtPosition) => {
    onThoughtPosition({
      x: thoughtPosition.x, 
      y: thoughtPosition.y + 30, 
      z: thoughtPosition.z + 20
    })
  }

  // useEffect(()=>{
  //   setAboutPosition([ref.current.translation().x, 0, ref.current.translation().z-50])
  // },[submissions])

  const [complete, setComplete] = useState(false);

  useEffect(() => {
    setAboutPosition([ref.current.translation().x, 0, ref.current.translation().z-50])
    if (submissions && Object.keys(submissions).length > 0) {
      if(Object.values(submissions).every((value) => value === true)){
        setTimeout(() => {
          setComplete(true);
        }, 10000);
      }
    }
    console.log(submissions, complete)
  }, [submissions]);

  return (
    <>
    {/* <group 
    ref={groupRef}
    >
      <PerspectiveCamera
          ref={cameraRef}
          position={pos ? pos : [0, 100, 150]}
          args={[60, window.innerWidth / window.innerHeight, 0.1, 4000]}
          makeDefault
        /> */}
    
      <RigidBody ref={ref} mass={20} gravityScale={20} type="Dynamic" position={position ? position : [0, 100, 150]} scale={5} colliders="ball" canSleep={false} name="person">
        <mesh name="person" >
          <sphereGeometry />
          <meshBasicMaterial color={"#b4b7bf"} envMap={texture} reflectivity={1}/>
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
    {/* </group> */}
      {complete && <About position={aboutPosition}/>}
    </>
  );
}
