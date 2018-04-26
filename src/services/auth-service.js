import jwt from 'jsonwebtoken';
import { secretKey } from '../../config';


// TODO: generate token only if credential entered are correct
export function generateToken() {
    const cred = true;

    const cert = secretKey;
    if (cred) {
        return jwt.sign({ foo: 'bar' }, cert);
    }
}


export function verifyToken(req, res, next) {
    console.log(req.headers.authorization);

    if (!req.headers.authorization) {
        // res.sendStatus(400);
        res.status(400).send({
            Error: 'Missing Authorization Header',
        });
    }

    const token = req.headers.authorization;

    jwt.verify(token, secretKey, (decoded) => {

    });
}

