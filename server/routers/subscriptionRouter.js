const express = require('express');
const subscriptionsBLL = require('../BLL/subscriptionsBLL')

const router = express.Router();

router.route('/').get(async (req, res) => {
    try {
      const subscriptions = await subscriptionsBLL.getAllSubscriptions();
      return res.json(subscriptions);
    } catch (error) {
      return res.json(error.message);
    }
  });
  
router.route('/:id').get(async (req, res) => {
    try {
      const { id } = req.params;
      const subscription = await subscriptionsBLL.getSubscriptionById(id);
      return res.json(subscription);
    } catch (error) {
      return res.json(error.message);
    }
  });

  router.route('/').post(async (req, res) => {
    try {
      const newSubscription = req.body;
      const result = await subscriptionsBLL.addSubscription(newSubscription)
      return res.json(result);
    } catch (error) {
      return res.json(error);
    }
  });
  
 
router.route('/:id').put(async (req, res) => {
    try {
      const { id } = req.params;
      const updatedSubscription = req.body;
      const result = await subscriptionsBLL.updateSubscription(id, updatedSubscription);
      return res.json(result);
    } catch (error) {
      return res.json(error);
    }
  });
  

router.route('/:id').delete(async (req, res) => {
    try {
      const { id } = req.params;
      const result = await subscriptionsBLL.deleteSubscription(id)
      return res.json(result);
    } catch (error) {
      return res.json(error);
    }
  });

module.exports = router