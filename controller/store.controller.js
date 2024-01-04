const Store = require("../models/store");

const updateLogo = async (req, res) => {

    const imagevar = req.files[0].destination +"/"+req.files[0].filename;

    console.log(imagevar);

    try {
        const store = await Store.findOneAndUpdate(
            { _id: "6592fc0844f971f1dfbf3c25" },
            { storeLogo: imagevar },
            { new: true }
        );
        res.json({
            status: "success",
            data: store,
        });
    } catch (error) {
        res.json({
            status: "failed",
            message: error.message,
        });
    }
};

const updateBanners = async (req, res) => {
    try {
        const store = await Store.findOneAndUpdate(
            { _id: req.params.id },
            { banners: req.files.map((file) => file.path) },
            { new: true }
        );
        res.json({
            status: "success",
            data: store,
        });
    } catch (error) {
        res.json({
            status: "failed",
            message: error.message,
        });
    }
};

const updateEmailAndPhone = async (req, res) => {
    try {
        const store = await Store.findOneAndUpdate(
            { _id: req.params.id },
            { email: req.body.email, phone: req.body.phone },
            { new: true }
        );
        res.json({
            status: "success",
            data: store,
        });
    } catch (error) {
        res.json({
            status: "failed",
            message: error.message,
        });
    }
};

const getConfiguration = async (req, res) => {

    try {
        const store = await Store.find();
        res.json({
            status: "success",
            data: store,
        });
    } catch (error) {
        res.json({
            status: "failed",
            message: error.message,
        });
    }
};

module.exports = {
    updateLogo,
    updateBanners,
    updateEmailAndPhone,
    getConfiguration,
};

