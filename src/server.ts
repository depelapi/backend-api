import express from 'express';
import { json } from 'body-parser';
import config from './config/config';
import routes from './routes/index';
import { errorMiddleware } from './middleware/errorMiddleware';

const app = express();

app.use(json());
app.use(routes);
app.use(errorMiddleware);

const PORT = config.port || 3000;

export const startServer = () => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
};