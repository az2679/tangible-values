import Text from './Text'
import { Float } from '@react-three/drei'

export default function Direction({text, state, position, rotation, scale}){
  return(
    <Float
      speed={1} 
      rotationIntensity={0} 
      floatIntensity={1} 
      floatingRange={[-1, 1]}>
      <Text text={text} state={state} position={position} rotation={rotation} scale={scale}/>
    </Float>
  )
}