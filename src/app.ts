import express from 'express';
import bodyParser from 'body-parser';
// import cors from 'cors';
import { json, urlencoded } from 'body-parser';
import routes from './routes/index';
import { errorMiddleware } from './middleware/errorMiddleware';
import path from 'path';

const app = express();

// Middlewares
// app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));
app.use('/api', routes);
app.use(errorMiddleware);

export default app;