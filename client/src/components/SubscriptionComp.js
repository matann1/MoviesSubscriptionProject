import MemberComp from './MemberComp'

import { useSelector } from 'react-redux';

const SubscriptionComp = ({id}) => {
    const subscriptions = useSelector(state => state.SubscriptionsReducer.subscriptions);
    const members = subscriptions.filter((sub)=> sub.movieId === id)
   
    const member = members.map((mem, index)=> {return (
        <MemberComp  key={index} id={mem.memberId}/>
    )}
    ) 
    return (
    <div>
        <h5>Subscriptions Watched</h5>
        {member}
    </div>
  )
}

export default SubscriptionComp