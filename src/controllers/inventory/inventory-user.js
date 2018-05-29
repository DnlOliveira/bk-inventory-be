// TODO: add routes to save an item to users
// favorites and route for comments to a book;
// comment should be saved to user and book;

'use strict';

import express from 'express';
import { mongoDB } from '../../../config';

const router = express.Router();
const { collections: { userCollection, bookCollection } } = mongoDB;

// add go favorites list
router.put('/users/favorites', async (req, res) => {
    const { db } = req.app.locals;

    const userFilter = { userName: req.body.userName };
    const bookFilter = {
        title: req.body.title,
        author: req.body.author
    }
    
    const book = await db.collection(bookCollection).findOne(bookFilter);
    const user = await db.collection(userCollection).findOne(userFilter);
    const favorites = user.favorites;
    favorites.push(book);

    const query = { favorites }

    db.collection(userCollection).updateOne(
        userFilter,
        { $set: query, $currentDate: { lastModified: true } },
        { upsert: false }
    ).then((err, result) => res.status(400).send({ res }));
});

export default router;
