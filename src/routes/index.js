const express = require("express");
const router = express.Router();

const authRouter = require("./authRouter");
const verificationRouter = require("./verificationRouter");

router.use("/auth", authRouter);
router.use("/verification", verificationRouter);

module.exports = router;
