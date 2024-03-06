import { CylinderCollider, RigidBody } from "@react-three/rapier";


export default function Coin({ position }) {
  return (
    <>
      <RigidBody mass={1} type="dynamic" colliders={false} position ={position} >
        <CylinderCollider args={[0.5, 2]}  />
        <mesh >
          <cylinderGeometry args={[2, 2, 1, 15, 1]}  />
          <meshStandardMaterial color="#eeeeee" roughness={0.8} metalness={0.2} />
        </mesh>
      </RigidBody>

    </>
  );
}