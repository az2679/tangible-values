import { RigidBody } from '@react-three/rapier';
import { useEffect } from 'react';

export default function Reset({position, onReset, resetState}) {
  
  useEffect(() => {
    console.log(resetState)
  }, [resetState]);

  return (
    <>
    <RigidBody name="reset" mass={1} type="fixed" colliders="cuboid" position={position}>
    <mesh rotation={[-Math.PI/2, 0,0]} onClick={resetState && onReset}>
      <boxGeometry args={[15, 5, 2]} />
      <meshStandardMaterial color="red" roughness={0.8} metalness={0.2} />
     </mesh>
    </RigidBody>
    </>
);
}
