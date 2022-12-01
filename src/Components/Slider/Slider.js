import React from 'react'
import axios from 'axios'
import "./Slider.css"
import {MdKeyboardArrowLeft, MdKeyboardArrowRight} from 'react-icons/md';

function Slider() {

    //set up apikey and baseurl to send to Homepage
  const apiKey = process.env.REACT_APP_API_KEY;
  const baseUrl = process.env.REACT_APP_BASE_URL;

    //baseurl for images
    const imageBaseUrl = process.env.REACT_APP_IMAGE_BASE_URL;

    //create state for the upcoming movies
    const [upcomingMovies, setUpcomingMovies] = React.useState([]);

    //state for slider photo
    const [index, setIndex] = React.useState(0);

    //call api for data when the component loads
    React.useEffect(
        ()=>{
            //console.log(baseUrl);
            //call api to get upcoming movies
            axios.get(`${baseUrl}movie/upcoming?api_key=${apiKey}`)
            .then(res =>{
                //console.log(res.data.results);
                setUpcomingMovies(res.data.results);
            })
            .catch(err => console.log(err))
        },[]
    )


    const sliderStyle={
        backgroundImage:`url("${imageBaseUrl}${upcomingMovies[index]?.backdrop_path}")`,
        backgroundSize:'cover',
        backgroundPosition:'center',
        backgroundRepeat:'no-repeat',
        height:"60vh",
        position: "relative"
    }

    const handleLeft = () => {
        console.log("left clicked");
        //when you get to 0 wrap to the end of the array
        index === 0?
        setIndex(upcomingMovies.length-1):
        setIndex(index-1);
    }

    const handleRight = () => {
        console.log("right clicked");
        //increament index
        //when you get to the end wrap back to 0
        index === upcomingMovies.length - 1?
        setIndex(0) :
        setIndex(index+1);
    }

  return (
    <div style={sliderStyle}>
        <div className='slider-overlay'></div>
        <MdKeyboardArrowLeft className='left-arrow'
                            onClick={handleLeft}/>
        <MdKeyboardArrowRight className='right-arrow'
                            onClick={handleRight}/>
        <div className='movie-info'>
            <h1>{upcomingMovies[index]?.title}</h1>
            <p>{upcomingMovies[index]?.overview.slice(0, 120)}</p>
            <p>Release Date: {upcomingMovies[index]?.release_date}</p>
        </div>
    </div>
  )
}

export default Slider