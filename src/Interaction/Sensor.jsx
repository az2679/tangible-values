import { useState, useEffect } from "react";
import { CuboidCollider, RigidBody } from "@react-three/rapier";

export default function Sensor({ type, args, sensorArgs, option, number, sensorPosition, onSensedChange, eraserState }) {
  const [count, setCount] = useState(0);
  const [bool, setBool] = useState(false);
  const [color, setColor] = useState("gray");
  const [colorState, setColorState] = useState(false);

  useEffect(() => {
    if (type === "number") {
      onSensedChange(option, number, count);
    } else if (type === "boolean") {
      onSensedChange(option, bool);
    } else if (type === "color") {
      onSensedChange(option, number, colorState);
      if(colorState==true){
        setColor("lightgray")
      } else {
        setColor("gray")
      }
    }
  }, [count, bool, colorState]);

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
            } else if (payload.other.rigidBodyObject.name === "fruit") {
              setBool(true);
            }
          }
          }}
          onIntersectionExit={(payload) => {
            if (payload.other.rigidBodyObject.name === "coin") {
              setCount((value) => value - 1);
            } else if (payload.other.rigidBodyObject.name === "fruit") {
              setBool(false);
            }
          }}
        />
      </RigidBody>
    </>
  );
}





function NumSensor({ option, number, sensorPosition, onSensedChange, scale }) {
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
function BoolSensor({ option, number, sensorPosition, onSensedChange }) {
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
function ColorSensor({ option, number, sensorPosition, onSensedChange, eraserState }) {
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