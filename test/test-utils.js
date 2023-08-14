import { prismaClient } from '../src/application/database.js';
import bcrypt from 'bcrypt';

export const deleteUserTest = async () => {
  await prismaClient.user.deleteMany({
    where: { username: 'test123' },
  });
};

export const createUserTest = async () => {
  await prismaClient.user.create({
    data: {
      username: 'test123',
      password: await bcrypt.hash('secretkey', 10),
      name: 'test',
      token: 'token',
    },
  });
};

export const getTestUser = async () => {
  return await prismaClient.user.findUnique({
    where: { username: 'test123' },
  });
};

export const deleteContactsTestUser = async () => {
  await prismaClient.contact.deleteMany({
    where: { username: 'test123' },
  });
};

export const createContactTest = async () => {
  await prismaClient.contact.create({
    data: {
      first_name: 'test',
      last_name: 'test',
      email: 'test@gmail.com',
      phone: '080800000',
      username: 'test123',
    },
  });
};

export const getContactTest = async () => {
  return prismaClient.contact.findFirst({
    where: {
      username: 'test123',
    },
    select: { id: true },
  });
};

export const createManyContactTest = async () => {
  for (let i = 0; i < 15; i++) {
    await prismaClient.contact.create({
      data: {
        username: `test123`,
        first_name: `test${i}`,
        last_name: `test${i}`,
        email: `test${i}@gmail.com`,
        phone: `080800000${i}`,
      },
    });
  }
};

export const createAddressTest = async () => {
  const contact = await getContactTest();

  await prismaClient.address.create({
    data: {
      country: 'Indonesia',
      province: 'Jabar',
      city: 'Bekasi',
      street: 'Jalan Ceri',
      postal_code: '11111',
      contact_id: contact.id,
    },
  });
};

export const createManyAddressesTest = async () => {
  const contact = await getContactTest();
  for (let i = 0; i < 5; i++) {
    await prismaClient.address.create({
      data: {
        country: `Country${i}`,
        province: `Province${i}`,
        city: `City${i}`,
        street: '',
        postal_code: '',
        contact_id: contact.id,
      },
    });
  }
};

export const getAddressTest = async () => {
  const contact = await getContactTest();
  return prismaClient.address.findFirst({
    where: { contact_id: contact.id },
  });
};

export const deleteAddressContactTest = async () => {
  await prismaClient.address.deleteMany({
    where: {
      contact: {
        username: 'test123',
      },
    },
  });
};
