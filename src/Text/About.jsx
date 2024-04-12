import { Html } from '@react-three/drei';
import { useState } from 'react';
import { RigidBody, CapsuleCollider } from '@react-three/rapier';
import { useCubeTexture, Float } from '@react-three/drei';
import { useTexture } from '@react-three/drei';

import nunito from "../assets/fonts/Nunito_SemiBold_Regular.json"
import Label from './Label';

export default function About({position}){
  const texture = useCubeTexture(
    ["px.png", "nx.png", "py.png", "ny.png", "pz.png", "nz.png"],
    {path: "./textures/sky/"}
    )
  // const matcap = useTexture('./matcaps/181F1F_475057_616566_525C62.png')
  const matcap = useTexture('./matcaps/3B3C3F_DAD9D5_929290_ABACA8.png')
  
  const [aboutState, setAboutState] = useState(false)

  return(
    <>
    <Html center
    style={{ 
          opacity: aboutState ? 1 : 0,
          backgroundColor:"#ededed",
          height: '100vh',
          width: '100vw',
          padding: '5vh 25vw',
          boxSizing: 'border-box',
          letterSpacing: '0.1px',
          lineHeight: '1.3',
          wordSpacing: '1px',
          fontSize: '20px',
          fontfamily: nunito,
          }}
      >
        <p style={{fontSize: '21px', letterSpacing: '0.5px', wordSpacing: '1px'}}> 
        Why do I do the things I do? 
        </p>
        <p> 
        I deeply contemplate the motivations behind my behavior as a means of understanding myself, whether it’s an execution of values, an impulse of emotions, or a response to situational factors. These motives communicate both identity and tendencies, offering insights into the temporality of each passing state in which I exist. As such, I was happy to make a small part of that process - viewing actions as a window to our thoughts and feelings -  a part of my project and share the same musings with other people. 
        </p>
        <p>
        I find particular interest in experimental games and thought dilemmas because they consist of base units of logic applicable across various contexts, while also yielding insights about a person in a light-hearted, hypothetical presentation. The controlled environment that thought experiments are depicted in minimizes the impact of situational factors and other persuasive contexts have on decision making. As a result, such decisions more closely represent our internal beliefs and typically take the form of an action in a situation.
        </p>
        <p>
        However, the focus of the project is to make values more tangible, and in doing so, I hope to make thought experiments more enjoyable. Through improving the tangibility of actions, these efforts give some tangibility to values upheld when thinking through the scenarios presented.
        </p>
        <p style={{fontSize: '21px', letterSpacing: '1px', wordSpacing: '1px', textAlign: 'right'}}>
        from, athena
        </p>
      </Html>

      <RigidBody name = "about" mass={1} type="fixed" position={position ? position : [0, 0, 0]} colliders="cuboid" >
        <Float
        speed={2} 
        rotationIntensity={0} 
        floatIntensity={2} 
        floatingRange={[-1, 1]}
        >
          <mesh position={position ? position : [0, 15, 0]}>
            <octahedronGeometry args={[8]} />
            {/* <meshBasicMaterial color={"#262626"} envMap={texture} reflectivity={1}/> */}
            <meshMatcapMaterial color={"white"} matcap={matcap} />
          </mesh>
        </Float>
        <Label position={[0, 30, 0]} text={`thank you for sharing your thoughts \nwanna listen to some of the ones \ni had that led to this project?`} state={true} scale={[4, 4, 5]} rotation={[-Math.PI*0.1, 0, 0]}/>
        <Label position={[83, 46.5, -7]} text={`:)`} state={true} scale={[4, 4, 5]} rotation={[-Math.PI*0.1, 0, -Math.PI*0.5]}/>
        <CapsuleCollider args={[5, 20, 5]} sensor position={position ? position : [0,0,0]}
            onIntersectionEnter={(payload) => {
              if(payload.other.rigidBodyObject.children[0].name == "person"){
                setAboutState(true)
              }
            }} 
            //remove after debug
            onIntersectionExit={(payload) => {
              if(payload.other.rigidBodyObject.children[0].name == "person"){
                setAboutState(false)
              }
            }} 
          />
      </RigidBody>
    </>
  )
}