const { eq, and, lt } = require("drizzle-orm");

const {
  refreshToken: refreshTokenSchema,
} = require("../../db/schemas/refreshTokenSchema");
const db = require("../../db");

const hasRefreshTokenExpired = async (token) => {
  const hasExpired = !!(
    await db
      .select()
      .from(refreshTokenSchema)
      .where(
        and(
          eq(refreshTokenSchema.token, token),
          lt(refreshTokenSchema.expires_at, new Date())
        )
      )
  ).length;

  if (!hasExpired) {
    return false;
  }

  // Remove the expired refresh token
  await db
    .delete(refreshTokenSchema)
    .where(eq(refreshTokenSchema.token, token));

  return true;
};

const getRefreshToken = (req) => req.cookies["dfs-auth-refresh-token"];

module.exports = { hasRefreshTokenExpired, getRefreshToken };
