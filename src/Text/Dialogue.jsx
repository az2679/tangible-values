import { RigidBody } from '@react-three/rapier';
import { Text3D, Center } from "@react-three/drei";
import { useTexture } from '@react-three/drei';

import nunito from "../assets/fonts/Nunito_SemiBold_Regular.json"

export default function Dialogue(props) {
  const matcap = useTexture('./matcaps/C7C7D7_4C4E5A_818393_6C6C74.png')
  const {position, dialogue, state} = props

  return (
    <>
     <RigidBody type="fixed">
        <Center top position={position ? position : [0, 0, 0]} rotation={[-Math.PI*0.1, 0, 0]} >
        <Text3D 
          visible={state}
          font={nunito} 
          scale={[2, 2, 3]} 
          letterSpacing={0.5}
          height={0.05}
          lineHeight={1}
          bevelEnabled
          bevelSize={0.1}
          bevelSegments={20}
          bevelThickness={0.25}
          // curveSegments={64}
        >
          {dialogue}
          <meshMatcapMaterial color={"darkgray"} matcap={matcap} />
        </Text3D>
        </Center>
    </RigidBody>
    </>
);
}
