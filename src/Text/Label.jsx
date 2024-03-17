import { Text3D, Center } from "@react-three/drei";
import nunito from "../assets/Nunito_Black_Regular.json"

export default function Label(props) {
  const {position, label, state} = props

  return (
    <>
    <Center top position={position ? position : [0, 0, 0]} rotation={[-Math.PI * 0.5, 0,0]} scale={25} letterSpacing={0.3} >
        <Text3D font={nunito}  visible={state} >
            {label}
        <meshBasicMaterial color={"gray"} />
        </Text3D>
    </Center>
    </>
);
}
