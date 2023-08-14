import supertest from 'supertest';
import app from '../src/application/app.js';
import { createUserTest, deleteUserTest, getTestUser } from './test-utils.js';
import { logger } from '../src/application/logging.js';
import bcrypt from 'bcrypt';

describe('POST /api/users', () => {
  afterEach(async () => {
    await deleteUserTest();
  });

  // test success
  it('should can register new user', async () => {
    const result = await supertest(app).post('/api/users').send({
      username: 'test123',
      password: 'secretkey',
      name: 'test',
    });

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe('test123');
    expect(result.body.data.password).toBeUndefined();
    expect(result.body.data.name).toBe('test');
  });

  // test error
  it('should throw error if invalid', async () => {
    const result = await supertest(app).post('/api/users').send({
      username: 'a',
      password: 'a',
      name: 'test',
    });

    logger.info(result.body);

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

  //   // jika user sudah teregistrasi
  it('should reject if user already registered', async () => {
    let result = await supertest(app).post('/api/users').send({
      username: 'test123',
      password: 'secretkey',
      name: 'test',
    });

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe('test123');
    expect(result.body.data.password).toBeUndefined();
    expect(result.body.data.name).toBe('test');

    result = await supertest(app).post('/api/users').send({
      username: 'test123',
      password: 'secretkey',
      name: 'test',
    });

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});

describe('POST /api/users/login', () => {
  beforeEach(async () => {
    await createUserTest();
  });

  afterEach(async () => {
    await deleteUserTest();
  });

  it('should can login', async () => {
    const result = await supertest(app).post('/api/users/login').send({
      username: 'test123',
      password: 'secretkey',
    });

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.token).toBeDefined();
    expect(result.body.data.token).not.toBe('token');
  });

  it('should reject if usename wrong', async () => {
    const result = await supertest(app).post('/api/users/login').send({
      username: 'abcdef',
      password: 'secretkey',
    });

    logger.error(result.body);

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });

  it('should reject if password wrong', async () => {
    const result = await supertest(app).post('/api/users/login').send({
      username: 'test123',
      password: '??',
    });

    logger.error(result.body);

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });
});

describe('GET /api/users/current', () => {
  beforeEach(async () => {
    await createUserTest();
  });

  afterEach(async () => {
    await deleteUserTest();
  });

  it('should can get current user', async () => {
    const result = await supertest(app).get('/api/users/current').set('Authorization', 'token');

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe('test123');
    expect(result.body.data.name).toBe('test');
  });

  it('should reject if token is invalid', async () => {
    const result = await supertest(app).get('/api/users/current').set('Authorization', '???');

    logger.error(result.body);

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });
});

describe('PATCH /api/users/current', () => {
  beforeEach(async () => {
    await createUserTest();
  });

  afterEach(async () => {
    await deleteUserTest();
  });

  it('should can update name', async () => {
    const result = await supertest(app).patch('/api/users/current').set('Authorization', 'token').send({
      name: 'Rifki Ari Darmawan',
    });

    logger.error(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.name).toBe('Rifki Ari Darmawan');
  });

  it('should can update password', async () => {
    const result = await supertest(app).patch('/api/users/current').set('Authorization', 'token').send({
      password: 'rifkiaridarmawan123',
    });

    logger.info(result.body);

    expect(result.status).toBe(200);
    const user = await getTestUser();
    expect(await bcrypt.compare('rifkiaridarmawan123', user.password)).toBe(true);
  });

  it('should reject if unauthorize', async () => {
    const result = await supertest(app).patch('/api/users/current').set('Authorization', '????').send({
      name: 'Rifki Ari Darmawan',
      password: 'rifkiaridarmawan123',
    });

    logger.error(result.body);

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });
});

describe('DELETE /api/users/logout', () => {
  beforeEach(async () => {
    await createUserTest();
  });

  afterEach(async () => {
    await deleteUserTest();
  });

  it('should can logout', async () => {
    const result = await supertest(app).delete('/api/users/logout').set('Authorization', 'token');

    logger.info(result.body);

    const user = await getTestUser();
    expect(result.status).toBe(200);
    expect(result.body.data).toBe('OK');
    expect(user.token).toBe(null);
  });

  it('should reject if unauthorize ', async () => {
    const result = await supertest(app).delete('/api/users/logout').set('Authorization', '??');

    logger.error(result.body);

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });
});
