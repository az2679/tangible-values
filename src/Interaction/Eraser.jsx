import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { useGLTF } from '@react-three/drei';
import { MeshTransmissionMaterial } from '@react-three/drei';

export default function Eraser({position, onHoldChange}){
  const { nodes } = useGLTF('/models/eraser.glb')

  return (
    <>
    <RigidBody mass={500} gravityScale={500} type="dynamic" position={position} colliders={false} lockRotations={true} canSleep={false} name="eraser">

      <mesh geometry={nodes.Eraser_Low_eraser1_0.geometry} material={nodes.Eraser_Low_eraser1_0.material} scale={300} position={[0, -2, 0]} rotation={[-Math.PI/2, 0, 0]} >
      <MeshTransmissionMaterial resolution={1024} distortion={0.25} color="#a9a9a9" thickness={10} anisotropy={1} />
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