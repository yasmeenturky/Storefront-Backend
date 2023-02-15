import express, { Request, Response } from 'express';
import { order, Order } from '../models/order';
import verifyAuthToken from '../utilities/verifyAuthToken';

const order_store = new order();

const index = async (req: Request, res: Response) => {
  try{

    const orders = await order_store.index();
    res.json(orders);
  }catch (err) {
    throw new Error(`Could not get orders, Error ${err}`);
  }
};

const show = async (req: Request, res: Response) => {
  try{

    const order = await order_store.show(req.params.id);
    res.json(order);
  }catch (err) {
    throw new Error(`Could not get order, Error ${err}`);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const order: Order = {
      user_id: req.body.user_id,
      status: req.body.status,
    };
    const newOrder = await order_store.create(order);
    res.json(newOrder);
  } catch (err) {
    throw new Error(`${err}`);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const order: Order = {
      id: req.params.id,
      status: req.body.status,
      user_id: req.body.userId,
    };

    const updateStatus = await order_store.update(order);
    res.json(updateStatus);
  } catch (err) {
    throw new Error(`${err}`);
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const order_id = req.params.id;
    const deleteOrder = await order_store.destroy(order_id);
    res.json(deleteOrder);
  } catch (err) {
    throw new Error(`${err}`);
  }
};

const showUserOrder = async (req: Request, res: Response) => {
  try {
    const user_id = req.params.id;
    const current_order = await order_store.showUserOrder(user_id);
    res.json(current_order);
  } catch (err) {
    throw new Error(`${err}`);
  }
};

const addProduct = async (req: Request, res: Response) => {
  const orderId: string = req.params.id;
  const productId: string = req.body.productId;
  const quantity: number = parseInt(req.body.quantity);

  try {
    const addedProduct = await order_store.addProduct(
      quantity,
      orderId,
      productId
    );
    return res.json(addedProduct);
  } catch (err) {
    throw new Error(`${err}`);
  }
};

const removeProduct = async (req: Request, res: Response) => {
  const orderId: string = req.params.id;
  const product_id: string = req.params.pid;

  try {
    const removedProduct = await order_store.removeProduct(orderId, product_id);
    return res.json(removedProduct);
  } catch (err) {
    throw new Error(`${err}`);
  }
};

const orderRoutes = (app: express.Application) => {
  // get all orders made by  user
  app.get('/orders', verifyAuthToken, index);
  //get an order made by user
  app.get('/orders/:id', verifyAuthToken, show);
  //show current user order
  app.get('/orders/users/:id', verifyAuthToken, showUserOrder);
  app.post('/orders', verifyAuthToken, create);
  app.put('/orders/:id', verifyAuthToken, update);
  app.delete('/orders/:id', verifyAuthToken,destroy);
  // add product to order_products
  app.post('/orders/:id/products', verifyAuthToken, addProduct);

  app.delete('/orders/:id/products/:pid', verifyAuthToken, removeProduct);
};

export default orderRoutes;
