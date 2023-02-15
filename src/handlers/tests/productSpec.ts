import supertest from 'supertest';
import app from '../../server';

const request = supertest(app);

describe('Test /products endpoints responses', () => {
  let token: string;

  it('should post /products', async () => {
    await request
      .post('/products')
      .send({
        name: 'Test',
        price: 15,
      })
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });

  it('should get /products', async () => {
    await request
      .get('/products')
      .set('Authorization', 'Bearer' + token)
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });

  it('should get /products/:id', async () => {
    await request
      .get('/products/1')
      .set('Authorization', 'Bearer' + token)
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });

  it('should put /products/:id', async () => {
    await request
      .put('/products/1')
      .send({
        name: 'Test1',
        price: 30,
      })
      .set('Authorization', 'Bearer' + token)
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });

  it('should delete /products/:id', async () => {
    await request
      .delete('/products/1')
      .set('Authorization', 'Bearer' + token)
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });
});
