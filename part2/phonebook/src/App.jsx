import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const nameConflict = (name) => {
    for (let i = 0; i < persons.length; i++) {
      if (persons[i].name === name) {
        return true;
      }
    }
    return false;
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (nameConflict(newName)) {
      alert(`${newName} is already added to the phonebook`);
      setNewName('');
    } else {
      const newPerson = { name: newName }
      setPersons(persons.concat(newPerson));
      setNewName('');
    }
  }

  const handleNameChange = (e) => {
    e.preventDefault();
    setNewName(e.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleFormSubmit}>
        <div> name: <input value={newName} onChange={handleNameChange}/> </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => <li>{person.name}</li>)}
      </ul>
    </div>
  )
}

export default App
