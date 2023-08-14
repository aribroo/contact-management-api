import express from 'express';
import userControler from '../controllers/user-controller.js';

const publicRouter = express.Router();

publicRouter.post('/api/users', userControler.register);
publicRouter.post('/api/users/login', userControler.login);

export { publicRouter };
