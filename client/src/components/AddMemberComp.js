import axios from "axios";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { doAddMember } from "../redux/MembersActions";

const membersUrl = "http://localhost:8000/members";

const AddMemberComp = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
   
    const [memberToAdd, setMemberToAdd] = useState({})
    const [memberToAddErrors, setmemberToAddErrors] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsSubmit(true);
      setmemberToAddErrors(validate(memberToAdd));
    };
  
    useEffect(() => {
      (async () => {if(Object.keys(memberToAddErrors).length === 0 && isSubmit){
          try{
        const { data } = await axios.post(`${membersUrl}`, memberToAdd);
        console.log(data)
        setMemberToAdd(memberToAdd);
        dispatch(doAddMember(memberToAdd));
        navigate('/mainpage/sub')
    }
    catch(err){
        console.log(err)
    }
      }})()
    }, [memberToAddErrors])
    
    const cancel = () => {
        navigate('/mainpage/',{state:{currentAlignment: 'allmembers'}})
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
    return errors;
  }

  return (
    <div style={{paddingBottom: '2%'}}>
      <Card sx={{ width: '50%' }}>
      <form onSubmit={handleSubmit}>
      <CardContent>
        <Typography sx={{ fontSize: 17 }} color="text.secondary" gutterBottom>
            Add New Member
        </Typography>   
        <Grid container direction={"column"} spacing={3}>
        <Grid item>
                  <TextField
                    id="outlined-textarea"
                    label="Name:"
                    name="name"
                    onChange={(e) =>
                     setMemberToAdd({ ...memberToAdd, name: e.target.value })
                    }
                  />
                </Grid>
                <Grid item style={{color: 'red'}}>
                    {memberToAddErrors.name}
                </Grid>
                <Grid item>
                  <TextField
                    id="outlined-textarea"
                    label="Email:"
                    name="email"
                    onChange={(e) =>
                        setMemberToAdd({ ...memberToAdd, email: e.target.value })
                    }
                    />
                </Grid>
                <Grid item style={{color: 'red'}}>
                    {memberToAddErrors.email}
                </Grid>
                <Grid item>
                  <TextField
                    id="outlined-textarea"
                    label="City:"
                    name="city"
                    onChange={(e) =>
                        setMemberToAdd({ ...memberToAdd, city: e.target.value })
                    }
                    />
                </Grid>
                <Grid item style={{color: 'red'}}>
                    {memberToAddErrors.city}
                </Grid>
                <Grid item>
                  <Button type="submit" variant="contained">
                    ADD
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

export default AddMemberComp