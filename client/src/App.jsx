import { useState, useEffect } from 'react'
import Wordle from './components/Wordle';

function App() {

  const [answer, setAnswer] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/ping-wordle')
      .then(res => res.json())
      .then(json => {
        setAnswer(json.solution);
      })
  }, [setAnswer]);

  return (
    <div className="App">
      <h1>Definitely Not Wordle</h1>
      {answer && <Wordle solution={answer}/>}
    </div>
  )
}

export default App