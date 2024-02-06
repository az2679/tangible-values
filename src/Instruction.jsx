import { useRef } from "react";
import { RigidBody, CapsuleCollider } from '@react-three/rapier';

import helvetiker from "three/examples/fonts/helvetiker_regular.typeface.json";
import { extend } from '@react-three/fiber';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

extend({ TextGeometry })

export default function Instruction(props) {
  const {position, instruction, state} = props
  const instructionRef = useRef()
  const font = new FontLoader().parse(helvetiker);

  return (
    <>
      <mesh ref={instructionRef} position={position ? position : [0, 10, 0]} visible={state}>
        <textGeometry args={[instruction ? instruction : "missing instruction", {font, size:5, height: 1}]}/>
        <meshLambertMaterial attach='material' color={"gray"}/>
      </mesh>
    </>
);
}



