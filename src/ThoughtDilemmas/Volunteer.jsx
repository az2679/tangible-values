import { useState, useRef, useEffect } from "react";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { Vector3, Plane } from "three";
import Text from '../Text/Text';
import Sensor from '../Interaction/Sensor';
import Submit from '../Decision/Submit';

function Eraser({position, onHoldChange}){
  return (
    <>
    <RigidBody mass={500} gravityScale={500} type="dynamic" position={position} colliders={false} lockRotations={true} canSleep={false} name="eraser">
      <mesh>
        <boxGeometry args={[12,6,10]} />
        <meshStandardMaterial color="#eeeeee" roughness={0.8} metalness={0.2} />
      </mesh>
      <CuboidCollider args={[6, 3, 5]}/>
      <CuboidCollider args={[7, 3, 6]} sensor
      onIntersectionEnter={(payload)=>{
        if(payload.other.rigidBodyObject.name == "person"){
          onHoldChange(true)
        }}}
      onIntersectionExit={(payload)=>{
        if(payload.other.rigidBodyObject.name == "person"){
          onHoldChange(false)
        }}}
        />
    </RigidBody>
    </>
  )
}

export default function Volunteer(props) {
  const ref = useRef()
  const { position } = props;

  const floorPlane = new Plane(new Vector3(0, 1, 0),0);
  const [dragState, setDragState] = useState(false);

  const [oneSensors, setOneSensors] = useState({});
  const [fiveSensors, setFiveSensors] = useState({});
  const[majority, setMajority] = useState("tie")
  const [eraserState, setEraserState] = useState(false);

  const [confedState, setConfedState] = useState(false)
  const [confed, setConfed] = useState([])

  const handleHoldChange = (holdState) => {
    setEraserState(holdState)
  };

  const handleSensedChange = (option, number, colorState, eraserState) => {
    if(option == "one"){
    setOneSensors((prevSensors) => ({
      ...prevSensors,
      [number]:colorState,
    }))
    } else if (option == "five"){
      setFiveSensors((prevSensors) => ({
        ...prevSensors,
        [number]:colorState,
      }))
    }
  };

  useEffect(() => {
    const totalOneSensed = Object.values(oneSensors).filter((value) => value === true).length;
    const totalFiveSensed = Object.values(fiveSensors).filter((value) => value === true).length;
    const portionOne = totalOneSensed / Object.values(oneSensors).length
    const portionFive = totalFiveSensed / Object.values(fiveSensors).length

    if (portionOne > portionFive){
      setMajority(1)
    } else if (portionOne < portionFive){
      setMajority(5)
    } else if (portionOne == portionFive){
      setMajority("tie")
    } 
  }, [oneSensors, fiveSensors]);

  const reconcile = () => {
    setConfedState(true)

    if (majority == 5 && confed[0] == 5 && confed[1] == 5 && confed[2] == 5){
      console.log(`Lost: User ${majority}, Confed1 ${confed[0]}, Confed2 ${confed[1]}, Confed3 ${confed[2]}`)
    } else {
      console.log(`Pay Out: User ${majority}, Confed1 ${confed[0]}, Confed2 ${confed[1]}, Confed3 ${confed[2]}`)
    }
  }

  return (
    <>
      <RigidBody name="volunteer" mass={1} type="fixed" colliders="cuboid" position={[position[0]-20, 1, position[2]-100]} >
        <mesh ref={ref} position={[0, 0, 0]} rotation={[-Math.PI/2, 0,0]} >
          {/* <planeGeometry args={[8, 12]} />
          <meshBasicMaterial color={"gray"}/> */}
        </mesh>
      </RigidBody>

      <mesh position={[position[0]+30, 5, position[2]+30]} rotation={[0, -5, 0]}>
        <boxGeometry args={[10, 10, 10]} />
        <meshStandardMaterial color="#eeeeee" roughness={0.8} metalness={0.2} />
      </mesh>
      <mesh position={[position[0]-30, 5, position[2]+30]} rotation={[0, 5, 0]}>
        <boxGeometry args={[10, 10, 10]} />
        <meshStandardMaterial color="#eeeeee" roughness={0.8} metalness={0.2} />
      </mesh>

      <Eraser position={[position[0], 15, position[2]+180]} onHoldChange={handleHoldChange} />
      {/* <DragObj name="eraser" startPosition={[position[0]-45, 1, position[2]-20]} state={setDragState} plane={floorPlane} lift={1}/> */}

      <Text text={`${majority}`} state={true} position={[position[0], 15, position[2]+120]} />
      <Text text={"or"} state={true} position={[position[0], 0, position[2]+120]} rotation={[-Math.PI * 0.5, 0,0]}/>
      <Text text={"$"} state={true} position={[position[0]-28, 0, position[2]+105]} rotation={[-Math.PI * 0.5, 0,0]}/>
      <Text text={"$"} state={true} position={[position[0]+12, 0, position[2]+105]} rotation={[-Math.PI * 0.5, 0,0]}/>


      <Submit position={[position[0]+60, 5, position[2]]} valid={majority !== "tie"} decisionType={"volunteer"} decisionValue={majority} onSubmit={(randomAssignment) => {setConfed([randomAssignment[0], randomAssignment[1], randomAssignment[2]]); reconcile()}} errorPosition={[position[0]+60, 1, position[2]+15]}/>

      <Text text={`${confed[0]}`} state={confedState} position={[position[0]-30, 15, position[2]+30]} rotation={[0, 0.5, 0]}/>
      <Text text={`${confed[1]}`} state={confedState} position={[position[0], 15, position[2]]} />
      <Text text={`${confed[2]}`} state={confedState} position={[position[0]+30, 15, position[2]+30]} rotation={[0, -0.5, 0]} />

      <Sensor type="color" args={[7, 7]} sensorArgs={[3.5,4,3.5]} option="one" number={0} sensorPosition={[position[0]-20, 0, position[2]+100]} onSensedChange={handleSensedChange} eraserState={eraserState}/>
      <Sensor type="color" args={[7, 7]} sensorArgs={[3.5,4,3.5]} option="one" number={1} sensorPosition={[position[0]-20, 0, position[2]+107]} onSensedChange={handleSensedChange} eraserState={eraserState}/>
      <Sensor type="color" args={[7, 7]} sensorArgs={[3.5,4,3.5]} option="one" number={2} sensorPosition={[position[0]-20, 0, position[2]+114]} onSensedChange={handleSensedChange} eraserState={eraserState}/>
      <Sensor type="color" args={[7, 7]} sensorArgs={[3.5,4,3.5]} option="one" number={3} sensorPosition={[position[0]-20, 0, position[2]+121]} onSensedChange={handleSensedChange} eraserState={eraserState}/>
      <Sensor type="color" args={[7, 7]} sensorArgs={[3.5,4,3.5]} option="one" number={4} sensorPosition={[position[0]-20, 0, position[2]+128]} onSensedChange={handleSensedChange} eraserState={eraserState}/>

      <Sensor type="color" args={[7, 7]} sensorArgs={[3.5,4,3.5]} option="five" number={0} sensorPosition={[position[0]+20, 0, position[2]+100]} onSensedChange={handleSensedChange} eraserState={eraserState}/>
      <Sensor type="color" args={[7, 7]} sensorArgs={[3.5,4,3.5]} option="five" number={1} sensorPosition={[position[0]+20, 0, position[2]+107]} onSensedChange={handleSensedChange} eraserState={eraserState}/>
      <Sensor type="color" args={[7, 7]} sensorArgs={[3.5,4,3.5]} option="five" number={2} sensorPosition={[position[0]+20, 0, position[2]+114]} onSensedChange={handleSensedChange} eraserState={eraserState}/>
      <Sensor type="color" args={[7, 7]} sensorArgs={[3.5,4,3.5]} option="five" number={3} sensorPosition={[position[0]+27, 0, position[2]+100]} onSensedChange={handleSensedChange} eraserState={eraserState}/>
      <Sensor type="color" args={[7, 7]} sensorArgs={[3.5,4,3.5]} option="five" number={4} sensorPosition={[position[0]+27, 0, position[2]+114]} onSensedChange={handleSensedChange} eraserState={eraserState}/>
      <Sensor type="color" args={[7, 7]} sensorArgs={[3.5,4,3.5]} option="five" number={5} sensorPosition={[position[0]+27, 0, position[2]+121]} onSensedChange={handleSensedChange} eraserState={eraserState}/>
      <Sensor type="color" args={[7, 7]} sensorArgs={[3.5,4,3.5]} option="five" number={6} sensorPosition={[position[0]+27, 0, position[2]+128]} onSensedChange={handleSensedChange} eraserState={eraserState}/>
      <Sensor type="color" args={[7, 7]} sensorArgs={[3.5,4,3.5]} option="five" number={7} sensorPosition={[position[0]+20, 0, position[2]+128]} onSensedChange={handleSensedChange} eraserState={eraserState}/>
    </>
  );
}
