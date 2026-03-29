import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import routes from './routes';

dotenv.config();
const app = express();

app.use(cors({
  origin: ['http://localhost:4200', 'https://app-uservoult.onrender.com'],
  methods: ['GET','POST','PUT','DELETE','PATCH'],
  allowedHeaders: ['Content-Type','Authorization'],
  credentials: true
}));
app.use(express.json());

const Prefix = '/';

app.use(Prefix, routes);

app.get('/', (req: any, res: any) => {
  res.send('Backend is running 🚀');
});

export default app;
