const OrderModel = require('../models/order');

async function create(req, res) {
    try {
        const {
            firstname,
            lastname,
            country,
            street1,
            city,
            phoneNumber,
            email,
            orderNotes,
            products,
            total,
            orderStatus,
        } = req.body;

        const newOrder = await new OrderModel({
            firstname,
            lastname,
            country,
            street1,
            city,
            phoneNumber,
            email,
            orderNotes,
            products,
            total,
            orderStatus,
        }).save();

        return res.status(201).json({
            status: 'success',
            order: newOrder,
        });
    } catch (error) {
        return res.status(500).json({
            status: 'failed',
            message: error.message,
        });
    }
}

async function getAllOrders(req, res) {
    try {
        const orders = await OrderModel.find();
        return res.json({
            status: 'success',
            orders,
        });
    } catch (error) {
        return res.json({
            status: 'failed',
            message: error.message,
        });
    }
}

async function getOrderByEmail(req, res) {

    try {
        const { customerEmail } = req.body;
        const orders = await OrderModel.find({ email: customerEmail });

        if (!orders || orders.length === 0) {
            return res.json({
                status: 'failed',
                message: 'No orders found for the provided email',
            });
        }
        return res.json({
            status: 'success',
            orders,
        });
    } catch (error) {
        return res.json({
            status: 'failed',
            message: error.message,
        });
    }
}


module.exports = {
    create,
    getAllOrders,
    getOrderByEmail,
};