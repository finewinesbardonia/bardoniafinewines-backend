const express = require('express');
const orderController = require('../controller/order.controller');

const router = express.Router();
router.post('/', orderController.create);
router.get('/', orderController.getAllOrders);
router.put('/byemail', orderController.getOrderByEmail);
router.put('/byid', orderController.getOrderByID);
router.post('/update', orderController.updateOrderStatus);
router.put('/search', orderController.searchOrder);

module.exports = router;
