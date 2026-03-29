const request = require('supertest');
const app = require('../app');

describe('User API Tests', () => {

  it('should return health status', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toBe('UP');
  });

  it('should create a user', async () => {
    const res = await request(app)
      .post('/users')
      .send({ name: 'John' });

    expect(res.statusCode).toEqual(201);
    expect(res.body.name).toBe('John');
  });

});