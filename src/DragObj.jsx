import { useRef, useState, useEffect } from "react";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { useFrame, useThree } from "@react-three/fiber";

import { useDrag } from "@use-gesture/react";
import { animated, useSpring } from "@react-spring/three";
import { Vector3 } from "three";


export default function DragObj({id, startPosition, state, plane}) {
  // const [position, setPosition] = useState(startPosition);

  const ref = useRef();
  const { size, viewport } = useThree();
  const aspect = size.width / viewport.width;



  const [spring, api] = useSpring(() => ({
    position: startPosition,
    // scale: 1,
    // rotation: [0, 0, 0],
    // config: { friction: 100 }
  }));

  // console.log(position)
  

  const bind = useDrag(
    ({ active, movement: [x, y], timeStamp, event }) => {
      

      // if (active) {
      //   // console.log("test")
      //   event.ray.intersectPlane(plane, planeIntersectPoint);
      //   setPosition([planeIntersectPoint.x, 0, planeIntersectPoint.z]);
      // }

      if (active) {
        let planeIntersectPoint = new Vector3([0,0,0]);

        // console.log("test", planeIntersectPoint)
        event.ray.intersectPlane(plane, planeIntersectPoint);
        const [offsetX, offsetZ] = [
          planeIntersectPoint.x - startPosition[0],
          planeIntersectPoint.z - startPosition[2]
        ];
        // setPosition([ offsetX, 1, offsetZ]);
        if (!isNaN(offsetX) && !isNaN(offsetZ)) {
        api.start({
          position: [planeIntersectPoint.x, 1, planeIntersectPoint.z],
          // scale: 1,
          // rotation: [0, 0, 0],
        });
        }

      // console.log("offsetX", offsetX);
      // console.log("offsetZ", offsetZ);
      // console.log("new position", [offsetX, 1, offsetZ]);

      // console.log(spring.position.animation.to)
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
      <RigidBody key={id} mass={1} type="fixed" position={[0,0,0]} colliders="cuboid" canSleep={false} >
      <animated.mesh {...spring} {...bind()} >
          <boxGeometry args={[5, 2.5, 5]} ref={ref}/>
          <meshStandardMaterial color="#eeeeee" roughness={0.8} metalness={0.2} />
      </animated.mesh>
      </RigidBody>
    </>
  );
}
