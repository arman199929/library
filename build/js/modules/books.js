"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Books = void 0;
const db_1 = require("../database/db");
class Books {
    constructor(authorId, bookName, isbn, publishedDate) {
        this.authorId = authorId;
        this.bookName = bookName;
        this.isbn = isbn;
        this.publishedDate = publishedDate;
        this.authorId = authorId;
        this.bookName = bookName;
        this.isbn = isbn;
        this.publishedDate = publishedDate;
    }
    addNewBook() {
        let bookInfo = [this.authorId, this.bookName, this.isbn, this.publishedDate];
        return new Promise((resolve, reject) => {
            let sql = 'INSERT INTO books (authorID, bookName, ISBN, publishedDate) VALUES (?,?,?,?)';
            db_1.connection.query(sql, bookInfo)
                .then(result => {
                if (result[0]) {
                    return resolve(true);
                }
            })
                .catch(err => {
                return reject(err);
            });
        });
    }
    static getAllBooks() {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT * FROM books';
            db_1.connection.query(sql)
                .then(result => {
                return resolve(result[0]);
            })
                .catch(err => {
                return reject(err);
            });
        });
    }
    static deleteBook(id) {
        return new Promise((resolve, reject) => {
            let sql = 'DELETE FROM books WHERE id=?';
            db_1.connection.query(sql, [id])
                .then(result => {
                if (result[0]) {
                    return resolve(true);
                }
            })
                .catch(err => {
                return reject(err);
            });
        });
    }
    static getSomeBook(id) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT * FROM books WHERE id=?';
            db_1.connection.query(sql, [id])
                .then(result => {
                if (result[0]) {
                    return resolve(result[0]);
                }
            })
                .catch(err => {
                return reject(err);
            });
        });
    }
    static updateBookInfo(bookInfo) {
        return new Promise((resolve, reject) => {
            let sql = 'UPDATE books SET bookName=?, ISBN=?, publishedDate=? WHERE id=?';
            db_1.connection.query(sql, bookInfo)
                .then(result => {
                if (result[0]) {
                    return resolve(true);
                }
            })
                .catch(err => {
                return reject(err);
            });
        });
    }
    static deleteWithAuthorId(authorId) {
        return new Promise((resolve, reject) => {
            let sql = 'DELETE FROM books WHERE authorID=?';
            db_1.connection.query(sql, [authorId])
                .then(result => {
                if (result[0]) {
                    return resolve(true);
                }
            })
                .catch(err => {
                return reject(err);
            });
        });
    }
}
exports.Books = Books;
