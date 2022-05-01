import axios from 'axios'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import moment from "moment";

import { useState, useEffect } from 'react'
import { doAddSubscription } from "../redux/SubscriptionsActions";
import { useDispatch, useSelector } from "react-redux";

const subUrl = 'http://localhost:8000/subscriptions';

const AddNewMovieToMember = ({movies, id}) => {
    const subscriptions = useSelector(state => state.SubscriptionsReducer.subscriptions);
    const subscriptionsMember = subscriptions.filter((sub)=> sub.memberId === id);
   
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState('');
    const [objToAdd, setObjToAdd] = useState({memberId: id, movieId: movies[0]?._id, date: moment().format("YYYY-MM-DDT00:00:00.000")})
    const [movieExist, setMovieExist] = useState(true)

    const add = async () => {
        if(movieExist){
          try{
            const {data} = await axios.post(subUrl, objToAdd);
            console.log(data);
            dispatch(doAddSubscription(objToAdd));
            setMovieExist(false)
            }
            catch(err){
                console.log(err)
            }
        }else{
            alert('This movie already subscribe!');
        }
    }

    useEffect(() => {
      if(subscriptionsMember.find((sunMem)=> sunMem.movieId === objToAdd.movieId)){
          setMovieExist(false)
      }else{
          setMovieExist(true)
      }
    }, [objToAdd, subscriptionsMember])
    
  return (
    <div style={{border: '3px solid black', margin: '5px'}}>
    <Autocomplete style={{margin: '2px'}}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);

        setObjToAdd({...objToAdd, movieId :((movies.find((movie)=> movie.name === newInputValue))?._id)})
      }}
      defaultValue={movies[0]?.name}
      options={movies.map((movie)=> movie.name)}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} />}
    />
    <button onClick={add}>Subscribe</button>
  </div>
  )
}

export default AddNewMovieToMember