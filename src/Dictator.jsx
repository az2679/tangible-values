import { useState } from "react";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { Vector3, Plane } from "three";

import DragObj from './DragObj';
import Text from './Text';

export default function Dictator(props) {
  const { position } = props;
  const floorPlane = new Plane(new Vector3(0, 1, 0),0);
  const [dragState, setDragState] = useState(false);
  const [counter, setCounter] = useState(0);

  return (
    <>
      <RigidBody name="dictator" mass={1} type="fixed" colliders={false} position={[position[0]-20, 1, position[2]]} >
        {/* <mesh /> */}
        <mesh position={[0, 0, 0]} rotation={[-Math.PI/2, 0,0]}>
          <planeGeometry args={[25, 15]} />
          <meshBasicMaterial color={"gray"}/>
         </mesh>
        <CuboidCollider sensor args={[13, 5,9]} 
          onIntersectionEnter={(payload)=>{
            if(payload.other.rigidBodyObject.name == "coin"){
              setCounter((value) => value + 1)
            }
          }}
          onIntersectionExit={(payload)=>{
            if(payload.other.rigidBodyObject.name == "coin"){
              setCounter(counter-1)
            }
          }}
        />
      </RigidBody>

      <Text text={`${counter}`} state={true} position={[position[0]-15, 10, position[2]]} />

      <DragObj name="coin" startPosition={[position[0]-20, 1, position[2]+50]} state={setDragState} plane={floorPlane}/>
      <DragObj name="coin" startPosition={[position[0]-25, 1, position[2]+50]} state={setDragState} plane={floorPlane}/>
      <DragObj name="coin" startPosition={[position[0]-30, 1, position[2]+34]} state={setDragState} plane={floorPlane}/>
      <DragObj name="coin" startPosition={[position[0]-35, 1, position[2]+37]} state={setDragState} plane={floorPlane}/>
      <DragObj name="coin" startPosition={[position[0]-30, 1, position[2]+45]} state={setDragState} plane={floorPlane}/>
      <DragObj name="coin" startPosition={[position[0]-35, 1, position[2]+50]} state={setDragState} plane={floorPlane}/>
      <DragObj name="coin" startPosition={[position[0]-20, 1, position[2]+40]} state={setDragState} plane={floorPlane}/>
      <DragObj name="coin" startPosition={[position[0]-25, 1, position[2]+38]} state={setDragState} plane={floorPlane}/>
      <DragObj name="coin" startPosition={[position[0]-40, 1, position[2]+54]} state={setDragState} plane={floorPlane}/>
      <DragObj name="coin" startPosition={[position[0]-30, 1, position[2]+55]} state={setDragState} plane={floorPlane}/>
    </>
  );
}
