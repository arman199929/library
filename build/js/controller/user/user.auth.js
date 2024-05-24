"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userAuth = (req, res, next) => {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!token)
            return res.status(403).send('Access denied.');
        const decoded = jsonwebtoken_1.default.verify(token, 'secretPrivateKey');
        res.send(decoded);
        next();
    }
    catch (error) {
        res.status(400).send('Invalid token');
    }
};
exports.userAuth = userAuth;
