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
import { doEditMember } from '../redux/MembersActions';

const membersUrl = 'http://localhost:8000/members';

const EditMemberComp = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate();
  const { memberid } = useParams();
  const members = useSelector(state => state.MembersReducer.members);
  const member = members.find((member)=> member._id === memberid)
  const [editMember, setEditMember] = useState(member)
  const [editMembersErrors, setEditMembersErrors] = useState({})
  const [isSubmit, setIsSubmit] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmit(true);
    setEditMembersErrors(validate(editMember));
  };

  useEffect(() => {
    (async () => {if(Object.keys(editMembersErrors).length === 0 && isSubmit){
      try{
      const { data } = await axios.put(`${membersUrl}/${member._id}`, editMember);
      console.log(data)
      setEditMember(editMember);
      dispatch(doEditMember(editMember));
      navigate('/mainpage/sub')
    }
    catch(err){
        console.log(err)
    }
    }})()
  }, [editMembersErrors])
  
  const cancel = () => {
    navigate('/mainpage/sub')
}
  const validate = (values) => {
    const errors = {}
    const regex = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
    if(!values.name) {
        errors.name = "Name is required!";
    }
    if(!values.email) {
        errors.email = "Email is required!";
    }else if(!regex.test(values.email)){
      errors.email = "This is not a valid email format!"
    }
    if(!values.city) {
        errors.city = "City is required!";
    }
    console.log('validate render')
    return errors;
  }

  return (
    <div style={{marginTop: '20px', marginLeft: '10px'}}>
      <Card sx={{ width: '50%' }}>
      <form onSubmit={handleSubmit}>
      <CardContent>
        <Typography sx={{ fontSize: 17 }} color="text.secondary" gutterBottom>
            Edit Member: {member.name} 
        </Typography>   
        <Grid container direction={"column"} spacing={3}>
        <Grid item>
                  <TextField
                    id="outlined-textarea"
                    label="Name:"
                    value={editMember.name}
                    multiline
                    name="name"
                    onChange={(e) =>
                     setEditMember({ ...editMember, name: e.target.value })
                    }
                  />
                </Grid>
                <Grid item style={{color: 'red'}}>
                    {editMembersErrors.name}
                </Grid>
                <Grid item>
                  <TextField
                    id="outlined-textarea"
                    label="Email:"
                    value={editMember.email}
                    multiline
                    name="email"
                    onChange={(e) =>
                        setEditMember({ ...editMember, email: e.target.value })
                    }
                    />
                </Grid>
                <Grid item style={{color: 'red'}}>
                    {editMembersErrors.email}
                </Grid>
                <Grid item>
                  <TextField
                    id="outlined-textarea"
                    label="City:"
                    value={editMember.city}
                    multiline
                    name="city"
                    onChange={(e) =>
                    setEditMember({ ...editMember, city: e.target.value })
                    }
                    />
                </Grid>
                <Grid item style={{color: 'red'}}>
                    {editMembersErrors.city}
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

export default EditMemberComp