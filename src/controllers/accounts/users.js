'use strict';

import express from 'express';
import { mongoDB } from '../../../config/index';

const router = express.Router();
const { collections: { userCollection } } = mongoDB;

// list of all or specific user
router.get('/users/:username?', (req, res) => {
    let query = {};
    if (req.params.username) {
        query = {
            name: req.params.username,
        };
    }

    const { db } = req.app.locals;
    db.collection(userCollection).find(query).toArray((err, docs) => {
        if (err) {
            res.status(400).send({ Error: 'Unable to Find User' });
            return;
        }

        res.send(docs);
    });
});

// TODO: User structure should differ to
// {id, username, email, password, user_type} with id as unique identifier
// update user
router.put('/users', async (req, res) => {
    const filter = { id: req.body.decoded.id };

    let update = {};
    if (req.body.password) update.password = req.body.password;
    if (req.body.name) update.name = req.body.name;
    if (req.body.email) update.email = req.body.email;

    const { db } = req.app.locals;

    try {
        const result = await db.collection(userCollection).updateOne(
            filter,
            { $set: update, $currentDate: { lastModified: true } },
            { upsert: false }
        );
        res.send({ result });
    }
    catch (err) {
        res.status(400).send({ Error: 'Unable to update document' });
    }
});


// delete user
router.delete('/users', async (req, res) => {
    const { db } = req.app.locals;
    const filter = { id: req.body.decoded.id };

    try {
        const result = await db.collection(userCollection).deleteOne(filter);
        res.send({ result });
    }
    catch (err) {
        res.status(400).send({ Error: 'Unable to delete document' });
    }
});

export default router;
