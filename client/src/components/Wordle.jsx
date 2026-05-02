import React, { useEffect, useRef, useState } from "react";
import useWordle from "../hooks/useWordle";

import Grid from "./Grid";
import Keypad from "./Keypad";
import Modal from "./Modal";

const Wordle = ({ solution }) => {
  const {
    turnCount,
    currentGuess,
    guesses,
    isCorrect,
    usedKeys,
    trackUserGuess
  } = useWordle(solution);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    window.addEventListener("keyup", trackUserGuess);
    return () => window.removeEventListener("keyup", trackUserGuess);
  }, [trackUserGuess]);

  useEffect(() => {
    console.log(isCorrect, turnCount);

    if (isCorrect) {
      setTimeout(() => setShowModal(true), 2000);
    }

    if (turnCount > 5) {
      setTimeout(() => setShowModal(true), 2000);
    }
  }, [isCorrect, turnCount]);

  return (
    <div>
      <Grid
        currentGuess={currentGuess}
        guesses={guesses}
        turnCount={turnCount}
      />
      <Keypad usedKeys={usedKeys} />
      {showModal && (
        <Modal
          isCorrect={isCorrect}
          currentTurn={turnCount}
          solution={solution}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default Wordle;