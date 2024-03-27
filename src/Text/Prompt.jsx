import { RigidBody } from '@react-three/rapier';
import { Text3D, Center } from "@react-three/drei";
import inter from "../assets/fonts/Inter_ExtraBold_Regular.json"

export default function Prompt(props) {
  const {position, prompt, state} = props

  return (
    <>
     <RigidBody type="fixed">
        <Center position={position ? position : [0, 0, 0]} rotation={[Math.PI * 0.125, 0, 0]} >
        <Text3D 
        font={inter} 
        visible={state}
        scale={2} 
        height={0.1} 
        lineHeight={1.1} 
        letterSpacing={-0.05}
        >
          {prompt}
          <meshBasicMaterial color={"gray"} />
        </Text3D>
        </Center>
    </RigidBody>
    </>
);
}
