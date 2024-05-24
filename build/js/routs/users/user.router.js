"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userApi = void 0;
const express_1 = __importDefault(require("express"));
const users_1 = require("../../controller/user/users");
const user_auth_1 = require("../../controller/user/user.auth");
exports.userApi = express_1.default.Router();
/**Get routers**/
exports.userApi.get('/', users_1.authPage);
exports.userApi.get('/register', users_1.userReg);
exports.userApi.get('/user-page', user_auth_1.userAuth);
/**Post routers**/
exports.userApi.post('/registration', users_1.createNewUser);
exports.userApi.post('/login', users_1.userLogin);
