import {Request, Response} from 'express';
import {Authors} from '../../modules/authors';
import {Books} from '../../modules/books';

const mainPage: string = ('../views/main.ejs'),
    authorsPage: string = ('../views/authors/authors.ejs'),
    creatorPageLink: string = ('../views/authors/creator.ejs'),
    updatingPage: string = ('../views/authors/update.ejs');


export const main = (req: Request, res: Response) => {
    Authors.getAuthorsBooks()
        .then(result => {
            res.render(mainPage, {
                result,
                msg: 'no'
            })
        })

}

export const authors = (req: Request, res: Response) => {
    Authors.getAuthors()
        .then(authors => {
            res.render(authorsPage, {
                result: authors,
                msg: 'no'
            })
        })

}

export const creatorPage = (req: Request, res: Response) => {
    res.render(creatorPageLink, {
        msg: 'no'
    })
}

export const createAuthors = (req: Request, res: Response) => {
    interface AuthorsInfo {
        fullName: string,
        biography: string,
        dateOfBirth: string
    }

    let {fullName, biography, dateOfBirth}: AuthorsInfo = req.body;


    let newAuthor = new Authors(fullName, biography, dateOfBirth);

    newAuthor.createAuthors()
        .then(result => {
            console.log(result);
            res.redirect('/authors');
        })
        .catch(err => {
            console.log(err)
        })
}

export const deleteAuthor = (req: Request, res: Response) => {
    interface Id {
        id: string
    }

    let {id}: Id = (req.body);
    Books.deleteWithAuthorId(id)
        .then(delResult => {
            if (delResult === true) {
                Authors.deleteAuthor(id)
                    .then(result => {
                        if (result === true) {
                            res.redirect('/authors')
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        })
        .catch(err => {
            console.log(err)
        })

}

export const updatePage = (req: Request, res: Response) => {
    interface Id {
        id: string
    }

    let {id}: Id = (req.body);

    Authors.getSomeAuthor(id)
        .then(result => {
            res.render(updatingPage, {
                result,
                msg: 'no'
            })
        })
}

export const confirmUpdate = (req: Request, res: Response) => {
    interface UpdatedInfo {
        fullName: string;
        biography: string;
        dateOfBirth: string,
        id: string
    }

    let {fullName, biography, dateOfBirth, id}: UpdatedInfo = (req.body);

    let newInfo: string[] = [fullName, biography, dateOfBirth, id];

    Authors.updateAuthorInfo(newInfo)
        .then(result => {
            if (result === true) {
                res.redirect('/authors')
            }
        })
        .catch(err => {
            console.log(err)
        })
}

