import { RigidBody } from '@react-three/rapier';

export default function Reset({position, onReset, refractory}) {
  const handleClick = () => {
    if(refractory == false){
      onReset()
    } else {
      console.log ("reset button refractory period")
    }
  }

  return (
    <>
    <RigidBody name="reset" mass={1} type="fixed" colliders="cuboid" position={position}>
    <mesh rotation={[-Math.PI/2, 0,0]} onClick={handleClick}>
      <boxGeometry args={[15, 5, 2]} />
      <meshStandardMaterial color="red" roughness={0.8} metalness={0.2} />
     </mesh>
    </RigidBody>
    </>
);
}
