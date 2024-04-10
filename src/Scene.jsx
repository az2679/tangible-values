import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import { Stats, KeyboardControls, Loader } from "@react-three/drei";
import { Physics } from '@react-three/rapier';

import LoadingScreen from './Components/LoadingScreen';
import Ground from './Components/Ground';
import CameraRig from './CameraRig';
import Person from './Person';
import Thought from './Thought';
import Foyer from './Text/Foyer';

import Dictator from './ThoughtDilemmas/Dictator';
import Volunteer from './ThoughtDilemmas/Volunteer';
import Exchange from './ThoughtDilemmas/Exchange';
import Trust from './ThoughtDilemmas/Trust';

function Scene() { 
  // const [distanceToThoughts, setDistanceToThoughts] = useState([])
  // useEffect(()=>{
  //   let newDistance = []
  //   for(let i =0;i<distanceToThoughts.length; i++){
  //     let distanceToThought = dist();
  //     newDistance.push(distanceToThought);
  //   }
  //   setDistanceToThoughts(newDistance)
  // },[//user postion])


  return ( 
    <div id="canvas_wrapper">
      <KeyboardControls
      map={[
        { name: "forward", keys: ["ArrowUp", "w", "W"] },
        { name: "backward", keys: ["ArrowDown", "s", "S"] },
        { name: "left", keys: ["ArrowLeft", "a", "A"] },
        { name: "right", keys: ["ArrowRight", "d", "D"] },
      ]}>
      <Canvas shadows={true} tabIndex={0} exposure={3}>
        <color args={["#eeeeee"]} attach="background" />
        <fogExp2 attach="fog" args={["#eeeeee", 0.003]} />
        {/* <axesHelper args={[10]} /> */}


        <ambientLight intensity={1} />
        <directionalLight color="#ffffff" position={[300, 50, 100]} intensity={1} />
        {/* <directionalLight color="#ffffff" position={[0, -54, 77]} intensity={1} /> */}


        <Suspense fallback={<LoadingScreen />}>
          <Physics gravity={[0, -9.8,0]} colliders={false}>
            <Ground color={0xF7F7F7}/>

            <CameraRig>
              <Foyer position={[20, 0, 70]} />
              {/* <Person position={[50, 100, -300]} /> */}
              {/* <Person position={[0, 300, -700]} /> */}
              <Person />
              {/* {distanceToThoughts[0] < radiusOfTheThought? //render the componenet: null } */}
              <Thought key={"dictator"} position={[0, 5, -370]} meshPos={[0,6, 150]} startDialogue={"HELLO THERE ! COME CLOSER"} startPosition={[0, 20, 150]} updateDialogue={` DRAG THE COINS TO THE MARKED AREA \nACCORDING TO YOUR PROPOSED DIVISION.`} updatePosition={[-10, 20, 150]} prompt={`
              you have been given 10$ and have to decide
              how much of it you want to split with another person. 
              you can give all of it, none of it, or a portion of it, 
              while the other person can only accept what has been given. 
                      
              as the dictator, how will you distribute the coins?
              `} promptPosition={[0, 40, 130]}>
                <Dictator position={[0, 5, -470]} />
              </Thought>

              {/* <Thought key={"volunteer"} position={[-550, 5, -800]} startDialogue={"FEELING  RISKY  TODAY ?"} startPosition={[0, 20, 0]} updateDialogue={`  COLOR THE OPTION BY WALKING OVER IT.\nIF YOU CHANGE YOUR MIND, USE THE ERASER.`}  updatePosition={[-20, 20, 0]} prompt={`
              you are playing a parlor game with a few people. 
              each person can claim either 1$ or 5$ each. 
              if at least one person chooses 1$, 
              then everyone will get the amount they wrote down. 
              if no one claims 1$, then everyone gets nothing. 
                
              how much are you claiming?
                `} >
                <Volunteer position={[-550, 5, -800]}/>
              </Thought> */}

              {/* <Thought key={"exchange"} position={[0, 5, -1100]} startDialogue={"WANNA  DO  A  TRADE ?"} startPosition={[0, 20, 0]} updateDialogue={`PUSH THE BOX ONTO THE LEFT AREA TO EXCHANGE \n    OR HIDE IT BEHIND THE LEFT WALL TO KEEP`} updatePosition={[-35, 20, 0]} prompt={`
              you are playing an exchange game with another person and 
              can keep the item you have or exchange it. 
              when exchanging, you both have to make a decision beforehand 
              without knowing what the other person will do. 
              you have an apple but prefer an orange, 
              while the other person has an orange and prefers an apple. 
              both of you prefer obtaining both fruit to just one 
              and prefer either fruit to none at all. 

              knowing there’s a chance of obtaining both, one, or no fruit, 
              do you keep your fruit, decieving the other person, or exchange it?
              `} >
                  <Exchange position={[0, 5, -1100]} />
              </Thought> */}

              {/* <Thought position={[550, 5, -800]} startDialogue={"DO  YOU  TRUST  ME ?"} startPosition={[0, 20, 0]} updateDialogue={`DRAG THE AMOUNT OF COINS YOU WANT \n    TO SEND ONTO THE MARKED AREAS`} updatePosition ={[-20, 20, 0]} prompt={`
              you have been given 10$ and have to decide 
              how much of it you want to pass to another person.
              in the first stage, you keep the remaining amount not sent, 
              while the receiver gains 3 times the amount sent.
              in the second stage, the receiver may 
              pass nothing or any portion of the money they received back to you. 
                          
              how much are you sending?`
              } > 
                <Trust position={[550, 5, -800]} />
              </Thought> */}

            </CameraRig>
          </Physics>
        </Suspense>
        <Stats />
      </Canvas>
      </KeyboardControls>
      {/* <Loader /> */}
    </div>
  );
}

export default Scene;
