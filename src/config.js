const config = {
  salt_rounds: 10,
  refresh_token_expiry_time: 24 * 60 * 60 * 1000, // 1 day
  access_token_expiry_time: 5 * 60 * 1000, //5 minutes
};

module.exports = config;
