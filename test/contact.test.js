import supertest from 'supertest';
import { logger } from '../src/application/logging.js';
import app from '../src/application/app.js';
import { createContactTest, createManyContactTest, createUserTest, deleteContactsTestUser, deleteUserTest, getContactTest } from './test-utils.js';
import { prismaClient } from '../src/application/database.js';

describe('POST /api/contacts', () => {
  beforeEach(async () => {
    await createUserTest();
  });

  afterEach(async () => {
    await deleteContactsTestUser();
    await deleteUserTest();
  });

  it('should can create new contact', async () => {
    const result = await supertest(app).post('/api/contacts').set('Authorization', 'token').send({
      first_name: 'Rifki',
      last_name: 'Ari',
      email: 'rifkiari@gmail.com',
      phone: '081357811233',
    });

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.first_name).toBe('Rifki');
    expect(result.body.data.last_name).toBe('Ari');
    expect(result.body.data.email).toBe('rifkiari@gmail.com');
    expect(result.body.data.phone).toBe('081357811233');
  });

  it('should reject if bad request ', async () => {
    const result = await supertest(app).post('/api/contacts').set('Authorization', 'token').send({
      first_name: '',
      last_name: '',
      email: 'rifkiari',
      phone: '081357811233233333333333333333333333333333333323',
    });

    logger.error(result.body);

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

  it('should reject if email already added ', async () => {
    let result = await supertest(app).post('/api/contacts').set('Authorization', 'token').send({
      first_name: 'Rifki',
      last_name: 'Ari',
      email: 'rifkiari@gmail.com',
      phone: '081357811233',
    });

    result = await supertest(app).post('/api/contacts').set('Authorization', 'token').send({
      first_name: 'rifki',
      last_name: 'ari',
      email: 'rifkiari@gmail.com',
      phone: '081357819988',
    });

    logger.error(result.body);

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

  it('should reject if phone already added ', async () => {
    let result = await supertest(app).post('/api/contacts').set('Authorization', 'token').send({
      first_name: 'Rifki',
      last_name: 'Ari',
      email: 'rifkiari@gmail.com',
      phone: '081357811233',
    });

    result = await supertest(app).post('/api/contacts').set('Authorization', 'token').send({
      first_name: 'rifki',
      last_name: 'ari',
      email: 'rifkiarri@gmail.com',
      phone: '081357811233',
    });

    logger.error(result.body);

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});

describe('GET /api/contacts/:contactId', () => {
  beforeEach(async () => {
    await createUserTest();
    await createContactTest();
  });

  afterEach(async () => {
    await deleteContactsTestUser();
    await deleteUserTest();
  });

  it('should can get contact', async () => {
    const contact = await getContactTest();
    const id = contact.id;

    const result = await supertest(app)
      .get('/api/contacts/' + id)
      .set('Authorization', 'token');

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBe(id);
    expect(result.body.data.first_name).toBe('test');
    expect(result.body.data.last_name).toBe('test');
    expect(result.body.data.email).toBe('test@gmail.com');
    expect(result.body.data.phone).toBe('080800000');
  });

  it('should throw 404 if contact id not found', async () => {
    const result = await supertest(app).get('/api/contacts/9999999999').set('Authorization', 'token');

    logger.error(result.body);

    expect(result.status).toBe(404);
    expect(result.body.errors).toBeDefined();
  });
});

describe('PUT /api/contacts/:contactId', () => {
  beforeEach(async () => {
    await createUserTest();
    await createContactTest();
  });

  afterEach(async () => {
    await deleteContactsTestUser();
    await deleteUserTest();
  });

  it('should can update contact', async () => {
    const contact = await getContactTest();
    const id = contact.id;

    const result = await supertest(app)
      .put('/api/contacts/' + id)
      .set('Authorization', 'token')
      .send({
        first_name: 'rifki',
        last_name: 'ari',
        email: 'rifkiari@gmail.com',
        phone: '080899999',
      });

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBe(id);
    expect(result.body.data.first_name).toBe('rifki');
    expect(result.body.data.last_name).toBe('ari');
    expect(result.body.data.email).toBe('rifkiari@gmail.com');
    expect(result.body.data.phone).toBe('080899999');
  });

  it('should throw 404 if contact not found', async () => {
    const contact = await getContactTest();
    const id = contact.id;

    const result = await supertest(app).put('/api/contacts/99999999999').set('Authorization', 'token').send({
      first_name: 'rifki',
      last_name: 'ari',
      email: 'rifkiari@gmail.com',
      phone: '080899999',
    });

    logger.info(result.body);

    expect(result.status).toBe(404);
    expect(result.body.errors).toBeDefined();
  });
});

describe('DELETE /api/contacts/:contactId', () => {
  beforeEach(async () => {
    await createUserTest();
    await createContactTest();
  });

  afterEach(async () => {
    await deleteUserTest();
  });

  it('should can delete contact', async () => {
    const contact = await getContactTest();
    const id = contact.id;

    const result = await supertest(app)
      .delete('/api/contacts/' + id)
      .set('Authorization', 'token');

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data).toBe('OK');
  });

  it('should throw 404 if contactId not found', async () => {
    const contact = await getContactTest();
    const id = contact.id;

    const result = await supertest(app).delete('/api/contacts/99999999999').set('Authorization', 'token');

    logger.error(result.body);

    expect(result.status).toBe(404);
    expect(result.body.errors).toBeDefined();

    await deleteContactsTestUser();
  });
});

describe('GET /api/contacts/', () => {
  beforeEach(async () => {
    await createUserTest();
    await createManyContactTest();
  });

  afterEach(async () => {
    await deleteContactsTestUser();
    await deleteUserTest();
  });

  it('should can get contacs without query', async () => {
    const result = await supertest(app).get('/api/contacts').set('Authorization', 'token');

    expect(result.status).toBe(200);
    expect(result.body.data).toHaveLength(10);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.total_page).toBe(2);
    expect(result.body.paging.total_items).toBe(15);
  });

  it('should can get contacs to page 2', async () => {
    const result = await supertest(app)
      .get('/api/contacts')
      .query({
        page: 2,
      })
      .set('Authorization', 'token');

    expect(result.status).toBe(200);
    expect(result.body.data).toHaveLength(5);
    expect(result.body.paging.page).toBe(2);
    expect(result.body.paging.total_page).toBe(2);
    expect(result.body.paging.total_items).toBe(15);
  });

  it('should can get contacs using query name', async () => {
    const name = 'test1';
    const result = await supertest(app)
      .get('/api/contacts/')
      .query({
        name: name,
      })
      .set('Authorization', 'token');

    expect(result.status).toBe(200);
    expect(result.body.data).toHaveLength(6);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.total_page).toBe(1);
    expect(result.body.paging.total_items).toBe(6);
  });

  it('should can get contacs using query email', async () => {
    const email = 'test1';
    const result = await supertest(app)
      .get('/api/contacts/')
      .query({
        email: email,
      })
      .set('Authorization', 'token');

    expect(result.status).toBe(200);
    expect(result.body.data).toHaveLength(6);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.total_page).toBe(1);
    expect(result.body.paging.total_items).toBe(6);
  });

  it('should can get contacs using query phone', async () => {
    const phone = '0808000001';
    const result = await supertest(app)
      .get('/api/contacts/')
      .query({
        phone: phone,
      })
      .set('Authorization', 'token');

    expect(result.status).toBe(200);
    expect(result.body.data).toHaveLength(6);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.total_page).toBe(1);
    expect(result.body.paging.total_items).toBe(6);
  });
});
