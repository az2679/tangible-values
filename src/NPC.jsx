import { useRef, useState } from "react";
import { RigidBody, CapsuleCollider } from '@react-three/rapier';

import Instruction from './Instruction';
import Dialogue from './Dialogue';


export default function NPC({position, dialogue, instruction, onInstructionStateChange, onProximity}) {

  const [dialogueState, setDialogueState] = useState(false);
  const [instructionState, setInstructionState] = useState(false);

  const handleClick = () => {
    if(dialogueState == true){
    setInstructionState(!instructionState)
    onInstructionStateChange(!instructionState)
    }
  }

  return (
    <>
      <RigidBody mass={1} type="fixed" position={position ? position : [0, 0, 0]} colliders="cuboid" >
        <mesh onClick={handleClick}>

          <boxGeometry args={[10, 10, 10]} />
          <meshStandardMaterial color="#eeeeee" roughness={0.8} metalness={0.2} />

          <Dialogue dialogue={dialogue} state={dialogueState} position={[-7,15,0]}/>
          <Instruction instruction={instruction} state={instructionState} position={[-7,25,0]}/>

          <CapsuleCollider args={[5, 80, 5]} sensor
            onIntersectionEnter={() => {
              setDialogueState(true)
              onProximity(true)
            }} 
            onIntersectionExit={() => {
              setDialogueState(false)
              onProximity(false)
            }} 
          />
        </mesh>
      </RigidBody>
    </>
);
}



