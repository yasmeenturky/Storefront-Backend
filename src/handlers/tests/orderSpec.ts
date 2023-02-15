import supertest from 'supertest';
import app from '../../server';

const request = supertest(app);

describe('Test /orders endponits responses', () => {
  let token: string, product_id: number, order_id: number;

  beforeAll(async () => {
    await request
      .post('/users')
      .send({
        fname: 'Test',
        lname: 'test',
        password: 'test123',
      })
      .then((res) => {
        token = res.text;
      });

    await request
      .post('/products')
      .send({
        name: 'Test',
        price: 15,
      })
      .then((res) => {
        product_id = res.body.id;
      });
  });

  afterAll(async () => {
    await request.delete('/users/1').set('Authorization', 'Bearer' + token);

    await request.delete('/products/1').set('Authorization', 'Bearer' + token);
  });

  it('should post /orders', async () => {
    await request
      .post('/orders')
      .send({
        status: 'active',
        user_id: 1,
      })
      .then((res) => {
        order_id = res.body.id;
        expect(res.status).toBe(200);
      });
  });

  it('should get /orders', async () => {
    await request
      .get('/orders')
      .set('Authorization', 'Bearer' + token)
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });

  it('should get /orders/:id', async () => {
    await request
      .get(`/orders/${order_id}`)
      .set('Authorization', 'Bearer' + token)
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });

  it('should post /orders/products', async () => {
    await request
      .post(`/orders/${order_id}/products`)
      .send({
        quantity: 2,
        order_id: order_id,
        product_id: product_id,
      })
      .set('Authorization', 'Bearer' + token)
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });

  it('should get /orders/users/:id', async () => {
    await request
      .get('/orders/users/1')
      .set('Authorization', 'Bearer' + token)
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });

  it('should post /orders/products', async () => {
    await request
      .delete(`/orders/${order_id}/products/${product_id}`)
      .set('Authorization', 'Bearer' + token)
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });

  it('should put /orders/:id', async () => {
    await request
      .put('/orders/1')
      .send({
        status: 'complete',
        user_id: 1,
      })
      .set('Authorization', 'Bearer' + token)
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });

  it('should delete /orders/:id', async () => {
    await request
      .delete('/orders/1')
      .set('Authorization', 'Bearer' + token)
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });
});
