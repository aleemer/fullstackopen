import { useState, useEffect } from 'react';

const Country = ({ country, detailed}) => {
  const [show, setShow] = useState(detailed);

  // Need to ensure that whenever 'detailed' changes, this is reflected in the state
  // This is required because React may not be generating new components, instead re-using old ones!
  useEffect(() => {
    setShow(detailed)
  }, [detailed])

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
          {country.languages.map(language => <li>{language}</li>)}
        </ul>
        <img src={country.flag}/>
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
