const ProductModel = require("../models/product");

async function addProduct(req, res) {
  console.log("LOG: ADD PRODUCT")
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


    const imagevar = req.files[0].destination + "/" + req.files[0].filename;

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
      status,
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
  console.log("LOG: GET PRODUCT BY ID")
  const productId = req.params.id;
  console.log("Product ID: ", productId);
  try {
    const targetProduct = await ProductModel.findById({ _id: productId });

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
  console.log("LOG: UPDATE PRODUCT")
  const { id } = req.body

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
      _id=id,
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
  console.log("LOG: GET ALL PRODUCT")
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

async function deleteProduct(req, res) {
  console.log("LOG: DELETE PRODUCT")
  const { id } = req.body; // Assuming ID is passed as a route parameter

  try {
    // Use findByIdAndDelete to delete the product
    const deletedProduct = await ProductModel.findByIdAndDelete({ _id:id });

    if (!deletedProduct) {
      return res.json({ status: "failed", message: "Product not found" });
    }

    // Handle the deleted product, for example:
    res.json({ status: "success", deletedProduct });
  } catch (e) {
    console.error(e);
    res.json({ status: "failed", message: "Internal server error" });
  }
}

async function searchProduct(req, res) {
  console.log("LOG: SEARCH PRODUCT")
  const { query } = req.body;
  try {
    // Use find to retrieve all products
    const allProducts = await ProductModel.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { type: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
        { tag: { $regex: query, $options: "i" } },
        { subType: { $regex: query, $options: "i" } },
        { varietal: { $regex: query, $options: "i" } },
        { country: { $regex: query, $options: "i" } },
        { state: { $regex: query, $options: "i" } },
        { region: { $regex: query, $options: "i" } },
      ],
    });

    console.log("All Products: ", allProducts);

    // Handle the retrieved products, for example:
    res.json({ status: "success", products: allProducts });
  } catch (e) {
    console.error(e);
    res.json({ status: "failed", message: "Internal server error" });
  }
};

async function updateStatus(req, res) {
  console.log("LOG: UPDATE STATUS")
  try {
    const { id } = req.body;

    // Find the product
    const product = await ProductModel.findById({ _id: id });


    if (!product) {
      return res.status(404).json({ status: "failed", error: "product not found" });
    }

    if (product.status === "active") {
      product.status = "inactive";
    } else {
      product.status = "active";
    }

    await product.save();

    res.json({ status: "success", message: "product status updated successfully", product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "failed", error: "Internal Server Error" });
  }
}

module.exports = {
  addProduct,
  getProductByID,
  updateProduct,
  getAllProduct,
  updateStatus,
  deleteProduct,
  searchProduct
};
