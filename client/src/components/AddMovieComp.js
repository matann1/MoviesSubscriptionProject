import axios from "axios";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { doAddMovie } from "../redux/MoviesActions";

const moviesUrl = "http://localhost:8000/movies";

const AddMovieComp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const movies = useSelector(state => state.MoviesReducer.movies);
  const [movieToAdd, setMovieToAdd] = useState({});
  const [movieToAddErrors, setMovieToAddErrors] = useState({})
  const [isSubmit, setIsSubmit] = useState(false)
  const [movieExist, setMovieExist] = useState(true)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmit(true);
    setMovieToAddErrors(validate(movieToAdd));
    if(movieExist === false){
        alert('This movie already exist!');
    }
  };

  useEffect(() => {
    if(movies.find((sunMem)=> sunMem.name === movieToAdd.name)){
        setMovieExist(false)
    }else{
        setMovieExist(true)
     }
    (async () => {if(Object.keys(movieToAddErrors).length === 0 && isSubmit && movieExist){
        try{
      const { data } = await axios.post(`${moviesUrl}`, movieToAdd);
      console.log(data)
      setMovieToAdd(movieToAdd);
      dispatch(doAddMovie(movieToAdd));
      setMovieExist(false)
      navigate('/mainpage')
    }
    catch(err){
        console.log(err)
    }
    }
}
    )()
  }, [movieToAddErrors, movieExist, isSubmit])
  
  const cancel = () => {
    navigate('/mainpage/' ,{state:{currentAlignment: 'allmovies'}})
}
  const validate = (values) => {
    const errors = {}
    if(!values.name) {
        errors.name = "Name is required!";
    }
    if(!values.genres) {
        errors.genres = "Genres is required!";
    }
    if(!values.image) {
        errors.image = "Image is required!";
    }
    if(!values.yearPremiered) {
        errors.yearPremiered = "Premiered is required!";
    }
    if(!values.youtubeEmbed) {
        errors.youtubeEmbed = "Youtube Embed is required!";
    }
    return errors;
  }

  return (
    <div style={{ margin: '2%' }}>
      <Card sx={{ width: "50%",  boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)" }}>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <Typography variant="h7" component="div">
              <Grid container direction={"column"} spacing={2}>
                <Grid item>
                  <TextField
                    id="outlined-textarea"
                    label="Name:"
                    multiline
                    name="name"
                    onChange={(e) =>
                      setMovieToAdd({ ...movieToAdd, name: e.target.value })
                    }
                    />
                </Grid>
                <Grid item style={{color: 'red'}}>
                    {movieToAddErrors.name}
                </Grid>
                <Grid item>
                  <TextField
                    id="outlined-textarea"
                    label="Genres:"
                    multiline
                    name="genres"
                    onChange={(e) =>
                      setMovieToAdd({
                        ...movieToAdd,
                        genres: e.target.value.split(","),
                      })
                    }
                  />
                </Grid>
                <Grid item style={{color: 'red'}}>
                    {movieToAddErrors.genres}
                </Grid>
                <Grid item>
                  <TextField
                    id="outlined-textarea"
                    label="Image URL:"
                    multiline
                    name="image"
                    onChange={(e) =>
                      setMovieToAdd({ ...movieToAdd, image: e.target.value })
                    }
                  />
                </Grid>
                <Grid item style={{color: 'red'}}>
                    {movieToAddErrors.image}
                </Grid>
                <Grid item >
                  <TextField
                    id="outlined-textarea"
                    type='date'
                    name="yearPremiered"
                    onChange={(e) =>
                      setMovieToAdd({
                        ...movieToAdd,
                        yearPremiered: e.target.value + "T00:00:00.000Z",
                      })
                    }
                  />
                </Grid>
                <Grid item style={{color: 'red'}}>
                    {movieToAddErrors.yearPremiered}
                </Grid>
                <Grid item>
                  <TextField
                    name="youtubeEmbed"
                    label="Youtube Embed:"
                    onChange={(e) =>
                    setMovieToAdd({ ...movieToAdd, youtubeEmbed : e.target.value })
                    }
                    />
                </Grid>
                <Grid item style={{color: 'red'}}>
                    {movieToAddErrors.youtubeEmbed}
                </Grid>
                <Grid item>
                  <Button type="submit" variant="contained">
                    ADD
                  </Button>{" "}
                  <Button variant="contained" onClick={cancel}>Cancel</Button> {' '}
                </Grid>
              </Grid>
            </Typography>
          </CardContent>
        </form>
      </Card>
    </div>
  );
};

export default AddMovieComp;
