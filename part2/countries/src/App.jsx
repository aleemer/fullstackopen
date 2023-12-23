import { useState, useEffect } from 'react';
import countryServices from './services/countries';
import Search from './components/Search';
import Countries from './components/Countries';

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

  const applySearch = () => {
    console.log('search being reapplied ', search);
    const searchTerm = search.trim().toLowerCase();
    if (searchTerm === '') {
      return [];
    } else {
      return countries.filter(country => country.name.toLowerCase().includes(searchTerm));
    }
  }

  return (
    <div>
      <Search search={search} onSearchUpdate={handleSearchUpdate} />
      <Countries countries={applySearch()}/>
    </div>
  )
}

export default App
