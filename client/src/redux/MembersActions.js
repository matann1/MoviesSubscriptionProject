const doLoadMembers = (members) => {
    return {
      type: 'LOADMEMBERS',
      payload: members,
    };
  };

  const doEditMember = (member) => {
    return {
      type: 'EDITMEMBER',
      payload: member,
    };
  };

  const doAddMember = (member) => {
    return {
      type: 'ADDMEMBER',
      payload: member,
    };
};

    const doDeleteMember = (member) => {
        return {
          type: 'DELETEMEMBER',
          payload: member,
        }
    };

  
  export  { doLoadMembers, doEditMember, doAddMember, doDeleteMember }