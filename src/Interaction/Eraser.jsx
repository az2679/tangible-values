import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { useGLTF } from '@react-three/drei';
import { MeshTransmissionMaterial } from '@react-three/drei';
import { useTexture } from '@react-three/drei';

export default function Eraser({position, onHoldChange}){
  const { nodes } = useGLTF('/models/eraser.glb')
  const matcap = useTexture('./matcaps/1D2424_565F66_4E555A_646C6E.png')

  return (
    <>
    <RigidBody mass={500} gravityScale={500} type="dynamic" position={position} colliders={false} lockRotations={true} canSleep={false} name="eraser">

      <mesh scale={300} position={[0, -2, 0]} rotation={[-Math.PI/2, 0, 0]} geometry={nodes.Eraser_Low_eraser1_0.geometry} 
      // material={nodes.Eraser_Low_eraser1_0.material} 
      >
      <meshBasicMaterial color="#44454c"/>
      {/* <meshStandardMaterial color="#97989d" transparent opacity={0.7}/> */}
      {/* <MeshTransmissionMaterial resolution={1024} distortion={0.25} color="#a9a9a9" thickness={10} anisotropy={1} /> */}
      </mesh>

      <CuboidCollider args={[8, 3, 3]}/>
      <CuboidCollider args={[8, 2, 3]} sensor
      onIntersectionEnter={(payload)=>{
        if(payload.other.rigidBodyObject.name == "person"){
          onHoldChange(true)
        }}}
      onIntersectionExit={(payload)=>{
        if(payload.other.rigidBodyObject.name == "person"){
          onHoldChange(false)
        }}}
        />
    </RigidBody>
    </>
  )
}