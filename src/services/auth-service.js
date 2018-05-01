'use strict';

import jwt from 'jsonwebtoken';
import { secretKey } from '../../config';

// TODO: look at type of acc to generate diff tokens
// TODO: need a solid token structure
export function generateToken(userInfo) {
    console.log(userInfo);
    const user = {
        id: userInfo.id,
        type: 'admin',
    };

    return jwt.sign(user, secretKey);
}

export function verifyToken(req, res, next) {
    console.log(req.baseUrl);
    if (!req.headers.authorization) {
        // res.sendStatus(400);
        res.status(400).send({
            Error: 'Missing Authorization Header',
        });
        return;
    }

    const token = req.headers.authorization;

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            res.status(400).send({ Error: 'Invalid Token' });
            return;
        }

        if (req.baseUrl === '/admin' || req.baseUrl === '/users') {
            if (decoded.type !== 'admin') {
                res.status(400).send({ Error: 'Not Permitted' });
                return;
            }
        }

        req.body.decoded = decoded;
        next();
    });
}
