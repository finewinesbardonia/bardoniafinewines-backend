const ProductModel = require("../models/product");

async function addProduct(req, res) {
  try {
    const {
      name,
      type,
      size,
      price,
      brand,
      country,
      subType,
      varietal,
      quantity,
      desc,
      sku,
      upc,
    } = req.body;


    const imagevar = req.files[0].destination +"/"+req.files[0].filename;

    // return res.json({ files: req.files });
    // Check if a product with the same details already exists
    const existingProduct = await ProductModel.findOne({
      name,
      type,
      size,
      price,
      brand,
      country,
      subType,
      varietal,
      quantity,
      desc,
      sku,
      upc,
    });

    if (existingProduct) {
      // If the product already exists, you can choose to update it or return an error
      return res.json({ status: "failed", message: "Product already exists" });
    }

    // If the product doesn't exist, create a new product and save it to the database
    const product = new ProductModel({
      name,
      type,
      size,
      price,
      brand,
      country,
      subType,
      varietal,
      quantity,
      desc,
      sku,
      image: imagevar,
      upc,
    });
    // return res.json({ product });
    await product.save();
    res.json({ status: "success", data: product });
  } catch (error) {
    console.error("Error during product creation:", error);
    res.json({ status: "failed", message: "Error during product creation" });
  }
}

async function getProductByID(req, res) {
  const id = req.params.id; // assuming ID is passed as a route parameter

  try {
    const targetProduct = await ProductModel.findById(id);

    if (!targetProduct) {
      return res.json({ status: "failed", message: "Product not found" });
    }

    // Handle the found product, for example:
    res.json({ status: "success", product: targetProduct });
  } catch (e) {
    console.error(e);
    res.json({ status: "failed", message: "Internal server error" });
  }
}

async function updateProduct(req, res) {
  const productId = req.params.id; // Assuming ID is passed as a route parameter

  // You can extract the fields you want to update from the request body
  const {
    name,
    type,
    description,
    tag,
    subType,
    varietal,
    country,
    state,
    region,
    quantity,
  } = req.body;

  try {
    // Use findByIdAndUpdate to update the product
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      productId,
      {
        name,
        type,
        description,
        tag,
        subType,
        varietal,
        country,
        state,
        region,
        quantity,
      },
      { new: true, runValidators: true } // Options to return the updated document and run validators
    );

    if (!updatedProduct) {
      return res.json({ status: "failed", message: "Product not found" });
    }

    // Handle the updated product, for example:
    res.json({ status: "success", updatedProduct });
  } catch (e) {
    console.error(e);
    res.json({ status: "failed", message: "Internal server error" });
  }
}

async function getAllProduct(req, res) {
  try {
    // Use find to retrieve all products
    const allProducts = await ProductModel.find();

    // Handle the retrieved products, for example:
    res.json({ status: "success", products: allProducts });
  } catch (e) {
    console.error(e);
    res.json({ status: "failed", message: "Internal server error" });
  }
}

module.exports = {
  addProduct,
  getProductByID,
  updateProduct,
  getAllProduct,
};
