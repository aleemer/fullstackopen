
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

import { useState } from 'react'

const App = (props) => {
  const [ counter, setCounter ] = useState(0);

  console.log('rendering...', counter);

  const name = 'Peter';
  const age = 10;

  return (
    <div>
      <h1>Greetings</h1>
      <Hello name={'Maya'} age={26 + 10}/>
      <Hello name={name} age={age}/>
      <Footer />
      <h2>Counter</h2>
      <div>{counter}</div>
      <button onClick={() => setCounter(counter + 1)}>
        plus
      </button>
      <button onClick={() => setCounter(0)}>
        zero
      </button>
    </div>
  )
}

export default App
