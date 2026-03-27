import dotenv from 'dotenv';
// import nodemailer from 'nodemailer';
import sgMail from '@sendgrid/mail';

dotenv.config();


// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: process.env.MAIL_USER,
//         pass: process.env.MAIL_PASS
//     }
    
// // })

// export default transporter;



const key = process.env.SENDGRID_API_KEY as string

sgMail.setApiKey(key);

export default sgMail;

