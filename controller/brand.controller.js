const Brand = require('../models/brands');

const create = async (req, res) => {
    const imagevar = req.files[0].destination + "/" + req.files[0].filename;
    const {
        brandName,
        brandDescription,
        brandImage = imagevar
    } = req.body;

    try {
        // Check if a brand with the same name already exists
        const existingBrand = await Brand.findOne({ brandName });

        if (existingBrand) {
            return res.json({
                status: "failed",
                message: "Brand with the same name already exists."
            });
        }

        // If not, create a new brand
        const newBrand = await new Brand({
            brandName,
            brandDescription,
            brandImage
        }).save();

        return res.json({
            status: "success",
            brand: newBrand
        });
    } catch (error) {
        return res.json({
            status: "failed",
            message: error.message
        });
    }
};

const getAll = async (req, res) => {
    try {
        const brands = await Brand.find();

        return res.json({
            status: "success",
            brands: brands
        });
    } catch (error) {
        return res.json({
            status: "failed",
            message: error.message
        });
    }
};

module.exports = {
    create,getAll
};