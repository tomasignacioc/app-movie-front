import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { NavLink } from 'react-router-dom';

export default function MovieCard({ id, title, image_url }) {

  return (
    <Card sx={{ maxWidth: 350, maxHeight: 400, margin: 4 }}>
      <CardMedia
        component="img"
        alt="movie poster"
        height="140"
        image={image_url}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
      </CardContent>
      <CardActions>
        <NavLink to={`/movie/details/${id}`} style={{ textDecoration: "none" }} >
          <Button size="small">Details</Button>
        </NavLink>
      </CardActions>
    </Card>
  );
}
