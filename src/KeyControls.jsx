import { useState, useEffect } from "react";

function keyAction(key) {
  const keys = {
      KeyW: 'forward',
      KeyS: 'backward',
      KeyA: 'left',
      KeyD: 'right'
  }
  return keys[key]
}

export default function KeyControls() {
    const [movement, setMovement] = useState({
        forward: false,
        backward: false,
        left: false,
        right: false,
    })

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (keyAction(e.code)) {
                setMovement((state) => ({...state, [keyAction(e.code)]: true}))
            }
        }
        const handleKeyUp = (e) => {
            if (keyAction(e.code)) {
                setMovement((state) => ({...state, [keyAction(e.code)]: false}))
            }
        }

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
        }
    }, [])
    return movement
}