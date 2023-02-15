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
exports.DashboardQueries = void 0;
const database_1 = __importDefault(require("../database"));
class DashboardQueries {
    // Get all products that have been included in orders
    productsInOrders() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT name, price, order_products.order_id FROM products INNER JOIN order_products ON products.id = order_products.product_id';
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`unable get products and orders: ${err}`);
            }
        });
    }
    productsInOrder() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM order_products';
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`unable to get products`);
            }
        });
    }
    orderDetails(orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT po.quantity , po.order_id, po.product_id, o.status, o.user_id FROM order_products po INNER JOIN orders o ON po.order_id = $1';
                const result = yield conn.query(sql, [orderId]);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`Could not get data. ${err}`);
            }
        });
    }
    showCompletedOrders(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = `SELECT order_products.order_id ,orders.status, order_products.product_id , order_products.quantity FROM order_products INNER JOIN orders ON order_products.order_id= orders.id AND orders.user_id = $1 AND  status = 'complete' `;
                //const sql =`SELECT * FROM orders WHERE status ='complete'`
                //`SELECT order_products.order_id, orders.status, order_products.product_id, order_products.quantity FROM order_products INNER JOIN orders  ON order_products.order_id = orders.id AND orders.user_id = $1 AND orders.status = 'complete'`;
                const result = yield conn.query(sql, [user_id]);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`Could not get orders. ${err}`);
            }
        });
    }
}
exports.DashboardQueries = DashboardQueries;
