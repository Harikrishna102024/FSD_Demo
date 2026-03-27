import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
// import sgMail from '@sendgrid/mail';

dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT) || 465,
    secure: process.env.SMTP_SECURE === "true",
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});
console.log("PORT", Number(process.env.SMTP_PORT))
export default transporter;



// const key = process.env.SENDGRID_API_KEY as string

// sgMail.setApiKey(key);

// export default sgMail;

