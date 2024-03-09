import { useState, useEffect } from "react";
import { CuboidCollider, RigidBody } from "@react-three/rapier";

export default function Sensor({ type, args, sensorArgs, option, number, sensorPosition, onSensedChange, eraserState, resetSensor }) {
  const [count, setCount] = useState(0);
  const [bool, setBool] = useState(false);
  const [color, setColor] = useState("gray");
  const [colorState, setColorState] = useState(false);
  const [num, setNum] = useState(0);

  useEffect(() => {
    if (type === "number") {
      onSensedChange(option, number, count, sensorPosition, num);
    } else if (type === "boolean") {
      onSensedChange(option, bool);
    } else if (type === "color") {
      onSensedChange(option, number, colorState, eraserState);
      if(colorState==true){
        setColor("lightgray")
      } else {
        setColor("gray")
      }
    }
  }, [count, bool, colorState, num]);

  useEffect(() => {
    if (resetSensor == true) {
      setColorState(false)
      setCount(0)
    }
  }, [resetSensor])

  return (
    <>
      <RigidBody name="sensor" mass={1} type="fixed" colliders={false} position={sensorPosition}>
        <mesh position={[0, 0.5, 0]} rotation={[-Math.PI/2, 0, 0]} >
          <planeGeometry args={args} />
          <meshBasicMaterial color={type === "color" ? color : "gray"} />
        </mesh>
        <CuboidCollider sensor args={sensorArgs} 
          onIntersectionEnter={(payload) => {
            if (type === "color"){
              if(eraserState==false && payload.other.rigidBodyObject.name == "person"){
                setColorState(true)
              } else if(eraserState==true && payload.other.rigidBodyObject.name == "eraser"){
                setColorState(false)
              } else if(payload.other.rigidBodyObject.name == "eraser"){
                setColorState(false)
              } 
            } else {
            if (payload.other.rigidBodyObject.name === "coin") {
              setCount((value) => value + 1);
              setNum(payload.other.rigidBodyObject.num)
            } else if (payload.other.rigidBodyObject.name === "fruit") {
              setBool(true);
            }
          }
          }}
          onIntersectionExit={(payload) => {
            if (payload.other.rigidBodyObject.name === "coin") {
              setCount((value) => value - 1);
              // console.log(payload.other.rigidBodyObject.num)
            } else if (payload.other.rigidBodyObject.name === "fruit") {
              setBool(false);
            }
          }}
        />
      </RigidBody>
    </>
  );
}