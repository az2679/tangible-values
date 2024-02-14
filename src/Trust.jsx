import { useRef, useState, useEffect } from "react";
import { RigidBody } from "@react-three/rapier";
import { useFrame, useThree } from "@react-three/fiber";

import { useDrag } from "@use-gesture/react";
import { animated, useSpring } from "@react-spring/three";
import { Vector3, Plane } from "three";


import DragObj from './DragObj';

export default function Trust() {
  const floorPlane = new Plane(new Vector3(0, 1, 0),0);
  const [dragState, setDragState] = useState(false);

  return (
    <>
      <DragObj startPosition={[20, 1, -90]} state={setDragState} plane={floorPlane}/>
    </>
  );
}
