import React from 'react'

const Modal = ({ isCorrect, currentTurn, solution, onClose }) => {

  return (
    <div className="modal">
      {isCorrect && (
        <div>
          <h1>You Win!</h1>
          <p className="solution">The word of the day was {solution}</p>
          <p>You found the solution in {currentTurn} guesses :)</p>
          <button onClick={onClose} className={`modal-button success`}>
             &times;
          </button>
        </div>
      )}
      {!isCorrect && (
        <div>
          <h1>Sorry!</h1>
          <p className="solution">The word of the day was {solution}</p>
          <p>Better luck next time! :)</p>
          <button onClick={onClose} className={`modal-button failure`}>
             &times;
          </button>
        </div>
      )}
    </div>
  )
};

export default Modal