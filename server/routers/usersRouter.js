const express = require('express');
const usersBLL = require('../BLL/usersBLL')

const router = express.Router();

/* Get All Users */
router.route('/').get(async (req, res) => {
    try {
      const users = await usersBLL.getAllUsers();
      return res.json(users);
    } catch (error) {
      return res.json(error.message);
    }
  });

  /* Get By ID */
router.route('/:id').get(async (req, res) => {
    try {
      const { id } = req.params;
      const user = await usersBLL.getUserById(id);
      return res.json(user);
    } catch (error) {
      return res.json(error.message);
    }
  });
  
/* Add */
router.route('/').post(async (req, res) => {
    try {
      const newUser = req.body;
      const result = await usersBLL.addUser(newUser)
      return res.json(result);
    } catch (error) {
      return res.json(error);
    }
  });
  
  /* Update */
router.route('/:id').put(async (req, res) => {
    try {
      const { id } = req.params;
      const updatedUser = req.body;
      const result = await usersBLL.updateUser(id, updatedUser);
      return res.json(result);
    } catch (error) {
      return res.json(error);
    }
  });
  
  /* Delete */
router.route('/:id').delete(async (req, res) => {
    try {
      const { id } = req.params;
      const result = await usersBLL.deleteUser(id)
      return res.json(result);
    } catch (error) {
      return res.json(error);
    }
  });


module.exports = router