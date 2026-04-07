import IORedis from 'ioredis';

const redisConnection = new IORedis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  password: process.env.REDIS_PASSWORD,
  maxRetriesPerRequest: null,
});

redisConnection.on('connect', () => {
  console.log('BullMQ Redis Connected');
});

redisConnection.on('error', (err) => {
  console.log('BullMQ Redis Error', err);
});

export default redisConnection;