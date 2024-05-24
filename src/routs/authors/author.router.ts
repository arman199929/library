import express, {Router} from 'express';
import {
    main,
    authors,
    createAuthors,
    creatorPage,
    deleteAuthor,
    updatePage,
    confirmUpdate
} from '../../controller/authors/authors';


export const authorApi: Router = express.Router();

/**Get routers**/
authorApi.get('/', main);
authorApi.get('/authors', authors);
authorApi.get('/creator_page', creatorPage);


/**Post routers**/
authorApi.post('/create_authors', createAuthors);
authorApi.post('/delete_author', deleteAuthor);
authorApi.post('/update_page', updatePage);
authorApi.post('/update_authors', confirmUpdate)