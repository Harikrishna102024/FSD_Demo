import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import routes from './routes';
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
app.use(cookieParser());

app.use(cors({
  // origin: ['http://localhost:4200', 'https://app-uservoult.onrender.com'],
  origin: true,
  // methods: ['GET','POST','PUT','DELETE','PATCH'],
  // allowedHeaders: ['Content-Type','Authorization'],
  credentials: true
}));

app.use(express.json());

const Prefix = "/api";

app.use(Prefix, routes);

app.get('/', (req: any, res: any) => {
  res.send('Backend is running 🚀');
});

export default app;
