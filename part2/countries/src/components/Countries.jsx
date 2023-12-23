const CountrySimple = ({ country }) => {
  console.log('simple ', country);
  return (
    <div>
      {country.name}
    </div>
  )
}

const CountryDetailed = ({ country }) => {
  console.log('detailed ', country);
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
    </div>
  )
}

const Countries = ({ countries }) => {
  const length = countries.length;

  const simpleDisplay = () => {
    return (
      <div>
        {countries.map(country => <CountrySimple key={country.id} country={country}/>)}
      </div>
    )
  }

  const detailedDisplay = () => {
    return (
      <div>
        {countries.map(country => <CountryDetailed key={country.id} country={country}/>)}
      </div>
    )
  }

  if (length == 1) {
    return detailedDisplay();
  } else if (length <= 10) {
    return simpleDisplay();
  } else {
    return (
      <div>Too many matches, specify another filter</div>
    )
  }
}

export default Countries
