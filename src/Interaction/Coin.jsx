import { CylinderCollider, RigidBody } from "@react-three/rapier";
import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { useGLTF } from '@react-three/drei';
import { MeshTransmissionMaterial } from '@react-three/drei';

export default function Coin({ position, onSendCoin, sendPos, delay, payoutState }) {
  const { nodes } = useGLTF('/models/coin.glb')
  const [coinPos, setCoinPos] = useState([position[0], position[1], position[2]])
  const coinRef = useRef()

  useEffect(()=> {
    // console.log(payoutState)
    if (payoutState == true){
      const tl = gsap.timeline();
      gsap.killTweensOf(coinRef.current.parent.position);
      
      tl.to(coinRef.current.parent.position, {
        x: sendPos[0],
        y: sendPos[1], 
        z: sendPos[2], 
        duration: 2, 
        delay: delay+5,
        ease: "power2.inOut",
        onUpdate: () => {
          setCoinPos([...coinRef.current.parent.position]);
        }
      })
    }
  }, [payoutState])


  return (
    <>
      <RigidBody mass={1} type="dynamic" colliders={false} position={coinPos} canSleep={false} >
        <CylinderCollider args={[0.5, 2]}  />
        <mesh ref = {coinRef} scale={2} geometry={nodes.Object_2.geometry} 
        // material={nodes.Object_2.material}
        >
          <meshStandardMaterial color="#515161" transparent opacity={0.8}/>
          {/* <MeshTransmissionMaterial resolution={1024} distortion={0.25} color="#a9a9a9" thickness={10} anisotropy={1} /> */}

          {/* <cylinderGeometry args={[2, 2, 1, 15, 1]}  />
          <meshStandardMaterial color="#eeeeee" roughness={0.8} metalness={0.2} /> */}
        </mesh>
      </RigidBody>
    </>
  );
}