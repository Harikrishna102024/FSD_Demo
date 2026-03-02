import dotenv from 'dotenv';
import transporter from '../config/gmail';
import finalHtml from './gmail.html';

dotenv.config();

export class GmailService {

    async sendMail(to: any, subject: any) {

        try {

            var info = await transporter.sendMail({
                from: process.env.MAIL_USER,
                to: to,
                subject: subject,
                html: subject === 'log' ? finalHtml.log(to) : finalHtml.reg(to)
            })

        } catch (err) {
            console.error(" gmail error : ", err);
            return null;
        }

        return info;

    }
}