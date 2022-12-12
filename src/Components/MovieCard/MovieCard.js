import React from 'react'
import { Link } from 'react-router-dom';
import Rating from '../Rating/Rating';
import './MovieCard.css'


function MovieCard({movie, imageUrl, imgHeight, cardStyle, imgRadius}) {

    //baseurl for images
    const imageBaseUrl = process.env.REACT_APP_IMAGE_BASE_URL;

    const imageStyle={
        backgroundImage:`url("${imageBaseUrl}${imageUrl}")`,
        backgroundSize:'cover',
        backgroundPosition:'center',
        backgroundRepeat:'no-repeat',
        height:imgHeight,
        width:"200px",
        position: "relative",
        borderRadius: imgRadius
    }

    // <Link to={`/moviedetails/${upcomingMovies[index]?.id}`}>

  return (
    <Link className={cardStyle}
    to={`/moviedetails/${movie?.id}`}>
        <div style={imageStyle}>
            <div className='movie-info-top'>
                <Rating stars={movie.vote_average/2} />
                {/* <p>{movie.vote_average}</p> */}
            </div>
            <div className='movie-info-bottom'>
                <p>{movie.title}</p>
                <p>Rating: {movie.vote_average}</p>
            </div>
        </div>
        {
            cardStyle === "top-rated-card" && <p>{movie.title}</p>
        }
    </Link>
  )
}

export default MovieCard