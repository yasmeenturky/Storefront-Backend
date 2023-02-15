import supertest from 'supertest';
import app from '../../server';

const request = supertest(app);

describe('Test /users endpoints responses', () => {
  let token: string;

  it('should post /users', async () => {
    await request
      .post('/users')
      .send({
        fname: 'Test',
        lname: 'test',
        password: 'test123',
      })
      .then((res) => {
        token = res.text;
        expect(res.status).toBe(200);
      });
  });

  it('should get /users', async () => {
    await request
      .get('/users')
      .set('Authorization', 'Bearer' + token)
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });

  it('should get /users/:id', async () => {
    await request
      .get('/users/1')
      .set('Authorization', 'Bearer' + token)
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });

  it('should authenticate /users/auth', async () => {
    await request
      .post('/users/auth')
      .send({
        fname: 'Test',
        lname: 'test',
        password: 'test123',
      })
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });

  it('should put /users/:id', async () => {
    await request
      .put('/users/1')
      .send({
        fname: 'Test1',
        lname: 'test1',
        password: 'test123',
      })
      .set('Authorization', 'Bearer' + token)
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });

  it('should delete /users/:id', async () => {
    await request
      .delete('/users/1')
      .set('Authorization', 'Bearer' + token)
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });
});
