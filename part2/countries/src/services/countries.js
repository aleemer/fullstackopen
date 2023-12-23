import axios from 'axios';

const restCountriesURL = 'https://studies.cs.helsinki.fi/restcountries'

const parseData = (elem) => {
  if (elem) {
    return {
      name: elem.name.common ? elem.name.common : 'unknown',
      capital: elem.capital ? elem.capital[0] : 'unknown',
      area: elem.area ? elem.area : 'unknown',
      languages: elem.languages ? Object.values(elem.languages) : 'unknown',
      flag: elem.flags.png ? elem.flags.png : 'unknown',
      geo: elem.capitalInfo.latlng ? elem.capitalInfo.latlng : 'unknown'
    }
  }
}

const fetchAllData = () => {
  const request = axios.get(`${restCountriesURL}/api/all`)
  return request.then((response) => {
    return response.data.map(parseData);
  })
}

export default { fetchAllData }
