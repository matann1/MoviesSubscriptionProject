const express = require('express');
const membersBLL = require('../BLL/memberBLL')

const router = express.Router();


router.route('/').get(async (req, res) => {
    try {
      const members = await membersBLL.getAllMembers();
      return res.json(members);
    } catch (error) {
      return res.json(error.message);
    }
  });
  
  router.route('/:id').get(async (req, res) => {
    try {
      const { id } = req.params;
      const member = await membersBLL.getMemberById(id);
      return res.json(member);
    } catch (error) {
      return res.json(error.message);
    }
  });

  router.route('/').post(async (req, res) => {
    try {
      const newMember = req.body;
      const result = await membersBLL.addMember(newMember)
      return res.json(result);
    } catch (error) {
      return res.json(error);
    }
  });
  
 
router.route('/:id').put(async (req, res) => {
    try {
      const { id } = req.params;
      const updatedMember = req.body;
      const result = await membersBLL.updateMember(id, updatedMember);
      return res.json(result);
    } catch (error) {
      return res.json(error);
    }
  });
  

router.route('/:id').delete(async (req, res) => {
    try {
      const { id } = req.params;
      const result = await membersBLL.deleteMember(id)
      return res.json(result);
    } catch (error) {
      return res.json(error);
    }
  });



module.exports = router