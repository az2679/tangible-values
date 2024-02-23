import { useState } from "react";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import Text from './Text';

export default function Exchange(props) {
  const { position } = props;
  const[count, setCount] = useState(0)

  return (
    <>
      <RigidBody name="exchange" mass={1} type="fixed" colliders={false} position={[position[0]-20, 1, position[2]]} >
        <mesh position={[0, 0, 0]} rotation={[-Math.PI/2, 0,0]}>
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

      <Text text={`${count}`} state={true} position={[position[0]-20, 15, position[2]]} />

      <RigidBody mass={50} gravityScale={50} type="dynamic" colliders="cuboid" canSleep={false} position={[position[0]-50, 5, position[2]+10]} >
        <mesh name="fruit" position={[0, 0, 0]} rotation={[-Math.PI/2, 0,0]}>
          <boxGeometry args={[15, 10, 10]} />
          <meshStandardMaterial color="#eeeeee" roughness={0.8} metalness={0.2} />
         </mesh>
        </RigidBody>
    </>
  );
}
