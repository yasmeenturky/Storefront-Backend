"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../product");
const store = new product_1.product();
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
        let product_id;
        it('create method should add a new product', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield store.create({
                name: 'TestProduct',
                price: 20,
            });
            product_id = result.id;
            expect(result).toEqual({
                id: result.id,
                name: 'TestProduct',
                price: 20,
            });
        }));
        it('index method should return a length of products', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield store.index();
            expect(result.length).toEqual(1);
        }));
        it('show method should return the correct product', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield store.show(product_id);
            expect(result).toEqual({
                id: product_id,
                name: 'TestProduct',
                price: 20,
            });
        }));
        it('update method should update a product', () => __awaiter(void 0, void 0, void 0, function* () {
            const updatedProduct = {
                id: product_id,
                name: 'TestProduct01',
                price: 30,
            };
            const result = yield store.update(updatedProduct);
            expect(result).toEqual({
                id: updatedProduct.id,
                name: updatedProduct.name,
                price: updatedProduct.price,
            });
        }));
        it('delete method should remove the product', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield store.destroy(product_id);
            expect(result.id).toEqual(product_id);
        }));
    });
});
