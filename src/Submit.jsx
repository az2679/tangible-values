import { RigidBody, CuboidCollider } from '@react-three/rapier';
import { useState } from "react";
import SaveDecision from './SaveDecision';
import AnalyzeDecision from './AnalyzeDecision';
import Text from './Text';

export default function Submit({position, valid, decisionType, decisionValue, onSubmit, errorPosition}) {
  let intersectionTimeout;
  const [errorState, setErrorState] = useState(false)

  const submitDictator = (decisionValue) => {
    SaveDecision({ decisionType: 'dictator', decisionValue: decisionValue });
    AnalyzeDecision('dictator');
  }

  const submitVolunteer = (decisionValue) => {
    SaveDecision({ decisionType: 'volunteer', decisionValue: decisionValue });
    AnalyzeDecision('volunteer');

    const randomAssignment = () => {
      if(Math.floor(Math.random()*5) < 4){
        return 5
      } else {
        return 1
      }
    }
    onSubmit([randomAssignment(), randomAssignment(), randomAssignment()])
  }

  const submitExchange = (decisionValue) => {
    SaveDecision({ decisionType: 'exchange', decisionValue: decisionValue });
    AnalyzeDecision('exchange');
    
    const randomAssignment = () => {
      if(Math.floor(Math.random()*2) == 0){
        return true
      } else {
        return false
      }
    }
    onSubmit(randomAssignment())
  }

  const submitTrust = (decisionValue) => {
    SaveDecision({ decisionType: 'trust', decisionValue: decisionValue });
    AnalyzeDecision('trust');

    const randomAssignment = () => {
      return Math.floor(Math.random()*((decisionValue*3) + 1));
    }
    onSubmit(randomAssignment())
  }


  const submitDecision = (valid, decisionType, decisionValue) => {
    if (valid){
      setErrorState(false)
    switch (decisionType) {
      case 'dictator':
        submitDictator(decisionValue);
        break;
      case 'volunteer':
        submitVolunteer(decisionValue);
        break;
      case 'exchange':
        submitExchange(decisionValue);
        break;
      case 'trust':
        submitTrust(decisionValue);
        break;
      default:
        console.log(`Unknown submission type: ${decisionType}`);
    }
  } else {
    setErrorState(true)
  }
  }

  const handleIntersection = (payload) => {
      clearTimeout(intersectionTimeout);
      intersectionTimeout = setTimeout(() => {
        submitDecision(valid, decisionType, decisionValue);
        // console.log(payload);
      }, 500);
  };

  return (
    <>
    <RigidBody name="submit" mass={1} type="fixed" colliders="cuboid" position={position}>
    <mesh>
      <boxGeometry args={[10, 5, 2]} />
      <meshStandardMaterial color="#eeeeee" roughness={0.8} metalness={0.2} />
     </mesh>
     <CuboidCollider args={[5, 2.5, 3]} sensor
      onIntersectionEnter={(payload)=>{
        if(payload.other.rigidBodyObject.name === "person"){
          handleIntersection(payload)
        }}}
        />
    </RigidBody>

    <Text text={`invalid answer`} state={errorState} position={errorPosition} rotation={[-Math.PI/2, 0,0]}/>
    </>
);
}
