
const Hello = (props) => {
  const { name, age } = props;

  const bornYear = () => new Date().getFullYear() - age 

  return (
    <div>
      <p> Hello {name}, you are {age} years old </p>
      <p> So you were probably born in {bornYear()} </p>
    </div>
  )
}

const Footer = () => {
  return (
    <div>
      greeting app created by Aleem under direction of <a href="https://github/mluukkai">mluukkai</a>
    </div>
  )
}

const Display = ({ counter }) => {
  return (
    <div>
      {counter}
    </div>
  )
}

const Button = ({text, onClick}) => <button onClick={onClick}>{text}</button>

import { useState } from 'react'

const App = (props) => {
  const [ counter, setCounter ] = useState(0);
  console.log('rendering with counter value ', counter);

  const increaseByOne = () => {
    console.log('increasing, value before ', counter);
    setCounter(counter + 1)
  }
  const setToZero = () => {
    console.log('resetting to zero, value before ', counter);
    setCounter(0)
  }
  const decreaseByOne = () => {
    console.log('decreasing, value before ', counter);
    setCounter(counter - 1)
  }

  const name = 'Peter';
  const age = 10;

  return (
    <div>
      <h1>Greetings</h1>
      <Hello name={'Maya'} age={26 + 10}/>
      <Hello name={name} age={age}/>
      <Footer />
      <h2>Counter</h2>
      <Display counter={counter}/>
      <Button text={'thousand'} onClick={() => setCounter(1000)} />
      <Button text={'plus'} onClick={increaseByOne} />
      <Button text={'zero'} onClick={setToZero} />
      <Button text={'minus'} onClick={decreaseByOne} />
    </div>
  )
}

export default App
