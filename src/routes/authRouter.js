const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

router.post("/signup", authController.signup);
router.post("/signin", authController.signin);
router.get("/access-token", authController.getAccessToken);
router.get("/logout", authController.logoutUser);

module.exports = router;
