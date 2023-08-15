import Joi from 'joi';

export const createContactValidation = Joi.object({
  first_name: Joi.string().min(3).max(50).required(),
  last_name: Joi.string().max(50).allow(null).allow('').optional(),
  email: Joi.string().email().max(50).optional(),
  phone: Joi.string().max(20).required()
});

export const getContactValidation = Joi.number().positive().required();

export const searchContactValidation = Joi.object({
  name: Joi.string().max(50).optional(),
  email: Joi.string().optional(),
  phone: Joi.string().optional(),
  page: Joi.number().positive().min(1).default(1),
  size: Joi.number().positive().min(1).max(100).default(10)
});

export const updateContactValidation = Joi.object({
  first_name: Joi.string().min(3).max(50).optional(),
  last_name: Joi.string().max(50).allow(null).allow('').optional(),
  email: Joi.string().email().max(50).optional(),
  phone: Joi.string().max(20).required()
});
