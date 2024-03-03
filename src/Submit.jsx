import { RigidBody, CuboidCollider } from '@react-three/rapier';

export default function Submit({position}) {
  return (
    <RigidBody name="submit" mass={1} type="fixed" colliders="cuboid" position={position}>
    <mesh>
      <boxGeometry args={[10, 5, 2]} />
      <meshStandardMaterial color="#eeeeee" roughness={0.8} metalness={0.2} />
     </mesh>
     <CuboidCollider args={[5, 2.5, 3]} sensor
      onIntersectionEnter={(payload)=>{
        if(payload.other.rigidBodyObject.name == "person"){
          console.log("submitted")
        }}}
        />
    </RigidBody>
);
}
