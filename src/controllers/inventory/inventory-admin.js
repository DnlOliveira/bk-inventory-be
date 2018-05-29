'use strict';

import express from 'express';
import { mongoDB } from '../../../config';
import { Book } from '../../models';

const router = express.Router();
const { collections: { bookCollection } } = mongoDB;

// add book
router.post('/admin/books', (req, res) => {
    const { db } = req.app.locals;

    const newBook = new Book({
        title: req.body.title,
        author: req.body.author,
        published: req.body.published,
        icon: req.body.icon,
    });

    db.collection(bookCollection).insertOne(newBook, (err, result) => {
        if (err) return err;
        res.send(result);
    });
});

// TODO:make sure to use unique identifier for filter
// remove book
router.delete('/admin/books', (req, res) => {
    const { db } = req.app.locals;

    if (!req.body.title && !req.body.author) {
        res.status(400).send({ Error: 'Both title & author required' });
    }
    const filter = {
        title: req.body.title,
        author: req.body.author,
    };

    db.collection(bookCollection).deleteOne(filter, (err, result) => {
        if (err) return err;
        res.send(result);
    });
});

// update book
router.put('/admin/books', async (req, res) => {
    const { db } = req.app.locals;
    
    if (!req.body.filter.title && !req.body.filter.author) {
        res.status(400).send({ Error: 'Both title & author required' });
    }
   const filter = {
       title: req.body.filter.title,
       author: req.body.filter.author,
   };

    const query = {}
    if (req.body.query.icon) query.icon = req.body.query.icon;
    if (req.body.query.title) query.title = req.body.query.title;
    if (req.body.query.rating) query.rating = req.body.query.rating;
    if (req.body.query.author) query.author = req.body.query.author;
    if (req.body.query.published) query.published = req.body.query.published;

    try {
        const result = await db.collection(bookCollection).updateOne(
            filter,
            { $set: query, $currentDate: { lastModified: true } },
            { upsert: false }
        );
        res.send({ result });
    } catch (err) {
        res.status(400).send({ Error: 'Unable to update document' });
    }
});

export default router;
