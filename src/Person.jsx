import { useRef, useEffect } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { Vector3 } from "three";
import { useSphere } from "@react-three/cannon";

import KeyControls from "./KeyControls";

const SPEED = 100;

export default function Person(props) {
    const { camera } = useThree();
    camera.fov = 60;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.near = 0.1;
    camera.far = 4000;
    // camera.position.set(0, 100, -100);

    const { forward, backward, left, right } =
      KeyControls();
      
    // Making sphere from cannonjs
    const [ref, api] = useSphere(() => ({
        mass: 100,
        type: "Dynamic",
        ...props,
    }), useRef());

    // Calculating front/side movement + applying velocity
    const velocity = useRef([0, 0, 0]);
    useEffect(() => {
        api.velocity.subscribe((v) => (velocity.current = v));
    }, [api.velocity]);

    useFrame(() => {
        

        let frontVector = new Vector3(0,0,0);
        let sideVector = new Vector3(0,0,0);
        let direction = new Vector3(0,0,0);

        frontVector.set(0, 0, Number(forward) - Number(backward))
        sideVector.set(Number(right) - Number(left), 0, 0)

        // const direction = new Vector3();
        // const frontVector = new Vector3(0, 0, Number(backward) - Number(forward));
        // const sideVector = new Vector3(Number(left) - Number(right), 0, 0);
        direction
            .subVectors(frontVector, sideVector)
            .normalize()
            .multiplyScalar(SPEED)
            // .applyEuler(camera.rotation);
        api.velocity.set(direction.x, velocity.current[1], direction.z);

        // Updating sphere position 
        ref.current.getWorldPosition(ref.current.position)

        camera.lookAt(ref.current.position);
        let cameraOffset = new Vector3(ref.current.position.x, 100, ref.current.position.z-150);
        camera.position.copy(cameraOffset);
    });

    return (
        <>
          <mesh ref={ref} scale={5}>
            <sphereGeometry />
            <meshPhysicalMaterial roughness={0.3} metalness={0.6} />
          </mesh>
        </>
    );
}