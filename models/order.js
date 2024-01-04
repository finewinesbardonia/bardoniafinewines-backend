const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    firstname:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    country:{
        type: String,
        required: true
    },
    street1:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    phoneNumber:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    orderNotes:{
        type: String,
        default: ""
    },
    products:{
        type: Array,
        required: true
    },
    total:{
        type: Number,
        required: true
    },
    orderDate:{
        type: Date,
        default: Date.now
    },
    orderTime:{
        type: String,
        default: new Date().toLocaleTimeString()
    },
    orderStatus:{
        type: String,
        default: "Pending"
    }
});

module.exports = mongoose.model('Orders', OrderSchema);