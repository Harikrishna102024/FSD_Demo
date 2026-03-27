import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import routes from './routes';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const Prefix = '/';

app.use(Prefix, routes);

app.get('/', (req: any, res: any) => {
  res.send('Backend is running 🚀');
});

export default app;
