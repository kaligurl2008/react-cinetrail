import React, {useContext} from 'react'
import Slider from '../../Components/Slider/Slider'
import './Homepage.css'
import { ThemeContext } from '../../Contexts/ThemeContext'
import axios from 'axios'
import MovieCard from '../../Components/MovieCard/MovieCard'


function Homepage() {

  //set up apikey and baseurl to send to Homepage
  const apiKey = process.env.REACT_APP_API_KEY;
  const baseUrl = process.env.REACT_APP_BASE_URL;
    //console.log(baseUrl);

    //create array with page numbers
    const pageNumbers =[1,2,3,4,5,6,7,8,9,10];

    const [page, setPage] = React.useState(1)

    //create state for popular movies
    const [popularMovies, setPopularMovies] = React.useState([])

    //create state for top rated movies
    const [topRatedMovies, setTopRatedMovies] = React.useState([])

    //call api when the component loads
    React.useEffect(
      ()=>{
        //call api to get popular movies
        axios.get(`${baseUrl}movie/popular?api_key=${apiKey}&page=${page}`)
        .then(res =>{
            //console.log(res.data.results);
            //store data from api into state
            setPopularMovies(res.data.results)
            
        })
        .catch(err => console.log(err))



        //call api to get top rated movies
        axios.get(`${baseUrl}movie/top_rated?api_key=${apiKey}&page=1`)
        .then(res =>{
            // console.log(res.data.results);
            //store data from api into state
            setTopRatedMovies(res.data.results.slice(0, 10))
            
        })
        .catch(err => console.log(err))
      },[page]
    )

    const { darkMode, setDarkMode} = useContext(ThemeContext)

  return (
    <div className={darkMode ? "homepage-container" : "homepage-container homepage-light"}>
        <Slider/>
        <div className='movies-wrapper'>
          <div className='popular-container'>
            <h3>Popular Movies</h3>
            <div className='popular-cards-wrapper'>
              {/* {
                popularMovies.map(item=> <p>{item.title}</p>)
              } */}
              {
                popularMovies.map(item=> <MovieCard movie={item}
                                          imageUrl={item.poster_path}
                                          imgHeight="300px"
                                          cardStyle="popular-card"
                                          imgRadius="16px"/>)
              }
            </div>
            <div className='page-numbers'>
              <p>Select Page</p>
              {
                pageNumbers.map(num => <p onClick={() => setPage(num)}>{num}</p>)
              }
            </div>
          </div>
          <div className='top-rated-container'>
            <h3>Top Rated Movies</h3>
            <div className='top-rated-cards-wrapper'>
            {
                topRatedMovies.map(item=> <MovieCard movie={item}
                                          imageUrl={item.backdrop_path}
                                          imgHeight="100px"
                                          cardStyle="top-rated-card"
                                          imgRadius="8px"/>)
              }
            </div>
          </div>
        </div>
    </div>
  )
}

export default Homepage