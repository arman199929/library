import express, {Router} from 'express';
import {books, addNewBook, booksPage, deleteBook, bookUpdatingPage, confirmUpdates} from "../../controller/books/books";

export const booksApi: Router = express.Router();

/**Get routers**/
booksApi.get('/', books);

/**Post routers**/
booksApi.post('/add_books', booksPage);
booksApi.post('/create_books', addNewBook);
booksApi.post('/delete_book', deleteBook);
booksApi.post('/update_book', bookUpdatingPage);
booksApi.post('/confirm_update', confirmUpdates);
