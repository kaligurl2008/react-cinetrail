import React from 'react'
import axios from 'axios'
import "./Slider.css"
import {MdKeyboardArrowLeft, MdKeyboardArrowRight} from 'react-icons/md';
import Rating from '../Rating/Rating';
import Genres from '../Genres/Genres';
import {Link} from 'react-router-dom'

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

    //create state for rating
    const [currentRating, setCurrentRating] = React.useState(0);

    //call api for data when the component loads
    React.useEffect(
        ()=>{
            //console.log(baseUrl);
            //call api to get upcoming movies
            axios.get(`${baseUrl}movie/upcoming?api_key=${apiKey}`)
            .then(res =>{
                //console.log(res.data.results);
                setUpcomingMovies(res.data.results);
                //divide votes by 2 to set currentRating
                let rating = res.data.results[index]?.vote_average/2;
                setCurrentRating(rating);
            })
            .catch(err => console.log(err))
        },[index]
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
        //divide votes by 2 to set currentRating
        // let rating = Math.round((upcomingMovies[index].vote_average)/2);
        // console.log("index is " + index);
        // console.log("vote is " + upcomingMovies[index].vote_average);
        // console.log("rating is " + rating);
        // setCurrentRating(rating);
    }

    const handleRight = () => {
        console.log("right clicked");
        //increament index
        //when you get to the end wrap back to 0
        index === upcomingMovies.length - 1?
        setIndex(0) :
        setIndex(index+1);
        //divide votes by 2 to set currentRating
        // let rating = Math.round((upcomingMovies[index].vote_average)/2);
        // console.log("index is " + index);
        // console.log("vote is " + upcomingMovies[index].vote_average);
        // console.log("rating is " + rating);
        // setCurrentRating(rating);
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
            <Genres movieGenres = {upcomingMovies[index]?.genre_ids}/>
            <p>Release Date: {upcomingMovies[index]?.release_date}</p>
            <Rating stars={currentRating}/>
            {/* <Rating stars={upcomingMovies[index]?.vote_average/2}/> */}
            <Link to={`/moviedetails/${upcomingMovies[index]?.id}`}>
                <p className='see-details'>See Details</p>
            </Link>
        </div>
    </div>
  )
}

export default Slider

{/* <StarRatings
    rating={currentRating}
    starRatedColor="red"
    starDimension="15px"
    starSpacing="1px"
/> */}