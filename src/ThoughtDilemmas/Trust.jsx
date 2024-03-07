import React, { useState, useEffect } from 'react';
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { Vector3, Plane } from "three";
import { gsap } from 'gsap';


import DragObj from '../Interaction/DragObj';
import Text from '../Text/Text';
import Sensor from '../Interaction/Sensor';
import Submit from '../Decision/Submit';
import Coin from '../Interaction/Coin';

import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

gsap.registerPlugin(MotionPathPlugin);

function SensorMult({option, position, handleSensedChange, i}){
  return(
    <>
      <Sensor type="number" args={[7,7]} sensorArgs={[4, 4, 4]} option={option} number={0} sensorPosition={[position[0]-54, 0, position[2]-(45*i)]} onSensedChange={handleSensedChange} />
      <Sensor type="number" args={[7,7]} sensorArgs={[4, 4, 4]} option={option} number={1} sensorPosition={[position[0]-44, 0, position[2]-(27*i)]} onSensedChange={handleSensedChange} />
      <Sensor type="number" args={[7,7]} sensorArgs={[4, 4, 4]} option={option} number={2} sensorPosition={[position[0]-34, 0, position[2]-(12*i)]} onSensedChange={handleSensedChange}/>
      <Sensor type="number" args={[7,7]} sensorArgs={[4, 4, 4]} option={option} number={3} sensorPosition={[position[0]-21, 0, position[2]-(4*i)]} onSensedChange={handleSensedChange}/>
      <Sensor type="number" args={[7,7]} sensorArgs={[4, 4, 4]} option={option} number={4} sensorPosition={[position[0]-7, 0, position[2]+0]} onSensedChange={handleSensedChange}/>
      
      <Sensor type="number" args={[7,7]} sensorArgs={[4, 4, 4]} option={option} number={5} sensorPosition={[position[0]+7, 0, position[2]+0]} onSensedChange={handleSensedChange}/>
      <Sensor type="number" args={[7,7]} sensorArgs={[4, 4, 4]} option={option} number={6} sensorPosition={[position[0]+21, 0, position[2]-(4*i)]} onSensedChange={handleSensedChange}/>
      <Sensor type="number" args={[7,7]} sensorArgs={[4, 4, 4]} option={option} number={7} sensorPosition={[position[0]+34, 0, position[2]-(12*i)]} onSensedChange={handleSensedChange}/>
      <Sensor type="number" args={[7,7]} sensorArgs={[4, 4, 4]} option={option} number={8} sensorPosition={[position[0]+44, 0, position[2]-(27*i)]} onSensedChange={handleSensedChange}/>
      <Sensor type="number" args={[7,7]} sensorArgs={[4, 4, 4]} option={option} number={9} sensorPosition={[position[0]+54, 0, position[2]-(45*i)]} onSensedChange={handleSensedChange}/> 
    </>
  )
}
function CoinMult({position, setDragState, floorPlane}){
  return(
    <>
      <DragObj name="coin" startPosition={[position[0]-54, 0, position[2]+45]} state={setDragState} plane={floorPlane} lift={10}/>
      <DragObj name="coin" startPosition={[position[0]-44, 1, position[2]+27]} state={setDragState} plane={floorPlane} lift={10}/>
      <DragObj name="coin" startPosition={[position[0]-34, 1, position[2]+12]} state={setDragState} plane={floorPlane} lift={10}/>
      <DragObj name="coin" startPosition={[position[0]-21, 1, position[2]+4]} state={setDragState} plane={floorPlane} lift={10}/>
      <DragObj name="coin" startPosition={[position[0]-7, 1, position[2]+0]} state={setDragState} plane={floorPlane} lift={10}/>
      <DragObj name="coin" startPosition={[position[0]+7, 1, position[2]+0]} state={setDragState} plane={floorPlane} lift={10}/>
      <DragObj name="coin" startPosition={[position[0]+21, 1, position[2]+4]} state={setDragState} plane={floorPlane} lift={10}/>
      <DragObj name="coin" startPosition={[position[0]+34, 1, position[2]+12]} state={setDragState} plane={floorPlane} lift={10}/>
      <DragObj name="coin" startPosition={[position[0]+44, 1, position[2]+27]} state={setDragState} plane={floorPlane} lift={10}/>
      <DragObj name="coin" startPosition={[position[0]+54, 1, position[2]+45]} state={setDragState} plane={floorPlane} lift={10}/>
    </>
  )
}

export default function Trust(props) {
  const { position } = props;
  const floorPlane = new Plane(new Vector3(0, 1, 0),0);
  const [dragState, setDragState] = useState(false);
  const [confedSensors, setConfedSensors] = useState({});
  const [userSensors, setUserSensors] = useState({});
  const [confedCounter, setConfedCounter] = useState(0);
  const [userCounter, setUserCounter] = useState(0);

  const [confed, setConfed] = useState(null)
  const [multiply, setMultiply] = useState(false)
  const [confedState, setConfedState] = useState(false)

  // const [renderCoins, setRenderCoins] = useState(null);
  const [initialCoins, setInitialCoins] = useState([]);
  const [renderCoins, setRenderCoins] = useState([]);
  const [totalCoins, setTotalCoins] = useState([]);
  const [payoutState , setPayoutState] = useState(false)

  // var coinPos = []
  const [coinPos, setCoinPos] = useState([])

    const handleSensedChange = (option, number, count, sensorPosition) => {
      if(option == "confed"){
        setConfedSensors((prevSensors) => ({
          ...prevSensors,
          [number]:{count, sensorPosition},
        }));
      // }else if(option == "user"){
      //   setUserCounter(count)
      // }
      } else if(option == "user"){
        setUserSensors((prevSensors) => ({
          ...prevSensors,
          [number]:{count, sensorPosition},
        }));
      }
    };

    useEffect(() => {
    //acutal total sensed
      // const totalSensed = Object.values(sensors).reduce((acc, currentValue) => acc + currentValue, 0);
    //max 1 sensed allowed in each sensor 
      const totalConfedSensed = Object.values(confedSensors).map(value => Math.min(value.count, 1)).reduce((acc, currentValue) => acc + currentValue, 0);
      setConfedCounter(totalConfedSensed);

      //max 1 sensed
      const totalUserSensed = Object.values(userSensors).map(value => Math.min(value.count, 1)).reduce((acc, currentValue) => acc + currentValue, 0);
      setUserCounter(totalUserSensed);
    }, [confedSensors, userSensors]);



    useEffect(() => {
      setTotalCoins([
        ...initialCoins,
        ...renderCoins,
      ]);
    },[payoutState])

    useEffect(() => {
      if (totalCoins.length > 0){
        sendCoins(totalCoins, [550, 20, -700])
        
        setCoinPos(position)
      }
    },[totalCoins])

    const sendCoins = (coins, position) => {
      console.log(coins)
      const tl = gsap.timeline();
      coins.forEach((coin) => {
        tl.to(
          coin.props.position, {
            0: position[0],
            1: position[1],
            2: position[2],
            onUpdate: () => {
              // coinPos = [position[0], position[1], position[2]]
              // setCoinPos([...coin.props.position])
              setCoinPos(position)
            },
          }
        );
      });
    };

    
    // const sendCoins = (coins, position) => {
    //   console.log(totalCoins)

    //   const tl = gsap.timeline();
    //   coins.forEach((coin, index) => {
    //     // const [x, y, z] = position;
    //     const delay = index * 0.2;
    //     console.log(coin)
    //     tl.to(coin.props.position, {
    //       x: position[0],
    //       y: position[1],
    //       z: position[2],
    //       duration: 2,
    //       delay,
    //       ease: "power2.inOut",
    //     });
    //   });
    // };


    const reconcile = () => {
      setMultiply(true)
      const sensed = [];
      for (const [number, data] of Object.entries(confedSensors)) {
        if (data.count === 1) {
          sensed.push({ number, position: data.sensorPosition });
        }
      }

    // const newRenderCoins = sensed.reduce((acc, { number, position }, index) => {
    //   const coinIndex = index * 3;
    //   // coinPos = [position[0], position[1], position[2]]
    //   setCoinPos([position[0], position[1], position[2]])

    //   setInitialCoins((prevCoins) => [...prevCoins, <Coin key={`coin-${coinIndex}`} position={coinPos} coinNumber={number} />,
    //   ]);

    //   // coinPos = [position[0], 20, position[2]]
    //   setCoinPos([position[0], 20, position[2]])
    //   acc.push(<Coin key={`coin-${coinIndex+1}`} position={coinPos} />);
    //   acc.push(<Coin key={`coin-${coinIndex+2}`} position={coinPos} />);
    //   return acc;
    // }, []);
    // setRenderCoins(newRenderCoins)

    const newRenderCoins = sensed.reduce((acc, { number, position }, index) => {
      const coinIndex = index * 3;
    
      // Use a functional update to get the current state value
      setCoinPos((prevCoinPos) => {
        const coinPos = [position[0], position[1], position[2]];
        // Update the initial coins
        setInitialCoins((prevCoins) => [
          ...prevCoins,
          <Coin key={`coin-${coinIndex}`} position={coinPos} coinNumber={number} />,
          // <Coin key={`coin-${coinIndex + 1}`} position={[coinPos[0], 20, coinPos[2]]} />,
          // <Coin key={`coin-${coinIndex + 2}`} position={[coinPos[0], 20, coinPos[2]]} />,
        ]);
        acc.push(<Coin key={`coin-${coinIndex + 1}`} position={[coinPos[0], 20, coinPos[2]]} />);
        acc.push(<Coin key={`coin-${coinIndex + 2}`} position={[coinPos[0], 20, coinPos[2]]} />);
        // Update the state value
        return coinPos;
      });
    
      // acc.push(<Coin key={`coin-${coinIndex + 1}`} position={[coinPos[0], 20, coinPos[2]]} />);
      // acc.push(<Coin key={`coin-${coinIndex + 2}`} position={[coinPos[0], 20, coinPos[2]]} />);
      return acc;
    }, []);
    setRenderCoins(newRenderCoins);

    setTimeout(() => {
      setConfedState(true)
      console.log(`Stage 2: Returned ${confed}`)
    }, 3000);

    setTimeout(() => {
      setPayoutState(true)
    }, 1000);
  };

  useEffect(() => {
    if (confed !== null) {
      reconcile();
    }
  }, [confed]);

  
    

  return (
    <>
      <Text text={`${confedCounter}`} state={!confedState} position={[position[0], 0, position[2]+75]} rotation={[-Math.PI*0.1, 0, 0]}/>
      <Text text={`remaining: ${userCounter}`} state={true} position={[position[0], 2, position[2]+195]} rotation={[-Math.PI*0.1, 0, 0]}/>
      <Text text={`stage 2, returned: ${confed}`} state={confedState} position={[position[0], 2, position[2]+55]} rotation={[-Math.PI*0.1, 0, 0]}/>

      <Submit position={[position[0]+0, 0, position[2]+160]} valid={confedCounter + userCounter === 10} decisionType={"trust"} decisionValue={confedCounter} onSubmit={(randomAssignment) => {setConfed(randomAssignment);}} errorPosition={[position[0]+40, 1, position[2]+15]}/>

      <SensorMult option="confed" position={[position[0], position[1], position[2]+80]} handleSensedChange={handleSensedChange} i={1}/>
      <SensorMult option="user" position={[position[0], position[1], position[2]+125]} handleSensedChange={handleSensedChange} i={-1}/>
      {/* <Sensor type="number" args={[40, 30]} sensorArgs={[20, 4,15]} option="user" number={0} sensorPosition={[position[0], 0, position[2]+170]} onSensedChange={handleSensedChange} /> */}

      <CoinMult position={[position[0], position[1], position[2]+125]} setDragState = {setDragState} floorPlane = {floorPlane}/>

      {multiply && renderCoins}
    </>
  );
}
