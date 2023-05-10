import React from 'react'
import './page.css'
import img1 from '../asses/logo1.png'
import { useNavigate } from 'react-router-dom'
const Landing = () => {
    const navigate = useNavigate();
  return (
    

      <div className='landing'>
        <div className='lan-header'>
          <img src={img1} alt='' /> 
          <button onClick={()=>navigate('/register')}>LOGIN/RIGISTER</button> 

        </div>
      </div>
       
   
  )
}

export default Landing