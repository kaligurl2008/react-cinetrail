import React from 'react'
import {useParams} from 'react-router-dom'
import './MovieDetails.css'
import axios from 'axios'
import ReactPlayer from 'react-player'


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

    React.useEffect(
        ()=>{
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
  return (
    <div className='details-container'>
        <div className='trailer-container'>
            <ReactPlayer 
            className="trailer-player"
            url={`https://www.youtube.com/watch?v=${videoLink}`}
            width="100%"
            height="100%"
            />
        </div>
    </div>
  )
}

export default MovieDetails