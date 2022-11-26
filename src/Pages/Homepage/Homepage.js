import React from 'react'
import Slider from '../../Components/Slider/Slider'
import './Homepage.css'


function Homepage({apiKey, baseUrl}) {
    //console.log(baseUrl);
  return (
    <div className='homepage-container'>
        <Slider apiKey={apiKey}
                baseUrl={baseUrl}/>
    </div>
  )
}

export default Homepage