const mongoose = require('mongoose');

const BrandsSchema = new mongoose.Schema({
    brandName:{
        type: String,
        unique: true
    },
    brandDescription:{
        type: String,
    },
    brandImage:{
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Brands', BrandsSchema);