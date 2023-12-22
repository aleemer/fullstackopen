import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('clicked submit');
  }

  const handleNameChange = (e) => {
    e.preventDefault();
    console.log('typing...');
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleFormSubmit}>
        <div> name: <input onChange={handleNameChange}/> </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      ...
    </div>
  )
}

export default App
