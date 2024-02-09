import { useRef, useState, useEffect } from "react";
import { RigidBody, CapsuleCollider } from '@react-three/rapier';


import Instruction from './Instruction';
import Dialogue from './Dialogue';
import Label from './Label';


export default function NPC({position, label, labelPosition, dialogue, instruction, onInstructionStateChange, onProximity, onThoughtPosition}) {
  const [labelState, setLabelState] = useState(false);
  const [dialogueState, setDialogueState] = useState(false);
  const [instructionState, setInstructionState] = useState(false);
  const [hoverState, setHoverState] = useState(false);
  // const [thoughtPosition, setThoughtPosition] = useState({ x: 0, y: 0, z: 0 });


  const handleClick = () => {
    if(dialogueState == true){
    setInstructionState(!instructionState)
    onInstructionStateChange(!instructionState)
    setLabelState(false)
    } else {
      setLabelState(!labelState)
    }
  }
 
  const handleInstructionClick = () => {
    // if(instructionState == true){
    //   setHoverState(!hoverState)
    // }

      //set initiate hover state to true
        //in cam, get mouse pos and onPointerIn, camlook at mouse pos. onPointerOut reset lookat
        //if false, reset lookat 

    //pass up 

  }

  const handleThoughtPosition = () => {
    //offset npc pos with child instruction pos for y and z
    // setThoughtPosition({
    //   x: position[0], 
    //   y: position[1] + 30, 
    //   z: position[2] + 20
    // })

    onThoughtPosition({
      x: position[0], 
      y: position[1] + 30, 
      z: position[2] + 20
    })
  }


  // console.log(thoughtPosition)

  return (
    <>
      <RigidBody mass={1} type="fixed" position={position ? position : [0, 0, 0]} colliders="cuboid" >
          <mesh onClick={handleClick}>
          <boxGeometry args={[10, 10, 10]} />
          <meshStandardMaterial color="#eeeeee" roughness={0.8} metalness={0.2} />
          </mesh>
          <Label position={labelPosition ? labelPosition : [100, -8, 160]} label={label} state={labelState}/>
          <Dialogue dialogue={dialogue} state={dialogueState} />
          <Instruction position={[7, 30, 20]} instruction={instruction} state={instructionState} onClick={handleInstructionClick}/>

          <CapsuleCollider args={[5, 100, 5]} sensor
            onIntersectionEnter={() => {
              setDialogueState(true)
              onProximity(true)
              handleThoughtPosition()
            }} 
            onIntersectionExit={() => {
              setDialogueState(false)
              onProximity(false)
              setInstructionState(false)
              onInstructionStateChange(false)
            }} 
          />
      </RigidBody>
    </>
);
}



