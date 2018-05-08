'use strict';

import express from 'express';
import { mongoDB } from '../../../config';
import { Book } from '../../models';

const router = express.Router();
const { collections: { userCollection } } = mongoDB;

// add book
router.post('/admin/books', (req, res) => {
    const { db } = req.app.locals;

    const newBook = new Book({
        title: req.body.title,
        author: req.body.author,
        published: req.body.published,
        icon: req.body.icon,
    });

    db.collection(userCollection).insertOne(newBook, (err, result) => {
        if (err) return err;
        res.send(result);
    });
});

// TODO:make sure to use unique identifier for filter
// remove book
router.delete('/admin/books', (req, res) => {
    const { db } = req.app.locals;
    const filter = { id: req.body.id };

    db.collection(userCollection).deleteOne(filter, (err, result) => {
        if (err) return err;
        res.send(result);
    });
});

// update book
router.put('/admin/books', (req, res) => {
    const { db } = req.app.locals;
    const filter = {
        author: req.body.author,
        title: req.body.title,
    };

    db.collection(userCollection).updateOne(
        filter,
        { $set: {}, $currentDate: { lastModified: true } },
        (err, result) => {
            if (err) return err;
            res.send(result);
        }
    );
});

export default router;
