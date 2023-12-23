import axios from 'axios';

const apiKey = import.meta.env.VITE_WEATHER_API_KEY
const restCountriesURL = 'https://studies.cs.helsinki.fi/restcountries'
const weatherDataBaseURL = `https://api.openweathermap.org/data/2.5/weather?`;

const fetchWeatherData = (geo) => {
  const weatherDataURL = `${weatherDataBaseURL}lat=${geo[0]}&lon=${geo[1]}&appid=${apiKey}`
  const request = axios.get(weatherDataURL);
  return request.then(response => response.data)
}

const parseData = (elem) => {
  if (elem) {
    return {
      id: Math.random() * 1000000,
      name: elem.name.common ? elem.name.common : 'unknown',
      capital: elem.capital ? elem.capital[0] : 'unknown',
      area: elem.area ? elem.area : 'unknown',
      languages: elem.languages ? Object.values(elem.languages) : 'unknown',
      flag: elem.flags.png ? elem.flags.png : 'unknown',
      geo: elem.capitalInfo.latlng ? elem.capitalInfo.latlng : 'unknown',
    }
  }
}

const fetchAllData = () => {
  const request = axios.get(`${restCountriesURL}/api/all`)
  return request.then((response) => {
    return response.data.map(parseData);
  })
}

export default { fetchAllData, fetchWeatherData }
