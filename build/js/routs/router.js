"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Api = void 0;
const express_1 = __importDefault(require("express"));
const author_router_1 = require("./authors/author.router");
const user_router_1 = require("./users/user.router");
const books_router_1 = require("./books/books.router");
exports.Api = express_1.default.Router();
/**Usage apis**/
exports.Api.use('/users', user_router_1.userApi);
exports.Api.use('/', author_router_1.authorApi);
exports.Api.use('/books', books_router_1.booksApi);
