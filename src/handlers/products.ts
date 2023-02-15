import express, { Request, Response } from 'express';
import { product, Product } from '../models/product';
import verifyAuthToken from '../utilities/verifyAuthToken';

const product_store = new product();

const index = async (_req: Request, res: Response) => {
  try{

    const products = await product_store.index();
    res.json(products);
  }catch (err) {
    throw new Error(`Could not get products, Error ${err}`);
  }
};

const show = async (req: Request, res: Response) => {
  try{

    const product = await product_store.show(req.params.id);
    res.json(product);
  }catch (err) {
    throw new Error(`Could not get product, Error ${err}`);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const product: Product = {
      name: req.body.name,
      price: req.body.price,
    };
    const newProduct = await product_store.create(product);
    res.json(newProduct);
  } catch (err) {
    throw new Error(`${err}`);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const product: Product = {
      id: req.params.id,
      name: req.body.name,
      price: req.body.price,
    };
    const updatedProduct = await product_store.update(product);
    res.json(updatedProduct);
  } catch (err) {
    throw new Error(`Could not update product. Error ${err}`);
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const product_id = req.params.id;
    const deleteProduct = await product_store.destroy(product_id);
    res.json(deleteProduct);
  } catch (err) {
    throw new Error(`${err}`);
  }
};

const productRoutes = (app: express.Application) => {
  app.get('/products', index);
  app.get('/products/:id', show);
  app.post('/products', verifyAuthToken, create);
  app.put('/products/:id', verifyAuthToken, update);
  app.delete('/products/:id', verifyAuthToken, destroy);
};

export default productRoutes;
