import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  // handles when user clicks 'good'
  const handleClickGood = (e) => {
    console.log('clicked good');
  }

  // handles when user clicks 'neutral'
  const handleClickNeutral = (e) => {
    console.log('clicked neutral');
  }

  // handles when user clicks 'bad'
  const handleClickBad = (e) => {
    console.log('clicked bad');
  }

  return (
    <div>
      <h2>give feedback</h2>
      <button onClick={handleClickGood}>good</button>
      <button onClick={handleClickNeutral}>neutral</button>
      <button onClick={handleClickBad}>bad</button>
      <h2>statistics</h2>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
    </div>
  )
}

export default App
