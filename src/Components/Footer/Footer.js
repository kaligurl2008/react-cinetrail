import React, {useContext} from 'react'
import './Footer.css'
import { ThemeContext } from '../../Contexts/ThemeContext'

function Footer() {

    //access global context
    const { darkMode, setDarkMode} = useContext(ThemeContext)

  return (
    <div className={darkMode ? "footer-container" : "footer-container footer-light"}>
        <p>All rights reserved.</p>
    </div>
  )
}

export default Footer