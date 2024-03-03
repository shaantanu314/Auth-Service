const { MAIL_TEMPLATES } = require("../constants");

const mail_common_styles = `
<style>
  body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
  }
  .container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
  }
  .logo {
    width: 100%;
    max-width: 100px;
    margin-top: 10px;
  }
  .welcome {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  .contact {
    margin-top: 20px;
    }

  .contact p {
    margin-bottom: 10px;
  }
  .message {
    font-size: 16px;
    margin-bottom: 20px;
  }
</style>
`;

const mail_footer = `
  <img class="logo" src="https://ihub-data.iiit.ac.in/assets/img/logo.png" alt="DFS Logo">
  <div class="contact">
    <p>Location: IIIT Hyderabad, Professor CR Rao Rd, Gachibowli, Hyderabad, Telangana 500032</p>
    <p>Email: ihub-data@iiit.ac.in</p>
    <p>Call: 0091 40 6653 1783</p>
  </div>
  <div class="closing">
    <p>
      If you have any questions or need further assistance, please do not hesitate to contact us. We look forward to serving you!
    </p>
  </div>
`;

const emailVerificationMail = (user, otp) => `
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>DFS - Your OTP for Verification</title>
${mail_common_styles}
<style>
    .otp {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
    }
    .welcome {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 20px;
    }
</style>
</head>

<body>
<div class="container">
    <div class="welcome">
    Welcome ${user.first_name} ${user.last_name},
    </div>

    <div class="message">
    <p>Thank you for registering with DFS. Your registration is almost complete, and we just need to verify your email address.</p>
    </div>
    <div>
    Your OTP for Verification: <strong class="otp">${otp}</strong>
    </div>
    
    ${mail_footer}
</div>
</body>
`;

const emailVerifiedMail = (user) => {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>DFS - Account Verification Successful</title>
  ${mail_common_styles}
  <style>
      .verification {
          font-size: 20px;
          margin-bottom: 20px;
      }
    
  </style>
  </head>
  
  <body>
  <div class="container">
      <div class="welcome">
          Welcome ${user.first_name} ${user.last_name},
      </div>
  
      <div class="verification">
          <p>Your DFS account has been successfully verified!</p>
      </div>
  
      <div class="message">
          <p>We're excited to have you on board. DFS offers a wide range of features designed to enhance your experience. Whether you're looking to explore new opportunities, connect with like-minded individuals, or simply stay updated with the latest news and events, we're here to support you every step of the way.</p>
          <p>If you have any questions or need assistance with anything, please don't hesitate to reach out. Our team is always ready to help. We're looking forward to seeing you make the most of DFS!</p>
      </div>
  
      ${mail_footer}
  </div>
  </body>
  </html>
  `;
};

const getMailHTML = (mailParams, mailTemplate) => {
  switch (mailTemplate) {
    case MAIL_TEMPLATES.EMAIL_VERIFICATION_MAIL: {
      return emailVerificationMail(mailParams.user, mailParams.otp);
    }
    case MAIL_TEMPLATES.EMAIL_VERIFIED_MAIL: {
      return emailVerifiedMail(mailParams.user);
    }
  }
};

module.exports = getMailHTML;
