const express = require("express");
const storeController = require("../controller/store.controller");
const multer = require("multer"); 
const path = require("path");
const router = express.Router();

const storageLogo = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/logo");
  },
  filename: (req, file, cb) => {
    const extname = path.extname(file.originalname);
    cb(null, "logo" + extname);
  },
});

const storageBanners = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/uploads/banners");
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const extname = path.extname(file.originalname);
      cb(null, uniqueSuffix + extname);
    },
});

const uploadLogo = multer({ storage: storageLogo });
const uploadBanner = multer({ storage: storageBanners });

router.post("/updateLogo",uploadLogo.any('image'),storeController.updateLogo);
router.put("/updateBanners",uploadBanner.any('image'),storeController.updateBanners);
router.put("/updateEmailAndPhone", storeController.updateEmailAndPhone);
router.get("/", storeController.getConfiguration);

module.exports = router;
