import axios from 'axios';
import React from 'react'

function Genres({movieGenres}) {

    const apiKey = process.env.REACT_APP_API_KEY;
    const baseUrl = process.env.REACT_APP_BASE_URL;

    //create state to store all genres
    const [allGenres, setAllGenres] = React.useState([])

    React.useEffect(
        () => {
            //call api to get all genres
            axios.get(`${baseUrl}genre/movie/list?api_key=${apiKey}`)
            .then(res =>{
                console.log(res.data.genres)
                //store in state
                setAllGenres(res.data.genres)
            })
            .catch(err =>console.log(err))
    }, [])

    const genreList = () => {
        //search for the ids in movieGenres
        //store the names in an array
        const genres = [];
        movieGenres?.map( id =>{
            //search allGenres array to find id
            for (let i=0; i < allGenres.length; i++){
                //check for matching id
                if (id === allGenres[i].id){
                    //add name to genres array
                    genres.push(allGenres[i].name)
                }
            }
        }    
        ) //end of map
        //return genres as a string using join
        return genres.join(", ")
    }
    
  return (
    <div>
        <p>Genres:&nbsp;&nbsp; {genreList()}</p>
    </div>
  )
}

export default Genres