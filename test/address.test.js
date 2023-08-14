import supertest from 'supertest';
import { createAddressTest, createContactTest, createManyAddressesTest, createUserTest, deleteAddressContactTest, deleteContactsTestUser, deleteUserTest, getAddressTest, getContactTest } from './test-utils.js';
import app from '../src/application/app.js';
import { logger } from '../src/application/logging.js';

describe('POST /api/contacts/:contactId/addresses', () => {
  beforeEach(async () => {
    await createUserTest();
    await createContactTest();
  });

  afterEach(async () => {
    await deleteAddressContactTest();
    await deleteContactsTestUser();
    await deleteUserTest();
  });

  it('should can add new address', async () => {
    const contact = await getContactTest();
    const contactId = contact.id;

    const result = await supertest(app)
      .post('/api/contacts/' + contactId + '/addresses')
      .set('Authorization', 'token')
      .send({
        country: 'Indonesia',
        province: 'Jawa Barat',
        city: 'Bekasi',
        street: 'Jalan ceri 10 blok c3 no 17',
        postal_code: '17520',
      });

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.country).toBe('Indonesia');
    expect(result.body.data.province).toBe('Jawa Barat');
    expect(result.body.data.city).toBe('Bekasi');
    expect(result.body.data.street).toBe('Jalan ceri 10 blok c3 no 17');
    expect(result.body.data.postal_code).toBe('17520');
  });

  it('should return 404 if contacts_id not found', async () => {
    const contact = await getContactTest();
    const contactId = contact.id;

    const result = await supertest(app)
      .post('/api/contacts/' + (contactId + 1) + '/addresses')
      .set('Authorization', 'token')
      .send({
        country: 'Indonesia',
        province: 'Jawa Barat',
        city: 'Bekasi',
        street: 'Jalan ceri 10 blok c3 no 17',
        postal_code: '17520',
      });

    logger.error(result.body);

    expect(result.status).toBe(404);
    expect(result.body.errors).toBeDefined();
  });

  it('should return 400 if data invalid', async () => {
    const contact = await getContactTest();
    const contactId = contact.id;

    const result = await supertest(app)
      .post('/api/contacts/' + contactId + '/addresses')
      .set('Authorization', 'token')
      .send({
        country: '',
        province: '',
        city: '',
        street: 'Jalan ceri 10 blok c3 no 17',
        postal_code: '175203234312333',
      });

    logger.error(result.body);

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});

describe('GET /api/contacts/:contactId/addresses/:addressId', () => {
  beforeEach(async () => {
    await createUserTest();
    await createContactTest();
    await createAddressTest();
  });

  afterEach(async () => {
    await deleteAddressContactTest();
    await deleteContactsTestUser();
    await deleteUserTest();
  });

  it('should can get address', async () => {
    const contact = await getContactTest();
    const address = await getAddressTest();

    const result = await supertest(app)
      .get('/api/contacts/' + contact.id + '/addresses/' + address.id)
      .set('Authorization', 'token');

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.country).toBe('Indonesia');
    expect(result.body.data.city).toBe('Bekasi');
    expect(result.body.data.street).toBe('Jalan Ceri');
    expect(result.body.data.postal_code).toBe('11111');
  });
});

describe('GET /api/contacts/:contactId/addresses/:addressId', () => {
  beforeEach(async () => {
    await createUserTest();
    await createContactTest();
    await createAddressTest();
  });

  afterEach(async () => {
    await deleteAddressContactTest();
    await deleteContactsTestUser();
    await deleteUserTest();
  });

  it('should can get address', async () => {
    const contact = await getContactTest();
    const address = await getAddressTest();

    const result = await supertest(app)
      .get('/api/contacts/' + contact.id + '/addresses/' + address.id)
      .set('Authorization', 'token');

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.country).toBe('Indonesia');
    expect(result.body.data.province).toBe('Jabar');
    expect(result.body.data.city).toBe('Bekasi');
    expect(result.body.data.street).toBe('Jalan Ceri');
    expect(result.body.data.postal_code).toBe('11111');
  });

  it('should return 404 if contact not found ', async () => {
    const contact = await getContactTest();
    const address = await getAddressTest();

    const result = await supertest(app)
      .get('/api/contacts/' + (contact.id + 1) + '/addresses/' + address.id)
      .set('Authorization', 'token');

    logger.error(result.body);

    expect(result.status).toBe(404);
    expect(result.body.errors).toBeDefined();
  });

  it('should return 404 if address not found ', async () => {
    const contact = await getContactTest();
    const address = await getAddressTest();

    const result = await supertest(app)
      .get('/api/contacts/' + contact.id + '/addresses/' + (address.id + 1))
      .set('Authorization', 'token');

    logger.error(result.body);

    expect(result.status).toBe(404);
    expect(result.body.errors).toBeDefined();
  });
});

describe('GET /api/contacts/:contactId/addresses/:addressId', () => {
  beforeEach(async () => {
    await createUserTest();
    await createContactTest();
    await createAddressTest();
  });

  afterEach(async () => {
    await deleteContactsTestUser();
    await deleteUserTest();
  });

  it('should can delete address', async () => {
    const contact = await getContactTest();
    const address = await getAddressTest();

    const result = await supertest(app)
      .delete('/api/contacts/' + contact.id + '/addresses/' + address.id)
      .set('Authorization', 'token');

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data).toBe('OK');
  });

  it('should return 404 if contact not found', async () => {
    const contact = await getContactTest();
    const address = await getAddressTest();

    const result = await supertest(app)
      .delete('/api/contacts/' + (contact.id + 1) + '/addresses/' + address.id)
      .set('Authorization', 'token');

    logger.error(result.body);

    expect(result.status).toBe(404);
    expect(result.body.errors).toBeDefined();

    await deleteAddressContactTest();
  });

  it('should return 404 if address not found', async () => {
    const contact = await getContactTest();
    const address = await getAddressTest();

    const result = await supertest(app)
      .delete('/api/contacts/' + contact.id + '/addresses/' + (address.id + 1))
      .set('Authorization', 'token');

    logger.error(result.body);

    expect(result.status).toBe(404);
    expect(result.body.errors).toBeDefined();

    await deleteAddressContactTest();
  });
});

describe('PUT /api/contacts/:contactId/addresses/:addressId', () => {
  beforeEach(async () => {
    await createUserTest();
    await createContactTest();
    await createAddressTest();
  });

  afterEach(async () => {
    await deleteAddressContactTest();
    await deleteContactsTestUser();
    await deleteUserTest();
  });

  it('should can update address', async () => {
    const contact = await getContactTest();
    const address = await getAddressTest();

    const result = await supertest(app)
      .put('/api/contacts/' + contact.id + '/addresses/' + address.id)
      .set('Authorization', 'token')
      .send({
        country: 'Japan',
        province: 'Tokyo',
        city: 'Hiroshima',
        street: '',
        postal_code: '',
      });

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.country).toBe('Japan');
    expect(result.body.data.province).toBe('Tokyo');
    expect(result.body.data.city).toBe('Hiroshima');
    expect(result.body.data.street).toBe('');
    expect(result.body.data.postal_code).toBe('');
  });

  it('should reject if bad request', async () => {
    const contact = await getContactTest();
    const address = await getAddressTest();

    const result = await supertest(app)
      .put('/api/contacts/' + contact.id + '/addresses/' + address.id)
      .set('Authorization', 'token')
      .send({
        country: '',
        province: '',
        city: '',
        street: '',
        postal_code: '2333333333333333333',
      });

    logger.error(result.body);

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

  it('should return 404 if contact not found', async () => {
    const contact = await getContactTest();
    const address = await getAddressTest();

    const result = await supertest(app)
      .put('/api/contacts/' + (contact.id + 1) + '/addresses/' + address.id)
      .set('Authorization', 'token')
      .send({
        country: 'Japan',
        province: 'Tokyo',
        city: 'Hiroshima',
        street: '',
        postal_code: '23333',
      });

    logger.error(result.body);

    expect(result.status).toBe(404);
    expect(result.body.errors).toBeDefined();
  });

  it('should return 404 if address not found', async () => {
    const contact = await getContactTest();
    const address = await getAddressTest();

    const result = await supertest(app)
      .put('/api/contacts/' + contact.id + '/addresses/' + (address.id + 1))
      .set('Authorization', 'token')
      .send({
        country: 'Japan',
        province: 'Tokyo',
        city: 'Hiroshima',
        street: '',
        postal_code: '23333',
      });

    logger.error(result.body);

    expect(result.status).toBe(404);
    expect(result.body.errors).toBeDefined();
  });
});

describe('GET /api/contacts/:contactId/addresses', () => {
  beforeEach(async () => {
    await createUserTest();
    await createContactTest();
  });

  afterEach(async () => {
    await deleteAddressContactTest();
    await deleteContactsTestUser();
    await deleteUserTest();
  });

  it('should can get all list addresses', async () => {
    await createManyAddressesTest();

    const contact = await getContactTest();
    const result = await supertest(app)
      .get('/api/contacts/' + contact.id + '/addresses')
      .set('Authorization', 'token');

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data).toHaveLength(5);
  });

  it('should return 404 if contact not found', async () => {
    await createManyAddressesTest();

    const contact = await getContactTest();
    const result = await supertest(app)
      .get('/api/contacts/' + (contact.id + 1) + '/addresses')
      .set('Authorization', 'token');

    logger.error(result.body);

    expect(result.status).toBe(404);
    expect(result.body.errors).toBeDefined();
  });

  it('should return 404 if addresses is empty', async () => {
    const contact = await getContactTest();
    const result = await supertest(app)
      .get('/api/contacts/' + contact.id + '/addresses')
      .set('Authorization', 'token');

    logger.error(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data).toHaveLength(0);
  });
});
