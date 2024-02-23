import { useRef, useState, useEffect } from "react";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { Vector3, Plane } from "three";

import DragObj from './DragObj';
import Text from './Text';

function Sensor({ number, sensorPosition, onSensedChange }) {
  const [count, setCounter] = useState(0);

  useEffect(() => {
    onSensedChange(number, count);
  }, [count]);
 
    
  return(
    <RigidBody name="dictator" mass={1} type="fixed" colliders={false} position={sensorPosition} >
    <mesh position={[0, 0.5, 0]} rotation={[-Math.PI/2, 0,0]}>
      <planeGeometry args={[7, 7]} />
      <meshBasicMaterial color={"gray"}/>
     </mesh>
    <CuboidCollider sensor args={[4, 4,4]} 
      onIntersectionEnter={(payload)=>{
        if(payload.other.rigidBodyObject.name == "coin"){
          setCounter((value) => value + 1)
        }
      }}
      onIntersectionExit={(payload)=>{
        if(payload.other.rigidBodyObject.name == "coin"){
          setCounter((value) => value - 1)
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
  const [sensors, setSensors] = useState({});
  const [counter, setCounter] = useState(0);

    const handleSensedChange = (number, count) => {
      setSensors((prevSensors) => ({
        ...prevSensors,
        [number]:count,
      }));
    };

    useEffect(() => {
    //acutal total sensed
      // const totalSensed = Object.values(sensors).reduce((acc, currentValue) => acc + currentValue, 0);
    //max 1 sensed allowed in each sensor 
      const totalSensed = Object.values(sensors).map(value => Math.min(value, 1)).reduce((acc, currentValue) => acc + currentValue, 0);
      setCounter(totalSensed);
    }, [sensors]);

  


  
  return (
    <>
      <Sensor number={0} sensorPosition={[position[0]-20, 0, position[2]]} onSensedChange={handleSensedChange}/>
      <Sensor number={1} sensorPosition={[position[0]-10, 0, position[2]+5]} onSensedChange={handleSensedChange}/>
      <Sensor number={2} sensorPosition={[position[0]+0, 0, position[2]+0]} onSensedChange={handleSensedChange}/>
      <Sensor number={3} sensorPosition={[position[0]+10, 0, position[2]+5]} onSensedChange={handleSensedChange}/>
      <Sensor number={4} sensorPosition={[position[0]+20, 0, position[2]+0]} onSensedChange={handleSensedChange}/>
      
      <Sensor number={5} sensorPosition={[position[0]-20, 0, position[2]-10]} onSensedChange={handleSensedChange}/>
      <Sensor number={6} sensorPosition={[position[0]-10, 0, position[2]-5]} onSensedChange={handleSensedChange}/>
      <Sensor number={7} sensorPosition={[position[0]+0, 0, position[2]-10]} onSensedChange={handleSensedChange}/>
      <Sensor number={8} sensorPosition={[position[0]+10, 0, position[2]-5]} onSensedChange={handleSensedChange}/>
      <Sensor number={9} sensorPosition={[position[0]+20, 0, position[2]-10]} onSensedChange={handleSensedChange}/>
      

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
