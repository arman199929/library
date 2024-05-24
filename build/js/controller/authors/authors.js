"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirmUpdate = exports.updatePage = exports.deleteAuthor = exports.createAuthors = exports.creatorPage = exports.authors = exports.main = void 0;
const authors_1 = require("../../modules/authors");
const books_1 = require("../../modules/books");
const mainPage = ('../views/main.ejs'), authorsPage = ('../views/authors/authors.ejs'), creatorPageLink = ('../views/authors/creator.ejs'), updatingPage = ('../views/authors/update.ejs');
const main = (req, res) => {
    authors_1.Authors.getAuthorsBooks()
        .then(result => {
        res.render(mainPage, {
            result,
            msg: 'no'
        });
    });
};
exports.main = main;
const authors = (req, res) => {
    authors_1.Authors.getAuthors()
        .then(authors => {
        res.render(authorsPage, {
            result: authors,
            msg: 'no'
        });
    });
};
exports.authors = authors;
const creatorPage = (req, res) => {
    res.render(creatorPageLink, {
        msg: 'no'
    });
};
exports.creatorPage = creatorPage;
const createAuthors = (req, res) => {
    let { fullName, biography, dateOfBirth } = req.body;
    let newAuthor = new authors_1.Authors(fullName, biography, dateOfBirth);
    newAuthor.createAuthors()
        .then(result => {
        console.log(result);
        res.redirect('/authors');
    })
        .catch(err => {
        console.log(err);
    });
};
exports.createAuthors = createAuthors;
const deleteAuthor = (req, res) => {
    let { id } = (req.body);
    books_1.Books.deleteWithAuthorId(id)
        .then(delResult => {
        if (delResult === true) {
            authors_1.Authors.deleteAuthor(id)
                .then(result => {
                if (result === true) {
                    res.redirect('/authors');
                }
            })
                .catch(err => {
                console.log(err);
            });
        }
    })
        .catch(err => {
        console.log(err);
    });
};
exports.deleteAuthor = deleteAuthor;
const updatePage = (req, res) => {
    let { id } = (req.body);
    authors_1.Authors.getSomeAuthor(id)
        .then(result => {
        res.render(updatingPage, {
            result,
            msg: 'no'
        });
    });
};
exports.updatePage = updatePage;
const confirmUpdate = (req, res) => {
    let { fullName, biography, dateOfBirth, id } = (req.body);
    let newInfo = [fullName, biography, dateOfBirth, id];
    authors_1.Authors.updateAuthorInfo(newInfo)
        .then(result => {
        if (result === true) {
            res.redirect('/authors');
        }
    })
        .catch(err => {
        console.log(err);
    });
};
exports.confirmUpdate = confirmUpdate;
