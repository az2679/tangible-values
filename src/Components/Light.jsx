import { SpotLight } from '@react-three/drei'
import { useState } from 'react'
import * as THREE from 'three'

export default function Light({position}) {
  const [target] = useState(() => new THREE.Object3D())

  return (
    <mesh position={position}>
      <SpotLight
        castShadow
        target={target}
        penumbra={0.8}
        radiusTop={0.1}
        radiusBottom={2000}
        distance={1000}
        angle={-Math.PI/2}
        attenuation={500}
        anglePower={5}
        intensity={1}
        opacity={0.9}
      />
      <primitive object={target} position={[0, -1, 0]} />
    </mesh>
  )
}