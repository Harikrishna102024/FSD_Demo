

const htmlReg = (name: any) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Welcome</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f6f8; font-family:Arial, sans-serif;">

  <div style="max-width:600px; margin:30px auto; background:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 4px 10px rgba(0,0,0,0.1);">
    
    <!-- Header -->
    <div style="background:#20B2AA; padding:20px; text-align:center;">
      <h1 style="margin:0; color:#ffffff; font-size:22px;">
        UserVault - SecureBox 🔐
      </h1>
    </div>

    <!-- Body -->
    <div style="padding:30px;">
      <h2 style="margin-top:0; color:#333;">Welcome to UserVault, ${name}!</h2>

      <p style="color:#555; font-size:14px; line-height:1.6;">
        Your account has been successfully created.
      </p>

      <p style="color:#555; font-size:14px; line-height:1.6;">
        You can now securely access your account and start managing your data with confidence.
      </p>

      <!-- Button -->
      <div style="text-align:center; margin:30px 0;">
        <a href="https://app-uservoult.onrender.com/login" target="_blank"
           style="background:#1E90FF; color:#ffffff; text-decoration:none; padding:12px 25px; border-radius:5px; font-size:14px; display:inline-block;">
          Login to Your Account
        </a>
      </div>

      <p style="color:#777; font-size:13px;">
        If you did not create this account, please ignore this email or contact our support team.
      </p>
    </div>

    <!-- Footer -->
    <div style="background:#f4f6f8; padding:15px; text-align:center;">
      <p style="margin:0; font-size:12px; color:#999;">
        © 2026 UserVault - SecureBox. All rights reserved.
      </p>
      <p style="margin:5px 0 0; font-size:12px; color:#999;">
        This is an automated email, please do not reply.
      </p>
    </div>

  </div>

</body>
</html>
`;

const htmlLog = (name:any) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
</head>
<body style="font-family: Arial, sans-serif; background-color:#f4f6f8; padding:20px; margin:0;">

  <div style="max-width:500px; margin:auto; background:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 4px 10px rgba(0,0,0,0.1);">

    <!-- Header -->
    <div style="background:#3498db; padding:15px; text-align:center;">
      <h2 style="margin:0; color:#ffffff;">SecureBox 🔐</h2>
    </div>

    <!-- Body -->
    <div style="padding:25px;">
      <h3 style="color:#333; margin-top:0;">Login Alert..!</h3>

      <p style="color:#333; line-height:1.6;">
        Hello <b>${name}</b>,
      </p>

      <p style="color:#333; line-height:1.6;">
        A successful login to your account was detected.
      </p>

      <p style="color:#333; line-height:1.6;">
        If this was you, no action is required.
      </p>

      <p style="color:#333; line-height:1.6;">
        If you do not recognize this activity, we recommend securing your account immediately.
      </p>
    </div>

    <!-- Footer -->
    <div style="padding:12px; text-align:center; border-top:1px solid #eee;">
      <p style="margin:0; font-size:11px; color:#888;">
        © 2026 SecureBox.
      </p>
      <p style="margin:4px 0 0; font-size:11px; color:#888;">
        Security notification • Do not reply
      </p>
    </div>

  </div>

</body>
</html>
`;
const finalHtml = {
  reg: htmlReg,
  log: htmlLog
}

export default finalHtml;