import React from 'react'

const Country = ({ country, detailData }) => {
  if (!detailData) {
    return (
      <li>{country.name}</li>
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
