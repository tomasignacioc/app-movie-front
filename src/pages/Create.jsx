import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import MovieCreationOutlinedIcon from '@mui/icons-material/MovieCreationOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { FormControl, InputLabel, MenuItem, Select, Stack } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';

const theme = createTheme();

const movieGenres = ['Action', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Mystery', 'Romance', 'Thriller', 'Western']

export default function Create() {
  const [premieredAt, setPremieredAt] = React.useState(null);
  const [genres, setGenres] = React.useState([]);

  const handleSelectGenres = (event) => {
    event.preventDefault();
    setGenres(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const movieData = {
      title: data.get('title'),
      image_url: data.get('image_url'),
      summary: data.get('summary'),
      premiered_at: premieredAt ? premieredAt.format('YYYY-MM-DD') : null,
      score: data.get('score'),
      genres: genres,
    }
    for (const field in movieData) {
      if (!movieData[field] || genres.length === 0) {
        toast.error(`${field} is required!`)
        return
      }
    }
    axios.post('api/movie', movieData)
      .then(function (response) {
        if (response.status === 200) {
          toast.success('Movie successfully created!')
        }
      })
      .catch(function (error) {
        for (const serverError in error.response.data.errors) {
          toast.error(error.response.data.errors[serverError][0]);
        }
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <div><Toaster toastOptions={{ duration: 6000 }} /></div>
      <Container component="main" maxWidth="sm">
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
            <MovieCreationOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create your own movie!
          </Typography>
          <Box component="form" autoComplete='off' noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="title"
                  required
                  fullWidth
                  type="text"
                  id="title"
                  label="Title"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  type="url"
                  id="image_url"
                  label="Image Url"
                  name="image_url"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="summary"
                  label="Summary"
                  type="text"
                  id="summary"
                />
              </Grid>
              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Stack spacing={1}>
                    <DatePicker
                      maxDate={new Date()}
                      inputFormat='YYYY-MM-DD'
                      label="Premiered At"
                      openTo="year"
                      views={['year', 'month', 'day']}
                      value={premieredAt}
                      onChange={(newValue) => {
                        setPremieredAt(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Stack>
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="score"
                  name="score"
                  required
                  label="Score"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{ inputProps: { min: 0, max: 10 } }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="genre-select-label">Genres</InputLabel>
                  <Select
                    autoWidth
                    multiple
                    required
                    labelId="genre-select-label"
                    id="genres"
                    value={genres}
                    label="Genres"
                    onChange={handleSelectGenres}
                  >
                    {movieGenres.map(g => (
                      <MenuItem key={g} value={g}>{g}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
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