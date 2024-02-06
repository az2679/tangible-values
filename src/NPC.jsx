import { useRef, useState } from "react";
import { RigidBody, CapsuleCollider } from '@react-three/rapier';

import helvetiker from "three/examples/fonts/helvetiker_regular.typeface.json";
import { extend } from '@react-three/fiber';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

import Instruction from './Instruction';
import Dialogue from './Dialogue';

extend({ TextGeometry })

export default function NPC(props) {
  const {position, dialogue, instruction} = props
  const font = new FontLoader().parse(helvetiker);

  const [dialogueState, setDialogueState] = useState(false);
  const [instructionState, setInstructionState] = useState(false);

  return (
    <>
      <RigidBody mass={1} type="fixed" position={position ? position : [0, 0, 0]} colliders="cuboid" >
        <mesh onClick={(e) => 
          setInstructionState(!instructionState)
          }>

          <boxGeometry args={[10, 10, 10]} />
          <meshStandardMaterial color="#eeeeee" roughness={0.8} metalness={0.2} />

          <Dialogue dialogue={dialogue} state={dialogueState} position={[-7,15,0]}/>
          <Instruction instruction={instruction} state={instructionState} position={[-7,25,0]}/>

          <CapsuleCollider args={[5, 80, 5]} sensor
            onIntersectionEnter={() => {
              setDialogueState(true)
            }} 
            onIntersectionExit={() => setDialogueState(false)} 
          />
        </mesh>
      </RigidBody>
    </>
);
}



