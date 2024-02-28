const { eq, and } = require("drizzle-orm");

const {
  refreshToken: refreshTokenSchema,
} = require("../../db/schemas/refreshTokenSchema");
const { users } = require("../../db/schemas/userSchema");

const { userPermissions } = require("../../db/schemas/rolesSchema");
const db = require("../../db");

const { signToken } = require("../../utils/jwt");

const config = require("../../config");

const deleteRefreshToken = async (token) =>
  db.delete(refreshTokenSchema).where(eq(refreshTokenSchema.token, token));

const hasRefreshTokenExpired = async (token) => {
  const refreshToken = (
    await db
      .select()
      .from(refreshTokenSchema)
      .where(eq(refreshTokenSchema.token, token))
  )[0];

  const hasExpired = refreshToken?.expires_at < new Date();

  if (refreshToken && !hasExpired) {
    return false;
  }

  // Remove the expired refresh token
  if (refreshToken) {
    await deleteRefreshToken(token);
  }

  return true;
};

const getRefreshToken = (req) => req.cookies["dfs-auth-refresh-token"];

const getUserPermissions = async (id) => {
  const user_role_map = await db
    .select()
    .from(userPermissions)
    .where(eq(userPermissions.user_id, id));

  return user_role_map.map((role) => role.role_id);
};

const generateAccessToken = async (refreshTokenCookie) => {
  const user = (
    await db
      .select({ ...users })
      .from(users)
      .innerJoin(
        refreshTokenSchema,
        and(
          eq(users.user_id, refreshTokenSchema.user_id),
          eq(refreshTokenSchema.token, refreshTokenCookie)
        )
      )
  )?.[0];

  // get user permissions
  const user_permissions = await getUserPermissions(user.user_id);

  // Create an access token
  const accessToken = signToken({
    user,
    user_permissions,
    expires_at: new Date().getTime() + config.access_token_expiry_time,
  });

  return { accessToken, user };
};

module.exports = {
  hasRefreshTokenExpired,
  getRefreshToken,
  deleteRefreshToken,
  getUserPermissions,
  generateAccessToken,
};
