import { RigidBody } from '@react-three/rapier'
import { MeshTransmissionMaterial } from '@react-three/drei';

export default function Wall({position, rotation}){
  return (
    <RigidBody name="wall" mass={1} type="fixed" colliders="cuboid" position={position} rotation={rotation}>
      <mesh>
        <boxGeometry args={[40, 30, 2]} />
        <meshBasicMaterial color="#696870" /> 
        {/* <MeshTransmissionMaterial resolution={124} distortion={0.25} color="#a9a9a9" thickness={10} anisotropy={1} /> */}
      </mesh>
    </RigidBody>
  );
}
