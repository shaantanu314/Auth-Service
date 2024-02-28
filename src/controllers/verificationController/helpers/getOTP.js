const { eq } = require("drizzle-orm");

const { otpSchema } = require("../../../db/schemas/otpSchema");
const db = require("../../../db");

const config = require("../../../config");

const getOTP = async (id) => {
  // delete previously generated otp if exists
  await db.delete(otpSchema).where(eq(otpSchema.user_id, id));

  const newOTP = Math.floor(Math.random() * 900000) + 100000; // generates a 6 digit random number

  const expiry_time = new Date().getTime() + config.otp_expiry_time;

  await db.insert(otpSchema).values({
    user_id: id,
    otp: newOTP,
    expires_at: new Date(expiry_time),
  });

  setTimeout(() => {
    // trigger otp delete call when the validity time is expired
    db.delete(otpSchema).where(eq(otpSchema.user_id, id));
  }, config.otp_expiry_time);

  return newOTP;
};

module.exports = getOTP;
