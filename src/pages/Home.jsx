import axios from 'axios';
import React, { useEffect, useState } from 'react'
import MovieCard from '../components/MovieCard'
import './Home.css'

function Home() {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    axios.get('api/movie')
      .then(function (response) {
        setMovies(response.data)
      })
      .catch(function (error) {
        console.log(error);
      })

  }, [])
  return (
    <div className='home-container'>
      {movies?.map(movie => (
        <MovieCard key={movie.id} title={movie.title} image_url={movie.image_url} id={movie.id} />
      ))}
    </div>
  )
}

export default Home