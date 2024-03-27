import { RigidBody } from '@react-three/rapier';
import { Text3D, Center } from "@react-three/drei";
import inter from "../assets/fonts/Inter_Medium_Regular.json"

export default function Dialogue(props) {
  const {position, dialogue, state} = props

  return (
    <>
     <RigidBody type="fixed">
        <Center top position={position ? position : [0, 0, 0]} rotation={[-Math.PI*0.1, 0, 0]} >
        <Text3D 
          font={inter} 
          scale={4} 
          letterSpacing={0}
          height={0.025}
          lineHeight={0.9}
          visible={state}
          bevelEnabled
          bevelSize={0.01}
          bevelSegments={10}
          bevelThickness={0.2}
        >
          {dialogue}
          <meshBasicMaterial color={"gray"} />
        </Text3D>
        </Center>
    </RigidBody>
    </>
);
}
