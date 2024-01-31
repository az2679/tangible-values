import { RigidBody, CuboidCollider } from '@react-three/rapier';

export default function Ground() {
  return (
      <RigidBody type="fixed" colliders={false}>
        <mesh position={[0,-1,0]} rotation={[-Math.PI/2, , 0]} >
          <planeGeometry args={[1000, 1000]} />
          <meshBasicMaterial />
        </mesh>
        <CuboidCollider args={[1000, 2, 1000]} position={[0, -3, 0]} />
      </RigidBody>
);
}
