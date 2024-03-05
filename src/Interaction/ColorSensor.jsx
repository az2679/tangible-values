import { useState, useEffect } from "react";
import { CuboidCollider, RigidBody } from "@react-three/rapier";

export default function ColorSensor({ option, number, sensorPosition, onSensedChange, eraserState }) {
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