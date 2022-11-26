import React from 'react'
import axios from 'axios'

function Slider({apiKey, baseUrl}) {

    //baseurl for images
    const imageUrl = "https://image.tmdb.org/t/p/original";

    //create state for the upcoming movies
    const [upcomingMovies, setUpcomingMovies] = React.useState([]);

    const [index, setIndex] = React.useState([0]);

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
        backgroundImage:`url("${imageUrl}${upcomingMovies[index]?.backdrop_path}")`,
        backgroundSize:'cover',
        backgroundPosition:'center',
        backgroundRepeat:'no-repeat',
        height:"60vh",
    }

  return (
    <div style={sliderStyle}>
        {upcomingMovies[0]?.title}
    </div>
  )
}

export default Slider