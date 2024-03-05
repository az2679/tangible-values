import { useState, useEffect } from "react";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { Vector3, Plane } from "three";

import DragObj from '../Interaction/DragObj';
import Text from '../Text/Text';
import Sensor from '../Interaction/Sensor';
import Submit from '../Decision/Submit';

function NumSensorMult({option, position, handleSensedChange}){
  return(
    <>
      <Sensor type="number" args={[7,7]} sensorArgs={[4, 4, 4]} option={option} number={0} sensorPosition={[position[0]-54, 0, position[2]-45]} onSensedChange={handleSensedChange} />
      <Sensor type="number" args={[7,7]} sensorArgs={[4, 4, 4]} option={option} number={1} sensorPosition={[position[0]-44, 0, position[2]-27]} onSensedChange={handleSensedChange} />
      <Sensor type="number" args={[7,7]} sensorArgs={[4, 4, 4]} option={option} number={2} sensorPosition={[position[0]-34, 0, position[2]-12]} onSensedChange={handleSensedChange}/>
      <Sensor type="number" args={[7,7]} sensorArgs={[4, 4, 4]} option={option} number={3} sensorPosition={[position[0]-21, 0, position[2]-4]} onSensedChange={handleSensedChange}/>
      <Sensor type="number" args={[7,7]} sensorArgs={[4, 4, 4]} option={option} number={4} sensorPosition={[position[0]-7, 0, position[2]+0]} onSensedChange={handleSensedChange}/>
      
      <Sensor type="number" args={[7,7]} sensorArgs={[4, 4, 4]} option={option} number={5} sensorPosition={[position[0]+7, 0, position[2]+0]} onSensedChange={handleSensedChange}/>
      <Sensor type="number" args={[7,7]} sensorArgs={[4, 4, 4]} option={option} number={6} sensorPosition={[position[0]+21, 0, position[2]-4]} onSensedChange={handleSensedChange}/>
      <Sensor type="number" args={[7,7]} sensorArgs={[4, 4, 4]} option={option} number={7} sensorPosition={[position[0]+34, 0, position[2]-12]} onSensedChange={handleSensedChange}/>
      <Sensor type="number" args={[7,7]} sensorArgs={[4, 4, 4]} option={option} number={8} sensorPosition={[position[0]+44, 0, position[2]-27]} onSensedChange={handleSensedChange}/>
      <Sensor type="number" args={[7,7]} sensorArgs={[4, 4, 4]} option={option} number={9} sensorPosition={[position[0]+54, 0, position[2]-45]} onSensedChange={handleSensedChange}/> 
    </>
  )
}
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

export default function Trust(props) {
  const { position } = props;
  const floorPlane = new Plane(new Vector3(0, 1, 0),0);
  const [dragState, setDragState] = useState(false);
  const [confedSensors, setConfedSensors] = useState({});
  const [userSensors, setUserSensors] = useState({});
  const [confedCounter, setConfedCounter] = useState(0);
  const [userCounter, setUserCounter] = useState(0);

  const [confed, setConfed] = useState(0)
  const [confedState, setConfedState] = useState(false)

    const handleSensedChange = (option, number, count) => {
      if(option == "confed"){
        setConfedSensors((prevSensors) => ({
          ...prevSensors,
          [number]:count,
        }));
      }else if(option == "user"){
        setUserCounter(count)
      }
      // } else if(option == "user"){
      //   setUserSensors((prevSensors) => ({
      //     ...prevSensors,
      //     [number]:count,
      //   }));
      // }
    };

    useEffect(() => {
    //acutal total sensed
      // const totalSensed = Object.values(sensors).reduce((acc, currentValue) => acc + currentValue, 0);
    //max 1 sensed allowed in each sensor 
      const totalConfedSensed = Object.values(confedSensors).map(value => Math.min(value, 1)).reduce((acc, currentValue) => acc + currentValue, 0);
      setConfedCounter(totalConfedSensed);

      //max 1 sensed
      // const totalUserSensed = Object.values(userSensors).map(value => Math.min(value, 1)).reduce((acc, currentValue) => acc + currentValue, 0);
      //total sensed
      // const totalUserSensed = Object.values(userSensors).reduce((acc, currentValue) => acc + currentValue, 0);
      // setUserCounter(totalUserSensed);
    }, [confedSensors, userSensors]);


    const reconcile = () => {
      setConfedState(true)
      console.log(`Stage 2: Returned ${confed}`)
    }

  return (
    <>
      <Text text={`${confedCounter}`} state={true} position={[position[0], 0, position[2]+75]} rotation={[-Math.PI*0.1, 0, 0]}/>
      <Text text={`remaining: ${userCounter}`} state={true} position={[position[0], 2, position[2]+195]} rotation={[-Math.PI*0.1, 0, 0]}/>
      <Text text={`stage 2, returned: ${confed}`} state={confedState} position={[position[0], 2, position[2]+55]} rotation={[-Math.PI*0.1, 0, 0]}/>

      <Submit position={[position[0]+40, 5, position[2]]} valid={confedCounter + userCounter === 10} decisionType={"trust"} decisionValue={confedCounter} onSubmit={(randomAssignment) => {setConfed(randomAssignment); reconcile()}} errorPosition={[position[0]+40, 1, position[2]+15]}/>

      <NumSensorMult option="confed" position={[position[0], position[1], position[2]+105]} handleSensedChange={handleSensedChange}/>
      {/* <NumSensorMult option="user" position={[position[0], position[1], position[2]+125]} handleSensedChange={handleSensedChange}/> */}
      <Sensor type="number" args={[40, 30]} sensorArgs={[20, 4,15]} option="user" number={0} sensorPosition={[position[0], 0, position[2]+170]} onSensedChange={handleSensedChange} />

      <CoinMult position={[position[0], position[1], position[2]+175]} setDragState = {setDragState} floorPlane = {floorPlane}/>
    
    </>
  );
}
