export default function Path() {
  return (
    <>
    <mesh position={[0,0.5,0]} rotation={[-Math.PI/2, 0, -Math.PI*0.3]} >
      <planeGeometry args={[100, 3]} />
      <meshBasicMaterial color={"darkgray"}/>
    </mesh>

    <mesh position={[0,0.5,90]} rotation={[-Math.PI/2, 0, -Math.PI*0.3]} >
    <planeGeometry args={[100, 3]} />
    <meshBasicMaterial color={"darkgray"}/>
    </mesh>

    <mesh position={[-300,0.5,-450]} rotation={[-Math.PI/2, 0, -Math.PI*0.3]} >
    <planeGeometry args={[100, 3]} />
    <meshBasicMaterial color={"darkgray"}/>
    </mesh>

    <mesh position={[0,0.5,-650]} rotation={[-Math.PI/2, 0, -Math.PI*0.3]} >
    <planeGeometry args={[100, 3]} />
    <meshBasicMaterial color={"darkgray"}/>
    </mesh>

    <mesh position={[300,0.5,-450]} rotation={[-Math.PI/2, 0, -Math.PI*0.3]} >
    <planeGeometry args={[100, 3]} />
    <meshBasicMaterial color={"darkgray"}/>
    </mesh>



    </>
);
}
