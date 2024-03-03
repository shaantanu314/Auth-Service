const { eq } = require("drizzle-orm");

const sendMail = require("./helpers/sendMail");
const verifyOTP = require("./helpers/verifyOTP");

const { users } = require("../../db/schemas/userSchema");
const db = require("../../db");

const APIError = require("../../utils/APIError");

const { MAIL_TEMPLATES } = require("./constants");

const verifyEmail = async (req, res, next) => {
  try {
    const { user } = req.authentication,
      { otp } = req.body;

    if (user.verified) {
      throw new APIError(400, "User already verified");
    }

    const shouldVerifyEmail = await verifyOTP(user.user_id, otp);

    if (!shouldVerifyEmail) {
      throw new APIError(400, "Invalid verification code");
    }

    await db
      .update(users)
      .set({ verified: true })
      .where(eq(users.user_id, user.user_id))
      .then(() => {
        // We don't need to wait for this. can be done asynchronously
        sendMail({ user, otp }, MAIL_TEMPLATES.EMAIL_VERIFIED_MAIL);
      });

    res.status(200).send({
      message: "Email verified successfully",
      error: false,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = verifyEmail;
