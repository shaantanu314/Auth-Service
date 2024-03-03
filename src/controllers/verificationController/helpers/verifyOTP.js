const { eq, and } = require("drizzle-orm");

const { otpSchema } = require("../../../db/schemas/otpSchema");
const db = require("../../../db");

const verifyOTP = async (id, otp) =>
  !!(
    await db
      .select()
      .from(otpSchema)
      .where(and(eq(otpSchema.user_id, id), eq(otpSchema.otp, otp)))
  ).length;

module.exports = verifyOTP;
