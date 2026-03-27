

const htmlReg = (name: any) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f6f8;
      padding: 20px;
    }
    .card {
      max-width: 500px;
      margin: auto;
      background: #ffffff;
      padding: 25px;
      border-radius: 8px;
      box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    }
    h2 {
      color: #2ecc71;
    }
    p {
      color: #333;
      line-height: 1.6;
    }
    .footer {
      margin-top: 20px;
      font-size: 12px;
      color: #777;
    }
  </style>
</head>
<body>
  <div class="card">
    <h2>Registration Successful 🎉</h2>
    <p>Hello <b>${name}</b>,</p>
    <p>Your account has been created successfully.</p>
    <p>You can now log in and start using our application.</p>
    <p class="footer">
      If this was not you, please ignore this email.
    </p>
  </div>
</body>
</html>
`;


const htmlLog = (name:any) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f6f8;
      padding: 20px;
    }
    .card {
      max-width: 500px;
      margin: auto;
      background: #ffffff;
      padding: 25px;
      border-radius: 8px;
      box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    }
    h2 {
      color: #3498db;
    }
    p {
      color: #333;
      line-height: 1.6;
    }
    .footer {
      margin-top: 20px;
      font-size: 12px;
      color: #777;
    }
  </style>
</head>
<body>
  <div class="card">
    <h2>Login Successful ✅</h2>
    <p>Hello <b>${name}</b>,</p>
    <p>You have successfully logged into your account.</p>
    <p>If this was not you, please reset your password immediately.</p>
    <p class="footer">
      Thank you for using our application.
    </p>
  </div>
</body>
</html>
`;
const finalHtml = {
  reg: htmlReg,
  log: htmlLog
}

export default finalHtml;