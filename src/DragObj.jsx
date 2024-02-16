import { useRef, useState, useEffect } from "react";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { useFrame, useThree } from "@react-three/fiber";

import { useDrag } from "@use-gesture/react";
import { animated, useSpring } from "@react-spring/three";
import { Vector3 } from "three";

export default function DragObj({id, startPosition, state, plane}) {
  const [position, setPosition] = useState(startPosition);

  const ref = useRef();
  const { size, viewport } = useThree();
  const aspect = size.width / viewport.width;

  const [spring, api] = useSpring(() => ({
    position: startPosition,
  }));

  const bind = useDrag(
    ({ active, movement: [x, y], timeStamp, event }) => {
      let planeIntersectPoint = new Vector3([0,0,0]);
      if (active) {

        event.ray.intersectPlane(plane, planeIntersectPoint);
        api.start({
          position: [planeIntersectPoint.x, 1, planeIntersectPoint.z],
        });
        // setPosition([planeIntersectPoint.x, 1, planeIntersectPoint.z])

      // console.log(spring.position.animation.to, [planeIntersectPoint.x, 1, planeIntersectPoint.z])

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

// import { useRef, useState, useEffect } from "react";
// import { CuboidCollider, RigidBody } from "@react-three/rapier";
// import { useFrame, useThree } from "@react-three/fiber";

// import { useDrag } from "@use-gesture/react";
// import { animated, useSpring } from "@react-spring/three";
// import { Vector3 } from "three";

// export default function DragObj({ id, startPosition, state, plane }) {
//   const [position, setPosition] = useState([0, 0, 0]);

//   const ref = useRef();
//   const { size, viewport } = useThree();
//   const aspect = size.width / viewport.width;

//   const [spring, api] = useSpring(() => ({
//     position: startPosition,
//   }));

//   const bind = useDrag(
//     ({ active, movement: [x, y], timeStamp, event }) => {

//       if (active) {
//         let planeIntersectPoint = new Vector3([0, 0, 0]);
//         event.ray.intersectPlane(plane, planeIntersectPoint);

//         // api.start({
//         //   position: [planeIntersectPoint.x, 1, planeIntersectPoint.z],
//         // });

//         const [offsetX, offsetZ] = [
//           planeIntersectPoint.x - startPosition[0],
//           planeIntersectPoint.z - startPosition[2]
//         ];
//         api.start({
//           position: [planeIntersectPoint.x, 1, planeIntersectPoint.z],
//         });
//         // setPosition([offsetX, 1, offsetZ]);

//         event.stopPropagation()
//       } else {
//         // Drag completed, update the position
//         setPosition(spring.position.animation.to);
//       }

//       state(active);


//       return timeStamp;
//     },
//     { delay: true }
//   );

//   // useFrame(() => {
//   //   if (ref.current) {
//   //     ref.current.setNextKinematicTranslation(position[0], position[1], position[2]);
//   //     // console.log(ref.current)
//   //   }
//   // });

//   return (
//     <>
//       <RigidBody
//         key={id}
//         mass={1}
//         type="fixed"
//         position={position}
//         colliders="cuboid"
//         canSleep={false}
//         ref={ref}
//       >
//         <animated.mesh {...spring} {...bind()}>
//           <boxGeometry args={[5, 2.5, 5]} />
//           <meshStandardMaterial color="#eeeeee" roughness={0.8} metalness={0.2} />
//         </animated.mesh>
//       </RigidBody>
//     </>
//   );
// }
