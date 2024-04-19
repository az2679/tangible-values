import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import { Stats, KeyboardControls, Loader } from "@react-three/drei";
import { Physics } from '@react-three/rapier';

import LoadingScreen from './Components/LoadingScreen';
import Ground from './Components/Ground';
import CameraRig from './CameraRig';
import Person from './Person';
import Thought from './Thought';
import Foyer from './Components/Foyer';

import Dictator from './ThoughtDilemmas/Dictator';
import Volunteer from './ThoughtDilemmas/Volunteer';
import Exchange from './ThoughtDilemmas/Exchange';
import Trust from './ThoughtDilemmas/Trust';
import About from './Components/About';
import Archways from './Components/Archways';
import Directory from './Components/Directory';

function Scene() { 
  const [proximityToThoughts, setProximityToThoughts] = useState([true, true, true, true]) //[false, false, false, false]
  const [submissions, setSubmissions] = useState({dictator:false, volunteer:false, exchange:false, trust:false});
  const [complete, setComplete] = useState(false);
  
  const countSubmissions = (key, submitState) => {
    setSubmissions((prevSubmitState) => ({
      ...prevSubmitState,
      [key]: submitState,
    }));
  };

  useEffect(() => {
    if (submissions && Object.keys(submissions).length > 0) {
      // if(Object.values(submissions).some((value) => value === true)){
      if(Object.values(submissions).every((value) => value === true)){
        setTimeout(() => {
          setComplete(true);
        }, 3000);
      }
    }
  }, [submissions]);

  const handleProximityToThoughts = (proximity) => {
    // setProximityToThoughts([proximity[0], proximity[1], proximity[2], proximity[3]])
  }

  return ( 
    <div id="canvas_wrapper">
      <KeyboardControls
      map={[
        { name: "forward", keys: ["ArrowUp", "w", "W"] },
        { name: "backward", keys: ["ArrowDown", "s", "S"] },
        { name: "left", keys: ["ArrowLeft", "a", "A"] },
        { name: "right", keys: ["ArrowRight", "d", "D"] },
      ]}>
      <Canvas shadows tabIndex={0} exposure={3}>
        <color args={["#eeeeee"]} attach="background" />
        <fogExp2 attach="fog" args={["#eeeeee", 0.003]} />
        {/* <axesHelper args={[10]} /> */}

        <ambientLight intensity={1} />
        <directionalLight color="#ffffff" position={[300, 50, 100]} intensity={1} />
        {/* <directionalLight color="#ffffff" position={[0, -54, 77]} intensity={1} /> */}

        <Suspense 
        fallback={<LoadingScreen />}
        >
          <Physics gravity={[0, -9.8,0]} colliders={false}>
            <Ground color={0xF7F7F7}/>

            <CameraRig >
              <Foyer position={[20, 0, 70]} />
              <Archways dictatorPos={[0, 5, -470]} volunteerPos={[-550, 5, -800]} exchangePos={[0, 5, -1100]} trustPos={[550, 5, -800]}/>
              <Directory submitted={submissions.dictator} />
              {/* <LoadingScreen /> */}

              <Person submissions={complete} sendProximityToThoughts={handleProximityToThoughts} />

            {proximityToThoughts[0] && 
              <Thought key={"dictatorGame"} 
                position={[0, 5, -370]} 
                meshPos={[0,6, 150]} 
                startDialogue={"HELLO THERE ! COME CLOSER"} 
                startPosition={[0, 20, 150]} 
                updateDialogue={` DRAG THE COINS TO THE MARKED AREA \nACCORDING TO YOUR PROPOSED DIVISION.`} updatePosition={[-10, 20, 150]} 
                endDialogue={`TAKE YOUR TIME`}
                endPosition={[15, 20, 150]} 
                prompt={`
                  you have been given 10$ and have to decide
                  how much of it you want to split with another person. 
                  you can give all of it, none of it, or a portion of it, 
                  while the other person can only accept what has been given. 
                          
                  as the dictator, how will you distribute the coins?
                `} 
                promptPosition={[0, 40, 130]}
                submissions={submissions} >
                <Dictator key={"dictator"} position={[0, 5, -470]} sendSubmit={countSubmissions}/>
              </Thought>
             }

            {proximityToThoughts[1] && 
              <Thought key={"volunteerDilemma"} 
                position={[-550, 5, -800]} 
                startDialogue={"FEELING  RISKY  TODAY ?"} 
                startPosition={[0, 20, 0]} 
                updateDialogue={`  COLOR THE OPTION BY WALKING OVER IT.\nIF YOU CHANGE YOUR MIND, USE THE ERASER.`}  updatePosition={[-20, 20, 0]} 
                endDialogue={`MAY LUCK BE ON YOUR SIDE`}
                endPosition={[0, 20, 0]}
                prompt={`
                  you are playing a parlor game with a few people. 
                  each person can claim either 1$ or 5$ each. 
                  if at least one person chooses 1$, 
                  then everyone will get the amount they wrote down. 
                  if no one claims 1$, then everyone gets nothing. 
                    
                  how much are you claiming?
                `} 
                submissions={submissions} >
                <Volunteer key={"volunteer"} position={[-550, 5, -800]} sendSubmit={countSubmissions}/>
              </Thought>
            }

            {proximityToThoughts[2] && 
              <Thought key={"exchangeGame"} 
                position={[0, 5, -1100]} 
                startDialogue={"WANNA  MAKE  A  TRADE ?"} 
                startPosition={[0, 20, 0]} 
                updateDialogue={`PUSH THE BOX ONTO THE LEFT AREA TO EXCHANGE \n    OR HIDE IT BEHIND THE LEFT WALL TO KEEP`} 
                updatePosition={[-35, 20, 0]} 
                endDialogue={`ONCE BITTEN, TWICE SHY.`}
                endPosition={[0, 20, 0]}
                prompt={`
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
                  `} 
                  submissions={submissions} >
                  <Exchange key={"exchange"} position={[0, 5, -1100]} sendSubmit={countSubmissions} />
              </Thought>
            }

            {proximityToThoughts[3] && 
              <Thought key={"trustGame"} 
                position={[550, 5, -800]} 
                startDialogue={"DO  YOU  TRUST  ME ?"} 
                startPosition={[0, 20, 0]} 
                updateDialogue={`DRAG THE AMOUNT OF COINS YOU WANT \n    TO SEND ONTO THE MARKED AREAS`} 
                updatePosition ={[-20, 20, 0]} 
                endDialogue={`FOOL ME ONCE, SHAME ON YOU. \nFOOL ME TWICE, SHAME ON ME.`}
                endPosition={[0, 20, 0]}
                prompt={`
                  you have been given 10$ and have to decide 
                  how much of it you want to pass to another person.
                  in the first stage, you keep the remaining amount not sent, 
                  while the receiver gains 3 times the amount sent.
                  in the second stage, the receiver may 
                  pass nothing or any portion of the money they received back to you. 
                              
                  how much are you sending?
                  `} 
                  submissions={submissions} > 
                <Trust key={"trust"} position={[550, 5, -800]} sendSubmit={countSubmissions} />
              </Thought>
            }

              
              {/* {complete && <About />} */}
              {/* <About /> */}

            </CameraRig>
          </Physics>
        </Suspense>
        <Stats />
      </Canvas>
      </KeyboardControls>
    </div>
  );
}

export default Scene;
