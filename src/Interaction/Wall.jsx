import { RigidBody } from '@react-three/rapier'
import { MeshTransmissionMaterial } from '@react-three/drei';
import { useTexture } from '@react-three/drei';

export default function Wall({position, rotation}){
  const matcap = useTexture('./matcaps/636D6C_D4E7ED_ABBCC4_9BA4A8.png')

  return (
    <RigidBody name="wall" mass={1} type="fixed" colliders="cuboid" position={position} rotation={rotation}>
      <mesh>
        <boxGeometry args={[40, 30, 2]} />
        {/* <meshStandardMaterial color="#eeeeee" roughness={0.8} metalness={0.2} transparent opacity={0.7}/> */}
        {/* <meshMatcapMaterial matcap={matcap} transparent opacity={0.7} /> */}
        <meshBasicMaterial color="#97989d" />
        {/* <MeshTransmissionMaterial resolution={124} distortion={0.25} color="#a9a9a9" thickness={10} anisotropy={1} /> */}
      </mesh>
    </RigidBody>
  );
}
