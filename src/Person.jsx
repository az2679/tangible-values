import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { Vector3 } from "three";
import { useSphere } from "@react-three/cannon";

import KeyControls from "./KeyControls";

const SPEED = 100;

export default function Person(props) {
    const cameraRef = useRef()
    
    const { forward, backward, left, right } = KeyControls();
      
    const [ref, api] = useSphere(() => ({
        mass: 1,
        type: "Dynamic",
        ...props,
    }), useRef());

    const velocity = useRef([0, 0, 0]);
    useEffect(() => {
        api.velocity.subscribe((v) => (velocity.current = v));
    }, [api.velocity]);

    useFrame(() => {

        let frontVector = new Vector3(0,0,0);
        let sideVector = new Vector3(0,0,0);
        let direction = new Vector3(0,0,0);

        frontVector.set(0, 0, Number(backward) - Number(forward))
        sideVector.set(Number(left) - Number(right), 0, 0)

        direction
            .subVectors(frontVector, sideVector)
            .normalize()
            .multiplyScalar(SPEED)
        api.velocity.set(direction.x, velocity.current[1], direction.z);

        ref.current.getWorldPosition(ref.current.position);

        let cameraOffset = new Vector3(ref.current.position.x, 100, ref.current.position.z+150);
        cameraRef.current.position.copy(cameraOffset);
        cameraRef.current.lookAt(ref.current.position);
        cameraRef.current.updateProjectionMatrix();
    });

    return (
        <>
          <mesh ref={ref} scale={5}>
            <sphereGeometry />
            {/* <meshPhysicalMaterial roughness={0.3} metalness={0.6} /> */}
            <meshNormalMaterial />
          </mesh>
          <PerspectiveCamera ref={cameraRef} position={[0, 100, 150]} args={[60, window.innerWidth / window.innerHeight, 0.1, 4000]} makeDefault />
        </>
    );
}