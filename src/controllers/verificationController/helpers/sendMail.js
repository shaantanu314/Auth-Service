const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const getMailHTML = require("./getMailHTML");

require("dotenv").config();

const OAuth2 = google.auth.OAuth2;
const OAuth2_client = new OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET
);
OAuth2_client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

const sendMail = async (user, otp) => {
  const access_token = OAuth2_client.getAccessToken();
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.GOOGLE_USER_EMAIL,
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
      accessToken: access_token,
    },
  });

  const mail_options = {
    from: "DFS Admin",
    to: user.user_email,
    subject: "Email Verification Request",
    html: getMailHTML(user, otp),
  };

  return transport.sendMail(mail_options);
};

module.exports = sendMail;
