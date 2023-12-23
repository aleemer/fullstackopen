import { useState, useEffect } from 'react'
import axios from 'axios';
import Filter from './components/Filter'
import PersonForm from './components/PersonForm';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState('');

  const syncData = () => {
    axios
      .get('http://localhost:3001/persons')
      .then((response) => setPersons(response.data));
  }

  const sendData = (person) => {
    axios
      .post('http://localhost:3001/persons', person)
      .then(() => syncData());
  }

  useEffect(syncData, []);

  const handleFilterChange = (e) => {
    e.preventDefault();
    setFilter(e.target.value);
  }

  const peopleToShow = persons.filter(person => filter.trim() === '' 
  ? person 
  : person.name.toLowerCase().includes(filter.trim().toLowerCase()))

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
    const name = e.target.name.value;
    const number = e.target.number.value;
    if (nameConflict(name)) {
      alert(`${name} is already added to the phonebook`);
    } else {
      const newPerson = { id: persons.length + 1, name, number }
      sendData(newPerson);
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} onFilterChange={handleFilterChange}/>
      <h2>add a new</h2>
      <PersonForm onFormSubmit={handleFormSubmit}/>
      <h2>Numbers</h2>
      {peopleToShow.map(person => <p key={person.id}>{person.name} {person.number}</p>)}
    </div>
  )
}

export default App
