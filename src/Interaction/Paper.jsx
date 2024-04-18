import { useRef, useEffect } from "react";
import gsap from 'gsap';
import { MeshTransmissionMaterial } from '@react-three/drei';

import Text from '../Text/Text';

export default function Paper({paperPosition, paperRotation, textPosition, textRotation, text, confedState, flipState}){
  const paper = useRef()

  useEffect(() => {
    if (flipState == true){
    gsap.from(paper.current.rotation, {
        z: 0, 
        duration: 0.1, 
      }, ">");
    gsap.to(paper.current.position, {
      y: 5,
      duration: 0.5, 
    });
    gsap.to(paper.current.rotation, {
      z: Math.PI, 
      duration: 1, 
    }, ">");
    gsap.to(paper.current.position, {
      y: 0,
      duration: 0.5, 
    }, ">");
  } 
  },[flipState])

  return(
      <mesh ref={paper} position={paperPosition} rotation={paperRotation}>
        <boxGeometry args={[10, 0.5, 12]} />
        {/* <meshBasicMaterial color="#7a7a8c" roughness={0.8} metalness={0.2} /> */}
        <meshBasicMaterial color="#97989d" />
        {/* <MeshTransmissionMaterial resolution={1024} distortion={0.25} color="#A9A9A9" thickness={10} anisotropy={1} /> */}
        <Text text={`${text}`} state={confedState} position={textPosition} rotation={textRotation}/>
      </mesh>
  );
}

