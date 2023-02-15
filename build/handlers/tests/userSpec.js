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
describe('Test /users endpoints responses', () => {
    let token;
    it('should post /users', () => __awaiter(void 0, void 0, void 0, function* () {
        yield request
            .post('/users')
            .send({
            fname: 'Test',
            lname: 'test',
            password: 'test123',
        })
            .then((res) => {
            token = res.text;
            expect(res.status).toBe(200);
        });
    }));
    it('should get /users', () => __awaiter(void 0, void 0, void 0, function* () {
        yield request
            .get('/users')
            .set('Authorization', 'Bearer' + token)
            .then((res) => {
            expect(res.status).toBe(200);
        });
    }));
    it('should get /users/:id', () => __awaiter(void 0, void 0, void 0, function* () {
        yield request
            .get('/users/1')
            .set('Authorization', 'Bearer' + token)
            .then((res) => {
            expect(res.status).toBe(200);
        });
    }));
    it('should authenticate /users/auth', () => __awaiter(void 0, void 0, void 0, function* () {
        yield request
            .post('/users/auth')
            .send({
            fname: 'Test',
            lname: 'test',
            password: 'test123',
        })
            .then((res) => {
            expect(res.status).toBe(200);
        });
    }));
    it('should put /users/:id', () => __awaiter(void 0, void 0, void 0, function* () {
        yield request
            .put('/users/1')
            .send({
            fname: 'Test1',
            lname: 'test1',
            password: 'test123',
        })
            .set('Authorization', 'Bearer' + token)
            .then((res) => {
            expect(res.status).toBe(200);
        });
    }));
    it('should delete /users/:id', () => __awaiter(void 0, void 0, void 0, function* () {
        yield request
            .delete('/users/1')
            .set('Authorization', 'Bearer' + token)
            .then((res) => {
            expect(res.status).toBe(200);
        });
    }));
});
