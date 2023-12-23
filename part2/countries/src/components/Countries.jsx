const CountrySimple = ({ country }) => {
  return (
    <div>
      {country.name}
    </div>
  )
}

const CountryDetailed = ({ country }) => {
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

  return simpleDisplay();
}

export default Countries
