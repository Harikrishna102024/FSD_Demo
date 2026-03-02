import app from './app';
import os from 'os';
import cluster from 'cluster';

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

