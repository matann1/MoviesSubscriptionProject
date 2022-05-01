import axios from 'axios';
import MemberMovieWatched from './MemberMovieWatched'
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import {  useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { doDeleteMember } from "../redux/MembersActions";

const membersUrl = 'http://localhost:8000/members';

const MemberComp = ({member}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const deleteMember = async () => {
        try{
        const {data} = await axios.delete(`${membersUrl}/${member._id}`);
        console.log(data);
        dispatch(doDeleteMember(member));
    }
    catch(err){
        console.log(err)
    }
}
    
  return (

        <div style={{paddingBottom: '20px'}} >
      <Card style={{boxShadow: " rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset", paddingLeft: '2%'}} sx={{width:'50%'}}>
      <Typography gutterBottom variant="h6" component="div">
      Name: {member.name} <br />
      Email: {member.email} <br />
      City: {member.city} <br />
      <Button variant="outlined" size="small" onClick={()=> navigate(`/members/editmember/${member._id}`)}>Edit</Button> {' '}
      <Button variant="outlined" size="small" onClick={deleteMember}>Delete</Button>
      </Typography>
      <MemberMovieWatched id={member._id}/>
  </Card>
    </div>
  )
}

export default MemberComp