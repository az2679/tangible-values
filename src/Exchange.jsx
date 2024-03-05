import { useState } from "react";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import Text from './Text';
import BoolSensor from './BoolSensor';
import Submit from './Submit';
import SaveDecision from './SaveDecision';
import AnalyzeDecision from './AnalyzeDecision';

export default function Exchange(props) {
  const { position } = props;
  const[keep, setKeep] = useState(false)
  const[exchange, setExchange] = useState(false)

  const[confed, setConfed] = useState(false)
  const[confedState, setConfedState] = useState(false)
  const[confedText, setConfedText] = useState("null")
  const[confedText1, setConfedText1] = useState("n")

  const [invalidAnswer, setInvalidAnswer] = useState(false);


  const handleSensedChange = (option, number, bool) => {
    if(option == "keep"){
      setKeep(bool)
    } else if(option == "exchange"){
      setExchange(bool);
    } 
    // else if(option == "confed"){
    //   setConfed(bool);
    // }
  };

  const randomAssignment = () => {
    if(Math.floor(Math.random()*2) == 0){
      return true
    } else {
      return false
    }
  }
  const handleSubmit = () => {
    if(keep == false && exchange == false){
      setInvalidAnswer(true)
    } else {
    SaveDecision({ decisionType: 'exchange', decisionValue: exchange });
    AnalyzeDecision('exchange');
    
    setConfed(randomAssignment())
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

    setInvalidAnswer(false)
    }
  }

  return (
    <>
      <Text text={`<-->`} state={true} position={[position[0]-2, 0, position[2]+100]} rotation={[-Math.PI/2, 0, 0]} />
      <Text text={`trade`} state={exchange} position={[position[0]-30, 15, position[2]+100]} />
      <Text text={`keep`} state={keep} position={[position[0]-60, 15, position[2]+190]} />
      <Text text={`${confedText}`} state={confedState} position={[position[0]+30, 15, position[2]+100]} />
      <Text text={`${confedText1}`} state={confedState} position={[position[0]+30, 5, position[2]+100]} />

      <Submit position={[position[0]+40, 5, position[2]]} onSubmit={handleSubmit}/>
      <Text text={`invalid answer`} state={invalidAnswer} position={[position[0]+40, 1, position[2]+15]} rotation={[-Math.PI/2, 0,0]} />

      


      <BoolSensor option="keep" number={0} sensorPosition={[position[0]-60, 1, position[2]+190]} onSensedChange={handleSensedChange} /> 
      <BoolSensor option="exchange" number={0} sensorPosition={[position[0]-30, 1, position[2]+100]} onSensedChange={handleSensedChange} /> 
      <BoolSensor option="confed" number={0} sensorPosition={[position[0]+30, 1, position[2]+100]} onSensedChange={handleSensedChange} /> 


      <RigidBody name="fruit" mass={800} gravityScale={800} type="dynamic" colliders="cuboid" position={[position[0], 5, position[2]+150]} canSleep={false} lockRotations={true}>
        <mesh position={[0, 0, 0]} rotation={[-Math.PI/2, 0,0]}>
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
    </>
  );
}

