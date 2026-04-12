import dotenv from 'dotenv';
import express, { Request, Response, NextFunction }from 'express';
import cors from 'cors';
import routes from './routes';
import cookieParser from "cookie-parser";
import path from 'path'



dotenv.config();
const app = express();
app.use(cookieParser());

app.use('/public/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.use(cors({
  origin: ['http://localhost:4200', 'https://app-uservoult.onrender.com'],
  credentials: true
}));

app.use(express.json());

const Prefix = "/api";

app.use(Prefix, routes);


app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(422).json({ error: err.message });
});

app.get('/', (req: any, res: any) => {
  res.send('Backend is running 🚀');
});

export default app;
