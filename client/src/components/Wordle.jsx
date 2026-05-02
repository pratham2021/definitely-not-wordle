import React, { useEffect, useRef } from 'react'
import useWordle from '../hooks/useWordle';
import Grid from './Grid';

export default function Wordle({ solution }) {
  const { turnCount, currentGuess, guesses, isCorrect, trackUserGuess } = useWordle(solution);

  useEffect(() => {
    window.addEventListener('keyup', trackUserGuess);
    return () => window.removeEventListener('keyup', trackUserGuess);
  }, [trackUserGuess]);

  useEffect(() => {
    console.log(guesses, turnCount, isCorrect)
  }, [guesses, turnCount, isCorrect]);
  
  return (
    <div>
      <div>current guess - {currentGuess}</div>
      <Grid currentGuess={currentGuess} guesses={guesses} turnCount={turnCount}/>
    </div>
  )
}
