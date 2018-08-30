import React from 'react'

const Yhteensa = ({kurssi}) => {
  const result = kurssi.osat.map(osa => osa.tehtavia)
  const reducer = (accumulator, currentValue) => accumulator + currentValue
  return (
    <div>
      <p>yhteensä {result.reduce(reducer)} tehtävää</p>
    </div>
  )
}

export default Yhteensa
