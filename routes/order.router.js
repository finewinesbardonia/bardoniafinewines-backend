const express = require('express');
const orderController = require('../controller/order.controller');

const router = express.Router();
router.post('/', orderController.create);
router.get('/', orderController.getAllOrders);
router.post('/byemail', orderController.getOrderByEmail);


module.exports = router;
