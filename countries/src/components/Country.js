import React from 'react'
import CountrySelection from './CountrySelection'

const Country = ({ country, detailData }) => {
  if (!detailData) {
    return (
      <CountrySelection country={country} />
    )
  } else {
    return (
      <div>
        <h1> {country.name} {country.nativeName} </h1>
        <div> capital: {country.capital} </div>
        <div> population: {country.population} </div>
        <img src={country.flag} alt= "country flag" width="200" height="100" />
      </div>
    )
  }
}

export default Country
