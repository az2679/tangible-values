import { Text3D } from "@react-three/drei";
import helvetiker from "three/examples/fonts/helvetiker_regular.typeface.json";
import { RigidBody } from '@react-three/rapier';
import { Html } from '@react-three/drei';
import { useState } from 'react';

function Help({hidden}) {
  return(
    <Html position={[ -140, 40, 0]} 
    style={{ 
        opacity: hidden ? 0 : 0.7,
        backgroundColor:"gray",
        height: '300px',
        width: '700px',
        padding: '50px',

        fontSize: '20px',
        listStyleType:'circle'
        }}
    >
        <div>
        <p> 
        Tangible Values is a gallery space for direct interaction with thought experiments, providing a dynamic environment for exploration and contemplation.
        </p>
        <br />
        <p> 
        Instructions
        </p>
        <ul>
            <li>Walk up to the guide to display the thought dilemma. Follow the prompts given by the guide and interact with the objects nearby to answer.</li>
            <li>Once ready, walk over the submit button. If your answer has changed, click on the reset button behind the guide.</li>
            <li>Follow the path towards other thought dilemmas. If far away, clicking on the guide will reveal what thought dilemma the area contains.</li>
        </ul>
        </div>
    </Html>
  )
}

export default function Controls({position}) {
  const [hiddenState, setHiddenState] = useState(true)

  return (
    <>
    <RigidBody mass={1} type="fixed" colliders='hull'>
        <Text3D font={helvetiker} position={[position[0]-100, 0, position[2]+120]} rotation={[-Math.PI * 0.5, 0,0]} scale={3} letterSpacing={0.1} >
            {`TANGIBLE VALUES`}
            <meshBasicMaterial color={"black"}/>
        </Text3D>
    </RigidBody>


    <RigidBody mass={1} type="fixed" colliders='hull'>
        <Text3D font={helvetiker} position={[position[0]+25, 0, position[2]+100]} rotation={[-Math.PI * 0.5, 0,0]} scale={3} letterSpacing={0.1} onClick={() => setHiddenState(!hiddenState)}>
            {`help`}
            <meshBasicMaterial color={"darkgray"}/>
        </Text3D>
    </RigidBody>

    <Help hidden={hiddenState}/>


    <RigidBody mass={1} type="fixed" colliders='hull'>
        <Text3D font={helvetiker} position={[position[0], 0, position[2]+80]} rotation={[-Math.PI * 0.5, 0,0]} scale={5} letterSpacing={0.3} >
            {`  w \na s d`}
            <meshBasicMaterial color={"gray"}/>
        </Text3D>
        <Text3D font={helvetiker} position={[position[0]+30, 0, position[2]+85]} rotation={[-Math.PI * 0.5, 0,0]} scale={5} letterSpacing={0.3} >
            {`+  mouse`}
            <meshBasicMaterial color={"gray"}/>
        </Text3D>
    </RigidBody>
    </>
);
}
