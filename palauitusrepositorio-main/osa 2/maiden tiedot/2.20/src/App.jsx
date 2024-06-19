import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])
  const [country, selectCountry] = useState(null)

  
  useEffect(() => {
    
      axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
    
  }, [])

  const countriesToShow = search 
  ? countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()))
  : []


  const handleCountryChange = (event) => {
    console.log(event.target.value)
    setSearch(event.target.value)
  }
  const toggleShow = (country) => {
    selectCountry(country)
  }

  return (
    <div>
      <form action="">
        <h2>Find countries</h2> 
        <input type="text" onChange={handleCountryChange}/>
        
      </form>
      {country
      ?
        <div>
          <h2>{country.name.common}</h2>
          <p>capital {country.capital[0]}</p>
          <p>area {country.area} km²</p>
          <h3>languages:</h3>
          <ul>
            {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
          </ul>
          <img src={country.flags.png} alt="Country flag" width="150" height="100" />
          <button onClick={() => selectCountry(null)}>Back</button>
        </div>
     : countriesToShow.length > 10 
        ? <p>Too many matches, specify another filter</p>
        : countriesToShow.length === 1
          ? <div>
              <h2>{countriesToShow[0].name.common}</h2>
              <p>capital {countriesToShow[0].capital[0]}</p>
              <p>area {countriesToShow[0].area} km²</p>
              <h3>languages:</h3>
              <ul>
                {Object.values(countriesToShow[0].languages).map(language => <li key={language}>{language}</li>)}
              </ul>
              <img src={countriesToShow[0].flags.png} alt="Country flag" width="150" height="100" />
            </div>
          : countriesToShow.map(country => 
              <li key={country.name.common}>{country.name.common} 
              <button onClick={() =>toggleShow(country)}>Show</button></li>
            )
      }
    </div>
  )
}

export default App
