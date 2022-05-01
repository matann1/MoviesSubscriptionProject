const user = require('../model/userModel');

const getAllUsers = () => {
    return new Promise((resolve, reject) => {
        user.find({}, (err, users) => {
        if (err) {
          reject(err);
        }
        resolve(users);
      });
    });
  };

const getUserById = (id) => {
    return new Promise((resolve, reject) => {
      user.findById(id, (err, us) => {
        if (err) {
          reject(err);
        }
        resolve(us);
      });
    });
  };
  
const addUser = (newUser) => {
    return new Promise((resolve, reject) => {
      const us = new user(newUser);
      us.save((err) => {
        if (err) {
          reject(err);
        }
        resolve('Added Successfully');
      });
    });
  };

  const updateUser = (id, userToUpdate) => {
    return new Promise((resolve, reject) => {
      user.findByIdAndUpdate(id, userToUpdate, (err) => {
        if (err) {
          reject(err);
        }
        resolve('Updated Successfully');
      });
    });
  };
  
  const deleteUser = (id) => {
    return new Promise((resolve, reject) => {
      user.findByIdAndDelete(id, (err) => {
        if (err) {
          reject(err);
        }
        resolve('Deleted Successfully');
      });
    });
  };

module.exports = { getAllUsers, getUserById, addUser, updateUser, deleteUser }
