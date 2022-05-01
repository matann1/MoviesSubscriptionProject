import axios from 'axios'
import MoviesComp from '../components/MoviesComp';
import MembersComp from '../components/MembersComp'

import { useState, useEffect } from "react";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import { useDispatch } from 'react-redux';
import { doLoadMovies } from "../redux/MoviesActions";
import { doLoadSubscriptions } from "../redux/SubscriptionsActions";
import { doLoadMembers } from "../redux/MembersActions";
import { useParams, useNavigate } from 'react-router-dom';


const moviesUrl = 'http://localhost:8000/movies';
const subUrl = 'http://localhost:8000/subscriptions';
const membersUrl = 'http://localhost:8000/members';

const MainPage = () => {

  const dispatch = useDispatch()
  const { sub } = useParams();
  const navigate = useNavigate();
  
  const [currentAlignment, setCurrentAlignment] = useState("movies");


  const username = sessionStorage.getItem('key');
  console.log(username);

  useEffect(() => {
    const fetchData = async () => {
      const { data: moviesData } = await axios.get(moviesUrl);
    if(sub){
        setCurrentAlignment('subscriptions')
    }
    
    dispatch(doLoadMovies(moviesData));
    }
    fetchData()
  },[dispatch, sub] )

  useEffect(() => {
    const fetchData = async () => {
      const { data: subscriptionsData } = await axios.get(subUrl);
      dispatch(doLoadSubscriptions(subscriptionsData));
    }
    fetchData()
  },[dispatch] )

  useEffect(() => {
    const fetchData = async () => {
      const { data: membersData } = await axios.get(membersUrl);
      dispatch(doLoadMembers(membersData));
    }
    fetchData()
  },[dispatch] )

  
  return (

    <div style={{ margin: '3%' }}>
      <ToggleButtonGroup
        value={currentAlignment}
        onChange={(event, newAlignment) => {
          setCurrentAlignment(newAlignment);
        }} 
        exclusive
        variant="contained"
        aria-label="text formatting"
        color="primary"
      >
        <ToggleButton value="movies">Movies</ToggleButton>
        <ToggleButton value="subscriptions">Subscriptions</ToggleButton>
        <ToggleButton value="usersmanagement">Users Management</ToggleButton>
        
      </ToggleButtonGroup>
        <br />
        <div style={{marginBottom: '20px'}}>
        {currentAlignment==='movies'? <MoviesComp/> : null}
        {currentAlignment==='subscriptions'? <MembersComp/> : null}
        {currentAlignment==='usersmanagement'? navigate(`/usersmanagement/${username.toLowerCase()}`) : null}
</div>

    </div>
  );
};

export default MainPage;
