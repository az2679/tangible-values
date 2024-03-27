import React, { useRef, useState, useEffect } from "react";
import { RigidBody, CapsuleCollider } from '@react-three/rapier';
import { MeshTransmissionMaterial } from '@react-three/drei';
import { MeshReflectorMaterial } from '@react-three/drei';

import Dialogue from './Text/Dialogue';
import Prompt from './Text/Prompt';
import Label from './Text/Label';


export default function Thought({position, label, labelPosition, startDialogue, updateDialogue, startPosition, updatePosition, prompt, promptPosition, onInstructionStateChange, proximityState, onProximity, children}) {
  const [labelState, setLabelState] = useState(false);
  const [instructionState, setInstructionState] = useState(false);
  const [dialogueState, setDialogueState] = useState(false);
  const [dialogue, setDialogue] = useState(startDialogue)
  const [dialoguePosition, setDialoguePosition] = useState(startPosition)


  const handleClick = () => {
    // console.log("test")
    if(proximityState == true){
    // setInstructionState(!instructionState)
    // onInstructionStateChange(!instructionState)
    setLabelState(false)
    } else {
      setLabelState(!labelState)
    }
  }


  return (
    <>
      <RigidBody name = "thought" mass={1} type="fixed" position={position ? position : [0, 0, 0]} colliders="cuboid" >
          <mesh onClick={handleClick}>
            <boxGeometry args={[10, 10, 10]} />
            <meshStandardMaterial color="#eeeeee" roughness={0.8} metalness={0.2} />
          </mesh>
          <Label position={labelPosition ? labelPosition : [100, -8, 160]} label={label} state={labelState}/>
          <Dialogue position={dialoguePosition} dialogue={dialogue} state={dialogueState} />
          <Prompt position={[promptPosition, 30, -10]} prompt={prompt} state={instructionState} />
          <CapsuleCollider args={[5, 200, 5]} sensor position={[0, 0, 50]}
            onIntersectionEnter={(payload) => {
              if(payload.other.rigidBodyObject.children[0].name == "person"){
              setDialogueState(true)
              }
            }} 
            onIntersectionExit={(payload) => {
              //payload.other.rigidBodyObject.children[1].name = "coin"
              if(payload.other.rigidBodyObject.children[0].name == "person"){
              setInstructionState(false)
              onInstructionStateChange(false)
              onProximity(false)
              setDialogueState(false)
              }
            }} />
            {/*instruction prox sensor*/}
            <CapsuleCollider args={[5, 30, 5]} sensor 
            onIntersectionEnter={(payload) => {
              if(payload.other.rigidBodyObject.children[0].name == "person"){
                setInstructionState(true)
                onInstructionStateChange(true)
                setDialogueState(false)
                setDialogue(updateDialogue)
                setDialoguePosition(updatePosition)
              }
            }} 
            onIntersectionExit={(payload) => {
              if(payload.other.rigidBodyObject.children[0].name == "person"){
                setInstructionState(false)
                onInstructionStateChange(false)
                setDialogueState(true)
              }
            }} 
          />
          {/* {children} */}
      {/* {React.Children.map((children, index) => (
          <RigidBody key={`child-${index}`} type="fixed">
            {children}
          </RigidBody>
        ))} */}

      </RigidBody>

      <mesh position={[position[0], position[1]-4.8, position[2]+40]} rotation={[-Math.PI/2, 0, 0]} >
        <ringGeometry args={[198, 202, 32, 1]} />
        <meshBasicMaterial color="#d3d3d3" transparent opacity={0.9} />
      </mesh>

      {/* <mesh position={[position[0], position[1]+10, position[2]+0]} rotation={[-Math.PI/2, 0, 0]} >
        <circleGeometry args={[30, 32]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.7} />
      </mesh> */}

      {children}

      {/* {React.Children.map(children, (child, index) =>
          React.cloneElement(child, { key: `child-${index}` })
        )} */}
    </>
);
}