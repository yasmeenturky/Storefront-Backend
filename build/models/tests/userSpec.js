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
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../user");
const store = new user_1.user();
describe('User Model', () => {
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
    });
    describe('Test model methods', () => {
        let user_id, password;
        it('create method should add a new user', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield store.create({
                fname: 'Test',
                lname: 'test',
                password: 'test1',
            });
            expect(result).toEqual({
                id: result.id,
                fname: 'Test',
                lname: 'test',
                password: result.password,
            });
            user_id = result.id;
            password = result.password;
        }));
        it('index method should return a length of users', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield store.index();
            expect(result.length).toEqual(1);
        }));
        it('show method should return the correct user', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield store.show(user_id);
            expect(result).toEqual({
                id: user_id,
                fname: 'Test',
                lname: 'test',
                password: password,
            });
        }));
        it('authenticate method should authenticate a user', () => __awaiter(void 0, void 0, void 0, function* () {
            const currentUser = {
                fname: 'Test',
                lname: 'test',
                password: 'test1',
            };
            const result = yield store.authenticate(currentUser.fname, currentUser.lname, currentUser.password);
            expect(result).toEqual({
                id: user_id,
                fname: currentUser.fname,
                lname: currentUser.lname,
                password: password,
            });
        }));
        it('update method should update a user', () => __awaiter(void 0, void 0, void 0, function* () {
            const updatedUser = {
                id: user_id,
                fname: 'Test1',
                lname: 'test1',
                password: password,
            };
            const result = yield store.update(updatedUser);
            expect(result).toEqual({
                id: updatedUser.id,
                fname: updatedUser.fname,
                lname: updatedUser.lname,
                password: password,
            });
        }));
        it('delete method should remove the user', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield store.destroy(user_id);
            expect(result.id).toEqual(user_id);
        }));
    });
});
