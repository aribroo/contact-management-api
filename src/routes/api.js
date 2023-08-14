import express from 'express';
import userController from '../controllers/user-controller.js';
import contactController from '../controllers/contact-controller.js';
import addressController from '../controllers/address-controller.js';
import { authMiddleware } from '../middleware/auth-middleware.js';

const userRouter = express.Router();

// User API
userRouter.use(authMiddleware);
userRouter.get('/api/users/current', userController.get);
userRouter.patch('/api/users/current', userController.update);
userRouter.delete('/api/users/logout', userController.logout);

// Contact API
userRouter.post('/api/contacts', contactController.createContact);
userRouter.get('/api/contacts/:contactId', contactController.getContact);
userRouter.get('/api/contacts/', contactController.searchContact);
userRouter.put('/api/contacts/:contactId', contactController.updateContact);
userRouter.delete('/api/contacts/:contactId', contactController.deleteContact);

// Address API
userRouter.post('/api/contacts/:contactId/addresses', addressController.addAdress);
userRouter.get('/api/contacts/:contactId/addresses/', addressController.listAddress);
userRouter.get('/api/contacts/:contactId/addresses/:addressId', addressController.getAddress);
userRouter.delete('/api/contacts/:contactId/addresses/:addressId', addressController.deleteAddress);
userRouter.put('/api/contacts/:contactId/addresses/:addressId', addressController.updateAddress);

export { userRouter };
