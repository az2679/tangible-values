import { useRef, useState, useEffect } from "react";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { useFrame, useThree } from "@react-three/fiber";

import { useDrag } from "@use-gesture/react";
import { animated, useSpring } from "@react-spring/three";
import { Vector3, Plane } from "three";


import DragObj from './DragObj';
import Dialogue from './Dialogue';

export default function Trust(props) {
  const { name, position } = props;
  const floorPlane = new Plane(new Vector3(0, 1, 0),0);
  const [dragState, setDragState] = useState(false);
  const [counter, setCounter] = useState(0);

  
  return (
    <>
      <RigidBody name="trust" mass={1} type="fixed" colliders={false} position={[position[0]-20, 1, position[2]]} >
        <mesh>
          {/* <boxGeometry args={[15, 5, 9]} />
          <meshStandardMaterial color="#eeeeee" roughness={0.8} metalness={0.2} /> */}
        </mesh>
        <CuboidCollider sensor args={[13, 5,9]} 
          onIntersectionEnter={(payload)=>{
            // console.log(payload)
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

      <Dialogue dialogue={`${counter}`} state={true} position={[position[0]-20, 10, position[2]]} />

      {/* <DragObj name="coin" startPosition={[-20, 1, 50]} state={setDragState} plane={floorPlane}/> */}


      <DragObj name="coin" startPosition={[position[0]-20, 1, position[2]+50]} state={setDragState} plane={floorPlane}/>
      {/* <DragObj key={id} name ="coin" startPosition={[position[0]-25, 1, position[2]+50]} state={setDragState} plane={floorPlane}/>
      <DragObj key={id} name ="coin" startPosition={[position[0]-30, 1, position[2]+34]} state={setDragState} plane={floorPlane}/>
      <DragObj key={id} name ="coin" startPosition={[position[0]-35, 1, position[2]+37]} state={setDragState} plane={floorPlane}/>
      <DragObj key={id} name ="coin" startPosition={[position[0]-30, 1, position[2]+45]} state={setDragState} plane={floorPlane}/>
      <DragObj key={id} name ="coin" startPosition={[position[0]-35, 1, position[2]+50]} state={setDragState} plane={floorPlane}/>
      <DragObj key={id} name ="coin" startPosition={[position[0]-20, 1, position[2]+40]} state={setDragState} plane={floorPlane}/>
      <DragObj key={id} name ="coin" startPosition={[position[0]-25, 1, position[2]+38]} state={setDragState} plane={floorPlane}/>
      <DragObj key={id} name ="coin" startPosition={[position[0]-40, 1, position[2]+54]} state={setDragState} plane={floorPlane}/>
      <DragObj key={id} name ="coin" startPosition={[position[0]-30, 1, position[2]+55]} state={setDragState} plane={floorPlane}/> */}



    </>
  );
}
