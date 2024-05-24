import {connection} from '../database/db';

export class Authors {
    constructor(public fullName: string, public biography: string, public dateOfBirth: string) {
        this.fullName = fullName;
        this.biography = biography;
        this.dateOfBirth = dateOfBirth
    }

    createAuthors() {
        let info: string[] = [this.fullName, this.biography, this.dateOfBirth];
        return new Promise((resolve, reject) => {
            let sql = 'INSERT INTO authors (fullName, biography, dateOfBirth) VALUES (?,?,?)';
            connection.query(sql, info)
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

    static getAuthors() {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT * FROM authors';
            connection.query(sql)
                .then(result => {
                    return resolve(result[0])
                })
                .catch(err => {
                    return reject(err)
                })
        })
    }

    static getAuthorsBooks() {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT authors.id,authors.fullName,authors.dateOfBirth,b.bookName,b.ISBN,b.publishedDate FROM authors JOIN library.books b ON b.authorID = authors.id';
            connection.query(sql)
                .then(result => {
                    return resolve(result[0])
                })
                .catch(err => {
                    return reject(err)
                })
        })
    }

    static deleteAuthor(id: string) {
        return new Promise((resolve, reject) => {
            let sql = 'DELETE FROM authors WHERE id=?';
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

    static getSomeAuthor(id: string) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT * FROM authors WHERE id=?';
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

    static updateAuthorInfo(info:string[]){
        return new Promise((resolve, reject) => {
            let sql = 'UPDATE authors SET fullName=?,biography=?,dateOfBirth=? WHERE id=?';
            connection.query(sql,info)
                .then(result => {
                    if(result[0]){
                        return resolve(true)
                    }
                })
                .catch(err => {
                    return reject(err)
                })
        })
    }
}