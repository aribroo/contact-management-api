import Joi from 'joi';

export const addAddressValidation = Joi.object({
  country: Joi.string().min(3).max(50).required(),
  province: Joi.string().min(3).max(50).required(),
  city: Joi.string().min(3).max(50).required(),
  street: Joi.string().min(3).max(255).optional().allow(null).allow(''),
  postal_code: Joi.string().max(10).optional().allow(null).allow(''),
});

export const getAddressValidation = Joi.number().positive().min(1).required();

export const updateAddressValidation = Joi.object({
  id: Joi.number().min(1).positive().required(),
  country: Joi.string().min(3).max(50).required(),
  province: Joi.string().min(3).max(50).required(),
  city: Joi.string().min(3).max(50).required(),
  street: Joi.string().min(3).max(255).optional().allow(null).allow(''),
  postal_code: Joi.string().max(10).optional().allow(null).allow(''),
});
