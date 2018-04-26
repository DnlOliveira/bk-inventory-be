'use strict';

import express from 'express';
import { mongoDB } from '../../../config/index';
import { generateToken } from '../../services/auth-service';

const router = express.Router();
const { collections: { userCollection } } = mongoDB;

router.post('/login', (req, res) => {
    const collection = process.db.collection(userCollection);

    const { username, password } = req.body;

    // TODO: call mongo and get credentials for username entered with correct queries
    // this can be a separate function in auth service (verifyCredentials)
    collection.find({ username: username }).toArray((err, docs) => {
        if (err) return err;

        // TODO: make sure of object's structure
        if (docs.user.username === username && docs.user.password === password) {
            // TODO: define further details needed for signature
            const token = generateToken({
                username: username,
                user_type: docs.user.user_type,
            });
            res.send(token);
        } else {
            res.send({ Error: 'Credentials do not match' });
        }
    });
});

router.post('/logout', (req, res) => {

});
