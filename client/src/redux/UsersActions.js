const doLoadUsers = (users) => {
    return {
      type: 'LOADUSERS',
      payload: users,
    };
  };


  const doEditUser = (user) => {
    return {
      type: 'EDITUSER',
      payload: user,
    };
  };
  
  export  { doLoadUsers, doEditUser }