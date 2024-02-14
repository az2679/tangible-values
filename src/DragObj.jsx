import { useRef, useState, useEffect } from "react";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { useFrame, useThree } from "@react-three/fiber";

import { useDrag } from "@use-gesture/react";
import { animated, useSpring } from "@react-spring/three";
import { Vector3 } from "three";


export default function DragObj({startPosition, state, plane}) {
  const [position, setPosition] = useState(startPosition);

  const ref = useRef();
  const { size, viewport } = useThree();
  const aspect = size.width / viewport.width;

  let planeIntersectPoint = new Vector3();

  const [spring, api] = useSpring(() => ({
    position: position,
    scale: 1,
    rotation: [0, 0, 0],
    config: { friction: 10 }
  }));

  const bind = useDrag(
    ({ active, movement: [x, y], timeStamp, event }) => {
      // if (active) {
      //   event.ray.intersectPlane(plane, planeIntersectPoint);
      //   setPosition([planeIntersectPoint.x, 0, planeIntersectPoint.z]);
      // }

      if (active) {
        event.ray.intersectPlane(plane, planeIntersectPoint);
        const [offsetX, offsetZ] = [
          planeIntersectPoint.x - startPosition[0],
          planeIntersectPoint.z - startPosition[2]
        ];
        setPosition([ offsetX, 1, offsetZ]);
      }

      state(active);

      // api.start({
      //   // position: active ? [x / aspect, -y / aspect, 0] : [0, 0, 0],
      //   position: position,
      //   scale: 1,
      //   rotation: [y / aspect, x / aspect, 0]
      // });
      return timeStamp;
    },
    { delay: true }
  );

  return (
    <>
      <RigidBody mass={1} type="fixed" position={position ? position : [0, 0, 0]} colliders="cuboid" canSleep={false} >
      <animated.mesh {...spring} {...bind()} >
          <boxGeometry args={[5, 2.5, 5]} ref={ref}/>
          <meshStandardMaterial color="#eeeeee" roughness={0.8} metalness={0.2} />
      </animated.mesh>
      </RigidBody>
    </>
  );
}
