import Queue from "bull";

const queue = new Queue("emailQueue",
  process.env.REDIS_URL!,
  {
    redis: {tls: {}}
  },
);

export default queue;