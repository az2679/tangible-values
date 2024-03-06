import { useState, useRef, useEffect } from "react";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import Text from '../Text/Text';
import Sensor from '../Interaction/Sensor';
import Submit from '../Decision/Submit';
import gsap from 'gsap';

export default function Exchange(props) {
  const { position } = props;
  const[keep, setKeep] = useState(false)
  const[exchange, setExchange] = useState(false)

  const[confed, setConfed] = useState(false)
  const[confedState, setConfedState] = useState(false)
  const[confedText, setConfedText] = useState("null")
  const[confedText1, setConfedText1] = useState("n")

  const userFruit = useRef()
  const confedFruit = useRef()
  const [confedFruitPos, setConfedFruitPos] = useState([position[0]+50, 1, position[2]+25])
  const [confedFruitRo, setConfedFruitRo] = useState([0, -Math.PI*0.1,0])

  const handleSensedChange = (option, bool) => {
    if(option == "keep"){
      setKeep(bool)
    } else if(option == "exchange"){
      setExchange(bool);
    } 
    // else if(option == "confed"){
    //   setConfed(bool);
    // }
  };

  useEffect(() => {
    console.log(confed)
    console.log(confedFruit.current.parent.position)

    const tl = gsap.timeline();
    tl.to(confedFruit.current.parent.position, {
      x: position[0], 
      z: position[2]+50, 
      duration: 5, 
      ease: "power2.inOut",
      onUpdate: () => {
        setConfedFruitPos([...confedFruit.current.parent.position]);
      }
    })
    tl.to(confedFruit.current.parent.rotation, {
      y: 0, 
      duration: 1, 
      ease: "power2.inOut",
      onUpdate: () => {
        setConfedFruitRo([...confedFruit.current.parent.rotation]);
      }
    }, ">-2")
  },[confed])

  const reconcile = () => {
    setConfedState(true)
    
    if(confed == true){
      setConfedText("trade")
      setConfedText1("O")

    } else {
      setConfedText("keep")
      setConfedText1("X")
    }
    
    if(confed == true && exchange == true){
      console.log(`equal trade: confed ${confed}, user ${exchange}`)
    } else if (confed == true && keep == true || confed == false && exchange == true){
      console.log(`unequal trade: confed ${confed}, user ${exchange}`)
    } else if (confed == false && keep == true){
      console.log(`no trade: confed ${confed}, user ${exchange}`)
    }
  }

  return (
    <>
      <Text text={`<-->`} state={true} position={[position[0]-30, 0, position[2]+50]} rotation={[-Math.PI/2, 0, 0]} />
      <Text text={`trade`} state={exchange} position={[position[0]-60, 15, position[2]+50]} />
      <Text text={`keep`} state={keep} position={[position[0]-60, 15, position[2]+190]} />
      <Text text={`${confedText}`} state={confedState} position={[position[0], 15, position[2]+50]} />
      <Text text={`${confedText1}`} state={confedState} position={[position[0], 5, position[2]+50]} />

      <Submit position={[position[0]-30, 0, position[2]+80]} valid={keep || exchange} decisionType={"exchange"} decisionValue={exchange} onSubmit={(randomAssignment) => {setConfed(randomAssignment); reconcile()}} errorPosition={[position[0]+40, 1, position[2]+15]}/>

      <Sensor type="boolean" args={[30, 20]} sensorArgs={[13, 5,9]} option="keep" sensorPosition={[position[0]-60, 1, position[2]+190]} onSensedChange={handleSensedChange} /> 
      <Sensor type="boolean" args={[30, 20]} sensorArgs={[13, 5,9]} option="exchange" sensorPosition={[position[0]-60, 1, position[2]+50]} onSensedChange={handleSensedChange} /> 
      <Sensor type="boolean" args={[30, 20]} sensorArgs={[13, 5,9]} option="confed" sensorPosition={[position[0], 1, position[2]+50]} onSensedChange={handleSensedChange} /> 


      <RigidBody ref={userFruit} name="fruit" mass={800} gravityScale={800} type="dynamic" colliders="cuboid" position={[position[0]-30, 5, position[2]+125]} canSleep={false} lockRotations={true}>
        <mesh position={[0, 0, 0]} rotation={[0, 0,0]}>
          <boxGeometry args={[15, 10, 10]} />
          <meshStandardMaterial color="#eeeeee" roughness={0.8} metalness={0.2} />
        </mesh>
      </RigidBody>

      <RigidBody  name="fruit" mass={800} gravityScale={800} type="dynamic" colliders="cuboid" position={confedFruitPos} rotation={confedFruitRo} canSleep={false} >
        <mesh ref = {confedFruit} >
          <boxGeometry args={[15, 10, 10]} />
          <meshStandardMaterial color="#eeeeee" roughness={0.8} metalness={0.2} />
        </mesh>
      </RigidBody>


      <RigidBody name="wall" mass={1} type="fixed" colliders="cuboid" position={[position[0]-60, 5, position[2]+180]}>
      <mesh>
        <boxGeometry args={[40, 30, 2]} />
        <meshStandardMaterial color="#ffffff" roughness={0.8} metalness={0.2} />
       </mesh>
      </RigidBody>
      <RigidBody name="wall" mass={1} type="fixed" colliders="cuboid" position={[position[0]+60, 5, position[2]+100]} rotation={[0, -Math.PI*0.3,0]}>
      <mesh>
        <boxGeometry args={[40, 30, 2]} />
        <meshStandardMaterial color="#ffffff" roughness={0.8} metalness={0.2} />
       </mesh>
      </RigidBody>
    </>
  );
}

