const config = {
  salt_rounds: 10,
  refresh_token_expiry_time: 24 * 60 * 60 * 1000, // 1 day
  refresh_token_expiry_time_long: 30 * 24 * 60 * 60 * 1000, // 1 month : to be used in case of 'remember me'
  access_token_expiry_time: 15 * 60 * 1000, //15 minutes
  otp_expiry_time: 2 * 60 * 1000, // 2 minutes
};

module.exports = config;
