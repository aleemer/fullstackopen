import { useState, useEffect } from 'react'
import phoneServices from './services/phone'
import phoneUtils from './services/utils';
import Filter from './components/Filter'
import PersonForm from './components/PersonForm';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState('');

  const syncData = () => {
    phoneServices
      .getAll()
      .then((phoneBook) => setPersons(phoneBook))
  }

  useEffect(syncData, []);

  const handleFilterChange = (e) => {
    e.preventDefault();
    setFilter(e.target.value);
  }

  const peopleToShow = persons.filter(person => filter.trim() === '' 
  ? person 
  : person.name.toLowerCase().includes(filter.trim().toLowerCase()))

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const number = e.target.number.value;
    phoneUtils.clearFields(e, ['name', 'number']);
    if (phoneUtils.nameConflict(name, persons)) {
      alert(`${name} is already added to the phonebook`);
    } else {
      const newPerson = { id: persons.length + 1, name, number }
      phoneServices
        .create(newPerson)
        .then(() => syncData());
    }
  }

  const handleDeleteClick = (e, id) => {
    e.preventDefault();
    phoneServices
      .deletePerson(id)
      .then(() => syncData());
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} onFilterChange={handleFilterChange}/>
      <h2>add a new</h2>
      <PersonForm onFormSubmit={handleFormSubmit}/>
      <h2>Numbers</h2>
      {peopleToShow.map(person => 
      <p key={person.id}>
        {person.name} {person.number}
        <button onClick={(e) => handleDeleteClick(e, person.id)}>delete</button>
      </p>)}
    </div>
  )
}

export default App
