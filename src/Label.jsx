import { Text3D, Center } from "@react-three/drei";
import helvetiker from "three/examples/fonts/helvetiker_regular.typeface.json";
import { RigidBody } from '@react-three/rapier';


export default function Label(props) {
  const {position, label, state, onClick} = props


  return (
    <>
    {/* <RigidBody mass={1} type="fixed" colliders={false} canSleep={false} onClick = {onClick} > */}
        <Center top position={position ? position : [0, 0, 0]} rotation={[-Math.PI * 0.5, 0,0]} scale={25} letterSpacing={0.3} >
        <Text3D font={helvetiker}  visible={state} >
            {label}
            <meshBasicMaterial color={"gray"}/>
        </Text3D>
        </Center>
    {/* </RigidBody> */}
    </>
);
}
