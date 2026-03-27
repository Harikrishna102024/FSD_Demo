import dotenv from 'dotenv';
import sgMail from '@sendgrid/mail';

dotenv.config();

const key = process.env.SENDGRID_API_KEY as string
sgMail.setApiKey(key);
export default sgMail;

