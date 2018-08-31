import React from 'react'
import Country from './Country'

const Countries = ({ countries }) => {
  let detailData = false
  if (countries.length === 1) {
    detailData = true
  }

  return (
    countries.map(country => <Country key={country.name} country={country} detailData={detailData}/>)
  )
}

export default Countries
