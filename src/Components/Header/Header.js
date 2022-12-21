import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Header.css'
import {MdOutlineDarkMode, MdOutlineLightMode} from 'react-icons/md';
import { ThemeContext } from '../../Contexts/ThemeContext';
import { UserContext } from '../../Contexts/UserContext';
import axios from 'axios'
import SearchResult from '../SearchResult/SearchResult';


function Header() {

    const apiKey = process.env.REACT_APP_API_KEY;
    const baseUrl = process.env.REACT_APP_BASE_URL;

    //activate useNavigate
    let navigate = useNavigate();

    //set up global state use CURLY BRACKETS here
    const {user, setUser, token, setToken} = React.useContext(UserContext);

    const [profileOptions, setProfileOptions] = React.useState(false);

    //create state for search
    const [query, setQuery] = React.useState('')
    const [queryResults, setQueryResults] = React.useState([])

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

    // https://api.themoviedb.org/3/search/movie?api_key=e3a85422afd8939961f798aa4092344e&query=king

    const handleSearch = (e) =>{
        console.log(e)
        //save the text as query
        setQuery(e.target.value);
        //make api call using this query
        //note change to use e.target.value in api call
        //this is a lag in setting state
        axios.get(`${baseUrl}search/movie?api_key=${apiKey}&query=${e.target.value}`)
        .then(res =>{
            console.log(res.data.results)
            setQueryResults(res.data.results)
        })
        .catch(err=> console.log(err))
    }


  return (
    <div className={darkMode ? "header-container" : "header-container header-light"}>
        <Link to='/' className='logo'>CineTrail</Link>
        <div className='search-container'>
            <input placeholder='Search movies...' 
            className='search-input' 
            onChange={handleSearch}/>
            {
                query !== ''?
                <div className='search-results-container'>
                    {
                    queryResults?.map(item => <SearchResult movie={item}
                                                setQuery={setQuery}/>)
                    }
                </div>
                :
                null
            }
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