import React, { useRef, useState, useEffect } from "react";
import { RigidBody, CapsuleCollider } from '@react-three/rapier';


import Instruction from './Instruction';
import Dialogue from './Dialogue';
import Label from './Label';

export default function Thought({position, label, labelPosition, dialogue, instruction, onInstructionStateChange, proximityState, onProximity, children}) {
  const [labelState, setLabelState] = useState(false);
  const [instructionState, setInstructionState] = useState(false);
  const [dialogueState, setDialogueState] = useState(false);
  const [hoverState, setHoverState] = useState(false);

  const handleClick = () => {
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

  // console.log(proximityState)

  return (
    <>
      <RigidBody mass={1} type="fixed" position={position ? position : [0, 0, 0]} colliders="cuboid" >
          <mesh onClick={handleClick}>
            <boxGeometry args={[10, 10, 10]} />
            <meshStandardMaterial color="#eeeeee" roughness={0.8} metalness={0.2} />
          </mesh>
          <Label position={labelPosition ? labelPosition : [100, -8, 160]} label={label} state={labelState}/>
          <Dialogue dialogue={dialogue} state={dialogueState} />
          <Instruction position={[2, 30, -10]} instruction={instruction} state={instructionState} onClick={handleInstructionClick}/>
          <CapsuleCollider args={[5, 100, 5]} sensor
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
              }
            }} />
            <CapsuleCollider args={[5, 20, 5]} sensor
            onIntersectionEnter={(payload) => {
              if(payload.other.rigidBodyObject.children[0].name == "person"){
                setInstructionState(true)
                onInstructionStateChange(true)
                setDialogueState(false)
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
      {children}

      {/* {React.Children.map(children, (child, index) =>
          React.cloneElement(child, { key: `child-${index}` })
        )} */}
    </>
);
}

//have to move children outside rigid body so drag position is unaffected by parent position
//but wanted to put inside parent rigid body to handle collision 

