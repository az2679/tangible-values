import { useState } from "react";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import Text from './Text';

export default function Exchange(props) {
  const { position } = props;
  const[count, setCount] = useState(0)

  return (
    <>
      <Text text={`${count}`} state={true} position={[position[0]-20, 15, position[2]+100]} />
      <Text text={`<-->`} state={true} position={[position[0]-2, 0, position[2]+100]} rotation={[-Math.PI/2, 0, 0]} />

      <RigidBody name="fruit" mass={800} gravityScale={800} type="dynamic" colliders="cuboid" position={[position[0], 5, position[2]+150]} canSleep={false} lockRotations={true}>
        <mesh position={[0, 0, 0]} rotation={[-Math.PI/2, 0,0]}>
          <boxGeometry args={[15, 10, 10]} />
          <meshStandardMaterial color="#eeeeee" roughness={0.8} metalness={0.2} />
        </mesh>
      </RigidBody>

      <RigidBody name="wall" mass={1} type="fixed" colliders="cuboid" position={[position[0]-60, 5, position[2]+80]}>
      <mesh>
        <boxGeometry args={[40, 30, 2]} />
        <meshStandardMaterial color="#eeeeee" roughness={0.8} metalness={0.2} />
       </mesh>
      </RigidBody>

      <RigidBody name="keepSensor" mass={1} type="fixed" colliders={false} position={[position[0]-60, 1, position[2]+90]} >
        <mesh rotation={[-Math.PI/2, 0,0]}>
          <planeGeometry args={[30, 20]} />
          <meshBasicMaterial color={"gray"}/>
         </mesh>
        <CuboidCollider sensor args={[13, 5,9]} 
          onIntersectionEnter={(payload)=>{
            if(payload.other.rigidBodyObject.name == "fruit"){
              setCount(1)
            }
          }}
          onIntersectionExit={(payload)=>{
            if(payload.other.rigidBodyObject.name == "fruit"){
              setCount(0)
            }
          }}
        />
      </RigidBody>

      <RigidBody name="exchangeSensor" mass={1} type="fixed" colliders={false} position={[position[0]-30, 1, position[2]]} >
        <mesh rotation={[-Math.PI/2, 0,0]}>
          <planeGeometry args={[25, 15]} />
          <meshBasicMaterial color={"gray"}/>
         </mesh>
        <CuboidCollider sensor args={[13, 5,9]} 
          onIntersectionEnter={(payload)=>{
            if(payload.other.rigidBodyObject.name == "fruit"){
              setCount(1)
            }
          }}
          onIntersectionExit={(payload)=>{
            if(payload.other.rigidBodyObject.name == "fruit"){
              setCount(0)
            }
          }}
        />
      </RigidBody>

      <RigidBody name="confederateSensor" mass={1} type="fixed" colliders={false} position={[position[0]+30, 1, position[2]]} >
        <mesh rotation={[-Math.PI/2, 0,0]}>
          <planeGeometry args={[25, 15]} />
          <meshBasicMaterial color={"gray"}/>
         </mesh>
        <CuboidCollider sensor args={[13, 5,9]} 
          onIntersectionEnter={(payload)=>{
            if(payload.other.rigidBodyObject.name == "fruit"){
              setCount(1)
            }
          }}
          onIntersectionExit={(payload)=>{
            if(payload.other.rigidBodyObject.name == "fruit"){
              setCount(0)
            }
          }}
        />
      </RigidBody>
    </>
  );
}

