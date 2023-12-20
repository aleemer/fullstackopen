import { useState } from 'react'

const Statistics = (props) => {
  const show = props.good !== 0 || props.neutral !== 0 || props.bad !== 0;
  return (
    <div>
      {show ?
      <>
        <h2>statistics</h2>
        <p>good {props.good}</p>
        <p>neutral {props.neutral}</p>
        <p>bad {props.bad}</p>
        <p>all {props.good + props.neutral + props.bad}</p>
        <p>positive {props.good/(props.good+props.neutral+props.bad) * 100}%</p>
      </> 
      :
      <>
        <h2>statistics</h2>
        <p>No feedback given</p>
      </>
      }
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  // handles when user clicks 'good'
  const handleClickGood = () => {
    console.log('clicked good');
    setGood(good + 1);
  }

  // handles when user clicks 'neutral'
  const handleClickNeutral = () => {
    console.log('clicked neutral');
    setNeutral(neutral + 1)
  }

  // handles when user clicks 'bad'
  const handleClickBad = () => {
    console.log('clicked bad');
    setBad(bad + 1);
  }

  return (
    <div>
      <h2>give feedback</h2>
      <button onClick={handleClickGood}>good</button>
      <button onClick={handleClickNeutral}>neutral</button>
      <button onClick={handleClickBad}>bad</button>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App
