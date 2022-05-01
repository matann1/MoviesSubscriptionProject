const initialMembersState = {
    members: []
    
  };

  const applyMembersChange = (state = initialMembersState, action) => {
    switch (action.type) {
      case 'LOADMEMBERS':
        return { ...state, members: action.payload };

        case 'EDITMEMBER': {
            const members = [...state.members];
  
            const memberIndex = state.members.findIndex(
              (member) => member._id === action.payload._id
              );
              members[memberIndex] = action.payload
              
            return { ...state, members : members};
          }

          case 'ADDMEMBER': {
            return { ...state, members: [...state.members, action.payload] };
          }


          case 'DELETEMEMBER': {
            const members = state.members.filter(
              (member) => member._id !== action.payload._id
            );
            return { ...state, members };
          }
  
      default:
        return state;
    }

  };

  export default applyMembersChange