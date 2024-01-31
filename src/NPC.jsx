import { useRef } from "react";
import { useBox } from '@react-three/cannon';

import helvetiker from "three/examples/fonts/helvetiker_regular.typeface.json";
import { extend } from '@react-three/fiber';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

extend({ TextGeometry })

export default function NPC(props) {
  const [ref] = useBox(() => ({ 
    mass: 0,
    ...props 
  }), useRef())

  const font = new FontLoader().parse(helvetiker);


  return (
    <>
      <mesh ref={ref}>
        <boxGeometry args={[10, 20, 10]} />
        <meshStandardMaterial color="#eeeeee" roughness={0.8} metalness={0.2} />
        <mesh position={[-7,15,0]}>
          <textGeometry args={['Hello !', {font, size:5, height: 1}]}/>
          <meshLambertMaterial attach='material' color={"gray"}/>
      </mesh>
      </mesh>

      
    </>
);
}
