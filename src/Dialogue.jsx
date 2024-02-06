import helvetiker from "three/examples/fonts/helvetiker_regular.typeface.json";
import { extend } from '@react-three/fiber';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

extend({ TextGeometry })

export default function Dialogue(props) {
  const {position, dialogue, state} = props
  const font = new FontLoader().parse(helvetiker);

  return (
    <>
      <mesh position={position ? position : [-7, 15, 0]} visible={state}>
        <textGeometry args={[dialogue ? dialogue : "missing dialogue", {font, size:5, height: 1}]}/>
        <meshLambertMaterial attach='material' color={"gray"}/>
      </mesh>
    </>
);
}