const getMailHTML = (user, otp) => `
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>DFS - Your OTP for Verification</title>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
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

    .otp {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
    }

    .contact {
    margin-top: 20px;
    }

    .contact p {
    margin-bottom: 10px;
    }

    .thanks {
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

    <div class="thanks">
    <p>Thank you for registering with DFS. Your registration is almost complete, and we just need to verify your email address.</p>
    </div>
    <div>
    Your OTP for Verification: <strong class="otp">${otp}</strong>
    </div>
    <img class="logo" src="https://ihub-data.iiit.ac.in/assets/img/logo.png" alt="DFS Logo">
    <div class="contact">
    <p>Location: IIIT Hyderabad, Professor CR Rao Rd, Gachibowli, Hyderabad, Telangana 500032</p>
    <p>Email: ihub-data@iiit.ac.in</p>
    <p>Call: 0091 40 6653 1783</p>
    </div>
    <div class="closing">
    <p>If you have any questions or need further assistance, please do not hesitate to contact us. We look forward to serving you!</p>
    </div>
</div>
</body>

`;

module.exports = getMailHTML;
