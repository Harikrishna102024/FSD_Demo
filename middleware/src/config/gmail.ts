import dotenv from 'dotenv';
// import nodemailer from 'nodemailer';
import sgMail from '@sendgrid/mail';

dotenv.config();
// const port = Number(process.env.SMTP_PORT)
// console.log(port)
// const transporter = nodemailer.createTransport({
//     // host: process.env.SMTP_HOST,
//     service: 'gmail',
//     // port: port,
//     // secure: port === 465,
//     auth: {
//         user: process.env.MAIL_USER,
//         pass: process.env.MAIL_PASS
//     }
    
// // })

// export default transporter;

const key = process.env.SENDGRID_API_KEY as string

sgMail.setApiKey(key);

console.log("API:", process.env.SENDGRID_API_KEY);
console.log("MAIL:", process.env.SENDGRID_MAIL_USER);

export default sgMail;

