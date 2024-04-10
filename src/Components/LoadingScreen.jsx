import { useProgress, Html } from '@react-three/drei'
import { useEffect, useState } from 'react';

function map(inVal, inMin, inMax,  outMin, outMax) {
  return ((inVal - inMin) / (inMax - inMin) * (outMax - outMin) + outMin);
}

export default function LoadingScreen () {
  const { active, progress, errors, item, loaded, total } = useProgress()
  const [individualProgress, setIndividualProgress] = useState({});

  useEffect(() => {
    if (total) {
      setIndividualProgress(prevState => ({
        ...prevState,
        [item]: progress
      }));
    }
  }, [progress, item, total]);

  let overallProgress = 0;
  for (const key in individualProgress) {
    overallProgress += individualProgress[key];
  }

  // console.log(individualProgress, overallProgress, Object.keys(individualProgress).length, total)
  // console.log(map(overallProgress, 0, 1300,  0, 100))

  return (
    <Html center>{Math.round(overallProgress/11)} %</Html>
  );
}
