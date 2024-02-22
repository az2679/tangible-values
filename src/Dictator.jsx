import { useRef, useState, useEffect } from "react";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { useFrame, useThree } from "@react-three/fiber";

import { useDrag } from "@use-gesture/react";
import { animated, useSpring } from "@react-spring/three";
import { Vector3, Plane } from "three";


import DragObj from './DragObj';
import Dialogue from './Dialogue';

function Sensor({ sensorPosition, onSensedChange }) {
  const [sensed, setSensed] = useState(false);
  
  useEffect(() => {
    onSensedChange(sensed);
  }, [sensed]);
 
    
  return(
    <RigidBody name="dictator" mass={1} type="fixed" colliders={false} position={sensorPosition} >
    <mesh position={[0, 0.5, 0]} rotation={[-Math.PI/2, 0,0]}>
      <planeGeometry args={[7, 7]} />
      <meshBasicMaterial color={"gray"}/>
     </mesh>
    <CuboidCollider sensor args={[4, 4,4]} 
      onIntersectionEnter={(payload)=>{
        if(payload.other.rigidBodyObject.name == "coin"){
          setSensed(true)
        }
      }}
      onIntersectionExit={(payload)=>{
        if(payload.other.rigidBodyObject.name == "coin"){
          setSensed(false)
        }
      }}
    />
  </RigidBody>
  )
}

export default function Dictator(props) {
  const { position } = props;
  const floorPlane = new Plane(new Vector3(0, 1, 0),0);
  const [dragState, setDragState] = useState(false);
  const [sensors, setSensors] = useState([]);
  const [counter, setCounter] = useState(2);

  const handleSensedChange = (newSensor) => {
    console.log(newSensor)
    setSensors((prevSensors) => {
      const sensorHistory = [...prevSensors, newSensor];
      console.log(sensorHistory)
      const updatedSensors = sensorHistory.slice(-2);
      const totalSensed = updatedSensors.filter((sensor) => sensor).length;
      setCounter(totalSensed);
      return sensorHistory;
    });


    // if(newSensor == true){
    //   setCounter((value) => value + 1)
    // } else if (newSensor == false){
    //   setCounter((value) => value - 1)
    // }
  };
  


  
  return (
    <>
      <Sensor sensorPosition={[position[0]-20, 0, position[2]]} onSensedChange={handleSensedChange}/>
      <Sensor sensorPosition={[position[0]-10, 0, position[2]+5]} onSensedChange={handleSensedChange}/>

      <Dialogue dialogue={`${counter}`} state={true} position={[position[0]-15, 10, position[2]]} />

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
