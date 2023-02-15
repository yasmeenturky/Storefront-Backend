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
const dashboard_1 = require("../services/dashboard");
const verifyAuthToken_1 = __importDefault(require("../utilities/verifyAuthToken"));
const dashboard = new dashboard_1.DashboardQueries();
const productsInOrders = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield dashboard.productsInOrders();
    res.json(products);
});
const completeOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user_id = req.params.id;
        const result = yield dashboard.showCompletedOrders(user_id);
        res.json(result);
    }
    catch (err) {
        throw new Error(`Error ${err}`);
    }
});
const dashboardRoutes = (app) => {
    app.get('/products_in_orders', verifyAuthToken_1.default, productsInOrders);
    // app.get('/order_products',verifyAuthToken, productsInOrder)
    app.get('/complete_orders/:id', verifyAuthToken_1.default, completeOrders);
};
exports.default = dashboardRoutes;
