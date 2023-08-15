import { prismaClient } from '../application/database.js';
import { ResponseError } from '../error/response-error.js';
import { createContactValidation, getContactValidation, searchContactValidation, updateContactValidation } from '../validation/contact-validation.js';
import { validate } from '../validation/validation.js';

const create = async (user, request) => {
  const contact = validate(createContactValidation, request);
  contact.username = user;

  const existingContacts = await prismaClient.user.findUnique({
    where: { username: contact.username },
    include: { contacts: true }
  });

  const isEmailDuplicate = existingContacts.contacts.some((c) => c.email === request.email);

  const isPhoneDuplicate = existingContacts.contacts.some((c) => c.phone === request.phone);

  if (isEmailDuplicate) throw new ResponseError(400, 'Email already added to contact');
  if (isPhoneDuplicate) throw new ResponseError(400, 'Number Phone already added to contact');

  return prismaClient.contact.create({
    data: contact,
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      phone: true
    }
  });
};

const get = async (user, contactId) => {
  contactId = validate(getContactValidation, contactId);

  const contact = await prismaClient.contact.findFirst({
    where: {
      id: contactId,
      username: user.username
    },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      phone: true
    }
  });

  if (contact === null) throw new ResponseError(404, 'Contact is not found');

  return contact;
};

const searchContact = async (user, request) => {
  const username = user.username;
  request = validate(searchContactValidation, request);

  const size = request.size;
  const page = request.page;

  const filters = [];

  if (request.name) {
    filters.push({
      OR: [
        {
          first_name: { contains: request.name }
        },
        {
          last_name: { contains: request.name }
        }
      ]
    });
  }

  if (request.email) {
    filters.push({
      email: { contains: request.email }
    });
  }

  if (request.phone) {
    filters.push({
      phone: { contains: request.phone }
    });
  }

  const contacts = await prismaClient.contact.findMany({
    where: {
      username,
      AND: filters
    },
    take: size,
    skip: (page - 1) * size
  });

  const totalItems = await prismaClient.contact.count({
    where: {
      username,
      AND: filters
    }
  });

  return {
    data: contacts,
    paging: {
      page,
      total_items: totalItems,
      total_page: Math.ceil(totalItems / size)
    }
  };
};

const update = async (user, contactId, request) => {
  contactId = validate(getContactValidation, contactId);
  request = validate(updateContactValidation, request);

  const contact = await prismaClient.contact.findFirst({
    where: {
      username: user.username,
      id: contactId
    }
  });

  if (!contact) throw new ResponseError(404, 'Contact is not found');

  const existingContacts = await prismaClient.user.findUnique({
    where: { username: contact.username },
    include: { contacts: true }
  });

  const isEmailDuplicate = existingContacts.contacts.some((c) => c.email === request.email && c.id !== contactId);

  const isPhoneDuplicate = existingContacts.contacts.some((c) => c.phone === request.phone && c.id !== contactId);

  if (isEmailDuplicate) throw new ResponseError(400, 'Email already added to contact');
  if (isPhoneDuplicate) throw new ResponseError(400, 'Number Phone already added to contact');

  return prismaClient.contact.update({
    where: {
      username: user.username,
      id: contactId
    },
    data: {
      id: request.id,
      first_name: request.first_name,
      last_name: request.last_name,
      email: request.email,
      phone: request.phone
    },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      phone: true
    }
  });
};

const deleteContact = async (user, contactId) => {
  const username = user.username;
  contactId = validate(getContactValidation, contactId);

  const contact = await prismaClient.contact.findFirst({
    where: {
      username,
      id: contactId
    },
    select: { id: true }
  });

  if (!contact) throw new ResponseError(404, 'Contact is not found');

  return await prismaClient.contact.delete({
    where: {
      username,
      id: contactId
    }
  });
};

export default { create, get, update, deleteContact, searchContact };
