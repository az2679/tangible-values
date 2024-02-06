import { useRef } from 'react';
import { Vector3 } from "three";
import { useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from "@react-three/drei";



export default function CameraRig(props){
  const { player, proximity } = props
  const cameraRef = useRef();

  const cameraOffset = new Vector3(0,0,0);
  const cameraOffset1 = new Vector3();

  useFrame(() => {
    if(player.x != undefined){

    cameraOffset1.set(player.x, 60, player.z+80);
    cameraOffset.set(player.x, 100, player.z+150);

    if(proximity){
    // cameraRef.current.position.lerp(cameraOffset1, 0.8)
      cameraRef.current.position.copy(cameraOffset1);
      cameraRef.current.lookAt(player.x, player.y, player.z);
      cameraRef.current.updateProjectionMatrix();
    } else {
    // cameraRef.current.position.lerp(cameraOffset, 0.2)
      cameraRef.current.position.copy(cameraOffset);
      cameraRef.current.lookAt(player.x, player.y, player.z);
      cameraRef.current.updateProjectionMatrix();
    }
   }
  });


  return(
    <PerspectiveCamera ref={cameraRef} position={[0, 100, 150]} args={[60, window.innerWidth / window.innerHeight, 0.1, 4000]} makeDefault />
  );
}
