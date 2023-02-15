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
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const request = (0, supertest_1.default)(server_1.default);
describe('Test /orders endponits responses', () => {
    let token, product_id, order_id;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield request
            .post('/users')
            .send({
            fname: 'Test',
            lname: 'test',
            password: 'test123',
        })
            .then((res) => {
            token = res.text;
        });
        yield request
            .post('/products')
            .send({
            name: 'Test',
            price: 15,
        })
            .then((res) => {
            product_id = res.body.id;
        });
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield request.delete('/users/1').set('Authorization', 'Bearer' + token);
        yield request.delete('/products/1').set('Authorization', 'Bearer' + token);
    }));
    it('should post /orders', () => __awaiter(void 0, void 0, void 0, function* () {
        yield request
            .post('/orders')
            .send({
            status: 'active',
            user_id: 1,
        })
            .then((res) => {
            order_id = res.body.id;
            expect(res.status).toBe(200);
        });
    }));
    it('should get /orders', () => __awaiter(void 0, void 0, void 0, function* () {
        yield request
            .get('/orders')
            .set('Authorization', 'Bearer' + token)
            .then((res) => {
            expect(res.status).toBe(200);
        });
    }));
    it('should get /orders/:id', () => __awaiter(void 0, void 0, void 0, function* () {
        yield request
            .get(`/orders/${order_id}`)
            .set('Authorization', 'Bearer' + token)
            .then((res) => {
            expect(res.status).toBe(200);
        });
    }));
    it('should post /orders/products', () => __awaiter(void 0, void 0, void 0, function* () {
        yield request
            .post(`/orders/${order_id}/products`)
            .send({
            quantity: 2,
            order_id: order_id,
            product_id: product_id,
        })
            .set('Authorization', 'Bearer' + token)
            .then((res) => {
            expect(res.status).toBe(200);
        });
    }));
    it('should get /orders/users/:id', () => __awaiter(void 0, void 0, void 0, function* () {
        yield request
            .get('/orders/users/1')
            .set('Authorization', 'Bearer' + token)
            .then((res) => {
            expect(res.status).toBe(200);
        });
    }));
    it('should post /orders/products', () => __awaiter(void 0, void 0, void 0, function* () {
        yield request
            .delete(`/orders/${order_id}/products/${product_id}`)
            .set('Authorization', 'Bearer' + token)
            .then((res) => {
            expect(res.status).toBe(200);
        });
    }));
    it('should put /orders/:id', () => __awaiter(void 0, void 0, void 0, function* () {
        yield request
            .put('/orders/1')
            .send({
            status: 'complete',
            user_id: 1,
        })
            .set('Authorization', 'Bearer' + token)
            .then((res) => {
            expect(res.status).toBe(200);
        });
    }));
    it('should delete /orders/:id', () => __awaiter(void 0, void 0, void 0, function* () {
        yield request
            .delete('/orders/1')
            .set('Authorization', 'Bearer' + token)
            .then((res) => {
            expect(res.status).toBe(200);
        });
    }));
});
