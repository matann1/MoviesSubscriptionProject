const initialUsersState = {
    users: []
    
  };
  
  const applyUsersChange = (state = initialUsersState, action) => {
    switch (action.type) {
      case 'LOADUSERS':
        return { ...state, users: action.payload };

      case 'EDITUSER': {
          const users = [...state.users];

          const userIndex = state.users.findIndex(
            (user) => user._id === action.payload._id
            );
          
            users[userIndex] = action.payload
            
          return { ...state, users : users};
        }

  
      default:
        return state;
    }
  };


export default applyUsersChange
 