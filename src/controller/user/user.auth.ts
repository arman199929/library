import jwt from 'jsonwebtoken';
import {NextFunction, Request, Response} from "express";



export const userAuth = (req:Request, res:Response, next:NextFunction) => {
    try {

        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(403).send('Access denied.');
        const decoded = jwt.verify(token, 'secretPrivateKey');
        res.send(decoded)
        next();
    } catch (error) {
        res.status(400).send('Invalid token');
    }
};