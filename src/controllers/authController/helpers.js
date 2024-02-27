const { eq } = require("drizzle-orm");

const APIError = require("../../utils/APIError");

const {
  refreshToken: refreshTokenSchema,
} = require("../../db/schemas/refreshTokenSchema");
const { roles, userPermissions } = require("../../db/schemas/rolesSchema");
const db = require("../../db");

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

module.exports = {
  hasRefreshTokenExpired,
  getRefreshToken,
  deleteRefreshToken,
  getUserPermissions,
};
