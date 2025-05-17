import express from 'express';
import bodyParser from 'body-parser';
// import cors from 'cors';
import { json, urlencoded } from 'body-parser';
import routes from './routes/index';
import { errorMiddleware } from './middleware/errorMiddleware';

const app = express();

// Middlewares
// app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use('/api', routes);
app.use(errorMiddleware);

export default app;