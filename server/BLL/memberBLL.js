const member = require('../model/memberModel');
const sub = require('../BLL/subscriptionsBLL')

const getAllMembers = () => {
    return new Promise((resolve, reject) => {
        member.find({}, (err, members) => {
        if (err) {
          reject(err);
        }
        resolve(members);
      });
    });
  };
  
  const getMemberById = (id) => {
    return new Promise((resolve, reject) => {
      member.findById(id, (err, mem) => {
        if (err) {
          reject(err);
        }
        resolve(mem);
      });
    });
  };

  const addMember = (newMember) => {
    return new Promise((resolve, reject) => {
      const mem = new member(newMember);
      mem.save((err) => {
        if (err) {
          reject(err);
        }
        resolve('Added Successfully');
      });
    });
  };

  const updateMember = (id, memberToUpdate) => {
    return new Promise((resolve, reject) => {
      member.findByIdAndUpdate(id, memberToUpdate, (err) => {
        if (err) {
          reject(err);
        }
        resolve('Updated Successfully');
      });
    });
  };
  
  const deleteMember = (id) => {
    return new Promise((resolve, reject) => {
      member.findByIdAndDelete(id, async (err) => {
        if (err) {
          reject(err);
        }
        let resp = await sub.deleteSubscriptionsMember(id)
        console.log(resp)
        resolve('Deleted Successfully');
      });
    });
  };


module.exports = { getAllMembers, getMemberById, addMember, updateMember, deleteMember }
