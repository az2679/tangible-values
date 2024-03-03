import { RigidBody, CuboidCollider } from '@react-three/rapier';

export default function Ground() {
  return (
      <RigidBody type="fixed" colliders={false} name="ground">
        <mesh position={[0,0,0]} rotation={[-Math.PI/2, 0, 0]} >
          <planeGeometry args={[10000, 10000]} />
          <meshBasicMaterial />
        </mesh>
        <CuboidCollider args={[5000, 1, 5000]} position={[0, 0, 0]} />
      </RigidBody>
);
}
