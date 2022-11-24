import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'
import {MdOutlineDarkMode, MdOutlineLightMode} from 'react-icons/md';


function Header() {

    const darkMode = true;

  return (
    <div className={darkMode ? "header-container" : "header-container header-light"}>
        <Link to='/' className='logo'>CineTrail</Link>
        <div className='search-container'>
            <input placeholder='Search movies...' className='search-input' />
        </div>
        <div className='header-buttons-container'>
            <div className='theme-button-container'>
                
                    {
                        darkMode?
                        <div className='theme-buttons'>
                            <MdOutlineLightMode className='theme-icon' />
                            <MdOutlineDarkMode className='them-icon theme-icon-active' />

                        </div>
                        :
                        <div className='theme-buttons'>
                            <MdOutlineLightMode className='theme-icon theme-icon-active' />
                            <MdOutlineDarkMode className='theme-icon' />

                        </div>
                    }

            </div>
            <div>
                <button className='create-account-btn'>Create an account</button>
            </div>
        </div>
    </div>
  )
}

export default Header