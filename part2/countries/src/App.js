import { useState, useEffect } from 'react'
import axios from 'axios'

import ManyCountries from './components/ManyCountries'
import OneCountry from './components/OneCountry'



const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  const changeFilter = (props) => {
    setFilter(props)
  }

  const filteredCountries =
    (filter === '')
      ? countries
      : countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))


  return (
    <div>
      <div>find countries <input onChange={handleFilter} /></div>
      {filteredCountries.length === 1
        ? <OneCountry country={filteredCountries[0]} />
        : <ManyCountries countries={filteredCountries} changeFilter={changeFilter} />}
    </div>
  );
}

export default App;
