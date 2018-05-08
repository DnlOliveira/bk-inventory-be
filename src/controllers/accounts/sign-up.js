'use strict';

import express from 'express';
import { mongoDB } from '../../../config/index';
import { User } from '../../models';

const router = express.Router();
const { collections: { userCollection } } = mongoDB;

// create user
router.post('/users', (req, res) => {
    const { db } = req.app.locals;

    const newUser = new User({
        userName: req.body.userName,
        hash: req.body.hash,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
    });

    db.collection(userCollection).insertOne(newUser, async (err, result) => {
        if (err) {
            res.status(400).send({ Error: 'Unable to Create User' });
            return;
        }
        res.send({ result });
    });
});
