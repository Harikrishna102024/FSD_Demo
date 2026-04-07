import app from './app';
import logger from './config/winston';
import './workers/email.worker';
import { connectDatabase } from './config/db'
import { connectRedis } from './config/redis.catch.config';

const PORT = process.env.PORT;

const startServer = async () => {
  try {
    
    await connectDatabase()
    await connectRedis();

    app.listen(PORT, () => {
      logger.info(`Server started At ${PORT}`);
      console.log(`Server is running on port ${PORT}`);
    });

  } catch (error) {
    console.log("Startup error:", error);
  }
};

startServer();