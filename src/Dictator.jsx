import { useState } from "react";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { Vector3, Plane } from "three";

import DragObj from './DragObj';
import Text from './Text';
import Submit from './Submit';

function CoinMult({position, setDragState, floorPlane}){
  return(
    <>
      <DragObj name="coin" startPosition={[position[0]-10, 1, position[2]+0]} state={setDragState} plane={floorPlane} lift={10}/>
      <DragObj name="coin" startPosition={[position[0]-5, 1, position[2]+0]} state={setDragState} plane={floorPlane} lift={10}/>
      <DragObj name="coin" startPosition={[position[0]-0, 1, position[2]-15]} state={setDragState} plane={floorPlane} lift={10}/>
      <DragObj name="coin" startPosition={[position[0]+5, 1, position[2]-12]} state={setDragState} plane={floorPlane} lift={10}/>
      <DragObj name="coin" startPosition={[position[0]-0, 1, position[2]-5]} state={setDragState} plane={floorPlane} lift={10}/>
      <DragObj name="coin" startPosition={[position[0]+5, 1, position[2]+0]} state={setDragState} plane={floorPlane} lift={10}/>
      <DragObj name="coin" startPosition={[position[0]-10, 1, position[2]-9]} state={setDragState} plane={floorPlane} lift={10}/>
      <DragObj name="coin" startPosition={[position[0]-5, 1, position[2]-11]} state={setDragState} plane={floorPlane} lift={10}/>
      <DragObj name="coin" startPosition={[position[0]+10, 1, position[2]+4]} state={setDragState} plane={floorPlane} lift={10}/>
      <DragObj name="coin" startPosition={[position[0]-0, 1, position[2]+5]} state={setDragState} plane={floorPlane} lift={10}/>
    </>
  )
}

export default function Dictator(props) {
  const { position } = props;
  const floorPlane = new Plane(new Vector3(0, 1, 0),0);
  const [dragState, setDragState] = useState(false);
  const [dictator, setDictator] = useState(0);
  const [reciever, setReciever] = useState(0);

  const [invalidAnswer, setInvalidAnswer] = useState(false);

  const handleSubmit = () => {
    if (dictator + reciever !== 10){
      setInvalidAnswer(true)
    } else {
      setInvalidAnswer(false)
    }
  }

  return (
    <>
      <Text text={`${dictator}`} state={true} position={[position[0]-30, 10, position[2]+90]} />
      <Text text={`${reciever}`} state={true} position={[position[0]+30, 10, position[2]+90]} />
      <Text text={`dictator`} state={true} position={[position[0]-30, 1, position[2]+120]} rotation={[-Math.PI/2, 0,0]}/>
      <Text text={`reciever`} state={true} position={[position[0]+30, 1, position[2]+120]} rotation={[-Math.PI/2, 0,0]}/>
      
      <Submit position={[40, 5, -350]} onSubmit={handleSubmit} />
      <Text text={`invalid answer`} state={invalidAnswer} position={[position[0] +40, 1, position[2]+15]} rotation={[-Math.PI/2, 0,0]}/>

      <RigidBody name="dictator" mass={1} type="fixed" colliders={false} position={[position[0]-30, 1, position[2]+100]} >
        {/* <mesh /> */}
        <mesh position={[0, 0, 0]} rotation={[-Math.PI/2, 0,0]}>
          <planeGeometry args={[25, 15]} />
          <meshBasicMaterial color={"gray"}/>
         </mesh>
        <CuboidCollider sensor args={[13, 5,9]} 
          onIntersectionEnter={(payload)=>{
            if(payload.other.rigidBodyObject.name == "coin"){
              setDictator((value) => value + 1)
            }
          }}
          onIntersectionExit={(payload)=>{
            if(payload.other.rigidBodyObject.name == "coin"){
              setDictator((value) => value + 1)
            }
          }}
        />
      </RigidBody>

      <RigidBody name="reciever" mass={1} type="fixed" colliders={false} position={[position[0]+30, 1, position[2]+100]} >
        {/* <mesh /> */}
        <mesh position={[0, 0, 0]} rotation={[-Math.PI/2, 0,0]}>
          <planeGeometry args={[25, 15]} />
          <meshBasicMaterial color={"gray"}/>
         </mesh>
        <CuboidCollider sensor args={[13, 5,9]} 
          onIntersectionEnter={(payload)=>{
            if(payload.other.rigidBodyObject.name == "coin"){
              setReciever((value) => value + 1)
            }
          }}
          onIntersectionExit={(payload)=>{
            if(payload.other.rigidBodyObject.name == "coin"){
              setReciever((value) => value + 1)
            }
          }}
        />
      </RigidBody>

      <CoinMult position={[position[0], position[1], position[2]+140]} setDragState = {setDragState} floorPlane = {floorPlane}/>

      
    </>
  );
}
