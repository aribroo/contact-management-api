import Joi from 'joi';

export const registerUserValidation = Joi.object({
  username: Joi.string().min(6).max(50).required(),
  password: Joi.string().min(8).max(50).required(),
  name: Joi.string().max(50).required()
});

export const userLoginValidation = Joi.object({
  username: Joi.string().max(50).required(),
  password: Joi.string().max(50).required()
});

export const getUserValidation = Joi.string().max(100).required();

export const updateUserValidation = Joi.object({
  username: Joi.string().min(6).max(50).required(),
  password: Joi.string().min(8).max(50).optional(),
  name: Joi.string().max(50).optional()
});
