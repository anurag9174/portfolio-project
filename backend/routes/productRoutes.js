const express = require("express");

const { protect } = require("../middleware/authMiddleware");

const upload = require("../middleware/uploadMiddleware");

const { authorize } = require("../middleware/roleMiddleware");

const {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
} = require("../controllers/productController");

const router = express.Router();



router.get(
    "/",
    protect,
    getProducts
);



router.get(
    "/:id",
    protect,
    getProductById
);



router.post(
    "/",
    protect,
    authorize("admin"),
    upload.single("image"),
    createProduct
);



router.put(
    "/:id",
    protect,
    authorize("admin"),
    upload.single("image"),
    updateProduct
);



router.delete(
    "/:id",
    protect,
    authorize("admin"),
    deleteProduct
);


module.exports = router;