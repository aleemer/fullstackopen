import { useState, useEffect } from 'react';
import countryServices from '../services/countries';


const Country = ({ country, detailed}) => {
  const [show, setShow] = useState(detailed);
  const [weather, setWeather] = useState({ temp: '', icon: '', wind: ''});

  console.log(weather);

  // Need to ensure that whenever 'detailed' changes, this is reflected in the state
  // This is required because React may not be generating new components, instead re-using old ones!
  useEffect(() => {
    setShow(detailed)
  }, [detailed])

  // Only when 'show' is true, do we grab the weather data
  // Again, need to specify this in case of re-using old renders
  useEffect(() => {
    if (show) {
      countryServices
        .fetchWeatherData(country.geo)
        .then((data) => {
          setWeather({
            temp: Math.round(data.main.temp - 273.15).toFixed(2),
            icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
            wind: data.wind.speed
          })
        })
    }
  }, [show])

  const handleToggle = (e) => {
    e.preventDefault()
    setShow(!show);
  }

  if (show) {
    return (
      <div>
        <h2>{country.name}</h2>
        <p>capital {country.capital}</p>
        <p>area {country.area}</p>
        <h3>languages:</h3>
        <ul>
          {country.languages.map(language => <li key={language}>{language}</li>)}
        </ul>
        <img src={country.flag}/>
        <h3>{`Weather in ${country.capital}`}</h3>
        <p>temperature {`temperature ${weather.temp} Celcius`}</p>
        <img src={weather.icon}/>
        <p>{`wind ${weather.wind} m/s`}</p>
        <br/>
        <button onClick={handleToggle}>hide</button>
      </div>
    )
  } else {
    return (
      <div>
        {country.name} <button onClick={handleToggle}>show</button>
      </div>
    )
  }
}

const Countries = ({ countries }) => {
  const length = countries.length;

  if (length == 1) {
    return (
      <div>
        {countries.map(country => <Country key={country.id} country={country} detailed={true}/>)}
      </div>
    )
  } else if (length <= 10) {
    return (
      <div>
        {countries.map(country => <Country key={country.id} country={country} detailed={false}/>)}
      </div>
    )
  } else {
    return (
      <div>Too many matches, specify another filter</div>
    )
  }
}

export default Countries
