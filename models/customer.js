const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
    firstname:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    birthday:{
        type: Date,
        required: true
    },
    phone_number: {
        type: Number,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    emailVerfiy:{
        type: Boolean,
        default: false,
        required: true
    },
    emailVerfiyToken:{
        type: String,
        default: ''
    },
    password: {
        type: String,
        required: true
    },
    country:{
        type: String,
        required: true
    },
    state:{
        type: String,
        required: true
    },
    zip:{
        type: Number,
        required: true
    },
});

module.exports = mongoose.model('Customers', CustomerSchema);