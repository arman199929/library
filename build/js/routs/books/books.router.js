"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.booksApi = void 0;
const express_1 = __importDefault(require("express"));
const books_1 = require("../../controller/books/books");
exports.booksApi = express_1.default.Router();
/**Get routers**/
exports.booksApi.get('/', books_1.books);
/**Post routers**/
exports.booksApi.post('/add_books', books_1.booksPage);
exports.booksApi.post('/create_books', books_1.addNewBook);
exports.booksApi.post('/delete_book', books_1.deleteBook);
exports.booksApi.post('/update_book', books_1.bookUpdatingPage);
exports.booksApi.post('/confirm_update', books_1.confirmUpdates);
