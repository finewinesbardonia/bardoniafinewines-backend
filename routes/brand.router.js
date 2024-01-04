const express = require("express");
const brandController = require("../controller/brand.controller");
const multer = require("multer");   // npm install --save multer
const router = express.Router();
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/brands');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extname = path.extname(file.originalname);
        cb(null, uniqueSuffix + extname);
    },
});

const upload = multer({ storage });

router.post('/', upload.any('image'), brandController.create);
router.get("/", brandController.getAll);


module.exports = router;
