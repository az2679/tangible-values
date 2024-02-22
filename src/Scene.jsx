import { Canvas } from "@react-three/fiber";
import { Suspense, useState, useRef, useEffect } from "react";
import { Stats, PerspectiveCamera, OrbitControls, MapControls, KeyboardControls } from "@react-three/drei";

import { Physics, RigidBody } from '@react-three/rapier';

import Ground from './Ground';
import CameraRig from './CameraRig';
import Person from './Person';
import Thought from './Thought';

import Trust from './Trust';

import Controls from './Controls';
import Dictator from './Dictator';

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
              <Thought position={[70, 5, -200]} label={"Trust Game"} labelPosition={[100, -7, 160]} dialogue={"Hello !"} dialoguePosition ={[0, 15, 0]} instruction={`
            You have been given 10$ and have to decide how much of it you want to pass to another person.
            In the first stage, you keep the remaining amount not sent, while the receiver gains 3 times the amount sent.
            In the second stage, the receiver may pass nothing or any portion of the money they received back to you. 
            
            How much are you sending?`} > 
                <Trust position={[50, 5, -200]} />
              </Thought>

              <Thought key={"exchange"} position={[-200, 5, 10]} label= {"Exchange Game"} labelPosition={[-100, -7, 160]} dialogue={"Thought Dilemma 2"} dialoguePosition={[0, 15, 0]} instruction={`
                You are playing an exchange game with another person and have to choose between keeping the item you have or exchanging it. 
                You have an apple but prefer an orange, while the other person has an orange and prefers an apple. 
                Both of you prefer both fruit to just one and either fruit to none at all. 
                
                You both have to make a decision, do you keep your fruit or give it to the other person?
                `}>
              </Thought>

              <Thought key={"volunteer"} position={[-400, 5, -400]} label= {"Volunteer's Dilemma"} labelPosition={[-200, -7, 150]} dialogue={"pineapple"} dialoguePosition={[0, 15, 0]} instruction={`
                You are playing a parlor game with a few people. 
                Each person can claim either 1$ or 5$ each. 
                If at least one person chooses 1$, then everyone will get the amount they wrote down. 
                If no one claims 1$, then everyone gets nothing. 
                
                How much are you claiming?
                `}>
              </Thought>

              <Thought key={"dictator"} position={[250, 5, 250]} label= {"Dictator's Game"} labelPosition={[100, -7, 200]} dialogue={"reciever"} dialoguePosition={[0, 15, 0]} instruction={`
                You have been given 10$ and have to decide to how much of it you want to split with another person. 
                You can give all of it, none of it, or a portion of it, 
                while the other person can only accept what has been given / the proposed division. 
                
                How much are you giving?
                `}>
                <Dictator position={[300, 5, 270]} />
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
