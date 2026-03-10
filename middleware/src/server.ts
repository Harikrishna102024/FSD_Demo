import app from './app';
import os from 'os';
import cluster from 'cluster';
import logger from './config/winston'

const PORT = process.env.PORT;

if (cluster.isMaster) {

  const cors = os.cpus().length;

  for (let i = 0; i < cors; i++) {
    cluster.fork();
  }

} else {

  app.listen(PORT, () => {
    logger.info(`Server started At ${PORT}`)
    console.log(`Server is running on port ${PORT}`);
  });

}

