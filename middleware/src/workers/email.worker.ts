import queue from "../queues/email.queue";
import { GmailService } from "../services/mail/gmail.service";

const gmailService = new GmailService()

queue.process(async (job) => {
    const { to, subject } = job.data;
    await gmailService.sendMail(to, subject)
});

