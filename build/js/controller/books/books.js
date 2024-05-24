"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirmUpdates = exports.bookUpdatingPage = exports.deleteBook = exports.addNewBook = exports.booksPage = exports.books = void 0;
const books_1 = require("../../modules/books");
const addBooksLink = ('../views/books/createBooks.ejs'), booksPageLink = ('../views/books/books.ejs'), updatingPageLink = ('../views/books/updateBooks.ejs');
const books = (req, res) => {
    books_1.Books.getAllBooks()
        .then(result => {
        res.render(booksPageLink, {
            result,
            msg: 'no'
        });
    });
};
exports.books = books;
const booksPage = (req, res) => {
    let { id } = req.body;
    res.render(addBooksLink, {
        id,
        msg: 'no'
    });
};
exports.booksPage = booksPage;
const addNewBook = (req, res) => {
    let { authorID, bookName, isbn, publishedDate } = req.body;
    let newBook = new books_1.Books(authorID, bookName, isbn, publishedDate);
    newBook.addNewBook()
        .then(result => {
        if (result === true) {
            console.log(result);
            return res.redirect('/books/');
        }
    })
        .catch(err => {
        console.log(err);
    });
};
exports.addNewBook = addNewBook;
const deleteBook = (req, res) => {
    let { id } = req.body;
    books_1.Books.deleteBook(id)
        .then(result => {
        if (result === true) {
            res.redirect('/books');
        }
    })
        .catch(err => {
        console.log(err);
    });
};
exports.deleteBook = deleteBook;
const bookUpdatingPage = (req, res) => {
    let { id } = req.body;
    books_1.Books.getSomeBook(id)
        .then(result => {
        res.render(updatingPageLink, {
            result, msg: 'no'
        });
    })
        .catch(err => {
        console.log(err);
    });
};
exports.bookUpdatingPage = bookUpdatingPage;
const confirmUpdates = (req, res) => {
    let { id, bookName, isbn, publishedDate } = req.body;
    let newInfo = [bookName, isbn, publishedDate, id];
    books_1.Books.updateBookInfo(newInfo)
        .then(result => {
        if (result === true) {
            res.redirect('/books');
        }
    })
        .catch(err => {
        console.log(err);
    });
};
exports.confirmUpdates = confirmUpdates;
