import client from '../database';
import bcrypt from 'bcrypt';

export type User = {
  id?: string;
  fname: string;
  lname: string;
  password: string;
};

const pepper = process.env.BCRYPT_PASSWORD;
const saltRounds = process.env.SALT_ROUNDS as unknown as string;

export class user {
  async index(): Promise<User[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM users';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get users ${err}`);
    }
  }

  async show(id: string): Promise<User> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM users WHERE id = $1';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not get user ${id}. Error ${err}`);
    }
  }

  async create(u: User): Promise<User> {
    try {
      const conn = await client.connect();
      const sql =
        'INSERT INTO users(fname , lname, password) VALUES($1, $2, $3) RETURNING *';
      const hash = bcrypt.hashSync(u.password + pepper, parseInt(saltRounds));
      const result = await conn.query(sql, [u.fname, u.lname, hash]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not create user ${u.fname} ${u.lname}. Error ${err}`
      );
    }
  }

  async update(u: User): Promise<User> {
    try {
      const conn = await client.connect();
      const sql = `UPDATE users SET fname = $1 , lname = $2 WHERE id = $3 RETURNING *`;
      const result = await conn.query(sql, [u.fname, u.lname, u.id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not update order. Error ${err}`);
    }
  }

  async destroy(user_id: string): Promise<User> {
    try {
      const conn = await client.connect();
      const sql = 'DELETE FROM users  WHERE id = $1 RETURNING id';
      const result = await conn.query(sql, [user_id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not delete user. Error ${err}`);
    }
  }

  async authenticate(
    firstname: string,
    lastname: string,
    password: string
  ): Promise<User | null> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM users WHERE fname=$1 AND lname =$2';
      const result = await conn.query(sql, [firstname, lastname]);
      const user = result.rows[0];

      if (user) {
        if (bcrypt.compareSync(password + pepper, user.password)) {
          return user;
        }
      }

      conn.release();

      return null;
    } catch (err) {
      throw new Error(`user authenttication failed. Error ${err}`);
    }
  }
}
