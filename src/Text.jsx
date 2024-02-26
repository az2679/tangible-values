import { Text3D, Center } from "@react-three/drei";
import helvetiker from "three/examples/fonts/helvetiker_regular.typeface.json";
import { RigidBody } from '@react-three/rapier';


export default function Text(props) {
  const {text, state, position, rotation} = props

  return (
    <>
     <RigidBody type="fixed">
      <Center top position={position ? position : [0, 15, 0]} rotation={rotation ? rotation : [0, 0, 0]} scale={5} letterSpacing={0.3}>
        <Text3D font={helvetiker} visible={state}>
          {text}
          <meshBasicMaterial color={"gray"} />
        </Text3D>
      </Center>
    </RigidBody>
    </>
);
}
