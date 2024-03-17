import { useState, useRef, useEffect } from "react";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { Vector3, Plane } from "three";
import gsap from 'gsap';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import Text from '../Text/Text';

export default function Paper({paperPosition, paperRotation, textPosition, textRotation, text, confedState, flipState}){
  const paper = useRef()

  useEffect(() => {
    if (flipState == true){
    gsap.from(paper.current.rotation, {
        z: 0, 
        duration: 0.1, 
      }, ">");
    gsap.to(paper.current.position, {
      y: 5,
      duration: 0.5, 
    });
    gsap.to(paper.current.rotation, {
      z: Math.PI, 
      duration: 1, 
    }, ">");
    gsap.to(paper.current.position, {
      y: 0,
      duration: 0.5, 
    }, ">");
  } 
  },[flipState])

  return(
    <mesh ref={paper} position={paperPosition} rotation={paperRotation}>
      <boxGeometry args={[10, 0.5, 12]} />
      <meshStandardMaterial color="#eeeeee" roughness={0.8} metalness={0.2} />
      <Text text={`${text}`} state={confedState} position={textPosition} rotation={textRotation}/>
     </mesh>
  );
}

