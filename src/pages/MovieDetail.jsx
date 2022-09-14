import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Comment from '../layouts/Comment';
import { Box } from '@mui/material';
import toast, { Toaster } from 'react-hot-toast';
import AuthContext from '../context/AuthContext'
import CommentForm from '../components/CommentForm';

export default function MovieDetail() {
  const params = useParams()
  const { id } = params
  const [movieData, setMovieData] = React.useState({})
  const { auth, setAuth } = React.useContext(AuthContext)

  React.useEffect(() => {
    axios.get(`api/movie/${id}`)
      .then(function (response) {
        setMovieData(response.data)
      })
      .catch(function (error) {
        console.log(error);
      })
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault();
    axios({
      method: 'POST',
      url: `api/movie/${id}/add`,
      headers: {
        "Authorization": auth.token
      }
    })
      .then(function (response) {
        if (response.status === 200) {
          toast.success("Movie added to favorites!")
        }
      })
      .catch(function (error) {
        toast.error(error.response.statusText)
      })
  }

  return (
    <div>
      <Toaster />
      <Card sx={{ maxWidth: 800, margin: '0 auto', paddingTop: 5, paddingBottom: 5 }}>
        <CardMedia
          component="img"
          alt="movie poster"
          height="480"
          width="480"
          image={movieData.image_url}
        />
        <CardContent>
          <Typography gutterBottom variant="h2" >
            {movieData.title}
          </Typography>
          <Typography variant="body1" color="text.primary" paragraph={true} sx={{ fontSize: 30 }}>
            <strong>Summary: </strong>{movieData.summary}
          </Typography>
          <Typography variant="body1" color="text.primary" sx={{ fontSize: 30 }}>
            <strong>Genres: </strong>{movieData.genres?.join(', ')}
          </Typography>
          <Typography variant="body1" color="text.primary" sx={{ fontSize: 30 }}>
            <strong>Score: </strong>{movieData.score}
          </Typography>
          <Typography variant="body1" color="text.primary" sx={{ fontSize: 30 }}>
            <strong>Premiered at: </strong>{movieData.premiered_at}
          </Typography>
        </CardContent>
        <Box component="form" noValidate onSubmit={handleSubmit}>
          <CardActions>
            <Button type='submit' size="small" sx={{ fontSize: 30 }}>Add to favorites</Button>
          </CardActions>
        </Box>
      </Card>
      <CommentForm auth={auth} movieId={id} />
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
        {movieData.comments?.map(comment => (
          <Comment key={comment.id} content={comment.content} username={comment.username} />
        ))}
      </div>
    </div>
  );
}
