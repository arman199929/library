"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authors = void 0;
const db_1 = require("../database/db");
class Authors {
    constructor(fullName, biography, dateOfBirth) {
        this.fullName = fullName;
        this.biography = biography;
        this.dateOfBirth = dateOfBirth;
        this.fullName = fullName;
        this.biography = biography;
        this.dateOfBirth = dateOfBirth;
    }
    createAuthors() {
        let info = [this.fullName, this.biography, this.dateOfBirth];
        return new Promise((resolve, reject) => {
            let sql = 'INSERT INTO authors (fullName, biography, dateOfBirth) VALUES (?,?,?)';
            db_1.connection.query(sql, info)
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
    static getAuthors() {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT * FROM authors';
            db_1.connection.query(sql)
                .then(result => {
                return resolve(result[0]);
            })
                .catch(err => {
                return reject(err);
            });
        });
    }
    static getAuthorsBooks() {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT authors.id,authors.fullName,authors.dateOfBirth,b.bookName,b.ISBN,b.publishedDate FROM authors JOIN library.books b ON b.authorID = authors.id';
            db_1.connection.query(sql)
                .then(result => {
                return resolve(result[0]);
            })
                .catch(err => {
                return reject(err);
            });
        });
    }
    static deleteAuthor(id) {
        return new Promise((resolve, reject) => {
            let sql = 'DELETE FROM authors WHERE id=?';
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
    static getSomeAuthor(id) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT * FROM authors WHERE id=?';
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
    static updateAuthorInfo(info) {
        return new Promise((resolve, reject) => {
            let sql = 'UPDATE authors SET fullName=?,biography=?,dateOfBirth=? WHERE id=?';
            db_1.connection.query(sql, info)
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
exports.Authors = Authors;
