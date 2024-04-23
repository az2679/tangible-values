import { useState } from "react";
import { RigidBody, CuboidCollider } from '@react-three/rapier';

import SaveDecision from './SaveDecision';
import AnalyzeDecision from './AnalyzeDecision';
import Text from '../Text/Text';
import Button from './Button';

export default function Submit({position, valid, decisionType, decisionValue, onSubmit, errorPosition, refractory, sendSubmit}) {
  let intersectionTimeout;
  const [errorState, setErrorState] = useState(false)
  const [errorText, setErrorText] = useState('null')
  const submitDictator = (decisionValue) => {
    // SaveDecision({ decisionType: 'dictator', decisionValue: decisionValue });
    // AnalyzeDecision('dictator');
  }

  const submitVolunteer = (decisionValue) => {
    // SaveDecision({ decisionType: 'volunteer', decisionValue: decisionValue });
    // AnalyzeDecision('volunteer');
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
    // SaveDecision({ decisionType: 'exchange', decisionValue: decisionValue });
    // AnalyzeDecision('exchange');
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
    // SaveDecision({ decisionType: 'trust', decisionValue: decisionValue });
    // AnalyzeDecision('trust');
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
          sendSubmit('dictator', true)
          break;
        case 'volunteer':
          submitVolunteer(decisionValue);
          sendSubmit('volunteer', true)
          break;
        case 'exchange':
          submitExchange(decisionValue);
          sendSubmit('exchange', true)
          break;
        case 'trust':
          submitTrust(decisionValue);
          sendSubmit('trust', true)
          break;
        default:
          console.log(`Unknown submission type: ${decisionType}`);
        }
      } else {
        setErrorState(true)
        setErrorText("invalid answer")
      }
  }

  const handleIntersection = (payload) => {
      clearTimeout(intersectionTimeout);
      if(refractory == false){
        intersectionTimeout = setTimeout(() => {
          submitDecision(valid, decisionType, decisionValue);
        }, 500);
        setErrorState(false)
      } else {
        setErrorState(true)
        setErrorText(`please refresh \nbefore answering \nagain`)
      }
  };

  return (
    <>
    <RigidBody name="submit" mass={1} type="fixed" colliders="cuboid" position={position}>
     <Button position={[0,0,0]} text={'SUBMIT'} />
     <CuboidCollider args={[7.5, 2.5, 3]} sensor
      onIntersectionEnter={(payload)=>{
        if(payload.other.rigidBodyObject.name === "person"){
          handleIntersection(payload)
        }}}
        />
    </RigidBody>
    <Text text={`${errorText}`} state={errorState} position={errorPosition} rotation={[-Math.PI/2, 0,0]}/>
    </>
);
}
