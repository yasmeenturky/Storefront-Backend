import { order, Order } from '../order';
import { user } from '../user';
import { product } from '../product';
import client from '../../database';

const store = new order();
const user_store = new user();
const product_store = new product();

describe('Order Model', () => {
  describe('Check that methods exist', () => {
    it('should have an index method', () => {
      expect(store.index).toBeDefined();
    });

    it('should have a show method', () => {
      expect(store.show).toBeDefined();
    });

    it('should have a create method', () => {
      expect(store.create).toBeDefined();
    });

    it('should have a update method', () => {
      expect(store.update).toBeDefined();
    });

    it('should have a delete method', () => {
      expect(store.destroy).toBeDefined();
    });

    it('should have a showUserOrder method', () => {
      expect(store.showUserOrder).toBeDefined();
    });

    it('should have a addProduct method', () => {
      expect(store.addProduct).toBeDefined();
    });

    it('should have a removeProduct method', () => {
      expect(store.removeProduct).toBeDefined();
    });
  });

  describe('Test model methods', () => {
    let user_id: string,
      order_id: string,
      product_id: string,
      quantity: number,
      newOrder: Order;

    beforeAll(async () => {
      const createdUser = await user_store.create({
        fname: 'Test1',
        lname: 'test1',
        password: 'test11',
      });

      user_id = createdUser.id as unknown as string;
      const createdProduct = await product_store.create({
        name: 'TestProduct',
        price: 20,
      });

      product_id = createdProduct.id as unknown as string;

      newOrder = {
        user_id: user_id,
        status: 'active',
      };
    });

    afterAll(async () => {
      await user_store.destroy(user_id);
      const conn = await client.connect();
      const sql = 'DELETE FROM users';
      await conn.query(sql);
      const sql1 = 'DELETE FROM products';
      await conn.query(sql1);
      const sql2 = 'DELETE FROM order_products';
      await conn.query(sql2);
      conn.release();
    });

    it('create method should add a new order', async () => {
      const result = await store.create(newOrder);
      newOrder.id = result.id as unknown as string;
      order_id = newOrder.id;
      expect(result).toEqual({
        id: newOrder.id,
        user_id: `${newOrder.user_id}`,
        status: newOrder.status,
      });
    });

    it('index method should return a length of orders', async () => {
      const result = await store.index();
      expect(result.length).toEqual(1);
    });

    it('show method should return the correct order', async () => {
      const result = await store.show(order_id);
      expect(result).toEqual({
        id: order_id,
        user_id: `${newOrder.user_id}`,
        status: newOrder.status,
      });
    });

    it('addProduct method should add products to order', async () => {
      const result = await store.addProduct(2, order_id, product_id);
      expect(result).toEqual({
        quantity: 2,
        order_id: `${order_id}`,
        product_id: `${product_id}`,
      });
      quantity = result.quantity;
    });

    it('showUserOrder method should show the current order', async () => {
      const result = await store.showUserOrder(user_id);
      expect(result).toEqual({
        order_id: `${order_id}`,
        status: 'active',
        product_id: `${product_id}`,
        quantity: quantity,
      });
    });

    it('remove Product method should remove products from order', async () => {
      const result = await store.removeProduct(order_id, product_id);
      expect(result).toEqual({
        order_id: `${order_id}`,
        product_id: `${product_id}`,
      });
    });

    it('update method should update an order', async () => {
      const updatedOrder: Order = {
        id: order_id,
        user_id: `${newOrder.user_id}`,
        status: 'complete',
      };
      const result = await store.update(updatedOrder);
      expect(result).toEqual({
        id: updatedOrder.id,
        user_id: updatedOrder.user_id,
        status: updatedOrder.status,
      });
    });

    it('delete method should remove the order', async () => {
      const result = await store.destroy(order_id);
      expect(result.id).toEqual(order_id);
    });
  });
});
