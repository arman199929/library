"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorApi = void 0;
const express_1 = __importDefault(require("express"));
const authors_1 = require("../../controller/authors/authors");
exports.authorApi = express_1.default.Router();
/**Get routers**/
exports.authorApi.get('/', authors_1.main);
exports.authorApi.get('/authors', authors_1.authors);
exports.authorApi.get('/creator_page', authors_1.creatorPage);
/**Post routers**/
exports.authorApi.post('/create_authors', authors_1.createAuthors);
exports.authorApi.post('/delete_author', authors_1.deleteAuthor);
exports.authorApi.post('/update_page', authors_1.updatePage);
exports.authorApi.post('/update_authors', authors_1.confirmUpdate);
