
const Hello = (props) => {
  return (
    <div>
      <p> Hello {props.name} </p>
    </div>
  )
}

const App = () => {
  return (
    <div>
      <h1>Greetings</h1>
      <Hello name={'Aleem'}/>
      <Hello name={'Joe'}/>
    </div>
  )
}

export default App
