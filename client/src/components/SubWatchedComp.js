import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const SubWatchedComp = ({id}) => {

    const subscriptions = useSelector(state => state.SubscriptionsReducer.subscriptions);
    const subscriptionsMovie = subscriptions.filter((sub)=> sub.movieId === id)
    const members = useSelector(state => state.MembersReducer.members);

    const memberRep = subscriptionsMovie.map((mem, index)=>{
            return (
                members.map((m) => {
                  
                    if(mem.memberId === m._id){
                        return (
                            <li key={index}>
                            <Link to={`/members/editmember/${mem.memberId}`}> {m.name}</Link>{',  '}
                            {(mem.date.split('T')[0]).split("-").reverse().join("-")} 
                        </li>
                        )
                    }
                    return null;
                }
                )
            )
    }
    )
  return (
    <div>
        <strong>Subscriptions Watched</strong>
        <ul>
            {memberRep}
        </ul>
    </div>
  )
}

export default SubWatchedComp