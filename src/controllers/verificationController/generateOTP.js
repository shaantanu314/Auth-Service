const sendMail = require("./helpers/sendMail");
const getOTP = require("./helpers/getOTP");

const { MAIL_TEMPLATES } = require("./constants");

const generateVerificationCode = async (req, res, next) => {
  try {
    const { user } = req.authentication;

    const otp = await getOTP(user.user_id);

    await sendMail({ user, otp }, MAIL_TEMPLATES.EMAIL_VERIFICATION_MAIL);

    res.status(200).send({
      message: "OTP sent successfully to registered email-id",
      error: false,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = generateVerificationCode;
