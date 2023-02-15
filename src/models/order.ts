import client from '../database';

export type Order = {
  id?: string;
  user_id: string;
  status: string;
};

export class order {
  async index(): Promise<Order[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM orders';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get orders ${err}`);
    }
  }

  async show(orderId: string): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM orders WHERE id = $1';
      const result = await conn.query(sql, [orderId]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not get order ${orderId}. Error ${err}`);
    }
  }

  async create(o: Order): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql = `INSERT INTO orders(user_id , status) VALUES($1,$2) ON CONFLICT DO NOTHING RETURNING *`;
      const result = await conn.query(sql, [o.user_id, o.status]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not create order. Error ${err}`);
    }
  }

  async update(o: Order): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql = `UPDATE orders SET status = $1 WHERE id = $2 RETURNING *`;
      const result = await conn.query(sql, [o.status, o.id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not update order. Error ${err}`);
    }
  }

  async destroy(order_id: string): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql = 'DELETE FROM orders  WHERE id = $1 RETURNING id';
      const result = await conn.query(sql, [order_id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not delete order. Error ${err}`);
    }
  }

  async showUserOrder(
    user_id: string
  ): Promise<{
    order_id: string;
    status: string;
    product_id: string;
    quantity: number;
  }> {
    try {
      const conn = await client.connect();
      const sql = `SELECT order_products.order_id , orders.status, order_products.product_id , order_products.quantity FROM order_products INNER JOIN orders ON order_products.order_id= orders.id AND orders.user_id = $1 AND  status = 'active' `;
      const result = await conn.query(sql, [user_id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not get order. Error ${err}`);
    }
  }

  async addProduct(
    quantity: number,
    order_id: string,
    product_id: string
  ): Promise<{ quantity: number; order_id: string; product_id: string }> {
    try {
      const sql =
        'INSERT INTO order_products(quantity, order_id, product_id) VALUES($1, $2, $3)  ON CONFLICT DO NOTHING  RETURNING quantity, order_id, product_id';
      const conn = await client.connect();

      const result = await conn.query(sql, [quantity, order_id, product_id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not add product ${product_id} to order ${order_id}: ${err}`
      );
    }
  }

  async removeProduct(
    order_id: string,
    product_id: string
  ): Promise<{ order_id: string; product_id: string }> {
    try {
      const sql = `DELETE FROM order_products WHERE order_products.order_id = $1 AND order_products.product_id = $2 RETURNING order_products.order_id , order_products.product_id`;
      const conn = await client.connect();

      const result = await conn.query(sql, [order_id, product_id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not remove product: ${err}`);
    }
  }
}
