const express = require("express");
const productController = require("../controller/product.controller");
const multer = require("multer"); 
const router = express.Router();
const path = require('path');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/images');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extname = path.extname(file.originalname);
    cb(null, uniqueSuffix + extname);
  },
});

const upload = multer({ storage });

router.post('/',  upload.any('image'), productController.addProduct);

router.get("/:id", productController.getProductByID);
router.patch("/:id", productController.updateProduct);
router.get("/", productController.getAllProduct);

module.exports = router;
