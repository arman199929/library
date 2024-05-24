import express, {Router} from 'express';
import {authPage, userReg, createNewUser, userLogin} from '../../controller/user/users';
import {userAuth} from "../../controller/user/user.auth";

export const userApi: Router = express.Router();

/**Get routers**/
userApi.get('/', authPage);
userApi.get('/register', userReg);
userApi.get('/user-page', userAuth);

/**Post routers**/
userApi.post('/registration', createNewUser);
userApi.post('/login', userLogin);
