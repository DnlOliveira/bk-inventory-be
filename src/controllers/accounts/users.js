'use strict';

import express from 'express';
import { mongoDB } from '../../../config';
import { verifyCredentials } from '../../services/auth-service';
import { User } from '../../models';

const router = express.Router();
const { collections: { userCollection } } = mongoDB;

// list of all or specific user
router.get('/users/:username?', (req, res) => {
    const { db } = req.app.locals;

    let query = {};
    if (req.params.username) {
        query = { userName: req.params.username };
    }

    db.collection(userCollection).find(query).toArray((err, docs) => {
        if (err) {
            res.status(400).send({ Error: 'Unable to Find User' });
            return;
        }
        res.send(docs);
    });
});

// edit users
router.put('/users', async (req, res) => {
    const filter = { userName: req.body.filter.userName };
    const { db } = req.app.locals;

    const query = {};
    if (req.body.query.hash) update.hash = req.body.query.hash;
    if (req.body.query.firstName) update.firstName = req.body.query.firstName;
    if (req.body.query.lastName) update.lastName = req.body.query.lastName;
    if (req.body.query.email) update.email = req.body.query.email;

    try {
        const result = await db.collection(userCollection).updateOne(
            filter,
            { $set: update, $currentDate: { lastModified: true } },
            { upsert: false }
        );
        res.send({ result });
    } catch (err) {
        res.status(400).send({ Error: 'Unable to update document' });
    }
});


// delete user
router.delete('/users', async (req, res) => {
    const filter = { userName: req.body.userName };
    const { db } = req.app.locals;

    try {
        const result = await db.collection(userCollection).deleteOne(filter);
        res.send({ result });
    } catch (err) {
        res.status(400).send({ Error: 'Unable to delete document' });
    }
});

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

// verify users credentials
router.post('/login', (req, res) => {
    const verified = verifyCredentials(req.app.locals.db, req.body);
    if (verified.Error) {
        res.status(400).send(verified);
        return;
    }
    res.send(verified);
});

export default router;
