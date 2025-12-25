const authController = require("../controllers/authController");
const { authMiddleware } = require("../middleware/authMiddleware");
const router = require("express").Router();

// Admin Login:
router.post("/admin-login", authController.admin_login);

// Get User:
router.get("/get-user", authMiddleware, authController.getUser);

module.exports = router;
