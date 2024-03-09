import React, { useState, useEffect, useRef } from 'react';
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { Vector3, Plane } from "three";
import { gsap } from 'gsap';

import DragObj from '../Interaction/DragObj';
import Text from '../Text/Text';
import Sensor from '../Interaction/Sensor';
import Submit from '../Decision/Submit';
import Reset from '../Decision/Reset';
import Coin from '../Interaction/Coin';

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
function CoinMult({position, setDragState, floorPlane, sensedCoinState}){
  return(
    <>

      {sensedCoinState[1] && ( <DragObj name="coin" num={1} startPosition={[position[0]-54, 0, position[2]+45]} state={setDragState} plane={floorPlane} lift={10}/> )}

      {sensedCoinState[2] && ( <DragObj name="coin" num={2} startPosition={[position[0]-44, 1, position[2]+27]} state={setDragState} plane={floorPlane} lift={10}/> )}

      {sensedCoinState[3] && ( <DragObj name="coin" num={3} startPosition={[position[0]-34, 1, position[2]+12]} state={setDragState} plane={floorPlane} lift={10}/> )}

      {sensedCoinState[4] && ( <DragObj name="coin" num={4} startPosition={[position[0]-21, 1, position[2]+4]} state={setDragState} plane={floorPlane} lift={10}/> )}
      
      {sensedCoinState[5] && ( <DragObj name="coin" num={5} startPosition={[position[0]-7, 1, position[2]+0]} state={setDragState} plane={floorPlane} lift={10}/> )}
      
      {sensedCoinState[6] && ( <DragObj name="coin" num={6} startPosition={[position[0]+7, 1, position[2]+0]} state={setDragState} plane={floorPlane} lift={10}/> )}
      
      {sensedCoinState[7] && ( <DragObj name="coin" num={7} startPosition={[position[0]+21, 1, position[2]+4]} state={setDragState} plane={floorPlane} lift={10}/> )}
      
      {sensedCoinState[8] && ( <DragObj name="coin" num={8} startPosition={[position[0]+34, 1, position[2]+12]} state={setDragState} plane={floorPlane} lift={10}/> )}
      
      {sensedCoinState[9] && ( <DragObj name="coin" num={9} startPosition={[position[0]+44, 1, position[2]+27]} state={setDragState} plane={floorPlane} lift={10}/> )}
      
      {sensedCoinState[10] && ( <DragObj name="coin" num={10} startPosition={[position[0]+54, 1, position[2]+45]} state={setDragState} plane={floorPlane} lift={10}/> )}
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

  const [initialCoins, setInitialCoins] = useState([]);
  const [renderCoins, setRenderCoins] = useState([]);
  const [totalCoins, setTotalCoins] = useState([]);
  const [payoutState , setPayoutState] = useState(false)

  const [userText, setUserText] = useState(`null`)


  const [sendPos, setSendPos] = useState([550, 10, -600])
  const [sendCoinsCalled, setSendCoinsCalled] = useState(false);

  const [sensedCoinState, setSensedCoinState] = useState({
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
    6: true,
    7: true,
    8: true,
    9: true,
    10: true,
  });

    const handleSensedChange = (option, number, count, sensorPosition, num) => {
      if(option == "confed"){
        setConfedSensors((prevSensors) => ({
          ...prevSensors,
          [number]:{count, sensorPosition, num},
        }));
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
      if (renderCoins.length > 0) {
        setTotalCoins([...initialCoins, ...renderCoins]);
        setSendCoinsCalled(false); 
      }
    }, [renderCoins, initialCoins]);
  
    useEffect(() => {  
      if (totalCoins.length > 0 && !sendCoinsCalled) {
        sendCoins(confed)
      }
    }, [totalCoins, sendCoinsCalled]);

    const sendCoins = (confed) => {
      const updatedCoins = totalCoins.map((coin, index) => {
        const coinsToSend = index >= totalCoins.length - confed;
        const updatedCoin = {
          ...coin,
          props: {
            ...coin.props,
            payoutState: coinsToSend ? true : false,
          },
        };
        return updatedCoin;
      });
      setTotalCoins(updatedCoins);
      setSendCoinsCalled(true);
      
      setMultiply(true)
    };

    const reconcile = () => {
      console.log(confedSensors)
      const sensed = [];
      for (const [number, data] of Object.entries(confedSensors)) {
        if (data.count === 1) {
          sensed.push({ number, position: data.sensorPosition, sensedCoin:data.num });
        }
      }
      
      const updateSensedCoinState = { ...sensedCoinState };
      sensed.forEach(({ sensedCoin }) => {
        updateSensedCoinState[sensedCoin] = false;
      });
      setSensedCoinState(updateSensedCoinState);


    const newRenderCoins = sensed.reduce((acc, { number, position }, index) => {
      const coinIndex = index * 3;
      setInitialCoins((prevCoins) => [...prevCoins, <Coin key={`coin-${coinIndex}`} position={[position[0], 10, position[2]]} sendPos={sendPos} payoutState={payoutState} delay={coinIndex*0.2} />,
      ]);
      acc.push(<Coin key={`coin-${coinIndex+1}`} position={[position[0], 20, position[2]]} sendPos={sendPos} payoutState={payoutState} delay={(coinIndex+1)*0.2}/>);
      acc.push(<Coin key={`coin-${coinIndex+2}`} position={[position[0], 30, position[2]]} sendPos={sendPos} payoutState={payoutState} delay={(coinIndex+2)*0.2}  />);
      return acc;
    }, []);
    setRenderCoins(newRenderCoins)

    setTimeout(() => {
      setConfedState(true)
      console.log(`Stage 2: Returned ${confed}`)
    }, 3000);
  };

  
  useEffect(() => {
    if(multiply){
    setTimeout(() => {
      setUserText(`total: ${userCounter + confed}`)
    }, 5000)
    } else {
      setUserText(`remaining: ${userCounter}`)
    }
  }, [userCounter, multiply]);


  useEffect(() => {
    if (confed !== null) {
      reconcile();
    }
  }, [confed]);

  useEffect(() => {
    console.log(multiply, totalCoins)
  }, [multiply, totalCoins]);

  const handleReset = () => {
    console.log("reset")

    // setConfedSensors({});
    // setConfedCounter(0)
    setConfedSensors((prevSensors) => {
      // console.log("resetting sensors")
      const resetSensors = {};
      Object.keys(prevSensors).forEach((index) => {
        resetSensors[index] = { count: 0, sensorPosition: prevSensors[index].sensorPosition, num: 0 };
      });
      return resetSensors;
    });

    setConfed(null)
    setConfedState(false)
    setMultiply(false)

    setInitialCoins([])
    setRenderCoins([])
    setTotalCoins([])
    // setSendCoinsCalled(false)

    setSensedCoinState((prevSensedCoinState) => {
      const newSensedCoinState = {};
      for (const key in prevSensedCoinState) {
        newSensedCoinState[key] = true;
      }
      return newSensedCoinState;
    });

    

  }
    

  return (
    <>
      <Text text={`${confedCounter}`} state={!confedState} position={[position[0], 0, position[2]+75]} rotation={[-Math.PI*0.1, 0, 0]}/>
      <Text text={userText} state={true} position={[position[0], 2, position[2]+195]} rotation={[-Math.PI*0.1, 0, 0]}/>
      <Text text={`stage 2, returned: ${confed}`} state={confedState} position={[position[0], 2, position[2]+55]} rotation={[-Math.PI*0.1, 0, 0]}/>

      <Submit position={[position[0]+0, 0, position[2]+160]} valid={confedCounter + userCounter === 10} decisionType={"trust"} decisionValue={confedCounter} onSubmit={(randomAssignment) => {setConfed(randomAssignment);}} errorPosition={[position[0]+40, 1, position[2]+15]}/>
      <Reset position={[position[0], 0, position[2]-100]} onReset={handleReset} />

      <SensorMult option="confed" position={[position[0], position[1], position[2]+80]} handleSensedChange={handleSensedChange} i={1}/>
      <SensorMult option="user" position={[position[0], position[1], position[2]+125]} handleSensedChange={handleSensedChange} i={-1}/>
      {/* <Sensor type="number" args={[40, 30]} sensorArgs={[20, 4,15]} option="user" number={0} sensorPosition={[position[0], 0, position[2]+170]} onSensedChange={handleSensedChange} /> */}

      <CoinMult position={[position[0], position[1], position[2]+125]} setDragState = {setDragState} floorPlane = {floorPlane} sensedCoinState={sensedCoinState}/>

      {multiply && totalCoins}
    </>
  );
}
