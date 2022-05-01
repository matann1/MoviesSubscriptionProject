import axios from 'axios';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SubWatchedComp from './SubWatchedComp';
import YoutubeEmbed from '../components/YoutubeEmbed';
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';
import "./YoutubeEmbed.css";

import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { doDeleteMovie } from "../redux/MoviesActions";

const moviesUrl = 'http://localhost:8000/movies';

const MovieComp = ({movie}) => {
    const [toggle, setToggle] = useState(false);
    const toggleTrailer = () => setToggle(toggle => !toggle);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const editMovie = () => {
    navigate(`/movies/editmovie/${movie._id}`)
    }
    const deleteMovie = async () => {
        try{
            const {data} = await axios.delete(`${moviesUrl}/${movie._id}`);
            console.log(data);
            dispatch(doDeleteMovie(movie));
        }
        catch(err){
            console.log(err)
        }
    }

  return (
    <div style={{paddingBottom: '20px'}} >
      
        <Card style={{boxShadow: " rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset"}} sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="auto"
        image={movie.image}
        
      />
      <Button  variant="outlined" size="small" onClick={toggleTrailer} startIcon={<SmartDisplayIcon />} >Show Trailer</Button>
        {toggle &&  <YoutubeEmbed embedId={movie.youtubeEmbed}/>}
        {!toggle && null}
      <CardContent >
        <Typography gutterBottom variant="h6" component="div">
        {movie.name}
        </Typography>
        <Typography variant="body1" color="text.secondary">
        Genres: {movie.genres.map(gen => `"${gen}", `)}
        </Typography>
        <SubWatchedComp id={movie._id}/>
      </CardContent>
     
      <CardActions>
        <Button variant="outlined" onClick={editMovie} size="medium">Edit</Button>
        <Button variant="outlined" onClick={deleteMovie} size="medium">Delete</Button>
      </CardActions>
    </Card>
    <br />
    </div>
  )
}

export default MovieComp