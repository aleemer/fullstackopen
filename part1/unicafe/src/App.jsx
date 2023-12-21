import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.label}
    </button>
  )
}

const StatisticLine = (props) => {
  return (
    <p>
      {props.text} {props.value} {props.percentage ? '%' : ''}
    </p>
  )
}

const Statistics = (props) => {
  const show = props.good !== 0 || props.neutral !== 0 || props.bad !== 0;
  const total = props.good + props.neutral + props.bad;
  const average = props.good/(props.good+props.neutral+props.bad) * 100

  return (
    <div>
      {show ?
      <>
        <h2>statistics</h2>
        <StatisticLine text={'good'} value={props.good}/>
        <StatisticLine text={'neutral'} value={props.neutral}/>
        <StatisticLine text={'bad'} value={props.bad}/>
        <StatisticLine text={'total'} value={total}/>
        <StatisticLine text={'positive'} value={average} percentage={true}/>
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
      <Button label={'good'} onClick={handleClickGood}/>
      <Button label={'neutral'} onClick={handleClickNeutral}/>
      <Button label={'bad'} onClick={handleClickBad}/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App
