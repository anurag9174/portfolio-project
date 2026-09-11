const express = require("express");

const { protect } = require("../middleware/authMiddleware");

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


// Create User
router.post("/", createUser);


// Get Users
router.get("/", getUsers);


// Forgot Password
router.post("/forgot-password", forgotPassword);


// Change Password
router.put(
    "/change-password",
    protect,
    changePassword
);


// Reset Password
router.put(
    "/reset-password/:token",
    resetPassword
);


// Update User
router.put("/:id", updateUser);


// Delete User
router.delete("/:id", deleteUser);


module.exports = router;