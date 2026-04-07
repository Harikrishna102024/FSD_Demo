import dotenv from 'dotenv';
import transporter from '../../config/nodemailer.config';
import finalHtml from './gmail.html';
import logger from '../../config/winston'

dotenv.config();

export class GmailService {

    async sendMail(to: any, subject: any) {

        try {

            console.log("mail sending.....")
            logger.info("mail sending.....")

            var info = await transporter.sendMail({
                from: process.env.MAIL_USER,
                to: to,
                subject: subject,
                html: subject === 'log' ? finalHtml.log(to) : finalHtml.reg(to)
            })
            console.log("mail sent successfull")
            logger.info("mail sent successfull")

        } catch (err) {
            console.error(" gmail error : ", err);
            logger.error("faild to send mail")

            return null;
        }

        return info;

    }

}