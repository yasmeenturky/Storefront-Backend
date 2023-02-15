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
const product_1 = require("../models/product");
const verifyAuthToken_1 = __importDefault(require("../utilities/verifyAuthToken"));
const product_store = new product_1.product();
const index = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield product_store.index();
    res.json(products);
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_store.show(req.params.id);
    res.json(product);
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = {
            name: req.body.name,
            price: req.body.price,
        };
        const newProduct = yield product_store.create(product);
        res.json(newProduct);
    }
    catch (err) {
        throw new Error(`${err}`);
    }
});
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = {
            id: req.params.id,
            name: req.body.name,
            price: req.body.price,
        };
        const updatedProduct = yield product_store.update(product);
        res.json(updatedProduct);
    }
    catch (err) {
        throw new Error(`Could not update product. Error ${err}`);
    }
});
const destroy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product_id = req.params.id;
        const deleteProduct = yield product_store.destroy(product_id);
        res.json(deleteProduct);
    }
    catch (err) {
        throw new Error(`${err}`);
    }
});
const productRoutes = (app) => {
    app.get('/products', index);
    app.get('/products/:id', show);
    app.post('/products', verifyAuthToken_1.default, create);
    app.put('/products/:id', verifyAuthToken_1.default, update);
    app.delete('/products/:id', verifyAuthToken_1.default, destroy);
};
exports.default = productRoutes;
