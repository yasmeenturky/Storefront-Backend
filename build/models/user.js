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
exports.user = void 0;
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const pepper = process.env.BCRYPT_PASSWORD;
const saltRounds = process.env.SALT_ROUNDS;
class user {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM users';
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`Could not get users ${err}`);
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM users WHERE id = $1';
                const result = yield conn.query(sql, [id]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not get user ${id}. Error ${err}`);
            }
        });
    }
    create(u) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'INSERT INTO users(fname , lname, password) VALUES($1, $2, $3) RETURNING *';
                const hash = bcrypt_1.default.hashSync(u.password + pepper, parseInt(saltRounds));
                const result = yield conn.query(sql, [u.fname, u.lname, hash]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not create user ${u.fname} ${u.lname}. Error ${err}`);
            }
        });
    }
    update(u) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = `UPDATE users SET fname = $1 , lname = $2 WHERE id = $3 RETURNING *`;
                const result = yield conn.query(sql, [u.fname, u.lname, u.id]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not update order. Error ${err}`);
            }
        });
    }
    destroy(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'DELETE FROM users  WHERE id = $1 RETURNING id';
                const result = yield conn.query(sql, [user_id]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not delete user. Error ${err}`);
            }
        });
    }
    authenticate(firstname, lastname, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM users WHERE fname=$1 AND lname =$2';
                const result = yield conn.query(sql, [firstname, lastname]);
                const user = result.rows[0];
                if (user) {
                    if (bcrypt_1.default.compareSync(password + pepper, user.password)) {
                        return user;
                    }
                }
                conn.release();
                return null;
            }
            catch (err) {
                throw new Error(`user authenttication failed. Error ${err}`);
            }
        });
    }
}
exports.user = user;
