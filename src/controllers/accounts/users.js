'use strict';

import express from 'express';
import { mongoDB } from '../../../config/index';

const router = express.Router();
const { collections: { userCollection } } = mongoDB;

// list of all or specific user
router.get('/users/:username?', (req, res) => {
    const { db } = req.app.locals;

    let query = {};
    if (req.params.username) {
        query = { name: req.params.username };
    }

    db.collection(userCollection).find(query).toArray((err, docs) => {
        if (err) {
            res.status(400).send({ Error: 'Unable to Find User' });
            return;
        }
        res.send(docs);
    });
});

router.put('/users', async (req, res) => {
    const filter = { userName: req.body.userName };
    const { db } = req.app.locals;

    const update = {};
    if (req.body.hash) update.hash = req.body.hash;
    if (req.body.firstName) update.name = req.body.firstName;
    if (req.body.lastName) update.name = req.body.lastName;
    if (req.body.email) update.email = req.body.email;

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
    const filter = { id: req.body.userName };
    const { db } = req.app.locals;

    try {
        const result = await db.collection(userCollection).deleteOne(filter);
        res.send({ result });
    } catch (err) {
        res.status(400).send({ Error: 'Unable to delete document' });
    }
});

export default router;
