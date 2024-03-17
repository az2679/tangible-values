import { useState, useRef, useEffect } from "react";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { Vector3, Plane } from "three";
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export default function Eraser({position, onHoldChange}){
  const gltf = useLoader(GLTFLoader, '/eraser.glb');

  useEffect(() =>{
    console.log("eraser: ", gltf.scene)
  },[gltf])


  return (
    <>
    <RigidBody mass={500} gravityScale={500} type="dynamic" position={position} colliders={false} lockRotations={true} canSleep={false} name="eraser">

      {/* <mesh>
        <boxGeometry args={[12,6,10]} />
        <meshStandardMaterial color="#eeeeee" roughness={0.8} metalness={0.2} />
      </mesh> */}
      <primitive object={gltf.scene} scale={300}/>
      

      <CuboidCollider args={[8, 3, 3]}/>
      <CuboidCollider args={[8, 2, 3]} sensor
      onIntersectionEnter={(payload)=>{
        if(payload.other.rigidBodyObject.name == "person"){
          onHoldChange(true)
        }}}
      onIntersectionExit={(payload)=>{
        if(payload.other.rigidBodyObject.name == "person"){
          onHoldChange(false)
        }}}
        />
    </RigidBody>
    </>
  )
}