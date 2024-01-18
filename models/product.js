const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    variety:{
        type: Array,

    },
    brand:{
        type: String,
    },
    price:{
        type:String,
    },
    name: {
        type: String,
    },
    desc:{
        type: String,
    },
    type:{
        type: String,

    },
    size:{
        type: String,
    },
    tag:{
        type:Array,
    },
    subType:{
        type: String,
    },
    varietal:{
        type: String,
    },
    country:{
        type: String,
    },
    state:{
        type: String,
    },
    region:{
        type: String,
    },
    quantity:{
        type: Number,
    },
    image:{
        type:String,
    },
    sku:{
        type:String,
    },
    upc:{
        type:String
    },
    status:{
        type:String,
        enum:['active','inactive'],
        default:'active'
    },
});

module.exports = mongoose.model('Products', ProductSchema);