import { useState, useEffect } from 'react';
import axios from 'axios';
import Search from './components/Search';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');

  // parses the data appropriately
  const parseData = (element) => {
    if (element) {
      return {
        name: element.name.common ? element.name.common : 'unknown',
        capital: element.capital ? element.capital[0] : 'unknown',
        languages: element.languages ? Object.values(element.languages) : 'unknown',
        flag: element.flags.png ? element.flags.png : 'unknown',
        geo: element.capitalInfo.latlng ? element.capitalInfo.latlng : 'unknown'
      }
    }
  }

  // fetch all data from the restcountries server
  const fetchAllData = () => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then((response) => {
        setCountries(response.data.map(parseData));
      });
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
