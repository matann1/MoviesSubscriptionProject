const doLoadSubscriptions = (subscriptions) => {
    return {
      type: 'LOADSUB',
      payload: subscriptions,
    };
  };
  
  const doAddSubscription = (subscription) => {
    return {
      type: 'ADDSUB',
      payload: subscription,
    };
  };

  export  { doLoadSubscriptions, doAddSubscription }