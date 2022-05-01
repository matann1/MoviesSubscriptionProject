import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import MovieComp from './MovieComp'

import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const MoviesComp = () => {
    const movies = useSelector(state => state.MoviesReducer.movies);
    const navigate = useNavigate();
    const [searchMovie, setSearchMovie] = useState('')
    const [moviesAfterSreach, setMoviesAfterSreach] = useState([])
    const [currentAlignment, setCurrentAlignment] = useState("allmovies");

    const findMovie = () =>{
        setMoviesAfterSreach(movies.filter((movie)=> movie.name.toLowerCase().includes(searchMovie.toLowerCase())))
        setCurrentAlignment('searchmovies');
    }
    useEffect(() => {
      if(searchMovie === ''){
        setCurrentAlignment('allmovies');
      }
    }, [searchMovie])
    
  return (
    <div style={{width: '40%',paddingLeft: '3%' ,boxShadow: 'rgb(38, 57, 77) 0px 20px 30px -10px'}}>
        <h2>Movies</h2>
        <br />
      
    <ToggleButtonGroup
      value={currentAlignment}
      onChange={(event, newAlignment) => {
        setCurrentAlignment(newAlignment);
      }} 
      exclusive
      variant="contained"
      aria-label="text formatting"
      color="primary"
      size='small'
    >
      <ToggleButton value="allmovies">All Movies </ToggleButton>
      <ToggleButton value="addmovie">Add movie</ToggleButton>

    </ToggleButtonGroup> {' '}
    <TextField
    size="small"
          label="Find Movie"
          onChange={(e)=> setSearchMovie(e.target.value)}
        /> {' '}
        <Button variant="contained" onClick={findMovie}>Find</Button> <br /> <br />

        {currentAlignment==='allmovies'? 
        movies.map((movie)=> {
            return <MovieComp key={movie._id} movie={movie}/> 
        }) : null}
        {currentAlignment==='searchmovies'? 
        moviesAfterSreach.map((movie)=> {
            return <MovieComp key={movie._id} movie={movie}/> 
        }) : null}
        {currentAlignment==='addmovie'? 
           navigate('/movies/addmovie') : null
    }
    </div>
  )
}

export default MoviesComp