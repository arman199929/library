"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLogin = exports.createNewUser = exports.userReg = exports.authPage = void 0;
const users_1 = require("../../modules/users");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/**Html pages**/
const logPage = ('../views/users/login.ejs');
const regPage = ('../views/users/registration.ejs');
const authPage = (req, res) => {
    res.render(logPage, {
        msg: 'no'
    });
};
exports.authPage = authPage;
/**User registration**/
const userReg = (req, res) => {
    res.render(regPage, {
        msg: 'no'
    });
};
exports.userReg = userReg;
/**Registration function**/
const createNewUser = (req, res) => {
    let { email, phone, password } = req.body;
    let newUserReg = new users_1.UserRegistration(email, phone, password);
    newUserReg.newUser()
        .then(result => {
        if (result === true) {
            return res.redirect('/');
        }
    })
        .catch(err => {
        if (err.errno === 1062) {
            return res.render(regPage, {
                msg: 'exist'
            });
        }
    });
};
exports.createNewUser = createNewUser;
const userLogin = (req, res, next) => {
    let { email, password } = req.body;
    users_1.UserLogin.userAuth(email, password)
        .then(result => {
        if (result) {
            jsonwebtoken_1.default.sign({ email }, 'secretPrivateKey', { expiresIn: '1h' }, (err, token) => {
                // Authors.getAuthorsBooks()
                //     .then(result => {
                //         res.render(mainPage,{
                //             msg:'no',
                //             token
                //         })
                //     })
                res.json({ token });
            });
        }
    })
        .catch(err => {
        console.log(err);
    });
};
exports.userLogin = userLogin;
