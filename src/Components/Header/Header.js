import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Header.css'
import {MdOutlineDarkMode, MdOutlineLightMode} from 'react-icons/md';
import { ThemeContext } from '../../Contexts/ThemeContext';
import { UserContext } from '../../Contexts/UserContext';



function Header() {

    //activate useNavigate
    let navigate = useNavigate();

    //set up global state use CURLY BRACKETS here
    const {user, setUser, token, setToken} = React.useContext(UserContext);

    const [profileOptions, setProfileOptions] = React.useState(false);

    // const darkMode = true;

    //access the global state using context
    //note CURLY brackets here
    const {darkMode, setDarkMode} = useContext(ThemeContext)

    //function to toggle dark/light mode
    const handleTheme = () => {
        //toggle from dark/light
        setDarkMode(!darkMode);
        //save this value to local storage
        localStorage.setItem("darkMode", !darkMode);
    }

    const handleLogout = () =>{
        //clear local storage
        localStorage.clear()
        //reset user and token global state
        setUser('')
        setToken('')
        //go to homepage
        navigate('/')
    }


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
                            <MdOutlineLightMode className='theme-icon' onClick={handleTheme}/>
                            <MdOutlineDarkMode className='theme-icon theme-icon-active' />

                        </div>
                        :
                        <div className='theme-buttons'>
                            <MdOutlineLightMode className='theme-icon theme-icon-active' />
                            <MdOutlineDarkMode className='theme-icon' onClick={handleTheme}/>

                        </div>
                    }

            </div>
            <div>
                {
                    token ? 
                    <div className='profile-container'>
                        <img src={user.image_url} className='profile-img'
                        onClick={()=>setProfileOptions(!profileOptions)} />
                        <p>Welcome {user.username}</p>
                        {
                            profileOptions?
                            <div className='fav-div'>
                                <Link to='/myfavorites'>My Favorites</Link>
                                <p className='logout'
                                onClick={handleLogout}>Logout</p>
                            </div>
                            : null
                        }
                    </div>
                    :
                    <button className='create-account-btn'
                    onClick={()=>navigate(`/signup`)}>Create an account</button>
                }
            </div>
        </div>
    </div>
  )
}

export default Header