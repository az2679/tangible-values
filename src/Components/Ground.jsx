import { RigidBody, CuboidCollider } from '@react-three/rapier';
import { MeshReflectorMaterial } from '@react-three/drei';
import { GradientTexture } from '@react-three/drei';


export default function Ground({color}) {
  return (
    <>
      <RigidBody type="fixed" colliders={false} name="ground">
        <mesh position={[0,0,-500]} rotation={[-Math.PI/2, 0, 0]} >
          <planeGeometry args={[3000, 3000]} />
          {/* <meshStandardMaterial color={color !== undefined ? color : 0xEEEEEE} /> */}

          <MeshReflectorMaterial
            blur={[400, 100]}
            resolution={1024}
            mixBlur={1}
            mixStrength={15}
            depthScale={1}
            minDepthThreshold={0.85}
            color="#eeeeee"
            metalness={0.6}
            roughness={1}>
              {/* <GradientTexture stops={[0, 0.5, 1]} colors={['#495057', '#adb5bd', '#e9ecef']} size={10000} /> */}
            </MeshReflectorMaterial>
        </mesh>
        <CuboidCollider args={[5000, 1, 5000]} position={[0, 0, 0]} />
      </RigidBody>
    </>
);
}