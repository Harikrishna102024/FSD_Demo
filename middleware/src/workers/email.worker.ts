import { Worker } from 'bullmq';
import redisConnection from '../config/redis.queue.config';
import { GmailService } from "../services/mail/gmail.service";

const gmailService = new GmailService()

const emailWorker = new Worker('email-queue',

    async (job) => {
        const { to, subject } = job.data;
        await gmailService.sendMail(to, subject)
    },

    { connection: redisConnection }
);

emailWorker.on('completed', (job) => {
    console.log(`Job completed: ${job.id}`);
});

emailWorker.on('failed', (job, err) => {
    console.log(`Job failed: ${job?.id}`, err);
});