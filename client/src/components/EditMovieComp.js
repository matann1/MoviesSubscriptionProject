import axios from 'axios'
import Grid from "@mui/material/Grid";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from "@mui/material/TextField";

import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { doEditMovie } from '../redux/MoviesActions';

const moviesUrl = 'http://localhost:8000/movies';

const EditMovieComp = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const { movieid } = useParams();
    const movies = useSelector(state => state.MoviesReducer.movies);
    const movie = movies.find((movie)=> movie._id === movieid)
    const [editMovie, setEditMovie] = useState(movie)
    const [movieEditErrors, setMovieEditErrors] = useState({})
    const [isSubmit, setisSubmit] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setisSubmit(true);
        setMovieEditErrors(validate(editMovie));
      };
    
      useEffect(() => {
          (async () => {if(Object.keys(movieEditErrors).length === 0 && isSubmit){
            try{
              const res = await axios.put(`${moviesUrl}/${movie._id}`, editMovie);
              console.log(res.ok);
              dispatch(doEditMovie(editMovie));
              setEditMovie(editMovie);
              navigate('/mainpage')
            }
            catch(err){
                console.log(err)
            }
        }})()
      }, [movieEditErrors])
      
      const cancel = () => {
        navigate('/mainpage')
    }
      const validate = (values) => {
        const errors = {}
        if(!values.name) {
            errors.name = "Name is required!";
        }
        if(values.genres[0]==='') {
            errors.genres = "Genres is required!";
        }
        if(!values.image) {
            errors.image = "Image is required!";
        }
        if(!values.yearPremiered) {
            errors.yearPremiered = "YearPremiered is required!";
        }
        if(!values.youtubeEmbed) {
            errors.youtubeEmbed = "Youtube Embed is required!";
        }
        return errors;
      }

  return (
    <div style={{margin: '2%'}}>
 
<Card sx={{ width: '50%' }}>
<form onSubmit={handleSubmit}>
      <CardContent>
        <Typography sx={{ fontSize: 17 }} color="text.secondary" gutterBottom>
            Edit Movie: {movie.name} 
        </Typography>   
        <Grid container direction={"column"} spacing={3}>
        <Grid item>
                  <TextField
                    id="outlined-textarea"
                    label="Name:"
                    value={editMovie.name}
                    name="name"
                    onChange={(e) =>
                        setEditMovie({ ...editMovie, name: e.target.value })
                    }
                  />
                </Grid>
                <Grid item style={{color: 'red'}}>
                    {movieEditErrors.name}
                </Grid>
                <Grid item>
                  <TextField
                    id="outlined-textarea"
                    label="Genres:"
                    value={editMovie.genres}
                    name="genres"
                    onChange={(e) =>
                        setEditMovie({ ...editMovie, genres: e.target.value.split(',') })
                    }
                    />
                </Grid>
                <Grid item style={{color: 'red'}}>
                    {movieEditErrors.genres}
                </Grid>
                <Grid item>
                  <TextField
                    id="outlined-textarea"
                    label="Image URL:"
                    value={editMovie.image}
                    name="image"
                    onChange={(e) =>
                    setEditMovie({ ...editMovie, image: e.target.value })
                    }
                    />
                </Grid>
                <Grid item style={{color: 'red'}}>
                    {movieEditErrors.image}
                </Grid>
                <Grid item>
                  <TextField
                    name="yearPremiered"
                    label="Premired:"
                    type="date"
                    value={editMovie.yearPremiered.split('T')[0]}
                    InputLabelProps={{ shrink: true, required: true }}
                    onChange={(e) =>
                    setEditMovie({ ...editMovie, yearPremiered : e.target.value+"T00:00:00.000Z" })
                    }
                    />
                </Grid>
                <Grid item style={{color: 'red'}}>
                    {movieEditErrors.yearPremiered}
                </Grid>
                <Grid item>
                  <TextField
                    name="youtubeEmbed"
                    label="Youtube Embed:"
                    value={editMovie.youtubeEmbed}
                    onChange={(e) =>
                    setEditMovie({ ...editMovie, youtubeEmbed : e.target.value })
                    }
                    />
                </Grid>
                <Grid item style={{color: 'red'}}>
                    {movieEditErrors.youtubeEmbed}
                </Grid>
                <Grid item>
                  <Button type="submit" variant="contained">
                    UPDATE
                  </Button>{" "}
                  <Button variant="contained" onClick={cancel}>Cancel</Button> {' '}
                </Grid>
                </Grid>
      </CardContent>
      </form>
    </Card>
    </div>
  )
}

export default EditMovieComp