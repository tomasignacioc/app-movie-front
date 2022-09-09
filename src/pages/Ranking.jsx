import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

export default function Ranking() {
  const [movies, setMovies] = React.useState([])

  React.useEffect(() => {
    axios.get('api/movie/ranking')
      .then(function (response) {
        setMovies(response.data)
      })
      .catch(function (error) {
        console.log(error);
      })
  }, [])

  return (
    <TableContainer component={Paper} sx={{ maxWidth: 800, minWidth: 450, margin: '0 auto', paddingTop: 5 }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow >
            <TableCell align='center' sx={{ fontSize: 20 }}>Title</TableCell>
            <TableCell sx={{ fontSize: 20 }} >Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {movies?.map((movie) => (
            <TableRow
              key={movie.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" align='center' sx={{ fontSize: 20 }}>
                <NavLink to={`/movie/details/${movie.id}`} style={{ textDecoration: "none" }} >
                  {movie.title}
                </NavLink>
              </TableCell>
              <TableCell sx={{ fontSize: 20 }} >{movie.score}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
