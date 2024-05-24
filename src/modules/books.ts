import {connection} from '../database/db';

export class Books {
    constructor(public authorId: string, public bookName: string,
                public isbn: string, public publishedDate: string) {
        this.authorId = authorId;
        this.bookName = bookName;
        this.isbn = isbn;
        this.publishedDate = publishedDate;
    }

    addNewBook() {
        let bookInfo: string[] = [this.authorId, this.bookName, this.isbn, this.publishedDate];
        return new Promise((resolve, reject) => {
            let sql = 'INSERT INTO books (authorID, bookName, ISBN, publishedDate) VALUES (?,?,?,?)';
            connection.query(sql, bookInfo)
                .then(result => {
                    if (result[0]) {
                        return resolve(true)
                    }
                })
                .catch(err => {
                    return reject(err)
                })

        })
    }

    static getAllBooks() {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT * FROM books';
            connection.query(sql)
                .then(result => {
                    return resolve(result[0])
                })
                .catch(err => {
                    return reject(err)
                })
        })
    }

    static deleteBook(id: string) {
        return new Promise((resolve, reject) => {
            let sql = 'DELETE FROM books WHERE id=?';
            connection.query(sql, [id])
                .then(result => {
                    if (result[0]) {
                        return resolve(true)
                    }
                })
                .catch(err => {
                    return reject(err)
                })
        })
    }

    static getSomeBook(id: string) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT * FROM books WHERE id=?';
            connection.query(sql, [id])
                .then(result => {
                    if (result[0]) {
                        return resolve(result[0])
                    }
                })
                .catch(err => {
                    return reject(err)
                })
        })
    }

    static updateBookInfo(bookInfo: string[]) {
        return new Promise((resolve, reject) => {
            let sql = 'UPDATE books SET bookName=?, ISBN=?, publishedDate=? WHERE id=?';
            connection.query(sql, bookInfo)
                .then(result => {
                    if (result[0]) {
                        return resolve(true)
                    }
                })
                .catch(err => {
                    return reject(err)
                })
        })
    }

    static deleteWithAuthorId(authorId: string) {
        return new Promise((resolve, reject) => {
            let sql = 'DELETE FROM books WHERE authorID=?';
            connection.query(sql, [authorId])
                .then(result => {
                    if (result[0]) {
                        return resolve(true)
                    }
                })
                .catch(err => {
                    return reject(err)
                })
        })
    }
}