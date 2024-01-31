import { RigidBody } from '@react-three/rapier';

import helvetiker from "three/examples/fonts/helvetiker_regular.typeface.json";
import { extend } from '@react-three/fiber';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

extend({ TextGeometry })

export default function NPC(props) {
  const {position} = props
  const font = new FontLoader().parse(helvetiker);

  return (
    <>
      <RigidBody mass={1} type="fixed" position={position ? position : [0, 0, 0]} colliders="cuboid">
        <mesh>
          <boxGeometry args={[10, 10, 10]} />
          <meshStandardMaterial color="#eeeeee" roughness={0.8} metalness={0.2} />
          <mesh position={[-7,15,0]}>
            <textGeometry args={['Hello !', {font, size:5, height: 1}]}/>
            <meshLambertMaterial attach='material' color={"gray"}/>
          </mesh>
        </mesh>
      </RigidBody>
    </>
);
}



