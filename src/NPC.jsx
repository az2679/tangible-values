import { useRef, useState, useEffect } from "react";
import { RigidBody, CapsuleCollider } from '@react-three/rapier';
import { useFrame } from "@react-three/fiber";

import Instruction from './Instruction';
import Dialogue from './Dialogue';


export default function NPC({position, dialogue, instruction, onInstructionStateChange, onProximity}) {
  const [dialogueState, setDialogueState] = useState(false);
  const [instructionState, setInstructionState] = useState(false);
  const [lerpCamState, setLerpCamState] = useState(false)
  const [lerpCounter, setLerpCounter] = useState(0)

  const handleClick = () => {
    if(dialogueState == true){
    setInstructionState(!instructionState)
    onInstructionStateChange(!instructionState)
    }
  }

  const handleInstructionClick = () => {
    if(instructionState == true){
      setInstructionState(false)
      onInstructionStateChange(false)
    }
  }

  const lerpCam = () => {
    setLerpCamState(true)
  }



  // if(lerpCamState == true) {

  //   setLerpCounter(lerpCounter++)
  // }

  
  // useEffect(() => {
  //   useFrame(()=>{
  //     if(frameCount%2 == 1){
  //       console.log('test')
  //     }
  //   })
  // },[lerpCamState])

    /*

    useState - counter. count++ >> transition variable / lerp alpha
    useFrame - loop, by framecount (pass in delta?)/modulo 
    sensor onIntersectionEnter (callback, set state true, if true, inc counter)
    useEffect - [counter = 1] -> once this happens, execute things inside hook (stop counter, set state false) 

    */

  return (
    <>
      <RigidBody mass={1} type="fixed" position={position ? position : [0, 0, 0]} colliders="cuboid" >
        <mesh onClick={handleClick}>

          <boxGeometry args={[10, 10, 10]} />
          <meshStandardMaterial color="#eeeeee" roughness={0.8} metalness={0.2} />

          <Dialogue dialogue={dialogue} state={dialogueState} />
          <Instruction instruction={instruction} state={instructionState} onClick={handleInstructionClick}/>

          <CapsuleCollider args={[5, 100, 5]} sensor
            onIntersectionEnter={() => {
              setDialogueState(true)
              onProximity(true)
              lerpCam()
            }} 
            onIntersectionExit={() => {
              setDialogueState(false)
              onProximity(false)
              setInstructionState(false)
              onInstructionStateChange(false)
            }} 
          />
        </mesh>
      </RigidBody>
    </>
);
}



