import { useRef } from "react";
import { usePlane } from '@react-three/cannon'

export default function Ground(props) {
  const [ref] = usePlane(() => ({ 
    mass: 0,
    rotation: [-Math.PI / 2, 0, 0], 
    ...props 
  }), useRef())

  return (
    <>
      <mesh ref={ref}>
        <planeGeometry args={[10000, 10000]} />
        <meshStandardMaterial color="#eeeeee" roughness={0.8} metalness={0.2} />
      </mesh>
    </>
);
}
