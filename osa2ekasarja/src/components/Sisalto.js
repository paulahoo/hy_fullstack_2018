import React from 'react'
import Osa from './Osa'

const Sisalto = ({kurssi}) => {
  return (
    <div>
      {kurssi.osat.map(osa=><Osa key={osa.nimi} osa={osa}/>)}
    </div>
  )
}

export default Sisalto
