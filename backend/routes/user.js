const express = require("express");
const requireAuth = require("../middleware/requireAuth");

const {
  signinUser,
  signupUser,
  getUsers,
} = require("../controllers/userController");

const router = express.Router();

// auth
router.post("/signin", signinUser);
router.post("/signup", signupUser);

// require auth for all workout routes
router.use(requireAuth);
// user
router.get("/users", getUsers);

module.exports = router;
