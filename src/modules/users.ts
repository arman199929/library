import {connection} from '../database/db';
import bcrypt from 'bcrypt';

export class UserRegistration {
    constructor(public email: string, public phone: string, public password: string) {
        this.email = email;
        this.phone = phone;
        this.password = password
    }

    newUser() {
        let hash: string = bcrypt.hashSync(this.password, 10);
        let userInfo: string[] = [this.email, this.phone, hash];
        return new Promise((resolve, reject) => {
            let sql: string = 'INSERT INTO users (email,phone,password) VALUES (?,?,?)'
            connection.query(sql, userInfo)
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


export class UserLogin {
    constructor(public email: string, public password: string) {
        this.email = email;
        this.password = password
    }

    static userAuth(email: string, password: string) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT id,email,password FROM users WHERE email=?';
            connection.query(sql, [email])
                .then(result => {
                    let userResult: any = result[0];
                    if (userResult.length === 0) {
                        reject(undefined)
                    } else {
                        let pass: string = (userResult[0].password);
                        if (!bcrypt.compareSync(password, pass)) {
                            reject(false)
                        } else {
                            return resolve(userResult[0])
                        }
                    }

                })
                .catch(err => {
                    return reject(err)
                })
        })
    }

}