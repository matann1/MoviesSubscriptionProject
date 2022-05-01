const subscription = require('../model/subscriptionModel');

const getAllSubscriptions = () => {
    return new Promise((resolve, reject) => {
        subscription.find({}, (err, subscriptions) => {
        if (err) {
          reject(err);
        }
        resolve(subscriptions);
      });
    });
  };
  
  const getSubscriptionById = (id) => {
    return new Promise((resolve, reject) => {
      subscription.findById(id, (err, sub) => {
        if (err) {
          reject(err);
        }
        resolve(sub);
      });
    });
  };
  
const addSubscription = (newSubscription) => {
    return new Promise((resolve, reject) => {
      const sub = new subscription(newSubscription);
      sub.save((err) => {
        if (err) {
          reject(err);
        }
        resolve('Added Successfully');
      });
    });
  };

  const updateSubscription = (id, subscriptionToUpdate) => {
    return new Promise((resolve, reject) => {
      subscription.findByIdAndUpdate(id, subscriptionToUpdate, (err) => {
        if (err) {
          reject(err);
        }
        resolve('Updated Successfully');
      });
    });
  };
  
  const deleteSubscription = (id) => {
    return new Promise((resolve, reject) => {
      subscription.findByIdAndDelete(id, (err) => {
        if (err) {
          reject(err);
        }
        resolve('Deleted Successfully');
      });
    });
  };

  const deleteSubscriptionsMovie = (id) => {
    return new Promise((resolve, reject) => {
      subscription.deleteMany({movieId: id}, (err) => {
        if (err) {
          reject(err);
        }
        resolve('Deleted Successfully');
      });
    });
  };

  const deleteSubscriptionsMember = (id) => {
    return new Promise((resolve, reject) => {
      subscription.deleteMany({memberId: id}, (err) => {
        if (err) {
          reject(err);
        }
        resolve('Deleted Successfully');
      });
    });
  };


module.exports = { getAllSubscriptions, getSubscriptionById, addSubscription, updateSubscription, deleteSubscription, deleteSubscriptionsMovie, deleteSubscriptionsMember }
