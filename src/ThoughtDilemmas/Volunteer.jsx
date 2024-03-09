import { useState, useRef, useEffect } from "react";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { Vector3, Plane } from "three";
import Text from '../Text/Text';
import Sensor from '../Interaction/Sensor';
import Submit from '../Decision/Submit';
import Reset from '../Decision/Reset';

import gsap from 'gsap';
import Coin from '../Interaction/Coin';

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

function Paper({paperPosition, paperRotation, textPosition, textRotation, text, confedState, flipState}){
  const paper = useRef()

  useEffect(() => {
    if (flipState == true){
    gsap.from(paper.current.rotation, {
        z: 0, 
        duration: 0.1, 
      }, ">");
    gsap.to(paper.current.position, {
      y: 5,
      duration: 0.5, 
    });
    gsap.to(paper.current.rotation, {
      z: Math.PI, 
      duration: 1, 
    }, ">");
    gsap.to(paper.current.position, {
      y: 0,
      duration: 0.5, 
    }, ">");
  } 
  },[flipState])

  return(
    <mesh ref={paper} position={paperPosition} rotation={paperRotation}>
      <boxGeometry args={[10, 0.5, 12]} />
      <meshStandardMaterial color="#eeeeee" roughness={0.8} metalness={0.2} />
      <Text text={`${text}`} state={confedState} position={textPosition} rotation={textRotation}/>
     </mesh>
  );
}

export default function Volunteer({position}) {
  const floorPlane = new Plane(new Vector3(0, 1, 0),0);
  const [dragState, setDragState] = useState(false);

  const [oneSensors, setOneSensors] = useState({});
  const [fiveSensors, setFiveSensors] = useState({});
  const[majority, setMajority] = useState("tie")
  const [eraserState, setEraserState] = useState(false);

  const [confedState, setConfedState] = useState(false)
  const [confed, setConfed] = useState([])
  const [flipState, setFlipState] = useState(false)
  const [payoutText, setPayoutText] = useState("null")
  const [payoutState, setPayoutState] = useState(false)
  const [resetSensor, setResetSensor] = useState(false)
  const [resetState, setResetState] = useState(false)

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
    setFlipState(true)

    setTimeout(() => {
      setConfedState(true)
    }, 1000);

    if (majority === 5 && confed[0] === 5 && confed[1] === 5 && confed[2] === 5){
      console.log(`Lost: User ${majority}, Confed1 ${confed[0]}, Confed2 ${confed[1]}, Confed3 ${confed[2]}`)
      setPayoutState(false)
      setPayoutText(`try again next time`)
    } else {
      console.log(`Pay Out: User ${majority}, Confed1 ${confed[0]}, Confed2 ${confed[1]}, Confed3 ${confed[2]}`)
      setPayoutText(`win`)

      setTimeout(() => {
        setPayoutState(true)
      }, 3500);
    }

    setTimeout(() => {
      setResetState(true)
    }, 6000);
  }

  const renderCoins = (amount, position) => {
    const coinCount = typeof amount === 'number' ? amount : 0;
    const coinArray = Array.from({ length: coinCount }, (_, index) => index);
  
    return coinArray.map((index) => (
      <Coin key={index} position={[position[0], (index+1)*3, position[2]]} />
    ));
  };

  useEffect(() => {
    console.log(confed)
    if (confed.length > 0) {
      reconcile();
      setResetSensor(false)
    }
  }, [confed]);

  const handleReset = () => {
    setConfed([])
    setConfedState(false)
    setFlipState(false) 
    setPayoutState(false)
    setResetSensor(true)

    setResetState(false)

  }

  
  return (
    <>
      <RigidBody name="volunteer" mass={1} type="fixed" colliders="cuboid" position={[position[0]-20, 1, position[2]-100]} >
        <mesh position={[0, 0, 0]} rotation={[-Math.PI/2, 0,0]} >
          {/* <planeGeometry args={[8, 12]} />
          <meshBasicMaterial color={"gray"}/> */}
        </mesh>
      </RigidBody>

      <mesh position={[position[0]+45, 5, position[2]+45]} rotation={[0, -5, 0]}>
        <boxGeometry args={[10, 10, 10]} />
        <meshStandardMaterial color="#eeeeee" roughness={0.8} metalness={0.2} />
      </mesh>
      <mesh position={[position[0]-45, 5, position[2]+45]} rotation={[0, 5, 0]}>
        <boxGeometry args={[10, 10, 10]} />
        <meshStandardMaterial color="#eeeeee" roughness={0.8} metalness={0.2} />
      </mesh>

      <Paper paperPosition={[position[0]-30, 0, position[2]+45]} paperRotation={[0, 4.8, 0]} textPosition={[-12.5,0,2.5]} textRotation={[Math.PI/2, 0, Math.PI]} text={confed[0]} confedState={confedState} flipState={flipState} />
      <Paper paperPosition={[position[0], 0, position[2]+22]} paperRotation={[0, 0, 0]} textPosition={[-12.5,0,-2.5]} textRotation={[-Math.PI/2, 0, Math.PI]} text={confed[1]} confedState={confedState} flipState={flipState} />
      <Paper paperPosition={[position[0]+30, 0, position[2]+45]} paperRotation={[0, -5.25, 0]} textPosition={[12.5,0,2.5]} textRotation={[-Math.PI/2, 0, 0]} text={confed[2]} confedState={confedState} flipState={flipState} />
      <Paper paperPosition={[position[0], 0, position[2]+65]} paperRotation={[0, 0, 0]} textPosition={[1.5,0,2.5]} textRotation={[-Math.PI/2, 0, 0]} text={majority} confedState={confedState} flipState={flipState} />
      
      {payoutState && renderCoins(majority, [position[0], 20, position[2] + 65])}
      {payoutState && renderCoins(confed[0], [position[0]-30, 0, position[2]+45])}
      {payoutState && renderCoins(confed[1], [position[0], 0, position[2]+22])}
      {payoutState && renderCoins(confed[2], [position[0]+30, 0, position[2]+45])}

      <Text text={payoutText} state={flipState} position={[position[0], 0, position[2]+45]} rotation={[-Math.PI * 0.5, 0,0]}/>

      <Eraser position={[position[0], 15, position[2]+180]} onHoldChange={handleHoldChange} />
      {/* <DragObj name="eraser" startPosition={[position[0]-45, 1, position[2]-20]} state={setDragState} plane={floorPlane} lift={1}/> */}

      <Text text={`${majority}`} state={true} position={[position[0], 15, position[2]+120]} />
      <Text text={"or"} state={true} position={[position[0], 0, position[2]+120]} rotation={[-Math.PI * 0.5, 0,0]}/>
      <Text text={"$"} state={true} position={[position[0]-28, 0, position[2]+105]} rotation={[-Math.PI * 0.5, 0,0]}/>
      <Text text={"$"} state={true} position={[position[0]+12, 0, position[2]+105]} rotation={[-Math.PI * 0.5, 0,0]}/>


      <Submit position={[position[0], 0, position[2]+85]} valid={majority !== "tie"} decisionType={"volunteer"} decisionValue={majority} onSubmit={(randomAssignment) => {setConfed([randomAssignment[0], randomAssignment[1], randomAssignment[2]])}} errorPosition={[position[0]+60, 1, position[2]+15]}/>
      <Reset position={[position[0], 0, position[2]-100]} onReset={handleReset} resetState = {resetState} />

      <Sensor type="color" args={[7, 7]} sensorArgs={[3.5,4,3.5]} option="one" number={0} sensorPosition={[position[0]-20, 0, position[2]+110]} onSensedChange={handleSensedChange} eraserState={eraserState} resetSensor={resetSensor}/>
      <Sensor type="color" args={[7, 7]} sensorArgs={[3.5,4,3.5]} option="one" number={1} sensorPosition={[position[0]-20, 0, position[2]+117]} onSensedChange={handleSensedChange} eraserState={eraserState} resetSensor={resetSensor}/>
      <Sensor type="color" args={[7, 7]} sensorArgs={[3.5,4,3.5]} option="one" number={2} sensorPosition={[position[0]-20, 0, position[2]+124]} onSensedChange={handleSensedChange} eraserState={eraserState} resetSensor={resetSensor}/>
      <Sensor type="color" args={[7, 7]} sensorArgs={[3.5,4,3.5]} option="one" number={3} sensorPosition={[position[0]-20, 0, position[2]+131]} onSensedChange={handleSensedChange} eraserState={eraserState} resetSensor={resetSensor}/>
      <Sensor type="color" args={[7, 7]} sensorArgs={[3.5,4,3.5]} option="one" number={4} sensorPosition={[position[0]-20, 0, position[2]+138]} onSensedChange={handleSensedChange} eraserState={eraserState} resetSensor={resetSensor}/>

      <Sensor type="color" args={[7, 7]} sensorArgs={[3.5,4,3.5]} option="five" number={0} sensorPosition={[position[0]+20, 0, position[2]+110]} onSensedChange={handleSensedChange} eraserState={eraserState} resetSensor={resetSensor}/>
      <Sensor type="color" args={[7, 7]} sensorArgs={[3.5,4,3.5]} option="five" number={1} sensorPosition={[position[0]+20, 0, position[2]+117]} onSensedChange={handleSensedChange} eraserState={eraserState} resetSensor={resetSensor}/>
      <Sensor type="color" args={[7, 7]} sensorArgs={[3.5,4,3.5]} option="five" number={2} sensorPosition={[position[0]+20, 0, position[2]+124]} onSensedChange={handleSensedChange} eraserState={eraserState} resetSensor={resetSensor}/>
      <Sensor type="color" args={[7, 7]} sensorArgs={[3.5,4,3.5]} option="five" number={3} sensorPosition={[position[0]+27, 0, position[2]+110]} onSensedChange={handleSensedChange} eraserState={eraserState} resetSensor={resetSensor}/>
      <Sensor type="color" args={[7, 7]} sensorArgs={[3.5,4,3.5]} option="five" number={4} sensorPosition={[position[0]+27, 0, position[2]+124]} onSensedChange={handleSensedChange} eraserState={eraserState} resetSensor={resetSensor}/>
      <Sensor type="color" args={[7, 7]} sensorArgs={[3.5,4,3.5]} option="five" number={5} sensorPosition={[position[0]+27, 0, position[2]+131]} onSensedChange={handleSensedChange} eraserState={eraserState} resetSensor={resetSensor}/>
      <Sensor type="color" args={[7, 7]} sensorArgs={[3.5,4,3.5]} option="five" number={6} sensorPosition={[position[0]+27, 0, position[2]+138]} onSensedChange={handleSensedChange} eraserState={eraserState} resetSensor={resetSensor}/>
      <Sensor type="color" args={[7, 7]} sensorArgs={[3.5,4,3.5]} option="five" number={7} sensorPosition={[position[0]+20, 0, position[2]+138]} onSensedChange={handleSensedChange} eraserState={eraserState} resetSensor={resetSensor}/>
    </>
  );
}
