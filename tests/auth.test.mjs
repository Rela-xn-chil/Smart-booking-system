import { expect } from 'chai';
import supertest from 'supertest';
import bcrypt from 'bcryptjs';

import app from '../app.js';
import { sequelize, User } from '../models/index.js';

describe('Auth Routes', () => {
  before(async () => {
    await sequelize.sync({ force: true }); // Reset DB before tests
  });

  afterEach(async () => {
    await User.destroy({ where: {} });
  });

  describe('POST /api/auth/register', () => {
    it('should register a new user', async () => {
      const res = await supertest(app)
        .post('/api/auth/register')
        .send({
          name: 'Test User',
          email: 'test@example.com',
          password: 'test123'
        });

      expect(res.status).to.equal(201);
      expect(res.body.message).to.equal('User registered successfully');
    });
  });

  describe('POST /api/auth/login', () => {
    beforeEach(async () => {
      await User.create({
        name: 'Test Login',
        email: 'login@example.com',
        password: await bcrypt.hash('login123', 10),
        role: 'user'
      });
    });

    it('should log in an existing user', async () => {
      const res = await supertest(app)
        .post('/api/auth/login')
        .send({
          email: 'login@example.com',
          password: 'login123'
        });

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('token');
    });
  });
});
