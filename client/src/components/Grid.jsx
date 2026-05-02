import React from "react";
import Row from "./Row";

export default function Grid({ currentGuess, guesses, turnCount }) {
  return (
    <div>
      {guesses.map((guess, index) => {
        if (turnCount == index) { // the current turn
          return <Row key={index} currentGuess={currentGuess}/>
        }

        return <Row key={index} guess={guess}/>
      })}
    </div>
  )
}

