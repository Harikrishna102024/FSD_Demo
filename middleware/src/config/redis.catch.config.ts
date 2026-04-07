import { createClient } from 'redis';
import dotenv from "dotenv"

dotenv.config();

const redisClient = createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
  },
  password: process.env.REDIS_PASSWORD,
});

redisClient.on('error', (err) => {
  console.log('Redis Error:', err);
});

export const connectRedis = async () => {
  try {
    await redisClient.connect();
    console.log('Redis Connected');
  } catch (error) {
    console.log('Redis Connection Failed', error);
    throw error;
  }
};

export default redisClient;