import { useState, useEffect } from 'react'

function App() {

  const [answer, setAnswer] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/ping-wordle')
      .then(res => res.json())
      .then(json=> {
        setAnswer(json.solution);
      })
  }, []);

  return (
    <div className="App">
      <h1>Definitely Not Wordle</h1>
      {/* {answer && <div>Solution is: {answer}</div>} */}
    </div>
  )
}

export default App