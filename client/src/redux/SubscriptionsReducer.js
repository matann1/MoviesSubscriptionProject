const initialSubscriptionsState = {
    subscriptions: []
    
  };

  const applySubscriptionsChange = (state = initialSubscriptionsState, action) => {
    switch (action.type) {
      case 'LOADSUB':
        return { ...state, subscriptions: action.payload };

        case 'ADDSUB': {
            return { ...state, subscriptions: [...state.subscriptions, action.payload] };
          }
  
      default:
        return state;
    }
  };

  export default applySubscriptionsChange