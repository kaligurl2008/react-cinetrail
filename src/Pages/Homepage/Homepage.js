import React, { useContext } from 'react'
import Slider from '../../Components/Slider/Slider'
import './Homepage.css'
import { ThemeContext } from '../../Contexts/ThemeContext';

function Homepage({apiKey, baseUrl}) {
    //console.log(baseUrl);

    const {darkMode, setDarkMode} = useContext(ThemeContext)

  return (
    <div className={darkMode? "homepage-container" : "homepage-container homepage-light"}>
        <Slider apiKey={apiKey}
                baseUrl={baseUrl}/>
    </div>
  )
}

export default Homepage