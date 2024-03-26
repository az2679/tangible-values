export default function Path({position, rotation, i, visible}) {
  return (
    <>
    <group rotation={rotation} visible={visible}>
      <mesh position={[position[0]+(5 *i),25,position[2]-30]} rotation={[Math.PI/2, 0, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshBasicMaterial color={"gray"} />
      </mesh> 

      <mesh position={[position[0]-(5 *i),25,position[2]]} rotation={[Math.PI/2, 0, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshBasicMaterial color={"gray"} />
      </mesh>

      <mesh position={[position[0]+(5 *i),25,position[2]+30]} rotation={[Math.PI/2, 0, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshBasicMaterial color={"gray"} />
      </mesh>

      </group>
    </>
);
}
