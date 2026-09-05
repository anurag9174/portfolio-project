const express = require("express");

const protect = require("../middleware/authMiddleware");

const {
    createUser,
    getUsers,
    updateUser,
    deleteUser,
    changePassword,
    forgotPassword,
    resetPassword
} = require("../controllers/userController");

const router = express.Router();

router.post("/", createUser);

router.get("/", getUsers);

router.post("/forgot-password", forgotPassword);

router.put("/change-password", protect, changePassword);

router.put("/reset-password/:token", resetPassword);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);


module.exports = router;