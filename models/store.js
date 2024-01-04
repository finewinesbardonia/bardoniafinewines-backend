const mongoose = require('mongoose');

const StoreSchema = new mongoose.Schema({
    storeName:{
        type: String,
    },
    storeAddress:{
        type: String,
    },
    storePhone:{
        type: String,
    },
    storeEmail:{
        type: String,
    },
    storeLogo:{
        type: String,
    },
    storeBanners:{
        type: Array,
    },

});

module.exports = mongoose.model('Stores', StoreSchema);