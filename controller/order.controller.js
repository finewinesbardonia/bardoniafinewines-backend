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

async function getOrderByID(req, res) {
    try {
        const { orderID } = req.body;
        const orders = await OrderModel.find({ _id: orderID });

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

async function updateOrderStatus(req, res) {

    console.log("LOG: UPDATE STATUS")
    try {
        const { orderID, status } = req.body;

        // Find the order
        const order = await OrderModel.findById({ _id: orderID });

        if (!order) {
            return res.status(404).json({ status: "failed", error: "order not found" });
        }

        order.orderStatus = status;

        await order.save();

        res.json({ status: "success", message: "order status updated successfully", order });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "failed", error: "Internal Server Error" });
    }

}

async function searchOrder(req, res) {
    console.log("LOG: SEARCH ORDER")
    const { query } = req.body;
    try {
        // Use find to retrieve all products
        const allOrders = await OrderModel.find({
            $or: [
                { firstname: { $regex: query, $options: "i" } },
                { lastname: { $regex: query, $options: "i" } },
                { email: { $regex: query, $options: "i" } },
                { orderStatus: { $regex: query, $options: "i" } },
            ],
        });

        console.log("All Orders: ", allOrders);

        // Handle the retrieved products, for example:
        res.json({ status: "success", orders: allOrders });
    } catch (e) {
        console.error(e);
        res.json({ status: "failed", message: "Internal server error" });
    }
}

module.exports = {
    create,
    getAllOrders,
    getOrderByEmail,
    getOrderByID,
    updateOrderStatus,
    searchOrder
};