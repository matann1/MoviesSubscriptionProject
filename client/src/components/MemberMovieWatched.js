import AddNewMovieToMember from './AddNewMovieToMember'
import Button from '@mui/material/Button';

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useState } from 'react'


const MemberMovieWatched = ({id}) => {
    const subscriptions = useSelector(state => state.SubscriptionsReducer.subscriptions);
    const movies = useSelector(state => state.MoviesReducer.movies);

    const subscriptionsMember = subscriptions.filter((sub)=> sub.memberId === id)
    const [toggle, setToggle] = useState(false);
    const toggleChecked = () => setToggle(toggle => !toggle);

    const memberRep = subscriptionsMember.map((mem, index)=>{
                        return (
                            movies.map((mov)=>{
                                if(mov._id === mem.movieId){
                                    return (
                                        <li key={index}>
                                            <Link to={`/movies/editmovie/${mov._id}`}> {mov.name}</Link>{',  '}
                                            {mem.date.split('T')[0].split("-").reverse().join("-")} 
                                        </li>
                                    )
                                }
                                return null;
                            })
                        )
                })
return (
<div>
    <strong>Movies Watched</strong> <br />
    <Button  variant="outlined" size="small" onClick={toggleChecked}>Subscribe to new movie</Button>
    {toggle &&  <AddNewMovieToMember movies={movies} id={id}/> }
    {!toggle && null}
    <ul>
        {memberRep}
    </ul>
</div>
)
}

export default MemberMovieWatched