import { useState, useRef, useEffect } from "react";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { Vector3, Plane } from "three";
import Text from './Text';
import DragObj from './DragObj';

function Eraser({position, onHoldChange}){
  return (
    <>
    <RigidBody mass={500} gravityScale={500} type="dynamic" position={position} colliders={false} lockRotations={true} canSleep={false} name="eraser">
      <mesh>
        <boxGeometry args={[7,5,5]} />
        <meshStandardMaterial color="#eeeeee" roughness={0.8} metalness={0.2} />
      </mesh>
      <CuboidCollider args={[3.5, 2.5, 2.5]}/>
      <CuboidCollider args={[5, 4, 4]} sensor
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


function BoolSensor({ option, number, sensorPosition, onSensedChange, eraserState }) {
  const [color, setColor] = useState("gray");
  const [colorState, setColorState] = useState(false);

  useEffect(() => {
    onSensedChange(option, number, colorState);
    if(colorState==true){
      setColor("lightgray")
    } else {
      setColor("gray")
    }
  }, [colorState]);

  return(
    <RigidBody name="volunteer" mass={1} type="fixed" colliders={false} position={sensorPosition} >
    <mesh position={[0, 0.5, 0]} rotation={[-Math.PI/2, 0,0]}>
      <planeGeometry args={[7, 7]} />
      <meshBasicMaterial color={color}/>
     </mesh>
    <CuboidCollider sensor args={[3.5,4,3.5]} 
      onIntersectionEnter={(payload)=>{
        if(eraserState==false && payload.other.rigidBodyObject.name == "person"){
          setColorState(true)
        } else if(eraserState==true && payload.other.rigidBodyObject.name == "eraser"){
          setColorState(false)
        } else if(payload.other.rigidBodyObject.name == "eraser"){
          setColorState(false)
        } 
      }}
    />
  </RigidBody>
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


  return (
    <>
      <RigidBody name="volunteer" mass={1} type="fixed" colliders="cuboid" position={[position[0]-20, 1, position[2]]} >
        <mesh ref={ref} position={[0, 0, 0]} rotation={[-Math.PI/2, 0,0]} >
          {/* <planeGeometry args={[8, 12]} />
          <meshBasicMaterial color={"gray"}/> */}
        </mesh>
      </RigidBody>

      <Eraser position={[position[0]-45, 15, position[2]-20]} onHoldChange={handleHoldChange} />
      {/* <DragObj name="eraser" startPosition={[position[0]-45, 1, position[2]-20]} state={setDragState} plane={floorPlane} lift={1}/> */}

      <Text text={`${majority}`} state={true} position={[position[0], 15, position[2]+20]} />
      <Text text={"or"} state={true} position={[position[0], 0, position[2]+20]} rotation={[-Math.PI * 0.5, 0,0]}/>
      <Text text={"$"} state={true} position={[position[0]-28, 0, position[2]+5]} rotation={[-Math.PI * 0.5, 0,0]}/>
      <Text text={"$"} state={true} position={[position[0]+12, 0, position[2]+5]} rotation={[-Math.PI * 0.5, 0,0]}/>

      <BoolSensor option="one" number={0} sensorPosition={[position[0]-20, 0, position[2]]} onSensedChange={handleSensedChange} eraserState={eraserState}/>
      <BoolSensor option="one" number={1} sensorPosition={[position[0]-20, 0, position[2]+7]} onSensedChange={handleSensedChange} eraserState={eraserState}/>
      <BoolSensor option="one" number={2} sensorPosition={[position[0]-20, 0, position[2]+14]} onSensedChange={handleSensedChange} eraserState={eraserState}/>
      <BoolSensor option="one" number={3} sensorPosition={[position[0]-20, 0, position[2]+21]} onSensedChange={handleSensedChange} eraserState={eraserState}/>
      <BoolSensor option="one" number={4} sensorPosition={[position[0]-20, 0, position[2]+28]} onSensedChange={handleSensedChange} eraserState={eraserState}/>


      <BoolSensor option="five" number={0} sensorPosition={[position[0]+20, 0, position[2]]} onSensedChange={handleSensedChange} eraserState={eraserState}/>
      <BoolSensor option="five" number={1} sensorPosition={[position[0]+20, 0, position[2]+7]} onSensedChange={handleSensedChange} eraserState={eraserState}/>
      <BoolSensor option="five" number={2} sensorPosition={[position[0]+20, 0, position[2]+14]} onSensedChange={handleSensedChange} eraserState={eraserState}/>
      <BoolSensor option="five" number={3} sensorPosition={[position[0]+27, 0, position[2]]} onSensedChange={handleSensedChange} eraserState={eraserState}/>
      <BoolSensor option="five" number={4} sensorPosition={[position[0]+27, 0, position[2]+14]} onSensedChange={handleSensedChange} eraserState={eraserState}/>
      <BoolSensor option="five" number={5} sensorPosition={[position[0]+27, 0, position[2]+21]} onSensedChange={handleSensedChange} eraserState={eraserState}/>
      <BoolSensor option="five" number={6} sensorPosition={[position[0]+27, 0, position[2]+28]} onSensedChange={handleSensedChange} eraserState={eraserState}/>
      <BoolSensor option="five" number={7} sensorPosition={[position[0]+20, 0, position[2]+28]} onSensedChange={handleSensedChange} eraserState={eraserState}/>
    </>
  );
}
