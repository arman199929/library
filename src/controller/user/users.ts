import {NextFunction, Request, Response} from 'express';
import {UserRegistration, UserLogin} from '../../modules/users';
import jwt from 'jsonwebtoken';


/**Html pages**/
const logPage: string = ('../views/users/login.ejs');
const regPage: string = ('../views/users/registration.ejs');

export const authPage = (req: Request, res: Response) => {
    res.render(logPage, {
        msg: 'no'
    })
};


/**User registration**/
export const userReg = (req: Request, res: Response) => {
    res.render(regPage, {
        msg: 'no'
    })
}

/**Registration function**/
export const createNewUser = (req: Request, res: Response) => {

    interface UserInfo {
        email: string;
        phone: string;
        password: string
    }

    let {email, phone, password}: UserInfo = req.body;

    let newUserReg = new UserRegistration(email, phone, password);

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
                })
            }
        })
};


export const userLogin = (req: Request, res: Response, next: NextFunction) => {
    interface LoginInfo {
        email: string;
        password: string
    }

    let {email, password}: LoginInfo = req.body;

    UserLogin.userAuth(email, password)
        .then(result => {
            if (result) {
                jwt.sign({email}, 'secretPrivateKey', {expiresIn: '1h'}, (err, token) => {



                    // Authors.getAuthorsBooks()
                    //     .then(result => {
                    //         res.render(mainPage,{
                    //             msg:'no',
                    //             token
                    //         })
                    //     })
                    res.json({token})
                })
            }

        })
        .catch(err => {
            console.log(err)
        })

}
