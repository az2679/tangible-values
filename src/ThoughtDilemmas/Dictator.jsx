import { useState, useEffect } from "react";
import { Vector3, Plane } from "three";
import { CuboidCollider, RigidBody } from '@react-three/rapier';
import { useGLTF, useTexture } from '@react-three/drei';
import { MeshTransmissionMaterial } from '@react-three/drei';

import DragObj from '../Interaction/DragObj';
import Sensor from '../Interaction/Sensor';
import Text from '../Text/Text';
import Submit from '../Decision/Submit';
import Path from '../Components/Path';
import Label from '../Text/Label';

function CoinMult({position, setDragState, floorPlane}){
  return(
    <>
      <DragObj name="coin" startPosition={[position[0]-10, 1, position[2]+0]} state={setDragState} plane={floorPlane} lift={10}/>
      <DragObj name="coin" startPosition={[position[0]-5, 1, position[2]+0]} state={setDragState} plane={floorPlane} lift={10}/>
      <DragObj name="coin" startPosition={[position[0]-0, 1, position[2]-15]} state={setDragState} plane={floorPlane} lift={10}/>
      <DragObj name="coin" startPosition={[position[0]+5, 1, position[2]-12]} state={setDragState} plane={floorPlane} lift={10}/>
      <DragObj name="coin" startPosition={[position[0]-0, 1, position[2]-5]} state={setDragState} plane={floorPlane} lift={10}/>
      <DragObj name="coin" startPosition={[position[0]+5, 1, position[2]+0]} state={setDragState} plane={floorPlane} lift={10}/>
      <DragObj name="coin" startPosition={[position[0]-10, 1, position[2]-9]} state={setDragState} plane={floorPlane} lift={10}/>
      <DragObj name="coin" startPosition={[position[0]-5, 1, position[2]-11]} state={setDragState} plane={floorPlane} lift={10}/>
      <DragObj name="coin" startPosition={[position[0]+10, 1, position[2]+4]} state={setDragState} plane={floorPlane} lift={10}/>
      <DragObj name="coin" startPosition={[position[0]-0, 1, position[2]+5]} state={setDragState} plane={floorPlane} lift={10}/>
    </>
  )
}

export default function Dictator(props) {
  const { nodes } = useGLTF('/models/rounded_arch.glb')
  const matcap = useTexture('./matcaps/7A7A7A_D9D9D9_BCBCBC_B4B4B4.png')

  const { position, sendSubmit } = props;
  const floorPlane = new Plane(new Vector3(0, 1, 0),0);
  const [dragState, setDragState] = useState(false);
  const [dictator, setDictator] = useState(0);
  const [reciever, setReciever] = useState(0);

  const [submitted, setSubmitted] = useState(false)

  const handleSensedChange = (option, number, count) => {
    if(option == "dictator"){
      setDictator(count)
    } else if(option == "reciever"){
      setReciever(count)
    }
  };

  useEffect(()=> {
    sendSubmit('dictator', submitted)
  },[submitted])

  return (
    <>
      <Text text={`${dictator}`} state={true} position={[position[0]-50, 10, position[2]+85]} />
      <Text text={`${reciever}`} state={true} position={[position[0]+50, 10, position[2]+85]} />
      <Text text={`dictator`} state={true} position={[position[0]-50, 0, position[2]+120]} rotation={[-Math.PI/2, 0,0]}/>
      <Text text={`reciever`} state={true} position={[position[0]+50, 0, position[2]+120]} rotation={[-Math.PI/2, 0,0]}/>

      <Submit position={[0, 0, -370]} valid={dictator + reciever === 10} decisionType={"dictator"} decisionValue={reciever} errorPosition={[position[0]-20, 1, position[2]+40]} refractory={false}/>
      <CuboidCollider sensor args={[7.5, 2, 3.5]} position={[0, 0, -370]}
        onIntersectionExit={(payload) => {
          if(payload.other.rigidBodyObject.children[0].name == "person" && (dictator + reciever === 10)){
            setSubmitted(true)
          }
        }} 
      /> 

      <Sensor type="number" args={[35, 20]} sensorArgs={[17.5, 5, 10]} option="dictator" number={0} sensorPosition={[position[0]-50, 0.5, position[2]+100]} onSensedChange={handleSensedChange} />
      <Sensor type="number" args={[35, 20]} sensorArgs={[17.5, 5, 10]} option="reciever" number={0} sensorPosition={[position[0]+50, 0.5, position[2]+100]} onSensedChange={handleSensedChange} />

      <CoinMult position={[position[0], position[1], position[2]+80]} setDragState = {setDragState} floorPlane = {floorPlane}/>
      
      <RigidBody mass={1} type="fixed" colliders="hull">
      {Object.keys(nodes).map((nodeName) => {
        if (nodeName.startsWith("Object_")) {
          return (
            <mesh key={nodeName} geometry={nodes[nodeName].geometry} position={[position[0], position[1]-5 , position[2] + 445]} rotation={[-Math.PI/2, 0, 0]} scale={0.15}>
              <meshMatcapMaterial matcap={matcap} />
              {/* <MeshTransmissionMaterial resolution={1024} distortion={0.25} color="#ffffff" thickness={10} anisotropy={1} /> */}
            </mesh>
          );
        }
        return null;
      })}
    </RigidBody>


    <Label text={"DICTATOR GAME"} position={[0,5,-450]} rotation={[0,0,0]} scale={3} state={!submitted} />
    <Label text={"VOLUNTEER'S DILEMMA"} position={[-220,5,-550]} rotation={[0,Math.PI*0.25,0]} scale={3} state={submitted} />
    <Label text={"EXCHANGE GAME"} position={[0,5,-625]} rotation={[0,0,0]} scale={3} state={submitted} />
    <Label text={"TRUST GAME"} position={[220,5,-550]} rotation={[0,-Math.PI*0.25,0]} scale={3} state={submitted} />


    <Path position={[0,0,25]} i={1} rotation={[0,0,0]} state = {true}/>

    <Path position={[250,0,-500]} i={1} rotation={[0,Math.PI*0.25,0]} state = {submitted} />
    <Path position={[250,0,-625]} i={-1} rotation={[0,Math.PI*0.25,0]} state = {submitted} />

    <Path position={[0,0,-600]} i={-1} rotation={[0,0,0]} state = {submitted}/>
    <Path position={[0,0,-750]} i={1} rotation={[0,0,0]} state = {submitted} />

    <Path position={[-250,0,-500]} i={-1} rotation={[0,-Math.PI*0.25,0]} state = {submitted} />
    <Path position={[-250,0,-625]} i={1} rotation={[0,-Math.PI*0.25,0]} state = {submitted} />

    </>
  );
}
