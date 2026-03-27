import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();
const port = Number(process.env.SMTP_PORT)
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: port,
    secure: port === 465,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
    
})

export default transporter;