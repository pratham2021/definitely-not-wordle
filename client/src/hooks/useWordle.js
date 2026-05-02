import { useState } from 'react'

const useWordle = (solution) => {
  
  const [turnCount, setTurnCount] = useState(0);
  const [currentGuess, setCurrentGuess] = useState('');
  const [guesses, setGuesses] = useState([...Array(6)]);
  const [history, setHistory] = useState([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [usedKeys, setUsedKeys] = useState({}); // {a: 'green', b: 'yellow', c:'gray'}

  const trackUserGuess = ({ key }) => {

    if (isCorrect) {
      return;
    }

    if (key === 'Enter') {
      if (turnCount > 5) {
        return;
      }

      if (history.includes(currentGuess)) {
        return;
      }

      if (currentGuess.length !== 5) {
        return;
      }

      let wordArray = [...solution];

      let formattedGuess = [...currentGuess].map((letter) => {
        return { key: letter.toLowerCase(), color: 'gray' }
      });
        
      // find matching letters
      formattedGuess.forEach((letter, index) => {
        if (wordArray[index] === letter.key) {
          formattedGuess[index].color = 'green';
          wordArray[index] = null;
        }
      })

      // find present letters but ones that are not in the right spot
      formattedGuess.forEach((letter, index) => {
          if (wordArray.includes(letter.key) && letter.color !== 'green') {
            formattedGuess[index].color = 'yellow';
            wordArray[wordArray.indexOf(letter.key)] = null;
          }  
      })
      
      // Add new guess
      if (currentGuess.toLowerCase() === solution.toLowerCase()) setIsCorrect(true);

      setGuesses(prevGuesses => {
        let newGuesses = [...prevGuesses]
        newGuesses[turnCount] = formattedGuess;
        return newGuesses;
      })

      setHistory(previous => {
        return [...previous, currentGuess]
      })

      setTurnCount(previous => {
        return previous + 1
      })

      setUsedKeys((prevUsedKeys) => {
        let newKeys = {...prevUsedKeys};

        formattedGuess.forEach((letter) => {
          const currentColor = newKeys[letter.key];

          if (letter.color === 'green') {
            newKeys[letter.key] = 'green';
            return;
          }

          if (letter.color === 'yellow' && currentColor !== 'green') {
            newKeys[letter.key] = 'yellow';
          }

          if (letter.color == 'gray' && currentColor !== 'green' && currentColor !== 'yellow') {
            newKeys[letter.key] = 'gray';
            return;
          }
        })

        return newKeys;
      });

      setCurrentGuess('');
    }

    if (key === 'Backspace') {
        setCurrentGuess((prev) => prev.slice(0, -1))
        return
    }
    if (/^[A-Za-z]$/.test(key)) {
      if (currentGuess.length < 5) {
          setCurrentGuess(prev => prev + key)
      }
    }
  }

  return { turnCount, currentGuess, guesses, isCorrect, usedKeys, trackUserGuess }
}

export default useWordle