import dns from 'dns';
dns.setDefaultResultOrder('ipv4first');
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());

const Prefix = '/';

app.use(Prefix, routes);

app.get('/', (req: any, res: any) => {
  res.send('Backend is running 🚀');
});

export default app;
