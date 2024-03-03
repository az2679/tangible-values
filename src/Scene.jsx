import { Canvas } from "@react-three/fiber";
import { Suspense, useState, useRef, useEffect } from "react";
import { Stats, PerspectiveCamera, OrbitControls, MapControls, KeyboardControls } from "@react-three/drei";

import { Physics, RigidBody } from '@react-three/rapier';

import Ground from './Ground';
import CameraRig from './CameraRig';
import Person from './Person';
import Thought from './Thought';

import Controls from './Controls';
import Trust from './Dictator';
import Dictator from './Trust';
import Exchange from './Exchange';
import Volunteer from './Volunteer';

function Scene() { 
  return (
    <div id="canvas_wrapper">
      <KeyboardControls
      map={[
        { name: "forward", keys: ["ArrowUp", "w", "W"] },
        { name: "backward", keys: ["ArrowDown", "s", "S"] },
        { name: "left", keys: ["ArrowLeft", "a", "A"] },
        { name: "right", keys: ["ArrowRight", "d", "D"] },
      ]}>
      <Canvas shadows={true} tabIndex={0} >
        <color args={["#eeeeee"]} attach="background" />
        <fogExp2 attach="fog" args={["#eeeeee", 0.0003]} />
        <axesHelper args={[10]} />

        {/* Camera 🎥 */}
        {/* Controls */}

        {/* Lights 💡 */}
        <ambientLight intensity={1} />
        <directionalLight color="#ffffff" position={[50, 50, 0]} intensity={1} />
        {/* Objects 📦 */}
        <Suspense fallback={null}>
          <Physics debug gravity={[0, -9.8,0]} colliders={false}>
            <Ground />
            <CameraRig>
              <Controls position={[20, 0, 70]} />
              <Person />

              <Thought key={"dictator"} position={[0, 5, -350]} label= {"Dictator's Game"} labelPosition={[100, -7, 250]} startDialogue={"thought"} instructionDialogue={"drag and drop a coin into the sensors"} dialoguePosition={[0, 15, 0]} instruction={`
                You have been given 10$ and have to decide to how much of it you want to split with another person. 
                You can give all of it, none of it, or a portion of it, 
                while the other person can only accept what has been given / the proposed division. 
                
                How much are you giving?
                `}>
                <Trust position={[-40, 5, -275]} />
              </Thought>

              <Thought key={"volunteer"} position={[-550, 5, -800]} label= {"Volunteer's Dilemma"} labelPosition={[-100, -7, 250]} startDialogue={"pineapple"} instructionDialogue={"color the option by walking over it. if you change your mind, push the eraser over it"} dialoguePosition={[0, 15, 0]} instruction={`
                You are playing a parlor game with a few people. 
                Each person can claim either 1$ or 5$ each. 
                If at least one person chooses 1$, then everyone will get the amount they wrote down. 
                If no one claims 1$, then everyone gets nothing. 
                
                How much are you claiming?
                `}>
                <Volunteer position={[-550, 5, -700]}/>
              </Thought>

              <Thought key={"exchange"} position={[0, 5, -1200]} label= {"Exchange Game"} labelPosition={[100, -7, 260]} startDialogue={"Thought Dilemma 2"} instructionDialogue={"push the box onto the plate"} dialoguePosition={[0, 15, 0]} instruction={`
                You are playing an exchange game with another person and have to choose between keeping the item you have or exchanging it. 
                You have an apple but prefer an orange, while the other person has an orange and prefers an apple. 
                Both of you prefer both fruit to just one and either fruit to none at all. 
                
                You both have to make a decision, do you keep your fruit or give it to the other person?
                `}>
                  <Exchange position={[0, 5, -1100]} />
              </Thought>

              <Thought position={[550, 5, -800]} label={"Trust Game"} labelPosition={[-120, -7, 260]} startDialogue={"Hello ! come closer "} instructionDialogue={"drag and drop the coins into the basket"} dialoguePosition ={[0, 15, 0]} instruction={`
            You have been given 10$ and have to decide how much of it you want to pass to another person.
            In the first stage, you keep the remaining amount not sent, while the receiver gains 3 times the amount sent.
            In the second stage, the receiver may pass nothing or any portion of the money they received back to you. 
            
            How much are you sending?`} > 
                
                <Dictator position={[620, 5, -775]} />
              </Thought>
             


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
