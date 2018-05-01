'use strict';

import express from 'express';
import { mongoDB } from '../../../config';

const router = express.Router();
const { collections: { userCollection } } = mongoDB;

// add book
router.post('/admin/books', (req, res) => {
    const { db } = req.app.locals;

    db.collection(userCollection).insertOne(req.body, (err, result) => {
        if (err) return err;
        res.send(result);
    });
});


// remove book
router.delete('/admin/books', (req, res) => {
    const { db } = req.app.locals;

    db.collection(userCollection).deleteOne(req.body, (err, result) => {
        if (err) return err;
        res.send(result);
    });
});


// update book
router.put('/admin/books', (req, res) => {
    const { db } = req.app.locals;
    db.collection(userCollection).updateOne(
        req.body,
        { $set: {}, $currentDate: { lastModified: true } },
        (err, result) => {
            if (err) return err;
            res.send(result);
        }
    );
});

export default router;
