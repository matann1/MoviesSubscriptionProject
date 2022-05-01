import axios from 'axios'
import Grid from "@mui/material/Grid";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from "@mui/material/TextField";

import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { doEditUser } from '../redux/UsersActions';

const usersUrl = 'http://localhost:8000/users';

const UsersManagement = () => {
    const { username } = useParams();
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const users = useSelector(state => state.UsersReducer.users);
    const user = users.find((user)=> user.username === username);
    const [editUser, setEditUser] = useState(user)
    const [editUserErrors, setEditUserErrors] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsSubmit(true);
      setEditUserErrors(validate(editUser));
    };
  
    useEffect(() => {
      (async () => {if(Object.keys(editUserErrors).length === 0 && isSubmit){
          try{
        const { data } = await axios.put(`${usersUrl}/${user._id}`, editUser);
        console.log(data)
        setEditUser(editUser);
        dispatch(doEditUser(editUser));
        sessionStorage.setItem('key', (editUser.username.charAt(0).toUpperCase()) + editUser.username.slice(1));
        navigate('/mainpage')
    }
    catch(err){
        console.log(err)
    }
      }})()
    }, [editUserErrors])
    
    const cancel = () => {
      navigate('/mainpage')
  }
  
    const validate = (values) => {
      const errors = {}
      if(!values.fullName) {
          errors.fullName = "Full Name is required!";
      }
      if(!values.username) {
          errors.username = "Username is required!";
      }
      if(!values.password) {
          errors.password = "Password is required!";
      }else if(values.password.length < 5){
          errors.password = "Password must be more than 5 characters!"
      }
      
      return errors;
    }

  return (
    <div style={{marginTop: '20px', marginLeft: '10px'}}>
      <Card sx={{ width: '50%' }}>
      <form onSubmit={handleSubmit}>
      <CardContent>
        <Typography sx={{ fontSize: 17 }} color="text.secondary" gutterBottom>
            Hi: {user?.fullName} 
        </Typography>   
        <Grid container direction={"column"} spacing={3}>
        <Grid item>
                  <TextField
                    label="Name:"
                    value={editUser.fullName}
                    multiline
                    name="fullName"
                    onChange={(e) =>
                     setEditUser({ ...editUser, fullName: e.target.value })
                    }
                  />
                </Grid>
                <Grid item style={{color: 'red'}}>
                    {editUserErrors.fullName}
                </Grid>
                <Grid item>
                  <TextField
                    label="username:"
                    value={editUser.username}
                    multiline
                    name="username"
                    onChange={(e) =>
                        setEditUser({ ...editUser, username: e.target.value })
                    }
                    />
                </Grid>
                <Grid item style={{color: 'red'}}>
                    {editUserErrors.username}
                </Grid>
                <Grid item>
                  <TextField
                    label="password:"
                    value={editUser.password}
                    type="password"
                    name="password"
                    onChange={(e) =>
                    setEditUser({ ...editUser, password: e.target.value })
                    }
                    />
                </Grid>
                <Grid item style={{color: 'red'}}>
                    {editUserErrors.password}
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

export default UsersManagement