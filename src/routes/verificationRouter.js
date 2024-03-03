const express = require("express");
const router = express.Router();

const verificationController = require("../controllers/verificationController");

const authenticateUser = require("../middleware/authenticateUser");

router.get(
  "/verify-email",
  authenticateUser,
  verificationController.generateVerificationCode
);

router.post(
  "/verify-email",
  authenticateUser,
  verificationController.verifyEmail
);

module.exports = router;
