
const Hello = (props) => {
  return (
    <div>
      <p> Hello {props.name}, you are {props.age} years old </p>
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

const App = () => {
  const name = 'Peter';
  const age = 10;

  return (
    <div>
      <h1>Greetings</h1>
      <Hello name={'Aleem'} age={26}/>
      <Hello name={name} age={age}/>
      <Footer />
    </div>
  )
}

export default App
