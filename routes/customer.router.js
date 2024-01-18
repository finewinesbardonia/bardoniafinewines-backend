const express = require('express');

const customerController = require('../controller/customer.controller');

const router = express.Router();
router.post('/create', customerController.create);
router.get('/:id/verify/:token', customerController.verify);
router.put('/update', customerController.update);
router.get('/', customerController.getAllCustomer);
router.post('/login', customerController.login);
router.put('/searchCustomer', customerController.search);

module.exports = router;