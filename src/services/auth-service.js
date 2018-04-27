'use strict';

import jwt from 'jsonwebtoken';
import { secretKey } from '../../config';

// TODO: look at type of acc to generate diff tokens
export function generateToken(userInfo) {
    console.log(userInfo);
    const user = {
        id: req.body.id,
    };

    return jwt.sign(user, secretKey);
}

export function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        // res.sendStatus(400);
        res.status(400).send({
            Error: 'Missing Authorization Header',
        });
    }

    const token = req.headers.authorization;

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            res.status(400).send({ Error: 'Invalid Token' });
            return;
        }
        req.body.decoded = decoded;
        next();
    });
}
