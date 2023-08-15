import { prismaClient } from '../application/database.js';
import { ResponseError } from '../error/response-error.js';
import { addAddressValidation, getAddressValidation, updateAddressValidation } from '../validation/address-validation.js';
import { getContactValidation } from '../validation/contact-validation.js';
import { validate } from '../validation/validation.js';

const checkExistingContact = async (user, contactId) => {
  const username = user.username;
  contactId = validate(getContactValidation, contactId);

  const contact = await prismaClient.contact.findFirst({
    where: {
      username,
      id: contactId
    }
  });

  if (!contact) {
    throw new ResponseError(404, 'Contact is not found');
  }

  return contactId;
};

const addAddress = async (user, contactId, request) => {
  contactId = await checkExistingContact(user, contactId);

  const address = validate(addAddressValidation, request);
  address.contact_id = contactId;

  return await prismaClient.address.create({
    data: address,
    select: {
      id: true,
      country: true,
      province: true,
      city: true,
      street: true,
      postal_code: true
    }
  });
};

const getAddress = async (user, contactId, addressId) => {
  contactId = await checkExistingContact(user, contactId);
  addressId = validate(getAddressValidation, addressId);

  const address = await prismaClient.address.findFirst({
    where: {
      contact_id: contactId,
      id: addressId
    },
    select: {
      id: true,
      country: true,
      province: true,
      city: true,
      street: true,
      postal_code: true
    }
  });

  if (!address) throw new ResponseError(404, 'Address is not found');

  return address;
};

const listAddress = async (user, contactId) => {
  contactId = await checkExistingContact(user, contactId);

  const addresses = await prismaClient.address.findMany({
    where: {
      contact_id: contactId
    }
  });

  if (!addresses) throw new ResponseError(404, 'Address is empty');

  return addresses;
};

const updateAddress = async (user, contactId, request) => {
  contactId = await checkExistingContact(user, contactId);
  request = validate(updateAddressValidation, request);

  const address = await prismaClient.address.findUnique({
    where: { id: request.id }
  });

  if (!address) throw new ResponseError(404, 'Address is not found');

  return prismaClient.address.update({
    data: {
      country: request.country,
      province: request.province,
      city: request.city,
      street: request.street,
      postal_code: request.postal_code
    },
    where: {
      contact_id: contactId,
      id: request.id
    },
    select: {
      id: true,
      country: true,
      province: true,
      city: true,
      street: true,
      postal_code: true
    }
  });
};

const deleteAddress = async (user, contactId, addressId) => {
  contactId = await checkExistingContact(user, contactId);
  addressId = validate(getAddressValidation, addressId);

  const address = await prismaClient.address.findUnique({
    where: { id: addressId }
  });

  if (!address) throw new ResponseError(404, 'Address is not found');

  await prismaClient.address.delete({
    where: {
      contact_id: contactId,
      id: addressId
    }
  });
};

export default { addAddress, getAddress, updateAddress, listAddress, deleteAddress };
