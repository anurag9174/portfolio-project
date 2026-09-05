const express = require("express");

const {
    registerUser,
    loginUser,
    logoutUser
} = require("../controllers/authController");

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/logout", logoutUser);

// Protected route - Admin only
router.get(
    "/admin",
    protect,
    authorize("admin"),
    (req, res) => {
        res.json({
            message: "Welcome Admin!",
            user: req.user
        });
    }
);

module.exports = router;