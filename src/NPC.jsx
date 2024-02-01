import { useRef } from "react";
import { RigidBody, CapsuleCollider } from '@react-three/rapier';

import helvetiker from "three/examples/fonts/helvetiker_regular.typeface.json";
import { extend } from '@react-three/fiber';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

extend({ TextGeometry })

export default function NPC(props) {
  const {position} = props
  const textRef = useRef()
  const font = new FontLoader().parse(helvetiker);

  return (
    <>
      <RigidBody mass={1} type="fixed" position={position ? position : [0, 0, 0]} colliders="cuboid" name="NPC">
        <mesh>
          <boxGeometry args={[10, 10, 10]} />
          <meshStandardMaterial color="#eeeeee" roughness={0.8} metalness={0.2} />
          <mesh ref={textRef} position={[-7,15,0]} visible={false}>
            <textGeometry args={['Hello !', {font, size:5, height: 1}]}/>
            <meshLambertMaterial attach='material' color={"gray"}/>
          </mesh>
          <CapsuleCollider args={[5, 60, 5]} sensor name="prox"
            onIntersectionEnter={(payload) => {
              textRef.current.visible = true
              // payload.target.rigidBodyObject.lookAt(payload.other.rigidBodyObject.position())
            }} 
            onIntersectionExit={() => ref.current.visible = false} 
          />
        </mesh>
      </RigidBody>
    </>
);
}



