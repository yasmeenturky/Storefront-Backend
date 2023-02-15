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
const order_1 = require("../models/order");
const verifyAuthToken_1 = __importDefault(require("../utilities/verifyAuthToken"));
const order_store = new order_1.order();
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield order_store.index();
    res.json(orders);
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield order_store.show(req.params.id);
    res.json(order);
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = {
            user_id: req.body.user_id,
            status: req.body.status,
        };
        const newOrder = yield order_store.create(order);
        res.json(newOrder);
    }
    catch (err) {
        throw new Error(`${err}`);
    }
});
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = {
            id: req.params.id,
            status: req.body.status,
            user_id: req.body.userId,
        };
        const updateStatus = yield order_store.update(order);
        res.json(updateStatus);
    }
    catch (err) {
        throw new Error(`${err}`);
    }
});
const destroy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order_id = req.params.id;
        const deleteOrder = yield order_store.destroy(order_id);
        res.json(deleteOrder);
    }
    catch (err) {
        throw new Error(`${err}`);
    }
});
const showUserOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user_id = req.params.id;
        const current_order = yield order_store.showUserOrder(user_id);
        res.json(current_order);
    }
    catch (err) {
        throw new Error(`${err}`);
    }
});
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderId = req.params.id;
    const productId = req.body.productId;
    const quantity = parseInt(req.body.quantity);
    try {
        const addedProduct = yield order_store.addProduct(quantity, orderId, productId);
        return res.json(addedProduct);
    }
    catch (err) {
        throw new Error(`${err}`);
    }
});
const removeProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderId = req.params.id;
    const product_id = req.params.pid;
    try {
        const removedProduct = yield order_store.removeProduct(orderId, product_id);
        return res.json(removedProduct);
    }
    catch (err) {
        throw new Error(`${err}`);
    }
});
const orderRoutes = (app) => {
    // get all orders made by  user
    app.get('/orders', verifyAuthToken_1.default, index);
    //get an order made by user
    app.get('/orders/:id', verifyAuthToken_1.default, show);
    //show current user order
    app.get('/orders/users/:id', verifyAuthToken_1.default, showUserOrder);
    app.post('/orders', verifyAuthToken_1.default, create);
    app.put('/orders/:id', verifyAuthToken_1.default, update);
    app.delete('/orders/:id', destroy);
    // add product to order_products
    app.post('/orders/:id/products', verifyAuthToken_1.default, addProduct);
    app.delete('/orders/:id/products/:pid', verifyAuthToken_1.default, removeProduct);
};
exports.default = orderRoutes;
