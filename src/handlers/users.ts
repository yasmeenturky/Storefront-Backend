import express, { Request, Response } from 'express';
import { User, user } from '../models/user';
import jwt from 'jsonwebtoken';
import verifyAuthToken from '../utilities/verifyAuthToken';

const user_store = new user();

const index = async (_req: Request, res: Response) => {
  try {
    const users = await user_store.index();
    res.json(users);
  } catch (err) {
    throw new Error(`Could not get users, Error ${err}`);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const user = await user_store.show(req.params.id);
    res.json(user);
  } catch (err) {
    throw new Error(`Could not get user, Error ${err}`);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const user: User = {
      fname: req.body.firstname,
      lname: req.body.lastname,
      password: req.body.password,
    };

    if (!user.fname || !user.lname || !user.password) {
      return res.send(
        'Missing information. Please enter firstname, lastname and password'
      );
    }
    const newUser = await user_store.create(user);
    const token = jwt.sign(
      { user: newUser.id },
      process.env.TOKEN_SECRET as string
    );
    return res.send(token);
  } catch (err) {
    throw new Error(`Could not create user, Error ${err}`);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const user: User = {
      id: req.params.id,
      fname: req.body.firstname,
      lname: req.body.lastname,
      password: req.body.password,
    };
    const updatedUser = await user_store.update(user);
    res.json(updatedUser);
  } catch (err) {
    throw new Error(`Could not update user. Error ${err}`);
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const user_id = req.params.id;
    const deleteUser = await user_store.destroy(user_id);
    res.json(deleteUser);
  } catch (err) {
    throw new Error(`could not delete user. Error ${err}`);
  }
};

const authenticate = async (req: Request, res: Response) => {
  try {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const password = req.body.password;
    if (!firstname || !lastname || !password) {
      return res.send('Please enter your firstname , lasname and password');
    }
    const user = await user_store.authenticate(firstname, lastname, password);
    const token = jwt.sign(
      { user_id: user?.id },
      process.env.TOKEN_SECRET as string
    );
    res.json(token);
  } catch (err) {
    throw new Error(`could not authenticate user. Error ${err}`);
  }
};

const userRoutes = (app: express.Application) => {
  app.get('/users', verifyAuthToken, index);
  app.get('/users/:id', verifyAuthToken, show);
  app.post('/users', create);
  app.put('/users/:id', verifyAuthToken, update);
  app.delete('/users/:id', verifyAuthToken, destroy);
  app.post('/users/auth', authenticate);
};

export default userRoutes;
