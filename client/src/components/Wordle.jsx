import React, { useEffect } from 'react'
import useWordle from '../hooks/useWordle';

export default function Wordle({ solution }) {
  const { currentGuess, trackUserGuess } = useWordle(solution);
  
  useEffect(() => {
    console.log('attaching listener');
    window.addEventListener('keyup', trackUserGuess);
    return () => window.removeEventListener('keyup', trackUserGuess);
  }, [trackUserGuess])

  return (
    <div>
      <div>solution - {solution}</div>
      <div>current guess - {currentGuess}</div>
    </div>
  )
}
