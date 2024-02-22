import { Text3D, Center } from "@react-three/drei";
import helvetiker from "three/examples/fonts/helvetiker_regular.typeface.json";
import { RigidBody } from '@react-three/rapier';


export default function Instruction(props) {
  const {position, instruction, state, onClick} = props

  return (
    <>
     <RigidBody type="fixed">
      <Center top position={position ? position : [0, 0, 0]} rotation={[Math.PI * 0.15, 0, 0]} scale={[0.5, 0.6, 1]} height={0.7} lineHeight={0.9} letterSpacing={0.3} onClick={onClick}>
        <Text3D font={helvetiker} scale={3} visible={state}>
          {instruction}
          <meshBasicMaterial color={"gray"} />
        </Text3D>
      </Center>
    </RigidBody>
    </>
);
}
