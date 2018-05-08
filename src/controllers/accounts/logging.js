'use strict';

import express from 'express';
import { mongoDB } from '../../../config/index';
import { generateToken } from '../../services/auth-service';

const router = express.Router();
const { collections: { userCollection } } = mongoDB;

router.post('/login', (req, res) => {
    const { db } = req.app.locals;

    const { userName, hash } = req.body;

    db.collection(userCollection).findOne({ userName }).toArray(async (err, doc) => {
        if (err) return err;

        if (doc.userName === userName && doc.hash === hash) {
            const userInfo = {
                userName: doc.userName,
                firstName: doc.firstName,
                lastName: doc.lastName,
                email: doc.email,
                favorites: doc.favorites,
                createdDate: doc.createdDate,
                comments: doc.comments,
            };
            res.send({ userInfo });
        } else {
            res.send({ Error: 'Credentials do not match' });
        }
    });
});
