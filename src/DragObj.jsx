import { useRef, useState, useEffect } from "react";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { useFrame, useThree } from "@react-three/fiber";

import { useDrag } from "@use-gesture/react";
import { animated, useSpring } from "@react-spring/three";
import { Vector3 } from "three";

export default function DragObj({id, startPosition, state, plane}) {
  const [position, setPosition] = useState(startPosition);

  const ref = useRef();

  const [spring, api] = useSpring(() => ({
    position: startPosition,
  }));

  const bind = useDrag(
    ({ active, timeStamp, event }) => {
      let planeIntersectPoint = new Vector3([0,0,0]);
      if (active) {
        event.ray.intersectPlane(plane, planeIntersectPoint);
        api.start({
          position: [planeIntersectPoint.x, 1, planeIntersectPoint.z],
        });
        event.stopPropagation()
      } 
      else {
        setPosition(spring.position.animation.to)
      }

      state(active);
      return timeStamp;
    },
    { delay: true }
  );

  return (
    <>
      <RigidBody key={id} mass={1} type="fixed" position ={position} colliders='cuboid' canSleep={false} ref={ref}>
        <CuboidCollider args={[2, 1.5, 2]} />
      </RigidBody>
      <animated.mesh {...spring} {...bind()} >
          <boxGeometry args={[5, 2.5, 5]} />
          <meshStandardMaterial color="#eeeeee" roughness={0.8} metalness={0.2} />
      </animated.mesh>
    </>
  );
}