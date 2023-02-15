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
exports.order = void 0;
const database_1 = __importDefault(require("../database"));
class order {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM orders';
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`Could not get orders ${err}`);
            }
        });
    }
    show(orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM orders WHERE id = $1';
                const result = yield conn.query(sql, [orderId]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not get order ${orderId}. Error ${err}`);
            }
        });
    }
    create(o) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = `INSERT INTO orders(user_id , status) VALUES($1,$2) ON CONFLICT DO NOTHING RETURNING *`;
                const result = yield conn.query(sql, [o.user_id, o.status]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not create order. Error ${err}`);
            }
        });
    }
    update(o) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = `UPDATE orders SET status = $1 WHERE id = $2 RETURNING *`;
                const result = yield conn.query(sql, [o.status, o.id]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not update order. Error ${err}`);
            }
        });
    }
    destroy(order_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'DELETE FROM orders  WHERE id = $1 RETURNING id';
                const result = yield conn.query(sql, [order_id]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not delete order. Error ${err}`);
            }
        });
    }
    showUserOrder(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = `SELECT order_products.order_id , orders.status, order_products.product_id , order_products.quantity FROM order_products INNER JOIN orders ON order_products.order_id= orders.id AND orders.user_id = $1 AND  status = 'active' `;
                const result = yield conn.query(sql, [user_id]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not get order. Error ${err}`);
            }
        });
    }
    addProduct(quantity, order_id, product_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'INSERT INTO order_products(quantity, order_id, product_id) VALUES($1, $2, $3)  ON CONFLICT DO NOTHING  RETURNING quantity, order_id, product_id';
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [quantity, order_id, product_id]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not add product ${product_id} to order ${order_id}: ${err}`);
            }
        });
    }
    removeProduct(order_id, product_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = `DELETE FROM order_products WHERE order_products.order_id = $1 AND order_products.product_id = $2 RETURNING order_products.order_id , order_products.product_id`;
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [order_id, product_id]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not remove product: ${err}`);
            }
        });
    }
}
exports.order = order;
