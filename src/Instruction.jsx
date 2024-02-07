import { useRef } from "react";
import { Vector3 } from "three";

import helvetiker from "three/examples/fonts/helvetiker_regular.typeface.json";
import { extend } from '@react-three/fiber';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

import { RigidBody, CuboidCollider } from '@react-three/rapier';

extend({ TextGeometry })

export default function Instruction(props) {
  const {position, instruction, state, onClick} = props
  const instructionRef = useRef()
  const font = new FontLoader().parse(helvetiker);


  return (
    <>
    <RigidBody>
      <mesh ref={instructionRef} position={position ? position : [-10, 60, 30]} rotation={[Math.PI * 0.25, 0,0]} visible={state} onClick={onClick} onPointerOver={(e) => console.log("over")}>
        <textGeometry args={[instruction ? instruction : "missing instruction", {font, size:1, height: 1}]}/>
        <meshLambertMaterial attach='material' color={"gray"}/>
      </mesh>
      {/* <CuboidCollider args={[10, 2, 10]} sensor /> */}
    </RigidBody>
    </>
);
}



