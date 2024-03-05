import { useState, useEffect } from "react";
import { CuboidCollider, RigidBody } from "@react-three/rapier";

export default function NumSensor({ option, number, sensorPosition, onSensedChange, scale }) {
  const [count, setCounter] = useState(0);

  useEffect(() => {
    onSensedChange(option, number, count);
  }, [count]);

  return(
    <RigidBody name="numSensor" mass={1} type="fixed" colliders={false} position={sensorPosition} >
    <mesh position={[0, 0.5,0]} rotation={[-Math.PI/2, 0,0]} scale={scale ? scale : [1, 1, 1]}>
      <planeGeometry args={[7, 7]} />
      <meshBasicMaterial color={"gray"}/>
     </mesh>
    <CuboidCollider sensor args={[4, 4,4] } 
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