import { useState } from "react";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import Text from './Text';
import BoolSensor from './BoolSensor';

export default function Exchange(props) {
  const { position } = props;
  const[keep, setKeep] = useState(false)
  const[exchange, setExchange] = useState(false)

  const[confed, setConfed] = useState(false)


  const handleSensedChange = (option, number, bool) => {
    if(option == "keep"){
      setKeep(bool)
    } else if(option == "exchange"){
      setExchange(bool);
    } else if(option == "confed"){
      setConfed(bool);
    }
  };

  return (
    <>
      <Text text={`<-->`} state={true} position={[position[0]-2, 0, position[2]+100]} rotation={[-Math.PI/2, 0, 0]} />
      <Text text={`trade`} state={exchange} position={[position[0]-30, 15, position[2]+100]} />
      <Text text={`keep`} state={keep} position={[position[0]-60, 15, position[2]+190]} />
      


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

