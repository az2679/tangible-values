import React, { useRef, useState, useEffect } from "react";
import { RigidBody, CapsuleCollider } from '@react-three/rapier';
import { MeshTransmissionMaterial } from '@react-three/drei';
import { MeshReflectorMaterial } from '@react-three/drei';

import Instruction from './Text/Instruction';
import Text from './Text/Text';
import Label from './Text/Label';


export default function Thought({position, label, labelPosition, startDialogue, instructionDialogue, dialoguePosition, instruction, onInstructionStateChange, proximityState, onProximity, children}) {
  const [labelState, setLabelState] = useState(false);
  const [instructionState, setInstructionState] = useState(false);
  const [dialogueState, setDialogueState] = useState(false);
  const [hoverState, setHoverState] = useState(false);

  const [updatedDialogue, setUpdatedDialogue] = useState(startDialogue)


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
 
  const handleInstructionClick = () => {
    // if(instructionState == true){
    //   setHoverState(!hoverState)
    // }
      //set initiate hover state to true
        //in cam, get mouse pos and onPointerIn, camlook at mouse pos. onPointerOut reset lookat
        //if false, reset lookat 
    //pass up 
  }

  return (
    <>
      <RigidBody name = "thought" mass={1} type="fixed" position={position ? position : [0, 0, 0]} colliders="cuboid" >
          <mesh onClick={handleClick}>
            <boxGeometry args={[10, 10, 10]} />
            <meshStandardMaterial color="#eeeeee" roughness={0.8} metalness={0.2} />
            {/* <MeshTransmissionMaterial samples={16} resolution={256} transmission={0.95} roughness={0.5} clearcoat={0.1} clearcoatRoughness={0.1} color="#636363" thickness={200} ior={1.5} chromaticAberration={1} anisotropy={1} distortion={0} distortionScale={0.2} temporalDistortion={0} attenuationDistance={0.5} attenuationColor={0xffffff}/> */}
          </mesh>
          <Label position={labelPosition ? labelPosition : [100, -8, 160]} label={label} state={labelState}/>
          <Text text={updatedDialogue} position={dialoguePosition} state={dialogueState} />
          <Instruction position={[2, 30, -10]} instruction={instruction} state={instructionState} onClick={handleInstructionClick}/>
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
                setUpdatedDialogue(instructionDialogue)
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