import dns from 'dns';
dns.setDefaultResultOrder('ipv4first');
import app from './app';
import logger from './config/winston'



const PORT = process.env.PORT;

app.listen(PORT, () => {
  logger.info(`Server started At ${PORT}`)
  console.log(`Server is running on port ${PORT}`);
});

