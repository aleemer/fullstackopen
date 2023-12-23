import { useState, useEffect } from 'react';
import axios from 'axios';
import countryServices from './services/countries';
import Search from './components/Search';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');

  // fetch all data from the restcountries server
  const fetchAllData = () => {
    countryServices
      .fetchAllData()
      .then((countryData) => setCountries(countryData))
  }

  useEffect(fetchAllData, []);  // only fetch the data once on first load

  const handleSearchUpdate = (e) => {
    e.preventDefault()
    setSearch(e.target.value);
  }

  return (
    <div>
      <Search search={search} onSearchUpdate={handleSearchUpdate} />
    </div>
  )
}

export default App
