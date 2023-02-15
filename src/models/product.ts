import client from '../database';

export type Product = {
  id?: string;
  name: string;
  price: number;
};

export class product {
  async index(): Promise<Product[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM products';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get products ${err}`);
    }
  }

  async show(id: string): Promise<Product> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM products WHERE id = $1';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not get product ${id}. Error ${err}`);
    }
  }

  async create(p: Product): Promise<Product> {
    try {
      const conn = await client.connect();
      const sql = `INSERT INTO products(name , price) VALUES($1, $2) RETURNING *`;
      const result = await conn.query(sql, [p.name, p.price]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not create product ${p.name}. Error ${err}`);
    }
  }

  async update(p: Product): Promise<Product> {
    try {
      const conn = await client.connect();
      const sql = `UPDATE products SET name = $1, price = $2 WHERE id = $3  RETURNING *`;
      const result = await conn.query(sql, [p.name, p.price, p.id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not update order. Error ${err}`);
    }
  }

  async destroy(product_id: string): Promise<Product> {
    try {
      const conn = await client.connect();
      const sql = 'DELETE FROM products  WHERE id = $1 RETURNING id';
      const result = await conn.query(sql, [product_id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not delete product. Error ${err}`);
    }
  }
}
