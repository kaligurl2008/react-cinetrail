import React, {useContext} from 'react'
import {useParams} from 'react-router-dom'
import './MovieDetails.css'
import axios from 'axios'
import ReactPlayer from 'react-player'
import Rating from '../../Components/Rating/Rating'
import { ThemeContext } from '../../Contexts/ThemeContext'


function MovieDetails() {
      //set up apikey and baseurl to send to Homepage
    const apiKey = process.env.REACT_APP_API_KEY;
    const baseUrl = process.env.REACT_APP_BASE_URL;

    //baseurl for images
    const imageBaseUrl = process.env.REACT_APP_IMAGE_BASE_URL;

    //create parameter
    // const params = useParams();
    // console.log(params);
    const {movieId} = useParams();
    console.log(movieId);

    //create state to hold video info
    const [videoLink, setVideoLink] = React.useState('');

    //create state to hold movie details
    const [movie, setMovie] = React.useState({});
    const [rating, setRating] = React.useState(0);

    React.useEffect(
        ()=>{
            //call api to get movie info
            axios.get(`${baseUrl}movie/${movieId}?api_key=${apiKey}`)
            .then(res=>{
                console.log(res.data)
                setMovie(res.data)
                setRating(res.data.vote_average/2)
            })
            .catch(err=>console.log(err))



            //call api to get trailer
            axios.get(`${baseUrl}movie/${movieId}/videos?api_key=${apiKey}`)
            .then(res=>{
                //console.log(res.data.results);

                //filter to find the ones with youtube and trailer
                // console.log(res.data.results.filter(item=>item.site==="YouTube" &&
                //     item.type==="Trailer"))
                //pick the first one and set to videoLink
                const youTubeLinks = res.data.results.filter(item=>item.site==="YouTube" &&
                     item.type==="Trailer")
                setVideoLink(youTubeLinks[0].key)
            })  
            .catch(err=>console.log(err))
        }, []
    )

    //access global state using context
    const { darkMode, setDarkMode} = useContext(ThemeContext)

  return (
    <div className={darkMode ? "details-container" : "details-container details-light"}>
        {
            videoLink ?
            <div className="trailer-container">
                <ReactPlayer 
                    className="trailer-player"
                    url={`https://www.youtube.com/watch?v=${videoLink}`}
                    width="100%"
                    height="100%"  
                />
            </div>
            :
            <div className="trailer-container-blank"
            style={
                {
                backgroundImage:`url("${imageBaseUrl}/${movie?.backdrop_path}")`,
                backgroundPosition:"center",
                backgroundSize:"cover"
                }}  >
            <p>No trailers released yet</p>
            </div>
        }
        <div className="info-container">
            {movie?.original_title}
            <Rating stars={rating} />
            <div className="moviedetails-info">
                <img src={`${imageBaseUrl}/${movie?.poster_path}`} 
                     className="details-poster" 
                     alt={movie?.title}/>
                <div className="moviedetails-right">
                    <h2>{movie?.tagline}</h2>
                    <h4>{movie?.overview}</h4>
                    <h4>Status: <span>{movie?.status}</span></h4>
                    <h4>Runtime: <span>{movie?.runtime}</span></h4>
                    <h4>Budget: <span>{movie?.budget}</span></h4>
                </div>

            </div>
        </div>


    </div>


  )
}


export default MovieDetails