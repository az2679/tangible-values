import { Text3D } from "@react-three/drei";
import helvetiker from "three/examples/fonts/helvetiker_regular.typeface.json";
import { RigidBody } from '@react-three/rapier';

export default function Controls({position}) {
  return (
    <>
    <RigidBody mass={1} type="fixed" colliders='hull'>
        <Text3D font={helvetiker} position={[position[0], 0, position[2]-10]} rotation={[-Math.PI * 0.5, 0,0]} scale={5} letterSpacing={0.3} >
            {`  w \na s d`}
            <meshBasicMaterial color={"gray"}/>
        </Text3D>
        <Text3D font={helvetiker} position={[position[0]+30, 0, position[2]-5]} rotation={[-Math.PI * 0.5, 0,0]} scale={5} letterSpacing={0.3} >
            {`+  mouse`}
            <meshBasicMaterial color={"gray"}/>
        </Text3D>
    </RigidBody>
    </>
);
}
