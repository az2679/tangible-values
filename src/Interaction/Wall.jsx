import { RigidBody } from '@react-three/rapier'
import { MeshTransmissionMaterial } from '@react-three/drei';

export default function Wall({position, rotation}){
  return (
    <RigidBody name="wall" mass={1} type="fixed" colliders="cuboid" position={position} rotation={rotation}>
      <mesh>
        <boxGeometry args={[40, 30, 2]} />
        {/* <meshStandardMaterial color="#eeeeee" roughness={0.8} metalness={0.2} /> */}
        <MeshTransmissionMaterial resolution={1024} distortion={0.25} color="#a9a9a9" thickness={10} anisotropy={1} />
      </mesh>
    </RigidBody>
  );
}
