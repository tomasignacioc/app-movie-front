import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import MovieCard from '../components/MovieCard'
import AuthContext from '../context/AuthContext'
import './UserFavorites.css'

function UserFavorites() {
  const [movies, setMovies] = useState([])
  const { auth, setAuth } = useContext(AuthContext)

  useEffect(() => {
    axios({
      method: 'GET',
      url: 'api/user/favorites',
      headers: {
        "Authorization": auth.token
      }
    })
      .then(function (response) {
        setMovies(response.data.movies)
      })
      .catch(function (error) {
        console.log(error);
      })

  }, [])
  return (
    <div>
      <h1 id='container-title' >Your favorite movies:</h1>
      <div className='userfavorites-container'>
        {movies?.map(movie => (
          <MovieCard key={movie.id} title={movie.title} image_url={movie.image_url} id={movie.id} />
        ))}
      </div>
    </div>
  )
}

export default UserFavorites