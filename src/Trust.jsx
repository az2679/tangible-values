import { useState, useEffect } from "react";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { Vector3, Plane } from "three";

import DragObj from './DragObj';
import Text from './Text';
import NumSensor from './NumSensor';
import Submit from './Submit';
import SaveDecision from './SaveDecision';
import AnalyzeDecision from './AnalyzeDecision';

function NumSensorMult({option, position, handleSensedChange}){
  return(
    <>
      <NumSensor option={option} number={0} sensorPosition={[position[0]-54, 0, position[2]-45]} onSensedChange={handleSensedChange}/>
      <NumSensor option={option} number={1} sensorPosition={[position[0]-44, 0, position[2]-27]} onSensedChange={handleSensedChange}/>
      <NumSensor option={option} number={2} sensorPosition={[position[0]-34, 0, position[2]-12]} onSensedChange={handleSensedChange}/>
      <NumSensor option={option} number={3} sensorPosition={[position[0]-21, 0, position[2]-4]} onSensedChange={handleSensedChange}/>
      <NumSensor option={option} number={4} sensorPosition={[position[0]-7, 0, position[2]+0]} onSensedChange={handleSensedChange}/>
      
      <NumSensor option={option} number={5} sensorPosition={[position[0]+7, 0, position[2]+0]} onSensedChange={handleSensedChange}/>
      <NumSensor option={option} number={6} sensorPosition={[position[0]+21, 0, position[2]-4]} onSensedChange={handleSensedChange}/>
      <NumSensor option={option} number={7} sensorPosition={[position[0]+34, 0, position[2]-12]} onSensedChange={handleSensedChange}/>
      <NumSensor option={option} number={8} sensorPosition={[position[0]+44, 0, position[2]-27]} onSensedChange={handleSensedChange}/>
      <NumSensor option={option} number={9} sensorPosition={[position[0]+54, 0, position[2]-45]} onSensedChange={handleSensedChange}/>
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

  const [invalidAnswer, setInvalidAnswer] = useState(false);

    const handleSensedChange = (option, number, count) => {
      if(option == "confed"){
        setConfedSensors((prevSensors) => ({
          ...prevSensors,
          [number]:count,
        }));
      } else if(option == "user"){
        setUserSensors((prevSensors) => ({
          ...prevSensors,
          [number]:count,
        }));
      }
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


    const randomAssignment = () => {
      return Math.floor(Math.random()*((confedCounter*3) + 1));
    }
    const handleSubmit = () => {
      SaveDecision({ decisionType: 'trust', decisionValue: confedCounter });
      AnalyzeDecision('trust');

      setConfed(randomAssignment())
      setConfedState(true)

      console.log(`Stage 2: Returned ${confed}`)
    }

  return (
    <>
      <Text text={`${confedCounter}`} state={true} position={[position[0], 0, position[2]+75]} rotation={[-Math.PI*0.1, 0, 0]}/>
      <Text text={`remaining: ${userCounter}`} state={true} position={[position[0], 2, position[2]+195]} rotation={[-Math.PI*0.1, 0, 0]}/>

      <Text text={`stage 2, returned: ${confed}`} state={confedState} position={[position[0], 2, position[2]+55]} rotation={[-Math.PI*0.1, 0, 0]}/>

      <NumSensorMult option="confed" position={[position[0], position[1], position[2]+105]} handleSensedChange={handleSensedChange}/>
      {/* <NumSensorMult option="user" position={[position[0], position[1], position[2]+125]} handleSensedChange={handleSensedChange}/> */}

      <RigidBody name="trust" mass={1} type="fixed" colliders={false} position={[position[0], 0, position[2]+170]} >
        <mesh position={[0, 0.5, 0]} rotation={[-Math.PI/2, 0,0]}>
          <planeGeometry args={[40, 30]} />
          <meshBasicMaterial color={"gray"}/>
        </mesh>
        <CuboidCollider sensor args={[20, 4,15] } 
          onIntersectionEnter={(payload)=>{
            if(payload.other.rigidBodyObject.name == "coin"){
              setUserCounter((value) => value + 1)
            }
          }}
          onIntersectionExit={(payload)=>{
            if(payload.other.rigidBodyObject.name == "coin"){
              setUserCounter((value) => value - 1)
            }
          }}
        />
      </RigidBody>

      <Submit position={[position[0]+40, 5, position[2]]} onSubmit={handleSubmit}/>
      <Text text={`invalid answer`} state={invalidAnswer} position={[position[0]+40, 1, position[2]+15]} rotation={[-Math.PI/2, 0,0]} />

      <CoinMult position={[position[0], position[1], position[2]+175]} setDragState = {setDragState} floorPlane = {floorPlane}/>
    
    </>
  );
}
