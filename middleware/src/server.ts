import app from './app';
import os from 'os';
import cluster from 'cluster';

const PORT = process.env.PORT;

if (cluster.isMaster) {

  const cors = os.cpus().length;

  for (let i = 0; i < cors; i++) {
    cluster.fork();
  }

} else {

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

}

