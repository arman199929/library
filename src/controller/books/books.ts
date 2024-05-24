import {Request, Response} from 'express';
import {Books} from "../../modules/books";

const addBooksLink: string = ('../views/books/createBooks.ejs'),
    booksPageLink: string = ('../views/books/books.ejs'),
    updatingPageLink: string = ('../views/books/updateBooks.ejs');

export const books = (req: Request, res: Response) => {

    Books.getAllBooks()
        .then(result => {
            res.render(booksPageLink, {
                result,
                msg: 'no'
            })
        })

}

export const booksPage = (req: Request, res: Response) => {
    interface AuthorId {
        id: string
    }

    let {id}: AuthorId = req.body;
    res.render(addBooksLink, {
        id,
        msg: 'no'
    })
}

export const addNewBook = (req: Request, res: Response) => {
    interface BookInfo {
        authorID: string;
        bookName: string;
        isbn: string;
        publishedDate: string
    }

    let {authorID, bookName, isbn, publishedDate}: BookInfo = req.body;

    let newBook: Books = new Books(authorID, bookName, isbn, publishedDate);
    newBook.addNewBook()
        .then(result => {
            if (result === true) {
                console.log(result)
                return res.redirect('/books/')
            }
        })
        .catch(err => {
            console.log(err)
        })
}

export const deleteBook = (req: Request, res: Response) => {
    interface BookId {
        id: string
    }

    let {id}: BookId = req.body;
    Books.deleteBook(id)
        .then(result => {
            if (result === true) {
                res.redirect('/books')
            }
        })
        .catch(err => {
            console.log(err)
        })
}

export const bookUpdatingPage = (req: Request, res: Response) => {
    interface BookId {
        id: string
    }

    let {id}: BookId = req.body;

    Books.getSomeBook(id)
        .then(result => {
            res.render(updatingPageLink, {
                result, msg: 'no'
            })
        })
        .catch(err => {
            console.log(err)
        })
}

export const confirmUpdates = (req: Request, res: Response) => {
    interface BookNewInfo {
        id: string;
        bookName: string;
        isbn: string;
        publishedDate: string
    }

    let {id, bookName, isbn, publishedDate}: BookNewInfo = req.body;

    let newInfo: string[] = [bookName, isbn, publishedDate, id];

    Books.updateBookInfo(newInfo)
        .then(result => {
            if (result === true) {
                res.redirect('/books')
            }
        })
        .catch(err => {
            console.log(err)
        })
}

