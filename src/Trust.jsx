import { useRef, useState, useEffect } from "react";
import { RigidBody } from "@react-three/rapier";
import { useFrame, useThree } from "@react-three/fiber";

import { useDrag } from "@use-gesture/react";
import { animated, useSpring } from "@react-spring/three";
import { Vector3, Plane } from "three";


import DragObj from './DragObj';

export default function Trust(props) {
  const { id, position } = props;
  const floorPlane = new Plane(new Vector3(0, 1, 0),0);
  const [dragState, setDragState] = useState(false);

  return (
    <>
      {/* <RigidBody mass={1} type="fixed" colliders="cuboid" > */}
      <DragObj key={id} startPosition={[position[0]-20, 1, position[2]+60]} state={setDragState} plane={floorPlane}/>
      <DragObj key={id} startPosition={[position[0]-30, 1, position[2]+50]} state={setDragState} plane={floorPlane}/>
      {/* </RigidBody> */}
    </>
  );
}

//startPosition={[20, 1, -90]}
