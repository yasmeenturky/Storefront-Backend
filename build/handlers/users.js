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
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyAuthToken_1 = __importDefault(require("../utilities/verifyAuthToken"));
const user_store = new user_1.user();
const index = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_store.index();
        res.json(users);
    }
    catch (err) {
        throw new Error(`Could not get users, Error ${err}`);
    }
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_store.show(req.params.id);
        res.json(user);
    }
    catch (err) {
        throw new Error(`Could not get user, Error ${err}`);
    }
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = {
            fname: req.body.firstname,
            lname: req.body.lastname,
            password: req.body.password,
        };
        if (!user.fname || !user.lname || !user.password) {
            return res.send('Missing information. Please enter firstname, lastname and password');
        }
        const newUser = yield user_store.create(user);
        const token = jsonwebtoken_1.default.sign({ user: newUser.id }, process.env.TOKEN_SECRET);
        return res.send(token);
    }
    catch (err) {
        throw new Error(`Could not create user, Error ${err}`);
    }
});
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = {
            id: req.params.id,
            fname: req.body.firstname,
            lname: req.body.lastname,
            password: req.body.password,
        };
        const updatedUser = yield user_store.update(user);
        res.json(updatedUser);
    }
    catch (err) {
        throw new Error(`Could not update user. Error ${err}`);
    }
});
const destroy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user_id = req.params.id;
        const deleteUser = yield user_store.destroy(user_id);
        res.json(deleteUser);
    }
    catch (err) {
        throw new Error(`could not delete user. Error ${err}`);
    }
});
const authenticate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const firstname = req.body.firstname;
        const lastname = req.body.lastname;
        const password = req.body.password;
        if (!firstname || !lastname || !password) {
            return res.send('Please enter your firstname , lasname and password');
        }
        const user = yield user_store.authenticate(firstname, lastname, password);
        const token = jsonwebtoken_1.default.sign({ user_id: user === null || user === void 0 ? void 0 : user.id }, process.env.TOKEN_SECRET);
        res.json(token);
    }
    catch (err) {
        throw new Error(`could not authenticate user. Error ${err}`);
    }
});
const userRoutes = (app) => {
    app.get('/users', verifyAuthToken_1.default, index);
    app.get('/users/:id', verifyAuthToken_1.default, show);
    app.post('/users', create);
    app.put('/users/:id', verifyAuthToken_1.default, update);
    app.delete('/users/:id', verifyAuthToken_1.default, destroy);
    app.post('/users/auth', authenticate);
};
exports.default = userRoutes;
