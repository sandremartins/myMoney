import React from 'react'
import Meses from './Meses'
import AdicionarMes from './AdicionarMes'

const Home = () => {
    return(
      <div className='container'> 
        <AdicionarMes />
        <Meses />
      </div>
    )
  }

  export default Home