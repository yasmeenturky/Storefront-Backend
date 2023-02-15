import { product, Product } from '../product';

const store = new product();

describe('Product Model', () => {
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
  });

  describe('Test model methods', () => {
    let product_id: string;
    it('create method should add a new product', async () => {
      const result = await store.create({
        name: 'TestProduct',
        price: 20,
      });
      product_id = result.id as unknown as string;
      expect(result).toEqual({
        id: result.id,
        name: 'TestProduct',
        price: 20,
      });
    });

    it('index method should return a length of products', async () => {
      const result = await store.index();
      expect(result.length).toEqual(1);
    });

    it('show method should return the correct product', async () => {
      const result = await store.show(product_id);
      expect(result).toEqual({
        id: product_id,
        name: 'TestProduct',
        price: 20,
      });
    });

    it('update method should update a product', async () => {
      const updatedProduct: Product = {
        id: product_id,
        name: 'TestProduct01',
        price: 30,
      };
      const result = await store.update(updatedProduct);
      expect(result).toEqual({
        id: updatedProduct.id,
        name: updatedProduct.name,
        price: updatedProduct.price,
      });
    });

    it('delete method should remove the product', async () => {
      const result = await store.destroy(product_id);
      expect(result.id).toEqual(product_id);
    });
  });
});
