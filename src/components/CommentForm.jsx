import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const theme = createTheme();

export default function CommentForm({ auth, movieId }) {

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (!data.get('content')) {
      toast.error(`A comment is required!`)
      return
    }
    axios({
      method: 'POST',
      url: 'api/comment',
      data: {
        movie_id: movieId,
        content: data.get('content'),
        username: auth.name
      },
      headers: {
        "Authorization": auth.token
      }
    })
      .then(function (response) {
        if (response.status === 201) {
          toast.success('Your review has been added')
        }
      })
      .catch(function (error) {
        toast.error(error.response.data.message);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <div><Toaster toastOptions={{ duration: 6000 }} /></div>
      <Container component="main" maxWidth="md" sx={{ mb: 5 }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <InsertCommentIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Leave a comment
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="content"
              type="text"
              multiline
              id="content"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}