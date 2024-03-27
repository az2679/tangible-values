import { useState } from "react";
import { CylinderCollider, RigidBody } from "@react-three/rapier";
import { useDrag } from "@use-gesture/react";
import { animated, useSpring } from "@react-spring/three";
import { Vector3 } from "three";
import { useGLTF } from '@react-three/drei';

export default function DragObj({ name, startPosition, state, plane, lift, num }) {
  const { nodes } = useGLTF('/coin.glb')
  const [position, setPosition] = useState(startPosition);

  const [spring, api] = useSpring(() => ({
    position: startPosition,
  })); 

  const resetObj = () => {
    api.start({
      position: [spring.position.animation.to[0], startPosition[1], spring.position.animation.to[2]],
    });
    setPosition(spring.position.animation.to);
  };

  const bind = useDrag(({ active, event }) => {
    let planeIntersectPoint = new Vector3([0, 0, 0]);
    if (active) {
      event.ray.intersectPlane(plane, planeIntersectPoint);
      api.start({
        position: [planeIntersectPoint.x, lift, planeIntersectPoint.z],
      });
    } else {
      resetObj();
    }
    event.stopPropagation();
    state(active);
  }, { dragEnd: true, delay: true });

  return (
    <>
      <RigidBody
        name={name}
        mass={40}
        gravityScale={20}
        type="dynamic"
        colliders={false}
        canSleep={false}
        num={num || 0}
      >
        <CylinderCollider args={[0.5, 2]} position={position} />
        <animated.mesh {...spring} {...bind()} geometry={nodes.Object_2.geometry} 
        material={nodes.Object_2.material} 
        scale={2}>
          {/* <cylinderGeometry args={[2, 2, 1, 15, 1]} />
          <meshStandardMaterial color="#eeeeee" roughness={0.8} metalness={0.2} /> */}
        </animated.mesh>
      </RigidBody>
    </>
  );
}