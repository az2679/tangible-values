import { useState, useEffect } from "react";
import { CuboidCollider, RigidBody } from "@react-three/rapier";

export default function BoolSensor({ option, number, sensorPosition, onSensedChange }) {
  const [bool, setBool] = useState(false);

  useEffect(() => {
    onSensedChange(option, number, bool);
  }, [bool]);

  return(
    <RigidBody name="boolSensor" mass={1} type="fixed" colliders={false} position={sensorPosition ? sensorPosition : [0, 0, 0]} >
      <mesh rotation={[-Math.PI/2, 0,0]}>
        <planeGeometry args={[30, 20]} />
        <meshBasicMaterial color={"gray"}/>
       </mesh>
    <CuboidCollider sensor args={[13, 5,9]} 
       onIntersectionEnter={(payload)=>{
            if(payload.other.rigidBodyObject.name == "fruit"){
              setBool(true)
            }
          }}
          onIntersectionExit={(payload)=>{
            if(payload.other.rigidBodyObject.name == "fruit"){
              setBool(false)
            }
          }}
        />
      </RigidBody>
  )
}

