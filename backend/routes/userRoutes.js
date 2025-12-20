// const express = require("express");
// const { register, login } = require("../controllers/userController");

// const router = express.Router();

// // REGISTER
// router.post("/register", register);

// // LOGIN
// router.post("/login", login);

// module.exports = router;

const express = require("express");
const { Register } = require("../controllers/userController");

const router = express.Router();

// Register:
router.post("/register", Register);
module.exports = router;
