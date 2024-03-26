import { Text3D, Center } from "@react-three/drei";
import lato from "../assets/fonts/Lato_Regular.json"
import { RigidBody } from '@react-three/rapier';


export default function Text(props) {
  const {text, state, position, rotation} = props

  return (
    <>
     <RigidBody type="fixed">
      <Center top position={position ? position : [0, 15, 0]} rotation={rotation ? rotation : [0, 0, 0]} scale={5} letterSpacing={0.3}>
        <Text3D font={lato} visible={state}>
          {text}
          <meshBasicMaterial color={"gray"} />
        </Text3D>
      </Center>
    </RigidBody>
    </>
);
}
