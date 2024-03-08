import { CylinderCollider, RigidBody } from "@react-three/rapier";
import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';

export default function Coin({ position, onSendCoin, sendPos, delay, payoutState }) {
  const [coinPos, setCoinPos] = useState([position[0], position[1], position[2]])
  const coinRef = useRef()

  // const handleSendCoin = (sendPos) => {
  //   console.log("coin: handle send coins." + `position: ${sendPos}`);
  // };

  // onSendCoin && onSendCoin(handleSendCoin);


  useEffect(()=> {
    console.log(payoutState)
    if (payoutState == true){
      const tl = gsap.timeline();
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
        <mesh ref = {coinRef}>
          <cylinderGeometry args={[2, 2, 1, 15, 1]}  />
          <meshStandardMaterial color="#eeeeee" roughness={0.8} metalness={0.2} />
        </mesh>
      </RigidBody>

    </>
  );
}