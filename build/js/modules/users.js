"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserLogin = exports.UserRegistration = void 0;
const db_1 = require("../database/db");
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserRegistration {
    constructor(email, phone, password) {
        this.email = email;
        this.phone = phone;
        this.password = password;
        this.email = email;
        this.phone = phone;
        this.password = password;
    }
    newUser() {
        let hash = bcrypt_1.default.hashSync(this.password, 10);
        let userInfo = [this.email, this.phone, hash];
        return new Promise((resolve, reject) => {
            let sql = 'INSERT INTO users (email,phone,password) VALUES (?,?,?)';
            db_1.connection.query(sql, userInfo)
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
exports.UserRegistration = UserRegistration;
class UserLogin {
    constructor(email, password) {
        this.email = email;
        this.password = password;
        this.email = email;
        this.password = password;
    }
    static userAuth(email, password) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT id,email,password FROM users WHERE email=?';
            db_1.connection.query(sql, [email])
                .then(result => {
                let userResult = result[0];
                if (userResult.length === 0) {
                    reject(undefined);
                }
                else {
                    let pass = (userResult[0].password);
                    if (!bcrypt_1.default.compareSync(password, pass)) {
                        reject(false);
                    }
                    else {
                        return resolve(userResult[0]);
                    }
                }
            })
                .catch(err => {
                return reject(err);
            });
        });
    }
}
exports.UserLogin = UserLogin;
