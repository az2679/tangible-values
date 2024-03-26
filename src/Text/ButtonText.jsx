import { RigidBody } from '@react-three/rapier';
import { Text3D } from "@react-three/drei";
import nunito from "../assets/fonts/Nunito_SemiBold_Regular.json"

export default function ButtonText({position, text}) {
  return (
    <>
    <RigidBody mass={1} type="fixed" colliders='hull'>
        <Text3D font={nunito} position={[position[0]-7, 0, position[2]]} rotation={[-Math.PI * 0.5, 0,0]} scale={3} letterSpacing={0.1} >
            {text}
            <meshBasicMaterial color={"#ffffff"}/>
        </Text3D>
    </RigidBody>

    </>
);
}
