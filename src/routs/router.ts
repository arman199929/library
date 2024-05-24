import express, {Request, Response, Router} from 'express';
import {authorApi} from "./authors/author.router";
import {userApi} from './users/user.router';
import {booksApi} from "./books/books.router";

export const Api: Router = express.Router();



/**Usage apis**/
Api.use('/users',userApi);
Api.use('/',authorApi);
Api.use('/books',booksApi);