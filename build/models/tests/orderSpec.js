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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../order");
const user_1 = require("../user");
const product_1 = require("../product");
const database_1 = __importDefault(require("../../database"));
const store = new order_1.order();
const user_store = new user_1.user();
const product_store = new product_1.product();
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
        let user_id, order_id, product_id, quantity, newOrder;
        beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
            const createdUser = yield user_store.create({
                fname: 'Test1',
                lname: 'test1',
                password: 'test11',
            });
            user_id = createdUser.id;
            const createdProduct = yield product_store.create({
                name: 'TestProduct',
                price: 20,
            });
            product_id = createdProduct.id;
            newOrder = {
                user_id: user_id,
                status: 'active',
            };
        }));
        afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
            yield user_store.destroy(user_id);
            const conn = yield database_1.default.connect();
            const sql = 'DELETE FROM users';
            yield conn.query(sql);
            const sql1 = 'DELETE FROM products';
            yield conn.query(sql1);
            const sql2 = 'DELETE FROM order_products';
            yield conn.query(sql2);
            conn.release();
        }));
        it('create method should add a new order', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield store.create(newOrder);
            newOrder.id = result.id;
            order_id = newOrder.id;
            expect(result).toEqual({
                id: newOrder.id,
                user_id: `${newOrder.user_id}`,
                status: newOrder.status,
            });
        }));
        it('index method should return a length of orders', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield store.index();
            expect(result.length).toEqual(1);
        }));
        it('show method should return the correct order', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield store.show(order_id);
            expect(result).toEqual({
                id: order_id,
                user_id: `${newOrder.user_id}`,
                status: newOrder.status,
            });
        }));
        it('addProduct method should add products to order', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield store.addProduct(2, order_id, product_id);
            expect(result).toEqual({
                quantity: 2,
                order_id: `${order_id}`,
                product_id: `${product_id}`,
            });
            quantity = result.quantity;
        }));
        it('showUserOrder method should show the current order', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield store.showUserOrder(user_id);
            expect(result).toEqual({
                order_id: `${order_id}`,
                status: 'active',
                product_id: `${product_id}`,
                quantity: quantity,
            });
        }));
        it('remove Product method should remove products from order', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield store.removeProduct(order_id, product_id);
            expect(result).toEqual({
                order_id: `${order_id}`,
                product_id: `${product_id}`,
            });
        }));
        it('update method should update an order', () => __awaiter(void 0, void 0, void 0, function* () {
            const updatedOrder = {
                id: order_id,
                user_id: `${newOrder.user_id}`,
                status: 'complete',
            };
            const result = yield store.update(updatedOrder);
            expect(result).toEqual({
                id: updatedOrder.id,
                user_id: updatedOrder.user_id,
                status: updatedOrder.status,
            });
        }));
        it('delete method should remove the order', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield store.destroy(order_id);
            expect(result.id).toEqual(order_id);
        }));
    });
});
