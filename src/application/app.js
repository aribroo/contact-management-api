import express from 'express';
import { publicRouter } from '../routes/public-api.js';
import { errorMiddleware } from '../middleware/error-middleware.js';
import { userRouter } from '../routes/api.js';

const app = express();
app.use(express.json());

app.use(publicRouter);
app.use(userRouter);
app.use(errorMiddleware);

export default app;
