
import MemberComp from './MemberComp'
import AddMemberComp from './AddMemberComp'

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ToggleButtonGroup, ToggleButton } from "@mui/material";

const MembersComp = (props)=> {
    const users = useSelector(state => state.UsersReducer.users);
    const user = users.find((user)=> user.username === (sessionStorage.getItem('key')).toLowerCase())
    const members = useSelector(state => state.MembersReducer.members);
    const [currentAlignment, setCurrentAlignment] = useState("allmembers");

    useEffect(() => {
        setCurrentAlignment('allmembers')
    }, [members,props])
    
  return (
    <div style={{width: '50%',paddingLeft: '50px' ,boxShadow: 'rgb(38, 57, 77) 0px 20px 30px -10px'}}>
        <h2>Subscriptions</h2>
        <br />
    <ToggleButtonGroup
      value={currentAlignment}
      onChange={(event, newAlignment) => {
        setCurrentAlignment(newAlignment);
      }} 
      exclusive
      variant="contained"
      aria-label="text formatting"
      color="primary"
      size='small'
    >
      <ToggleButton value="allmembers">All Members</ToggleButton>
      <ToggleButton disabled={!user?.permission} value="addmember">Add Member</ToggleButton>
    </ToggleButtonGroup> {' '}
         <br /> <br />
        {currentAlignment==='allmembers' ? members.map((member)=> {
            return <MemberComp key={member._id} member={member}/> 
        }) : null}
        {currentAlignment==='addmember' ?
          <AddMemberComp/> : null
    }
    </div>
  )
}

export default MembersComp